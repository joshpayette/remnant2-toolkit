'use server'

import { Metadata } from 'next'
import { Suspense } from 'react'

import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'
import { NAV_ITEMS } from '@/features/navigation/constants'
import { PageHeader } from '@/features/ui/PageHeader'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Community Builds - Remnant 2 Toolkit`
  const description = NAV_ITEMS.communityBuilds.description

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
  return (
    <>
      <PageHeader
        title="Community Builds"
        subtitle={
          <span>
            Search from{' '}
            <span className="text-2xl font-bold text-primary-500">
              {await getTotalBuildCount()}
            </span>{' '}
            community submitted builds!
          </span>
        }
      />
      <Suspense>{children}</Suspense>
    </>
  )
}
