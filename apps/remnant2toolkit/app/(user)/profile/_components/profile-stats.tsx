'use server';

import { prisma } from '@repo/db';
import {
  CheckIcon,
  CommunityBuildsIcon,
  FavoriteIcon,
  getImageUrl,
  LoadoutIcon,
  MyBuildsIcon,
  QuizIcon,
} from '@repo/ui';

import { FeaturedBuildBadge } from '@/app/(builds)/builder/_components/featured-build-badge';
import {
  ALL_TRACKABLE_ITEMS,
  TOTAL_TRACKABLE_ITEM_COUNT,
} from '@/app/(items)/item-tracker/_constants/trackable-items';
import { DiscoveredItemsStatBox } from '@/app/(user)/profile/_components/discovered-items-stat-box';
import { StatBox } from '@/app/(user)/profile/_components/stat-box';

interface Props {
  isEditable: boolean;
  profileId: string;
}

export async function ProfileStats({ isEditable, profileId }: Props) {
  // Fetch secondaryBuildId values first
  const secondaryBuildIds = await prisma.buildVariant
    .findMany({
      select: {
        secondaryBuildId: true,
      },
    })
    .then((variants) => variants.map((variant) => variant.secondaryBuildId));

  // get a count of all the builds created by the current user
  const [
    buildsCreated,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    userProfile,
    discoveredItemIds,
  ] = await Promise.all([
    prisma.build.count({
      where: {
        createdById: profileId,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.buildVoteCounts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
          id: {
            notIn: secondaryBuildIds,
          },
        },
      },
    }),
    prisma.userLoadouts.count({
      where: {
        build: {
          createdById: profileId,
          isPublic: true,
          id: {
            notIn: secondaryBuildIds,
          },
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isFeaturedBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isGimmickBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isBeginnerBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.build.count({
      where: {
        createdById: profileId,
        isBaseGameBuild: true,
        isPublic: true,
        id: {
          notIn: secondaryBuildIds,
        },
      },
    }),
    prisma.userProfile.findFirst({
      where: { userId: profileId },
      select: { topItemQuizScore: true },
    }),
    prisma.userItems.findMany({
      where: { userId: profileId },
      select: { itemId: true },
    }),
  ]);

  // const discoveredItemIdCount = Array.from(new Set(discoveredItemIds)).filter(
  //   (item) => ALL_TRACKABLE_ITEMS.some((i) => i.id === item.itemId),
  // )

  const uniqueItemIds = Array.from(
    new Set(discoveredItemIds.map((item) => item.itemId)),
  );
  const discoveredItemIdCount = uniqueItemIds.filter((itemId) =>
    ALL_TRACKABLE_ITEMS.some((i) => i.id === itemId),
  ).length;

  return (
    <div className="grid grid-cols-2 bg-gray-700/10 sm:grid-cols-4 lg:grid-cols-5">
      <StatBox
        stat={{ name: 'Community Builds', value: buildsCreated }}
        index={0}
        icon={
          <CommunityBuildsIcon className="text-primary-500 h-[36px] w-[36px]" />
        }
      />
      <StatBox
        stat={{ name: 'Favorites Earned', value: favoritesEarned }}
        index={1}
        icon={<FavoriteIcon className="h-[36px] w-[36px] text-yellow-500" />}
      />
      <StatBox
        stat={{ name: `Users' Loadouts`, value: loadoutCounts }}
        index={2}
        icon={<LoadoutIcon className="text-secondary-500 h-[36px] w-[36px]" />}
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
        index={3}
        isEditable={isEditable}
        icon={<CheckIcon className="h-[36px] w-[36px] text-green-500" />}
      />
      <StatBox
        stat={{
          name: 'Item Quiz Score',
          value: userProfile?.topItemQuizScore ?? 0,
        }}
        index={4}
        icon={<QuizIcon className="text-primary-500 h-[36px] w-[36px]" />}
      />
      <StatBox
        stat={{ name: 'Featured Builds', value: featuredBuilds }}
        index={5}
        icon={
          <img
            src={getImageUrl(`/badges/featured-build-badge.png`)}
            className="h-[36px] w-[36px]"
            alt="Badge denoting the build is a featured build."
          />
        }
      />
      <StatBox
        stat={{ name: 'Gimmick Builds', value: gimmickBuilds }}
        index={6}
        icon={
          <img
            src={getImageUrl(`/badges/gimmick-build-badge.png`)}
            className="h-[36px] w-[36px]"
            alt="Badge denoting the build is a gimmick build."
          />
        }
      />
      <StatBox
        stat={{ name: 'Beginner Builds', value: beginnerBuilds }}
        index={7}
        icon={
          <img
            src={getImageUrl(`/badges/beginner-build-badge.png`)}
            className="h-[36px] w-[36px]"
            alt="Badge denoting the build is a beginner build."
          />
        }
      />
      <StatBox
        stat={{ name: 'Base Game Builds', value: baseGameBuilds }}
        index={8}
        icon={
          <img
            src={getImageUrl(`/badges/base-game-build-badge.png`)}
            className="h-[36px] w-[36px]"
            alt="Badge denoting the build is a base game build."
          />
        }
      />
    </div>
  );
}
