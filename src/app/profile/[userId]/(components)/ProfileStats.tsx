'use server'

import { DiscoveredItemsStatBox } from '@/app/profile/[userId]/(components)/DiscoveredItemsStatBox'
import { StatBox } from '@/app/profile/[userId]/(components)/StatBox'
import { TOTAL_TRACKABLE_ITEM_COUNT } from '@/app/tracker/constants'
import { prisma } from '@/features/db'

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
      select: { totalDiscoveredItems: true, topItemQuizScore: true },
    }),
  ])

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
          value: userProfile?.totalDiscoveredItems ?? 0,
          unit: `/ ${TOTAL_TRACKABLE_ITEM_COUNT}`,
        }}
        index={4}
        isEditable={isEditable}
        userId={userId}
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
