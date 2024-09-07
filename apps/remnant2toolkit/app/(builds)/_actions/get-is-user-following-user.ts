'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function getIsUserFollowingUser(profileId: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    return false;
  }

  const response = prisma.userSubscription.findFirst({
    where: {
      subscriberId: session?.user?.id,
      subscribedToId: profileId,
    },
  });

  return !!response || false;
}
