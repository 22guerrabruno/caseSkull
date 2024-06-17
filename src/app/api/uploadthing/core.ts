import { createUploadthing, type FileRouter } from 'uploadthing/next';
import sharp from 'sharp';
import { z } from 'zod';
import { db } from '@/db';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ input }) => {
      // This code runs on your server before upload

      // If you throw, the user will not be able to upload

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const { configId } = metadata.input;
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetaData = sharp(buffer).metadata();
      const { width, height } = await imgMetaData;

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            imageUrl: file.url,
            width: width || 500,
            height: height || 500,
          },
        });
        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await db.configuration.update({
          where: { id: configId },
          data: {
            croppedImageUrl: file.url,
          },
        });
        return { configId: updatedConfiguration.id };
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
