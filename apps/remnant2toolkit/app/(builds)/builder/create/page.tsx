import { BaseLink, cn, ZINDEXES } from '@repo/ui';
import { type Metadata } from 'next';
import React from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { CreateBuild } from '@/app/(builds)/builder/create/create-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.createBuild.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.createBuild.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/builder/create`,
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

function PageContent() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create your builds and share them with your friends and the community."
      />
      <CreateBuild />
    </div>
  );
}

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return (
      <>
        <div className="relative flex w-full flex-col items-center">
          <div
            id="disabled-overlay"
            className={cn(
              'bg-background-solid/90 absolute inset-0 h-full',
              ZINDEXES.BUILD_FEATURES_DISABLED,
            )}
          />
          <div
            className={cn(
              'absolute mb-2 flex h-full w-full flex-col items-center justify-start p-2 text-2xl font-bold text-red-500',
              ZINDEXES.BUILD_FEATURES_DISABLED,
            )}
          >
            <p className="w-full text-center">
              This enhanced build tool requires you to be logged in to use it,
              as it saves your builds to the database. If you prefer not to sign
              in, you can still use the <br />
              <BaseLink
                href="/builder"
                className="text-surface-solid underline"
              >
                non-database builder by clicking here!
              </BaseLink>
            </p>
          </div>
          <PageContent />
        </div>
      </>
    );
  }

  return <PageContent />;
}
