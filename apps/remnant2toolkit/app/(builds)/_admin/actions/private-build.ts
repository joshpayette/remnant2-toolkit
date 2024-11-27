'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { validateEnv } from '@/app/_libs/validate-env';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function privateBuild(
  buildId: string | null,
): Promise<AdminToolResponse> {
  const env = validateEnv();

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
      message: 'You must be an admin to private builds.',
    };
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isPublic: false },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'PRIVATE_BUILD',
        details: '',
      },
    });

    // Send to webhook
    if (env.WEBHOOK_DISABLED === 'false') {
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
                  value: `PRIVATE_BUILD`,
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
    }

    revalidatePath('/builder/[buildId]', 'page');

    return {
      status: 'success',
      message: 'Build marked private.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to mark build private.',
    };
  }
}
