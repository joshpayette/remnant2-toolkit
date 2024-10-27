import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { getTotalBuildCount } from '@/app/(builds)/_actions/get-total-build-count';
import { BuildFeedPageFooter } from '@/app/(builds)/_components/build-feed-page-footer';
import { CommunityBuilds } from '@/app/(builds)/community-builds/_components/community-builds';

export const maxDuration = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.communityBuilds.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.communityBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.communityBuilds.href}`,
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
          title={NAV_ITEMS.communityBuilds.label}
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
      <CommunityBuilds />
      <BuildFeedPageFooter>{null}</BuildFeedPageFooter>
    </>
  );
}
