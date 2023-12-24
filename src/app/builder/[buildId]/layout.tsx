import { prisma } from '@/app/(lib)/db'
import BuildPage from './page'
import { Metadata, ResolvingMetadata } from 'next'
import { metadata } from '@/app/metadata'
import { getServerSession } from '@/app/(lib)/auth'
import { Build } from '@prisma/client'
import PageHeader from '@/app/(components)/PageHeader'

async function getBuild(buildId: string) {
  if (!buildId) {
    console.error('No buildId provided!')
    return Response.json({ message: 'No buildId provided!' }, { status: 500 })
  }

  let build: Build | null = null
  try {
    build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
      },
    })
  } catch (error) {
    console.error('Error fetching build!', error)
    return Response.json({ message: 'Error fetching build!' }, { status: 500 })
  }

  if (!build) {
    console.error('Build not found!', build)
    return Response.json({ message: 'Build not found!' }, { status: 404 })
  }

  if (build.isPublic) {
    return Response.json(
      { message: 'Successfully fetched build!', build },
      { status: 200 },
    )
  }

  const session = await getServerSession()
  console.info('private build info', build.createdById, session?.user?.id)
  if (!session || !session.user || build.createdById !== session.user.id) {
    console.error(
      'You must be logged in as the build creator to view a private build.',
    )
    return Response.json(
      {
        message:
          'You must be logged in as the build creator to view a private build.',
      },
      { status: 401 },
    )
  }

  return Response.json(
    { message: 'Successfully fetched build!', build },
    { status: 200 },
  )
}

export async function generateMetadata(
  { params: { buildId } }: { params: { buildId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const buildData = await getBuild(buildId)
  const { build } = await buildData.json()

  return {
    ...metadata,
    title: build.name,
    description: build.description,
    openGraph: {
      ...metadata.openGraph,
      title: build.name,
      description: build.description,
      url: `https://remnant2builder.com/builder/${build.id}`,
    },
    twitter: {
      ...metadata.twitter,
      title: build.name,
      description: build.description,
    },
  }
}

export default async function Layout({
  params: { buildId },
}: {
  params: { buildId: string }
}) {
  const buildData = await getBuild(buildId)
  const { build: dbBuild } = await buildData.json()

  if (buildData.status !== 200) {
    return (
      <div className="flex w-full max-w-xl flex-col items-center justify-center">
        <PageHeader title="Build Not Found" />
        <p className="text-md text-center">
          Build {buildId} is not found. If you are sure the build exists, it may
          be marked private. You must be logged in as the build creator to view
          a private build.
        </p>
      </div>
    )
  }

  return <BuildPage params={{ dbBuild }} />
}
