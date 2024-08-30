'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { type AdminToolResponse } from '@/app/(builds)/_types/admin-tool-response';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook';

export default async function updateBuild(
  buildId: string | null,
  buildName: string,
  buildDescription: string,
  buildReferenceLink: string,
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
      message: 'You must be an admin to update builds.',
    };
  }

  try {
    const currentBuild = await prisma.build.findUnique({
      where: { id: buildId },
    });
    if (!currentBuild) {
      return {
        status: 'error',
        message: 'Build not found.',
      };
    }

    let auditDetails = '';
    if (currentBuild.name !== buildName) {
      auditDetails += `Name: ${currentBuild.name} -> ${buildName}\n`;
    }
    if (currentBuild.description !== buildDescription) {
      auditDetails += `Updated build description.\n`;
    }
    if (currentBuild.buildLink !== buildReferenceLink) {
      auditDetails += `Updated build reference link.\n`;
    }

    const build = await prisma.build.update({
      where: { id: buildId },
      data: {
        name: buildName,
        description: buildDescription,
        buildLink: buildReferenceLink,
      },
    });

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'UPDATE_BUILD',
        details: auditDetails,
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
                value: `UPDATE_BUILD`,
              },
              {
                name: 'Details',
                value: auditDetails,
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
      message: 'Build updated.',
    };
  } catch (e) {
    console.error(e);
    return {
      status: 'error',
      message: 'Failed to update build.',
    };
  }
}
