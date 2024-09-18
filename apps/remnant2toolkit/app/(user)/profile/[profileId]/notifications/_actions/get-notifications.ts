'use server';

import { prisma } from '@repo/db';

import { type FullNotification } from './notification-types';

export async function getNotifications(
  userId: string,
): Promise<Array<FullNotification>> {
  return prisma.notificationBase.findMany({
    where: {
      targetId: userId,
    },
    include: {
      createdBy: true,
      buildNewNotification: {
        include: {
          build: true,
        },
      },
      buildUpdateNotification: {
        include: {
          build: true,
        },
      },
    },
  }) as Promise<Array<FullNotification>>;
}

