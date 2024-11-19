'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { validateEnv } from '@/app/_libs/validate-env';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function setBeginnerBuild(
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
      message: 'You must be an admin to set beginner builds.',
    };
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isBeginnerBuild: true, dateFeatured: new Date() },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'SET_BEGINNER_BUILD',
        details: '',
      },
    });

    // Send to webhook
    if (!env.WEBHOOK_DISABLED) {
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
                  value: `SET_BEGINNER_BUILD`,
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
      message: 'Build added to beginner builds.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to add build to beginner builds.',
    };
  }
}
