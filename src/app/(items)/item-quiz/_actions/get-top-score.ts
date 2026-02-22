'use server';

import { prisma } from '@/prisma';

import { auth } from '@/lib/auth';

export async function getTopScore({
  userId,
}: {
  userId: string;
}): Promise<number> {
  const session = await auth();
  if (!session || !session.user) {
    return 0;
  }

  const user = await prisma.userProfile.findUnique({
    where: { userId },
    select: { topItemQuizScore: true },
  });

  return user?.topItemQuizScore ?? 0;
}
