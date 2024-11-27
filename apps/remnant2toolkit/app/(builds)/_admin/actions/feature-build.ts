'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { validateEnv } from '@/app/_libs/validate-env';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export default async function featureBuild(
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
      message: 'You must be an admin to feature builds.',
    };
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isFeaturedBuild: true, dateFeatured: new Date() },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'FEATURE_BUILD',
        details: '',
      },
    });

    console.info(
      `env.WEBHOOK_DISABLED: ${
        env.WEBHOOK_DISABLED
      }, ${typeof env.WEBHOOK_DISABLED}`,
    );

    if (env.WEBHOOK_DISABLED === 'false') {
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
                  value: `FEATURE_BUILD`,
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
      message: 'Build featured.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to feature build.',
    };
  }
}
