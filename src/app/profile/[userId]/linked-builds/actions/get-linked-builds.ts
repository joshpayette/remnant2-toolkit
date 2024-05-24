'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export default async function getLinkedBuilds() {
  const session = await getServerSession()
  if (!session || !session.user?.id) {
    return {
      status: 401,
      body: { message: 'Unauthorized' },
    }
  }

  const linkedBuilds = await prisma.linkedBuilds.findMany({
    where: { createdById: session.user.id },
    include: {
      LinkedBuildItem: true,
    },
  })

  return {
    status: 200,
    body: { linkedBuilds },
  }
}
