'use server';

import { type Metadata } from 'next';
import { Suspense } from 'react';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.featuredBuilds.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.featuredBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/featured-builds`,
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
  return <Suspense>{children}</Suspense>;
}
