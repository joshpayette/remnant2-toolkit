'use server';

import { prisma } from '@/prisma';
import { type LeaderBoardItem } from '@/ui';

export async function getLeaderBoard(): Promise<LeaderBoardItem[]> {
  const response = await prisma.userProfile.findMany({
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
  });

  return response.map((item) => ({
    userId: item.userId,
    userDisplayName: item.user?.displayName ?? null,
    score: item.topItemQuizScore,
  }));
}
