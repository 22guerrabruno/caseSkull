import { db } from '@/db';
import { notFound, redirect } from 'next/navigation';
import DesignConfigurator from './DesignConfigurator';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    redirect('/configure/upload');
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    redirect('/configure/upload');
  }
  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      imageUrl={imageUrl}
      configId={id}
      imageDimensions={{ width, height }}
    />
  );
};

export default Page;
