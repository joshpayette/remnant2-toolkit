import { Metadata } from 'next'

import { NAV_ITEMS } from '@/app/(types)/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Resources - Remnant 2 Toolkit'
  const description = NAV_ITEMS.resources.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/resources`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/remnant2/misc/og-image-sm.jpg',
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
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
