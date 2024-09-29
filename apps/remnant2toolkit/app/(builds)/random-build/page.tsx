import { type Metadata } from 'next';
import React from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getRandomBuild } from '@/app/(builds)/_libs/get-random-build';
import { CreateBuild } from '@/app/(builds)/builder/create/create-build';
import { allItems } from '@/app/(items)/_constants/all-items';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.randomBuild.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.randomBuild.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.randomBuild.href}`,
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

export default async function Page() {
  const session = await getSession();

  const randomBuildState = getRandomBuild(allItems);

  return (
    <div className="flex w-full flex-col items-center">
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle={NAV_ITEMS.createBuild.description}
      />
      <CreateBuild
        initialBuildState={randomBuildState}
        enableMemberFeatures={!!session?.user}
      />
    </div>
  );
}
