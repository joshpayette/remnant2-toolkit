'use server'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Item Tracker`
  const description =
    'Track all of the items you have collected in Remnant 2. Import from a save file, CSV file, or manually add the items.'

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
