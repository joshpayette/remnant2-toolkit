'use server';

import { prisma } from '@repo/db';
import type { LeaderBoardItem } from '@repo/ui';
import { bigIntFix } from '@repo/utils/big-int-fix';

export async function getFavoritesLeaderboard(): Promise<LeaderBoardItem[]> {
  // Excluding remnant2toolkit account
  const response = (await prisma.$queryRaw`
    SELECT 
      User.id,
      User.name,
      User.displayName,
      COUNT(CASE WHEN BuildVoteCounts.userId != Build.createdById THEN BuildVoteCounts.buildId END) as totalVotes
    FROM User
    JOIN Build ON User.id = Build.createdById
    JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
    WHERE User.id NOT IN ('clql3zq8k0000a6m41vtnvldq')
    GROUP BY User.id, User.name, User.displayName
    ORDER BY totalVotes DESC
    LIMIT 10
  `) as Array<{
    id: string;
    name: string;
    displayName: string;
    totalVotes: number;
  }>;

  return response.map((item) => ({
    userId: item.id,
    userDisplayName: item.displayName,
    score: bigIntFix(item.totalVotes),
  }));
}
