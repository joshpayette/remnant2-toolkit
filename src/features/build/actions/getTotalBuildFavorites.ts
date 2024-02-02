'use server'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

export default async function getTotalBuildFavorites() {
  const session = await getServerSession()

  if (!session?.user) return 0

  const totalVoteCount = await prisma.buildVoteCounts.count({
    where: {
      build: {
        createdById: session.user.id,
      },
    },
  })

  return totalVoteCount
}
