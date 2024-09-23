'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function lockBuild(
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
      message: 'You must be an admin to lock builds.',
    };
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isModeratorLocked: true },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'LOCK_BUILD',
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
                value: `LOCK_BUILD`,
              },
              {
                name: 'Moderator',
                value: session.user.displayName,
              },
              {
                name: 'Build Link',
                value: `https://remnant2toolkit.com/builder/${build.id}`,
              },
            ],
          },
        ],
      },
    });

    revalidatePath('/builder/[buildId]', 'page');

    return {
      status: 'success',
      message: 'Build locked.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to lock build.',
    };
  }
}
