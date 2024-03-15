'use server'

import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'

import { DEFAULT_DISPLAY_NAME } from '../constants'

export async function getLoadoutList() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return []
  }

  const userLoadoutBuildsResponse = await prisma.userLoadouts.findMany({
    where: {
      userId: session.user.id,
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
