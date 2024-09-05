import { DISCORD_INVITE_URL } from '@repo/constants';
import { BaseText, BaseTextLink } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { FeaturedBuilds } from '@/app/(builds)/featured-builds/_components/featured-builds';

export const maxDuration = 60;

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
      url: `https://remnant2toolkit.com/${NAV_ITEMS.featuredBuilds.href}`,
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
          title={NAV_ITEMS.featuredBuilds.label}
          subtitle={
            <div className="flex flex-col">
              <BaseText>{NAV_ITEMS.featuredBuilds.description}</BaseText>
              <BaseTextLink href={DISCORD_INVITE_URL}>
                <span className="text-primary-500">
                  Want to feature a build? Join the Remnant 2 Toolkit Discord!
                </span>
              </BaseTextLink>
            </div>
          }
        />
      </div>

      <FeaturedBuilds />
    </>
  );
}
