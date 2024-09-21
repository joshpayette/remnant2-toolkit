'use server';

import { prisma, type UserFollow } from '@repo/db';

export async function generateBuildNewNotifications(
  follows: Array<UserFollow>,
) {
  follows.forEach((sub) => maybeGenerateNotification(sub));
}

async function maybeGenerateNotification(follow: UserFollow) {
  const { followerId, followedId } = follow;
  const lastNotifiedAt =
    (
      await prisma.notificationBase.findFirst({
        where: {
          type: 'BuildNew',
          buildNewNotification: {
            follow,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    )?.createdAt || new Date(0);

  const newBuilds = await prisma.build.findMany({
    where: {
      createdById: followedId,
      isPublic: true,
      becamePublicAt: {
        gt: lastNotifiedAt,
      },
    },
  });

  for (const newBuild of newBuilds) {
    await prisma.notificationBase.create({
      data: {
        createdById: followedId,
        targetId: followerId,
        type: 'BuildNew',
        eventTime: newBuild.becamePublicAt ?? new Date(), // Since this only applies to new events, it should never be null
        buildNewNotification: {
          create: {
            buildId: newBuild.id,
            followId: follow.id,
          },
        },
      },
    });
  }
}
