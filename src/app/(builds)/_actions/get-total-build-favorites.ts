'use server';

import { prisma } from '@/prisma';

import { auth } from '@/auth';

export async function getTotalBuildFavorites(userId?: string) {
  const session = await auth();

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
