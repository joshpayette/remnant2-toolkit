'use server'

import { prisma } from '@repo/db'

import type { Score } from '@/app/item-quiz/(types)/score'

export default async function getTopScores(): Promise<Score[]> {
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
