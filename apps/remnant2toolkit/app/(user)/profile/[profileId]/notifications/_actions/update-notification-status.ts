'use server';

import { prisma } from '@repo/db';

export async function updateNotificationStatus(
  id: string,
  read: boolean,
  hidden: boolean,
) {
  await prisma.notificationBase.update({
    where: {
      id,
    },
    data: {
      read,
      hidden,
    },
  });
}
