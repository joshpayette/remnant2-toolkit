'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getIsUserFollowingBuild(buildId: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    return false;
  }

  const response = await prisma.userBuildSubscription.findFirst({
    where: {
      userId: session.user.id,
      buildId,
    },
  });

  return !!response || false;
}
