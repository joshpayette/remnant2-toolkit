import { BaseText, BaseTextLink } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_constants/nav-items';
import { BuildFeedPageFooter } from '@/app/(builds)/_components/build-feed-page-footer';
import { BaseGameBuilds } from '@/app/(builds)/base-game-builds/_components/base-game-builds';

export const maxDuration = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.baseGameBuilds.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.baseGameBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.baseGameBuilds.href}`,
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
          title={NAV_ITEMS.baseGameBuilds.label}
          subtitle={
            <div className="flex flex-col">
              <BaseText>{NAV_ITEMS.baseGameBuilds.description}</BaseText>
              <BaseTextLink href="/community-builds?releases=base">
                <span className="text-primary-500">
                  Want more? Click here to browse all community submitted base
                  game builds.
                </span>
              </BaseTextLink>
            </div>
          }
        />
      </div>
      <BaseGameBuilds />
      <BuildFeedPageFooter>{null}</BuildFeedPageFooter>
    </>
  );
}
