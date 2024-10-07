import { type Metadata } from 'next';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { FilterForm } from '@/app/(items)/item-lookup-v2/_components/filter-form';

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

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <p>Search Params: {searchParams.searchText}</p>
      <FilterForm />
    </>
  );
}
