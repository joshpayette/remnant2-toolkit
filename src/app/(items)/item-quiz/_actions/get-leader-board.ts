'use server';

import { type LeaderBoardItem } from '@/components/ui';
import { prisma } from '@/lib/db';

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
