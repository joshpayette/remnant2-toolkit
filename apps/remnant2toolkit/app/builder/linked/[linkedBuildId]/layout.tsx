import { Metadata, ResolvingMetadata } from 'next'

import getLinkedBuild from '@/app/(actions)/builds/get-linked-build'
import { PageHeader } from '@/app/(components)/page-header'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { isErrorResponse } from '@/app/(utils)/is-error-response'

export async function generateMetadata(
  { params: { linkedBuildId } }: { params: { linkedBuildId: string } },
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const buildData = await getLinkedBuild(linkedBuildId)
  if (isErrorResponse(buildData)) {
    console.info(buildData.errors)
    return {
      title: 'Error loading build',
      description:
        'There was an error loading this linked build. It may have been removed',
      openGraph: {
        title: 'Error loading build',
        description:
          'There was an error loading this linked build. It may have been removed',
        url: `https://remnant2toolkit.com/builder/linked/${linkedBuildId}`,
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
        title: 'Error loading build',
        description:
          'There was an error loading this build. It may have been removed',
      },
    }
  }

  const { linkedBuildState } = buildData

  if (!linkedBuildState) {
    return {
      title: 'Error loading build',
      description:
        'There was an error loading this linked build. It may have been removed',
      openGraph: {
        title: 'Error loading build',
        description:
          'There was an error loading this linked build. It may have been removed',
        url: `https://remnant2toolkit.com/builder/linked/${linkedBuildId}`,
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
        title: 'Error loading build',
        description:
          'There was an error loading this build. It may have been removed',
      },
    }
  }

  const title = `${linkedBuildState.name} by ${linkedBuildState.createdByDisplayName}`
  const description =
    linkedBuildState.description && linkedBuildState.description !== ''
      ? linkedBuildState.description
      : NAV_ITEMS.linkedBuilds.description

  return {
    title,
    description,
    openGraph: {
      title,
      description: description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/builder/linked/${linkedBuildState.id}`,
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
  params: { linkedBuildId },
  children,
}: {
  params: { linkedBuildId: string }
  children: React.ReactNode
}) {
  const buildData = await getLinkedBuild(linkedBuildId)
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

  return <>{children}</>
}
