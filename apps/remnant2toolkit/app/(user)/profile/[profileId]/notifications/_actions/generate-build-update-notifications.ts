'use server';

import { type BuildFollow, prisma } from '@repo/db';

export async function generateBuildUpdateNotifications(
  follows: Array<BuildFollow>,
) {
  follows.forEach((sub) => maybeGenerateNotification(sub));
}

async function maybeGenerateNotification(follow: BuildFollow) {
  const { followerId, followedId } = follow;
  const { createdAt, updatedAt, createdById, wasPublic } =
    await prisma.build.findUniqueOrThrow({
      where: { id: followedId },
    });

  // Build has never been updated
  if (!updatedAt || createdAt.getTime() === updatedAt.getTime()) return;
  const updatedTime = updatedAt.getTime();

  // Build was updated, but the update was a publish - defer to the "new" build notification
  if (!wasPublic) return;

  // Build was updated, but it happened before we started following
  if (follow.createdAt.getTime() > updatedTime) return;

  const lastNotifiedAt =
    (
      await prisma.notificationBase.findFirst({
        where: {
          type: 'BuildUpdate',
          buildUpdateNotification: {
            follow,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    )?.createdAt.getTime() || 0;

  if (updatedTime > lastNotifiedAt) {
    await prisma.notificationBase.create({
      data: {
        createdById,
        targetId: followerId,
        type: 'BuildUpdate',
        eventTime: updatedAt,
        buildUpdateNotification: {
          create: {
            buildId: followedId,
            followId: follow.id,
          },
        },
      },
    });
  }
}
