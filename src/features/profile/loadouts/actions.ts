'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'

import { DEFAULT_DISPLAY_NAME } from '../constants'

export async function getLoadoutList(userId?: string) {
  const session = await getServerSession()
  if (!session?.user?.id && !userId) {
    return []
  }

  const userLoadoutBuildsResponse = await prisma.userLoadouts.findMany({
    where: {
      userId: userId || session?.user?.id,
    },
    include: {
      build: {
        include: {
          createdBy: true,
          BuildItems: true,
          BuildTags: true,
        },
      },
      user: true,
    },
    orderBy: {
      slot: 'asc',
    },
  })

  if (userId && session?.user?.id !== userId) {
    const isLoadoutPublic = await getIsLoadoutPublic(userId)
    if (!isLoadoutPublic && session?.user?.id !== userId) {
      return []
    }
  }

  const buildVotesCounts = await Promise.all(
    userLoadoutBuildsResponse.map((loadout) =>
      prisma.buildVoteCounts.count({
        where: {
          buildId: loadout.build.id,
        },
      }),
    ),
  )

  const userLoadoutBuilds = userLoadoutBuildsResponse.map((loadout) => ({
    id: loadout.build.id,
    name: loadout.build.name,
    description: loadout.build.description,
    isPublic: loadout.build.isPublic,
    isFeaturedBuild: loadout.build.isFeaturedBuild,
    dateFeatured: loadout.build.dateFeatured,
    isPatchAffected: loadout.build.isPatchAffected,
    isMember: false,
    thumbnailUrl: loadout.build.thumbnailUrl,
    videoUrl: loadout.build.videoUrl,
    buildTags: loadout.build.BuildTags,
    buildLink: loadout.build.buildLink,
    createdById: loadout.build.createdById,
    createdByName: loadout.build.createdBy.name || DEFAULT_DISPLAY_NAME,
    createdByDisplayName:
      loadout.build.createdBy.displayName ||
      loadout.build.createdBy.name ||
      DEFAULT_DISPLAY_NAME,
    createdAt: loadout.build.createdAt,
    updatedAt: loadout.build.updatedAt,
    reported: false,
    upvoted: true,
    totalUpvotes: buildVotesCounts.shift() || 0,
    buildItems: loadout.build.BuildItems,
    slot: loadout.slot,
  })) satisfies Array<DBBuild & { slot: number }>

  return userLoadoutBuilds
}

export async function getIsLoadoutPublic(userId?: string) {
  if (!userId) {
    return false
  }

  const dbResponse = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
    select: {
      isLoadoutPublic: true,
    },
  })

  return dbResponse?.isLoadoutPublic || false
}

export async function setIsLoadoutPublic(isPublic: boolean): Promise<{
  success: boolean
  message: string
}> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return { success: false, message: 'User not found.' }
  }

  try {
    await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        isLoadoutPublic: isPublic,
        bio: 'No bio is set yet.',
      },
      update: {
        isLoadoutPublic: isPublic,
      },
    })
  } catch (e) {
    return {
      success: false,
      message:
        'Failed to update loadout visibility. If this is a new user, reload the page.',
    }
  }

  // Clear the cache for the user's profile
  revalidatePath(`/profile/loadout-builds`)
  revalidatePath(`/profile/${session.user.id}`)

  return { success: true, message: 'Loadout visibility updated.' }
}
