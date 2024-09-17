'use server';

import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { ItemLookupContainer } from '@/app/(items)/item-lookup/_components/item-lookup-container';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.itemLookup.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.itemLookup.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.itemLookup.href}`,
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
  return (
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Remnant 2 Item Lookup"
          subtitle="Find extended item information and interactions."
        />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <ItemLookupContainer />
      </div>
    </>
  );
}
