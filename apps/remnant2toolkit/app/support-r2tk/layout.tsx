import { type Metadata } from 'next';

import { OG_IMAGE_URL, SITE_TITLE } from '@/app/_constants/meta';
import { NAV_ITEMS } from '@/app/_types/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const title = `${NAV_ITEMS.resources.label} - ${SITE_TITLE}`;
  const description = NAV_ITEMS.resources.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_TITLE,
      url: `https://remnant2toolkit.com/${NAV_ITEMS.resources.href}`,
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

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
