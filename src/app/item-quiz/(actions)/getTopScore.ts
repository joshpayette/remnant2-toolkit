'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export async function getTopScore({
  userId,
}: {
  userId: string
}): Promise<number> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return 0
  }

  const user = await prisma.userProfile.findUnique({
    where: { userId },
    select: { topItemQuizScore: true },
  })

  return user?.topItemQuizScore ?? 0
}
