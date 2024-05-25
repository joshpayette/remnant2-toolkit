'use server'

import { prisma } from '@/app/(utils)/db'

export default async function getLinkedBuilds({ userId }: { userId: string }) {
  const linkedBuilds = await prisma.linkedBuild.findMany({
    where: { createdById: userId },
    include: {
      LinkedBuildItems: true,
    },
  })

  return {
    status: 200,
    body: { linkedBuilds },
  }
}
