'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

import { BUILD_REVALIDATE_PATHS } from '../constants'
import { BuildActionResponse } from '../types'

export async function addReportForBuild(
  data: string,
): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // build validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      buildId: z.string(),
      reason: z.string(),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const { buildId, reason } = validatedData.data

  if (!buildId) {
    return {
      errors: ['No buildId provided!'],
    }
  }

  try {
    // If user created this build, they can't report their own build
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
    })
    if (!build) {
      return {
        errors: ['Build not found!'],
      }
    }
    if (build.createdById === session.user.id) {
      return {
        errors: ['You cannot report your own build!'],
      }
    }

    // Check if user has a report for this build already
    const isReportRegistered = await prisma.buildReports.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    if (isReportRegistered) {
      return {
        message: 'Report saved!',
      }
    }

    await prisma.buildReports.create({
      data: {
        buildId,
        reason,
        userId: session.user.id,
      },
    })

    // Trigger webhook to send report to Discord
    const params = {
      embeds: [
        {
          title: `Build Reported: ${build.id}`,
          url: `https://remnant2toolkit.com/builder/${build.id}`,
          color: 0xff0000,
          fields: [
            {
              name: 'Build ID',
              value: build.id,
            },
            {
              name: 'Reported by',
              value: session.user.id,
            },
            {
              name: 'Reason',
              value: reason,
            },
          ],
        },
      ],
    }

    const res = await fetch(`${process.env.WEBHOOK_REPORTED_CONTENT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      console.error('Error in sending report webhook to Discord!')
      return {
        message: 'Error in sending build report!',
      }
    }

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildId}`)

    return {
      message: 'Reported saved!',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in saving report!'],
    }
  }
}
