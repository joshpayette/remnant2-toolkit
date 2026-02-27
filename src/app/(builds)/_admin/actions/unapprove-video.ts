'use server';

import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { auth } from '@/lib/auth';
import { prisma } from '@/prisma';
import { validateEnv } from '@/utils/validate-env';
import { removeAllParamsExceptV } from '@/utils/youtube';

export default async function unapproveVideo(
  buildId: string | null
): Promise<AdminToolResponse> {
  const env = validateEnv();

  if (!buildId) return { status: 'error', message: 'No buildId provided!' };

  const session = await auth();
  if (!session || !session.user) {
    return {
      status: 'error',
      message: 'You must be logged in.',
    };
  }

  if (session.user.role !== 'admin') {
    return {
      status: 'error',
      message: 'You must be an admin to unapprove videos.',
    };
  }

  try {
    // Get the existing videoUrl first
    const existingBuild = await prisma.build.findUnique({
      where: { id: buildId },
    });
    const existingVideoUrl = existingBuild?.videoUrl;
    if (!existingVideoUrl) {
      return {
        status: 'error',
        message: 'No video to approve.',
      };
    }

    const buildsWithVideo = await prisma.build.findMany({
      where: {
        videoUrl: removeAllParamsExceptV(existingVideoUrl),
        id: { not: buildId },
      },
    });

    const buildIdsToUpdate = [
      buildId,
      ...buildsWithVideo.map((build) => build.id),
    ];

    const _buildUpdateResponse = await prisma.build.updateMany({
      where: {
        id: {
          in: buildIdsToUpdate,
        },
      },
      data: { isVideoApproved: false },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: existingBuild.createdById,
        moderatorId: session.user.id,
        action: 'UNAPPROVE_VIDEO',
        details:
          'This video URL has been unapproved in ALL builds it is found, not just the one you are currently viewing.',
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
                  value: `UNAPPROVE_VIDEO`,
                },
                {
                  name: 'Moderator',
                  value: session.user.displayName,
                },
                {
                  name: 'Build Link',
                  value: `https://remnant2toolkit.com/builder/${buildId}`,
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
      message: 'Build video approved.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to approve build video.',
    };
  }
}
