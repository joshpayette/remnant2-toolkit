import { getServerSession } from 'next-auth'
import { prisma } from '@/app/(lib)/db'
import BuildPage from './page'
import { Metadata, ResolvingMetadata } from 'next'
import { metadata } from '@/app/metadata'

type Props = {
  params: { buildId: string }
}

async function getBuild({ params: { buildId } }: Props) {
  if (!buildId) {
    console.error('No buildId provided!')
    return Response.json({ message: 'No buildId provided!' }, { status: 500 })
  }

  const build = await prisma.build.findUnique({
    where: {
      id: buildId,
    },
    include: {
      createdBy: true,
    },
  })
  if (!build) {
    console.error('Build not found!', build)
    return Response.json({ message: 'Build not found!' }, { status: 404 })
  }

  if (build.public) {
    return Response.json({ build }, { status: 200 })
  }

  const session = await getServerSession()
  if (!session || !session.user || build.createdBy.id !== session.user.id) {
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
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const buildData = await getBuild({ params })
  const { build } = await buildData.json()

  return {
    ...metadata,
    title: build.name,
    //description: build.description, // TODO: Add description to build
    openGraph: {
      ...metadata.openGraph,
      title: build.name,
      //description: build.description, // TODO: Add description to build
      url: `https://remnant2builder.com/builder/${build.id}`,
    },
    twitter: {
      ...metadata.twitter,
      title: build.name,
      //description: build.description, // TODO: Add description to build
    },
  }
}

export default async function Layout(props: Props) {
  const {
    params: { buildId },
  } = props

  const buildData = await getBuild(props)
  if (buildData.status !== 200) {
    return (
      <div>
        <h1>Build {buildId} not found!</h1>
      </div>
    )
  }
  const { build: dbBuild } = await buildData.json()

  return <BuildPage dbBuild={dbBuild} />
}
