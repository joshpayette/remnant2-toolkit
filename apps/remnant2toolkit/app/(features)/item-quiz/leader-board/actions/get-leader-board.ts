'use server'

import { prisma } from '@repo/db'

import type { Score } from '@/app/(features)/item-quiz/leader-board/types/score'

export async function getLeaderBoard(): Promise<Score[]> {
  const top20Scores = await prisma.userProfile.findMany({
    take: 20,
    select: {
      userId: true,
      topItemQuizScore: true,
      user: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: {
      topItemQuizScore: 'desc',
    },
  })

  return top20Scores
}
