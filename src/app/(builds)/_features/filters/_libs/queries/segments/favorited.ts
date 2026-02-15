import { Prisma } from '@/prisma';

export function limitByFavorited(userId: string | undefined) {
  if (userId === '' || userId === undefined) return Prisma.empty;
  return Prisma.sql`
    AND EXISTS (
      SELECT 1
      FROM BuildVoteCounts
      WHERE BuildVoteCounts.buildId = Build.id
      AND BuildVoteCounts.userId = ${userId}
    )
  `;
}
