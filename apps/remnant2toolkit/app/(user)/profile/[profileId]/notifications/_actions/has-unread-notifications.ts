'use server';

import { prisma } from '@repo/db';

export async function hasUnreadNotifications(userId: string) {
  return (
    (await prisma.notificationBase.findFirst({
      where: {
        targetId: userId,
        read: false,
      },
    })) !== null
  );
}
