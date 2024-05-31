'use server'

import { revalidatePath } from 'next/cache'

import type { AdminToolResponse } from '@/app/(actions)/builds/admin/types'
import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook'

export default async function lockLinkedBuild(
  buildId: string | null,
): Promise<AdminToolResponse> {
  if (!buildId) return { status: 'error', message: 'No buildId provided!' }

  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      status: 'error',
      message: 'You must be logged in.',
    }
  }

  if (session.user.role !== 'admin') {
    return {
      status: 'error',
      message: 'You must be an admin to lock builds.',
    }
  }

  try {
    const build = await prisma.linkedBuild.update({
      where: { id: buildId },
      data: { isModeratorLocked: true },
    })

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'LOCK_LINKED_BUILD',
        details: '',
      },
    })

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
                value: `LOCK_LINKED_BUILD`,
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
    })

    revalidatePath('/builder/linked/[linkedBuildId]', 'page')

    return {
      status: 'success',
      message: 'Build locked.',
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to lock build.',
    }
  }
}
