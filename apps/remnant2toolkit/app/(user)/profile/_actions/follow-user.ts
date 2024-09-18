'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function followUser({
  userId,
}: {
  userId: string;
}): Promise<{ message: string; success: boolean }> {
  const session = await getSession();
  const followerId = session?.user?.id;

  if (!followerId) {
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

  if (userId === followerId) {
    return {
      message: 'You cannot follow yourself',
      success: false,
    };
  }

  const follower = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
  });

  if (!follower) {
    return {
      message: `User with id ${followerId} not found`,
      success: false,
    };
  }

  const follow = await prisma.userFollow.findFirst({
    where: {
      followedId: userId,
      followerId,
    },
  });

  if (follow) {
    return {
      message: 'User is already following to this user',
      success: false,
    };
  }

  await prisma.userFollow.create({
    data: {
      followedId: userId,
      followerId,
    },
  });

  return {
    message: 'User followed successfully',
    success: true,
  };
}
