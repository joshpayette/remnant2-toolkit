import { BaseText, BaseTextLink } from '@repo/ui';
import { type Metadata } from 'next';

import { PageHeader } from '@/app/_components/page-header';
import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';
import { BaseGameBuilds } from '@/app/(builds)/base-game-builds/_components/base-game-builds';

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
      <PageHeader
        title="Base Game Builds"
        subtitle={
          <div className="flex flex-col">
            <BaseText>{NAV_ITEMS.baseGameBuilds.description}</BaseText>
            <BaseTextLink href="/community-builds?releases=base&withQuality=true">
              <span className="text-primary-500">
                Want more? Click here to browse all community submitted base
                game builds.
              </span>
            </BaseTextLink>
          </div>
        }
      />

      <BaseGameBuilds />
    </>
  );
}
