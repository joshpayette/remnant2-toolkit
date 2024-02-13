'use server'

import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Created Builds - Remnant2Toolkit`
  const description =
    'View all of the builds you have created on Remnant 2 Toolkit.'

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/profile/created-builds`,
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
