'use server';

import { type Metadata } from 'next';
import { Suspense } from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getTotalBuildCount } from '@/app/(builds)/_actions/get-total-build-count';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Community Builds - Remnant 2 Toolkit`;
  const description = NAV_ITEMS.communityBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/community-builds`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/og-image-sm.jpg',
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
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Community Builds"
          subtitle={
            <span>
              Search from{' '}
              <span className="text-primary-500 text-2xl font-bold">
                {await getTotalBuildCount()}
              </span>{' '}
              community submitted builds!
            </span>
          }
        />
      </div>
      <Suspense>{children}</Suspense>
    </>
  );
}
