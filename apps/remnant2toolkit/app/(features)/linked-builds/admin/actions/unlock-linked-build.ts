'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook';

export async function unlockLinkedBuild(
  buildId: string | null,
): Promise<AdminToolResponse> {
  if (!buildId) return { status: 'error', message: 'No buildId provided!' };

  const session = await getSession();
  if (!session || !session.user) {
    return {
      status: 'error',
      message: 'You must be logged in.',
    };
  }

  if (session.user.role !== 'admin') {
    return {
      status: 'error',
      message: 'You must be an admin to unlock builds.',
    };
  }

  try {
    const build = await prisma.linkedBuild.update({
      where: { id: buildId },
      data: { isModeratorLocked: false },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'UNLOCK_LINKED_BUILD',
        details: '',
      },
    });

    // Send to webhook
    sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Audit Log Update`,
            color: 0x00ff00,
            fields: [
              {
                name: 'Audit Action',
                value: `UNLOCK_LINKED_BUILD`,
              },
              {
                name: 'Moderator',
                value: session.user.displayName,
              },
              {
                name: 'Build Link',
                value: `https://remnant2toolkit.com/builder/linked/${build.id}`,
              },
            ],
          },
        ],
      },
    });

    revalidatePath('/builder/linked/[linkedBuildId]', 'page');

    return {
      status: 'success',
      message: 'Build unlocked.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to lock build.',
    };
  }
}
