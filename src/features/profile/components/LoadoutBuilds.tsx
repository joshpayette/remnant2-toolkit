'use server'

import { getServerSession } from '@/features/auth/lib'
import { BuildCard } from '@/features/build/components/BuildCard'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'

import { DEFAULT_DISPLAY_NAME } from '../constants'
import { LoadoutBuildCard } from './LoadoutBuildCard'
import { RemoveFromLoadoutButton } from './RemoveFromLoadoutButton'

export async function LoadoutBuilds() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return null
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

  const userLoadoutBuilds: Array<DBBuild & { slot: number }> =
    userLoadoutBuildsResponse.map((loadout) => ({
      id: loadout.build.id,
      name: loadout.build.name,
      description: loadout.build.description,
      isPublic: loadout.build.isPublic,
      isFeaturedBuild: loadout.build.isFeaturedBuild,
      isPatchAffected: loadout.build.isPatchAffected,
      isMember: false,
      thumbnailUrl: loadout.build.thumbnailUrl,
      videoUrl: loadout.build.videoUrl,
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
    }))

  return (
    <>
      {getArrayOfLength(8).map((_, index) => {
        const userLoadoutBuild = userLoadoutBuilds.find(
          (build) => build.slot - 1 === index,
        )

        if (!userLoadoutBuild) {
          return <EmptyBuildCard key={index} />
        }

        return (
          <LoadoutBuildCard
            key={userLoadoutBuild.id}
            build={userLoadoutBuild}
          />
        )
      })}
    </>
  )
}

function EmptyBuildCard() {
  return (
    <div className="col-span-1 flex h-full min-h-[350px] flex-col items-center rounded-lg border-4 border-dashed border-gray-500 bg-black text-center shadow">
      <p className="mt-8 text-2xl font-semibold text-gray-700">
        You have no loadout in this slot. Go to your favorite builds to add one!
      </p>
    </div>
  )
}
