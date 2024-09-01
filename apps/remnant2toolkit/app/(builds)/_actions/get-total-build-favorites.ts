'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getTotalBuildFavorites(userId?: string) {
  const session = await getSession();

  if (!session?.user && !userId) return 0;

  const createdById = userId ?? session?.user?.id;

  const totalVoteCount = await prisma.buildVoteCounts.count({
    where: {
      build: {
        createdById,
      },
    },
  });

  return totalVoteCount;
}
