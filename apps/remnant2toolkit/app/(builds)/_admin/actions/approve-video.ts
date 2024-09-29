'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { removeAllParamsExceptV } from '../../../../../../packages/utils/src/youtube';

export default async function approveVideo(
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
      message: 'You must be an admin to approve videos.',
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

    // Exclude the main build from this because we add it manually below
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
      data: { isVideoApproved: true },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: existingBuild.createdById,
        moderatorId: session.user.id,
        action: 'APPROVE_VIDEO',
        details:
          'This video URL has been approved in ALL builds it is found, not just this build.',
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
                value: `APPROVE_VIDEO`,
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
