'use server'

import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Builds By Collection - Remnant 2 Toolkit`
  const description =
    'Remnant 2 Builds By Collection. Search and find community builds with items you have in your collection.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/community-builds`,
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
  return <p>Temporarily down for maintenance</p>

  return <Suspense>{children}</Suspense>
}
