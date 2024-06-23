'use server'

import { prisma } from '@repo/db'

import { getServerSession } from '@/app/(utils)/auth'

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
