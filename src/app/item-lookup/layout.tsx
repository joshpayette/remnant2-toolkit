'use server'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Item Lookup - Remnant2Toolkit`
  const description =
    'Search for detailed information about items in Remnant 2. Unlike other databases, our item looking includes tags detailing item interactions, corrected item descriptions, and more!'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/item-lookup`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/og_image_small.png',
          width: 100,
          height: 100,
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
