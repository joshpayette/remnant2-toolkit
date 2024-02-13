'use server'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Boss Tracker`
  const description =
    'Keep track of all the world bosses, bosses, and aberrations you have defeated in Remnant 2.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/boss-tracker`,
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
