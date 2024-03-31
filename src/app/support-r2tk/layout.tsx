import { Metadata } from 'next'

import { NAV_ITEMS } from '@/features/navigation/constants'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Support R2TK - Remnant 2 Toolkit'
  const description = NAV_ITEMS.resources.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/support-r2tk`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
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
