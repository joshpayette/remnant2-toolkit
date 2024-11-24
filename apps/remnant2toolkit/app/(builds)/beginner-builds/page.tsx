import { BaseText, BaseTextLink } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_constants/nav-items';
import { BuildFeedPageFooter } from '@/app/(builds)/_components/build-feed-page-footer';
import { BeginnerBuilds } from '@/app/(builds)/beginner-builds/_components/beginner-builds';
import { CONFIG } from '@/app/config';

export const maxDuration = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.beginnerBuilds.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.beginnerBuilds.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.beginnerBuilds.href}`,
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
          title={NAV_ITEMS.beginnerBuilds.label}
          subtitle={
            <div className="flex flex-col">
              <BaseText>{NAV_ITEMS.beginnerBuilds.description}</BaseText>
              <BaseTextLink href={CONFIG.site.urls.discordInvite ?? ''}>
                <span className="text-primary-500">
                  Want to feature a beginner build? Join the Remnant 2 Toolkit
                  Discord!
                </span>
              </BaseTextLink>
            </div>
          }
        />
      </div>
      <BeginnerBuilds />
      <BuildFeedPageFooter>{null}</BuildFeedPageFooter>
    </>
  );
}
