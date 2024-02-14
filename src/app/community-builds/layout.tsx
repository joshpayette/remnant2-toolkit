'use server'

import { Metadata } from 'next'

import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'

import BuildPage from './page'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Community Builds - Remnant2Toolkit`
  const description =
    'Search community submitted builds based on specific items, releases, or your own collected items.'

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

export default async function Layout() {
  const totalBuildCount = await getTotalBuildCount()

  return <BuildPage totalBuildCount={totalBuildCount} />
}
