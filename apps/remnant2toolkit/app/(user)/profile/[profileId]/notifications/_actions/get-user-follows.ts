'use server';

import { prisma, type UserFollow } from '@repo/db';

export async function getUserFollows(
  userId: string,
): Promise<Array<UserFollow>> {
  return prisma.userFollow.findMany({
    where: {
      followerId: userId,
    },
  });
}
