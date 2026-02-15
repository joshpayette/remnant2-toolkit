'use server';

import { prisma } from '@/prisma';

export async function getIsLoadoutPublic(userId: string) {
  const dbResponse = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
    select: {
      isLoadoutPublic: true,
    },
  });

  return dbResponse?.isLoadoutPublic || false;
}
