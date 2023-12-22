import { getServerSession } from 'next-auth'
import { prisma } from '@/app/(lib)/db'

async function getBuild(buildId: string) {
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

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const buildData = await getBuild(id)
  if (buildData.status !== 200) {
    return (
      <div>
        <h1>Build {id} not found!</h1>
      </div>
    )
  }
  const { build } = await buildData.json()

  return (
    <div>
      <h1>Build {id}</h1>
      <pre>{JSON.stringify(build)}</pre>
    </div>
  )
}
