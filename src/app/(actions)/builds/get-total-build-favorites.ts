'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export async function getTotalBuildFavorites(userId?: string) {
  const session = await getServerSession()

  if (!session?.user && !userId) return 0

  const createdById = userId ?? session?.user?.id

  const totalVoteCount = await prisma.buildVoteCounts.count({
    where: {
      build: {
        createdById,
      },
    },
  })

  return totalVoteCount
}
