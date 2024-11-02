import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_constants/nav-items';
import { ItemTrackerContainer } from '@/app/(items)/item-tracker/_components/item-tracker-container';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.itemTracker.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.itemTracker.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.itemTracker.href}`,
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

export default function Page() {
  return (
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title={NAV_ITEMS.itemTracker.label}
          subtitle={NAV_ITEMS.itemTracker.description}
        />
      </div>

      <div className="relative flex w-full flex-col items-center justify-center">
        <ItemTrackerContainer />
      </div>
    </>
  );
}
