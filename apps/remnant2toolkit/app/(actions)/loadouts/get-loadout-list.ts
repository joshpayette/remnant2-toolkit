'use server'

import { prisma } from '@repo/db'

import { getIsLoadoutPublic } from '@/app/(actions)/loadouts/get-is-loadout-public'
import { DEFAULT_DISPLAY_NAME } from '@/app/(constants)/profile'
import { getServerSession } from '@/app/(features)/auth'
import { DBBuild } from '@/app/(types)/builds'

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

  const userLoadoutBuilds = userLoadoutBuildsResponse.map((loadout) =>
    loadout.build.isPublic || loadout.userId === session?.user?.id
      ? {
          id: loadout.build.id,
          name: loadout.build.name,
          description: loadout.build.description,
          isPublic: loadout.build.isPublic,
          isFeaturedBuild: loadout.build.isFeaturedBuild,
          dateFeatured: loadout.build.dateFeatured,
          isPatchAffected: loadout.build.isPatchAffected,
          isBeginnerBuild: loadout.build.isBeginnerBuild,
          isMember: false,
          isModeratorApproved: loadout.build.isModeratorApproved,
          isModeratorLocked: loadout.build.isModeratorLocked,
          thumbnailUrl: loadout.build.thumbnailUrl,
          videoUrl: loadout.build.videoUrl,
          buildLinkUpdatedAt: loadout.build.buildLinkUpdatedAt,
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
        }
      : {
          id: loadout.build.id,
          name: 'Private Build',
          description: 'This build is marked private by the build creator.',
          isPublic: loadout.build.isPublic,
          isFeaturedBuild: false,
          dateFeatured: loadout.build.dateFeatured,
          isPatchAffected: loadout.build.isPatchAffected,
          isBeginnerBuild: false,
          isMember: false,
          isModeratorApproved: loadout.build.isModeratorApproved,
          isModeratorLocked: loadout.build.isModeratorLocked,
          thumbnailUrl: '',
          videoUrl: '',
          buildLinkUpdatedAt: loadout.build.buildLinkUpdatedAt,
          buildTags: [],
          buildLink: '',
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
          totalUpvotes: 0,
          buildItems: [],
          slot: loadout.slot,
        },
  ) satisfies Array<DBBuild & { slot: number }>

  return userLoadoutBuilds
}
