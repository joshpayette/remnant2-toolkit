import { type Metadata } from 'next';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Amplitude vs Resonance Guide - ${SITE_TITLE}`;
  const description =
    'A guide on what items and abilities are affected by Amplitude and Resonance';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/guides/amplitude`,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-start justify-start text-left">
      {children}
    </div>
  );
}
