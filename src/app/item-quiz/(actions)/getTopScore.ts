'use server'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

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
