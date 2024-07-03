'use server'

import { Metadata } from 'next'
import React from 'react'

import { getBuild } from '@/app/(actions)/builds/get-build'
import { PageHeader } from '@/app/(components)/page-header'
import { getServerSession } from '@/app/(features)/auth'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { isErrorResponse } from '@/app/(utils)/is-error-response'

export async function generateMetadata(): Promise<Metadata> {
  const title = `Build Linking Tool - Remnant 2 Toolkit`
  const description = NAV_ITEMS.linkedBuilds.description

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/linked/create`,
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
  params: { buildId },
}: {
  children: React.ReactNode
  params: { buildId: string }
}) {
  const session = await getServerSession()

  if (!session) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Login Required!"
          subtitle="This feature requires you to be logged in, as it saves information to the database."
        />
      </div>
    )
  }

  // If build doesn't exist, show error message
  const buildData = await getBuild(buildId)

  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Something went wrong!"
          subtitle="The build either can't be found or is marked private."
        />
      </div>
    )
  }

  // if the build is not public, show error message
  const { build } = buildData
  if (!build.isPublic) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Build is not public!"
          subtitle="The build must be public to be linked to other builds."
        />
      </div>
    )
  }

  // if the user is not the creator of the build, show error message
  if (session.user?.id !== build.createdById) {
    return (
      <div className="flex max-w-lg flex-col">
        <PageHeader
          title="Unauthorized Access!"
          subtitle="You must be the creator of the build to link it to other builds."
        />
      </div>
    )
  }

  return <>{children}</>
}
