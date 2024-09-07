'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function unsubscribeFromUser({
  userId,
}: {
  userId: string;
}): Promise<{ message: string; success: boolean }> {
  const session = await getSession();
  const subscriberId = session?.user?.id;

  if (!subscriberId) {
    return {
      message: 'User is not authenticated',
      success: false,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      message: `User with id ${userId} not found`,
      success: false,
    };
  }

  const subscriber = await prisma.user.findUnique({
    where: {
      id: subscriberId,
    },
  });

  if (!subscriber) {
    return {
      message: `User with id ${subscriberId} not found`,
      success: false,
    };
  }

  const subscription = await prisma.userSubscription.findFirst({
    where: {
      subscribedToId: userId,
      subscriberId,
    },
  });

  if (!subscription) {
    return {
      message: 'User is not subscribed to this user',
      success: false,
    };
  }

  await prisma.userSubscription.delete({
    where: {
      id: subscription.id,
    },
  });

  return {
    message: 'Successfully unsubscribed from user',
    success: true,
  };
}
