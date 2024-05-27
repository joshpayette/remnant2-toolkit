'use server'

import { revalidatePath } from 'next/cache'

import type { AdminToolResponse } from '@/app/(actions)/builds/admin/types'
import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export default async function privateBuild(
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
      message: 'You must be an admin to private builds.',
    }
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isPublic: false },
    })

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'PRIVATE_BUILD',
        details: '',
      },
    })

    // Send to webhook
    const params = {
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
    }
    const res = await fetch(`${process.env.WEBHOOK_AUDIT_LOG}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      console.error('Error in sending build link webhook to Discord!')
    }

    revalidatePath('/builder/[buildId]', 'page')

    return {
      status: 'success',
      message: 'Build marked private.',
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to mark build private.',
    }
  }
}
