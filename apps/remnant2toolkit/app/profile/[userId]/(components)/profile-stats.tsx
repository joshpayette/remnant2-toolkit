'use server'

import { prisma } from '@repo/db'

import { DiscoveredItemsStatBox } from '@/app/profile/[userId]/(components)/discovered-items-stat-box'
import { StatBox } from '@/app/profile/[userId]/(components)/stat-box'
import {
  ALL_TRACKABLE_ITEMS,
  TOTAL_TRACKABLE_ITEM_COUNT,
} from '@/app/tracker/constants'

interface Props {
  isEditable: boolean
  userId: string
}

export async function ProfileStats({ isEditable, userId }: Props) {
  // get a count of all the builds created by the current user
  const [
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    userProfile,
    discoveredItemIds,
  ] = await Promise.all([
    await prisma.build.count({
      where: { createdById: userId, isPublic: true },
    }),
    await prisma.buildVoteCounts.count({
      where: {
        build: {
          createdById: userId,
          isPublic: true,
        },
      },
    }),
    await prisma.userLoadouts.count({
      where: {
        build: {
          createdById: userId,
          isPublic: true,
        },
      },
    }),
    await prisma.build.count({
      where: {
        createdById: userId,
        isFeaturedBuild: true,
        isPublic: true,
      },
    }),
    await prisma.userProfile.findFirst({
      where: { userId },
      select: { topItemQuizScore: true },
    }),
    await prisma.userItems.findMany({
      where: { userId },
      select: { itemId: true },
    }),
  ])

  // const discoveredItemIdCount = Array.from(new Set(discoveredItemIds)).filter(
  //   (item) => ALL_TRACKABLE_ITEMS.some((i) => i.id === item.itemId),
  // )

  const uniqueItemIds = Array.from(
    new Set(discoveredItemIds.map((item) => item.itemId)),
  )
  const discoveredItemIdCount = uniqueItemIds.filter((itemId) =>
    ALL_TRACKABLE_ITEMS.some((i) => i.id === itemId),
  ).length

  return (
    <div className="grid grid-cols-2 bg-gray-700/10 sm:grid-cols-3 lg:grid-cols-6">
      <StatBox
        stat={{ name: 'Builds Created', value: buildsCreated }}
        index={0}
      />
      <StatBox
        stat={{ name: 'Favorites Earned', value: favoritesEarned }}
        index={1}
      />
      <StatBox
        stat={{ name: 'Loadout Count', value: loadoutCounts }}
        index={2}
      />
      <StatBox
        stat={{ name: 'Featured Builds', value: featuredBuilds }}
        index={3}
      />
      <DiscoveredItemsStatBox
        stat={{
          name: 'Items Discovered',
          value:
            discoveredItemIdCount > TOTAL_TRACKABLE_ITEM_COUNT
              ? TOTAL_TRACKABLE_ITEM_COUNT
              : discoveredItemIdCount,
          unit: `/ ${TOTAL_TRACKABLE_ITEM_COUNT}`,
        }}
        index={4}
        isEditable={isEditable}
      />
      <StatBox
        stat={{
          name: 'Item Quiz Score',
          value: userProfile?.topItemQuizScore ?? 0,
        }}
        index={5}
      />
    </div>
  )
}
