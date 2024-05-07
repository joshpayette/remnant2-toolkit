'use server'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

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
