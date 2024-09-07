'use server';

import { prisma } from '@repo/db';

import {
  ALL_TRACKABLE_ITEMS,
  TOTAL_TRACKABLE_ITEM_COUNT,
} from '@/app/(items)/item-tracker/_constants';
import { DiscoveredItemsStatBox } from '@/app/(user)/profile/_components/discovered-items-stat-box';
import { StatBox } from '@/app/(user)/profile/_components/stat-box';

interface Props {
  isEditable: boolean;
  profileId: string;
}

export async function ProfileStats({ isEditable, profileId }: Props) {
  // get a count of all the builds created by the current user
  const [
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    userProfile,
    discoveredItemIds,
    totalSubscribers,
  ] = await Promise.all([
    await prisma.build.count({
      where: { createdById: profileId, isPublic: true },
    }),
    await prisma.buildVoteCounts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
        },
      },
    }),
    await prisma.userLoadouts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
        },
      },
    }),
    await prisma.build.count({
      where: {
        createdById: profileId,
        isFeaturedBuild: true,
        isPublic: true,
      },
    }),
    await prisma.userProfile.findFirst({
      where: { userId: profileId },
      select: { topItemQuizScore: true },
    }),
    await prisma.userItems.findMany({
      where: { userId: profileId },
      select: { itemId: true },
    }),
    await prisma.userSubscription.count({
      where: { subscribedToId: profileId },
    }),
  ]);

  const uniqueItemIds = Array.from(
    new Set(discoveredItemIds.map((item) => item.itemId)),
  );
  const discoveredItemIdCount = uniqueItemIds.filter((itemId) =>
    ALL_TRACKABLE_ITEMS.some((i) => i.id === itemId),
  ).length;

  return (
    <div className="grid grid-cols-2 bg-gray-700/10 sm:grid-cols-3 lg:grid-cols-7">
      <StatBox
        stat={{ name: 'Builds Created', value: buildsCreated }}
        index={0}
      />
      <StatBox
        stat={{ name: 'Favorites Earned', value: favoritesEarned }}
        index={1}
      />
      <StatBox
        stat={{ name: 'Subscribers', value: totalSubscribers }}
        index={2}
      />
      <StatBox
        stat={{ name: 'Loadout Count', value: loadoutCounts }}
        index={3}
      />
      <StatBox
        stat={{ name: 'Featured Builds', value: featuredBuilds }}
        index={4}
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
        index={5}
        isEditable={isEditable}
      />
      <StatBox
        stat={{
          name: 'Item Quiz Score',
          value: userProfile?.topItemQuizScore ?? 0,
        }}
        index={6}
      />
    </div>
  );
}
