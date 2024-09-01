'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getTopScore({
  userId,
}: {
  userId: string;
}): Promise<number> {
  const session = await getSession();
  if (!session || !session.user) {
    return 0;
  }

  const user = await prisma.userProfile.findUnique({
    where: { userId },
    select: { topItemQuizScore: true },
  });

  return user?.topItemQuizScore ?? 0;
}
