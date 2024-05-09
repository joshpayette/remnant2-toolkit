'use server'

import { Metadata } from 'next'

import { NAV_ITEMS } from '@/app/(types)/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Item Tracker - Remnant2Toolkit`
  const description = NAV_ITEMS.itemTracker.description

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/tracker`,
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
