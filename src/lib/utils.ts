import { type ClassValue, clsx } from 'clsx';
import { Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('es-EU', {
    style: 'currency',
    currency: 'EUR',
  });

  return formatter.format(price);
};

export function constructMetadata({
  title = 'CaseSkull - custom High-quality phone cases',
  description = 'Custom phone cases with high-quality materials.',
  image = '/skull.png',
  icons = '/skull.png',
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,

      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,

      images: [image],
    },
    icons,
    metadataBase: new URL('https://case-skull.vercel.app'),
  };
}
