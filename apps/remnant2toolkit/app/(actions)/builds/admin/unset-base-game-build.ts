'use server'

import { prisma } from '@repo/db'
import { revalidatePath } from 'next/cache'

import type { AdminToolResponse } from '@/app/(actions)/builds/admin/types'
import { getServerSession } from '@/app/(features)/auth'
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook'

export default async function unsetBaseGameBuild(
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
      message: 'You must be an admin to unset base game builds.',
    }
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isBaseGameBuild: false },
    })

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'UNSET_BASE_GAME_BUILD',
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
                value: `UNSET_BASE_GAME_BUILD`,
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
    })

    revalidatePath('/builder/[buildId]', 'page')

    return {
      status: 'success',
      message: 'Build removed from base game builds.',
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to remove build from base game builds.',
    }
  }
}
