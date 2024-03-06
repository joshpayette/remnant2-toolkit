'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'

import { BUILD_REVALIDATE_PATHS } from '../constants'
import { BuildActionResponse } from '../types'

export async function removeReportForBuild(
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
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const { buildId } = validatedData.data

  if (!buildId) {
    return {
      errors: ['No buildId provided!'],
    }
  }

  try {
    // If user created this build, they can't remove their vote
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

    const userCreatedBuild = build.createdById === session.user.id
    if (userCreatedBuild) {
      return {
        errors: ['You cannot report your own build.'],
      }
    }

    // Check if user has a report for this build already
    const isReportRegistered = await prisma.buildReports.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    if (!isReportRegistered) {
      return {
        message: 'Report removed!',
      }
    }

    await prisma.buildReports.delete({
      where: {
        id: isReportRegistered.id,
      },
    })

    // Trigger webhook to send report to Discord
    const params = {
      embeds: [
        {
          title: `Build Report Removed: ${build.id}`,
          url: `https://remnant2toolkit.com/builder/${build.id}`,
          color: 0x00ff00,
          fields: [
            {
              name: 'Build ID',
              value: build.id,
            },
            {
              name: 'Reported removed by',
              value: session.user.id,
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
    }

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildId}`)

    return {
      message: 'Report has been removed!',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in saving vote!'],
    }
  }
}
