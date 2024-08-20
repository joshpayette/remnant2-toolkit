'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/(features)/auth/services/sessionService';
import type { AdminToolResponse } from '@/app/(features)/builds/types/admin-tool-response';
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook';

export default async function unsetGimmickBuild(
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
      message: 'You must be an admin to unset gimmick builds.',
    };
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isGimmickBuild: false },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'UNSET_GIMMICK_BUILD',
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
                value: `UNSET_GIMMICK_BUILD`,
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
      message: 'Build removed from gimmick builds.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to remove build from gimmick builds.',
    };
  }
}
