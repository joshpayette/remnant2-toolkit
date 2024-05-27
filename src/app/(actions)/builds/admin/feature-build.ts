'use server'

import { revalidatePath } from 'next/cache'

import type { AdminToolResponse } from '@/app/(actions)/builds/admin/types'
import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export default async function featureBuild(
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
      message: 'You must be an admin to feature builds.',
    }
  }

  try {
    const build = await prisma.build.update({
      where: { id: buildId },
      data: { isFeaturedBuild: true, dateFeatured: new Date() },
    })

    // write to the audit log
    await prisma.auditLog.create({
      data: {
        userId: build.createdById,
        moderatorId: session.user.id,
        action: 'FEATURE_BUILD',
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
      message: 'Build featured.',
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to feature build.',
    }
  }
}
