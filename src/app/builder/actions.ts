'use server'

import { getServerSession } from '../(lib)/auth'
import { BuildState, ExtendedBuild } from '@/app/(types)/build'
import { prisma } from '@/app/(lib)/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ErrorResponse } from '../(types)'
import { buildStateSchema, buildStateToBuild } from '../(lib)/build'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'

export type SuccessResponse = {
  message?: string
  buildId?: string
  totalUpvotes?: number
}

export type BuildActionResponse = ErrorResponse | SuccessResponse

const revalidatePaths = ['/profile/created-builds', '/profile/favorited-builds']

export async function createBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // build validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = buildStateSchema.safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const buildState = validatedData.data as BuildState

  const newBuild = buildStateToBuild(buildState)

  try {
    const dbResponse = await prisma.build.create({
      data: {
        ...newBuild,
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error saving build to the database.'],
      }
    }

    // Register a vote for the build
    await prisma.buildVoteCounts.create({
      data: {
        buildId: dbResponse.id,
        userId: session.user.id,
      },
    })

    // Trigger webhook to send build to Discord
    if (buildState.isPublic) {
      const params = {
        content: `https://www.remnant2toolkit.com/builder/${dbResponse.id}`,
      }

      const res = await fetch(`${process.env.WEBHOOK_COMMUNITY_BUILDS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res.ok) {
        console.error('Error in sending build webhook to Discord!')
      }
    }

    // Refresh the cache for the route
    for (const path of revalidatePaths) {
      revalidatePath(path)
    }

    return {
      message: 'Build successfully saved!',
      buildId: dbResponse.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error saving build to the database.'],
    }
  }
}

export async function deleteBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      errors: ['You must be logged in.'],
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

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
      },
    })
    if (!build) {
      return {
        errors: ['Build not found!'],
      }
    }

    if (build.createdBy.id !== session.user.id) {
      return {
        errors: [
          'You must be logged in as the build creator to delete a build.',
        ],
      }
    }

    const dbResponse = await prisma.build.delete({
      where: {
        id: build.id,
      },
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error in deleting build!'],
      }
    }

    // Refresh the cache for the routes
    for (const path of revalidatePaths) {
      revalidatePath(path)
    }

    return {
      message: 'Build successfully deleted!',
      buildId: dbResponse.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in deleting build!'],
    }
  }
}

export async function updateBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // build validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = buildStateSchema.safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const buildState = validatedData.data as BuildState

  if (buildState.createdById !== session.user.id) {
    return {
      errors: ['You must be logged in as the build creator to edit a build.'],
    }
  }

  if (!buildState.buildId) {
    return {
      errors: ['No buildId provided!'],
    }
  }

  const updatedBuildState = buildStateToBuild(buildState)

  try {
    const updatedBuild = await prisma.build.update({
      where: {
        id: buildState.buildId,
        createdBy: {
          id: session.user.id,
        },
      },
      data: updatedBuildState,
    })

    if (!updatedBuild) {
      return {
        errors: ['Error updating build.'],
      }
    }

    // Refresh the cache for the route
    // Refresh the cache for the route
    for (const path of revalidatePaths) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildState.buildId}`)

    return {
      message: 'Build successfully updated!',
      buildId: updatedBuild.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Unknown error updating build.'],
    }
  }
}

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
    }

    // Refresh the cache for the routes
    for (const path of revalidatePaths) {
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
    for (const path of revalidatePaths) {
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

export async function addVoteForBuild(
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
    // Check if user has a vote for this build already
    const isVoteRegistered = await prisma.buildVoteCounts.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    if (isVoteRegistered) {
      return {
        message: 'Vote saved!',
      }
    }

    await prisma.buildVoteCounts.create({
      data: {
        buildId,
        userId: session.user.id,
      },
    })

    // Get the new total upvotes
    const totalUpvotes = await prisma.buildVoteCounts.count({
      where: {
        buildId,
      },
    })

    // Refresh the cache for the routes
    for (const path of revalidatePaths) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildId}`)

    return {
      message: 'Vote saved!',
      totalUpvotes: Number(totalUpvotes),
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in saving vote!'],
    }
  }
}

export async function removeVoteForBuild(
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
        message: 'You cannot remove your vote from your own build!',
      }
    }

    // Check if user has a vote for this build already
    const isVoteRegistered = await prisma.buildVoteCounts.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    if (!isVoteRegistered) {
      return {
        message: 'Vote removed!',
      }
    }

    await prisma.buildVoteCounts.delete({
      where: {
        id: isVoteRegistered.id,
      },
    })

    // Get the new total upvotes
    const totalUpvotes = await prisma.buildVoteCounts.count({
      where: {
        buildId,
      },
    })

    // Refresh the cache for the routes
    for (const path of revalidatePaths) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildId}`)

    return {
      message: 'Vote removed!',
      totalUpvotes: Number(totalUpvotes),
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in saving vote!'],
    }
  }
}

export async function getBuild(
  buildId: string,
): Promise<ErrorResponse | { message: string; build: ExtendedBuild }> {
  if (!buildId) {
    console.error('No buildId provided!')
    return { errors: ['No buildId provided!'] }
  }

  const session = await getServerSession()

  const build = await prisma?.build.findUnique({
    where: {
      id: buildId,
    },
    include: {
      createdBy: true,
      BuildVotes: true,
    },
  })

  if (!build) {
    return { errors: ['Build not found!'] }
  }

  const returnedBuild: ExtendedBuild = {
    id: build.id,
    name: build.name,
    description: build.description ?? '',
    isMember: false,
    isFeaturedBuild: build.isFeaturedBuild,
    isPublic: build.isPublic,
    createdAt: build.createdAt,
    createdById: build.createdById,
    videoUrl: build.videoUrl ?? '',
    helm: build.helm,
    torso: build.torso,
    gloves: build.gloves,
    legs: build.legs,
    amulet: build.amulet,
    ring: build.ring,
    relic: build.relic,
    relicfragment: build.relicfragment,
    archtype: build.archtype,
    skill: build.skill,
    weapon: build.weapon,
    mod: build.mod,
    mutator: build.mutator,
    updatedAt: build.updatedAt,
    concoction: build.concoction,
    consumable: build.consumable,
    trait: build.trait,
    createdByDisplayName:
      build.createdBy.displayName ||
      build.createdBy.name ||
      DEFAULT_DISPLAY_NAME,
    upvoted: false,
    totalUpvotes: build.BuildVotes.length,
    reported: false,
  }

  const voteResult = await prisma.buildVoteCounts.findFirst({
    where: {
      buildId,
      userId: session?.user?.id,
    },
  })
  returnedBuild.upvoted = Boolean(voteResult)

  const buildReported = await prisma.buildReports.findFirst({
    where: {
      buildId,
      userId: session?.user?.id,
    },
  })
  returnedBuild.reported = Boolean(buildReported)

  const isPaidUser = await prisma.paidUsers.findFirst({
    where: {
      userId: build.createdById,
    },
  })
  returnedBuild.isMember = Boolean(isPaidUser)

  if (returnedBuild.isPublic) {
    return { message: 'Successfully fetched build', build: returnedBuild }
  }

  if (!session || !session.user || build.createdBy.id !== session.user.id) {
    console.error(
      'You must be logged in as the build creator to view a private build.',
    )
    return {
      errors: [
        'You must be logged in as the build creator to view a private build.',
      ],
    }
  }

  return { message: 'Successfully fetched build!', build: returnedBuild }
}
