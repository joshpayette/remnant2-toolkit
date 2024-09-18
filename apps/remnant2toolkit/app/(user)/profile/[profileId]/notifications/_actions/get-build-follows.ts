'use server';

import { type BuildFollow, prisma } from '@repo/db';

export async function getBuildFollows(
  userId: string,
): Promise<Array<BuildFollow>> {
  return prisma.buildFollow.findMany({
    where: {
      followerId: userId,
    },
  });
}
