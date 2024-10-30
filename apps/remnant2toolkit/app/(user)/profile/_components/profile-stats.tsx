'use server';

import {
  CheckIcon,
  CommunityBuildsIcon,
  EyeIcon,
  FavoriteIcon,
  getImageUrl,
  LoadoutIcon,
  QuizIcon,
} from '@repo/ui';

import {
  ALL_TRACKABLE_ITEMS,
  TOTAL_TRACKABLE_ITEM_COUNT,
} from '@/app/(items)/item-tracker/_constants/trackable-items';
import { DiscoveredItemsStatBox } from '@/app/(user)/profile/_components/discovered-items-stat-box';
import { StatBox } from '@/app/(user)/profile/_components/stat-box';
import { getProfileStats } from '@/app/(user)/profile/_lib/get-profile-stats';

interface Props {
  isEditable: boolean;
  profileId: string;
}

export async function ProfileStats({ isEditable, profileId }: Props) {
  const {
    communityBuilds,
    favoritesEarned,
    loadoutCounts,
    featuredBuilds,
    gimmickBuilds,
    beginnerBuilds,
    baseGameBuilds,
    itemQuizScore,
    discoveredItemIds,
    totalBuildsViewCount,
  } = await getProfileStats({ profileId });

  const uniqueItemIds = Array.from(
    new Set(discoveredItemIds.map((item) => item.itemId)),
  );
  const discoveredItemIdCount = uniqueItemIds.filter((itemId) =>
    ALL_TRACKABLE_ITEMS.some((i) => i.id === itemId),
  ).length;

  return (
    <div className="grid grid-cols-2 bg-gray-700/10 sm:grid-cols-3 md:grid-cols-5">
      <StatBox
        stat={{ name: 'Community Builds', value: communityBuilds }}
        icon={
          <CommunityBuildsIcon className="text-primary-500 h-[36px] w-[36px]" />
        }
      />
      <StatBox
        stat={{ name: 'Favorites Earned', value: favoritesEarned }}
        icon={<FavoriteIcon className="text-accent1-500 h-[36px] w-[36px]" />}
      />
      <StatBox
        stat={{ name: `Users' Loadouts`, value: loadoutCounts }}
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
        isEditable={isEditable}
        icon={<CheckIcon className="h-[36px] w-[36px] text-green-500" />}
      />
      <StatBox
        stat={{
          name: 'Item Quiz Score',
          value:
            typeof itemQuizScore === 'number'
              ? 0
              : itemQuizScore?.topItemQuizScore ?? 0,
        }}
        icon={<QuizIcon className="text-primary-500 h-[36px] w-[36px]" />}
      />
      <StatBox
        stat={{ name: 'Featured Builds', value: featuredBuilds }}
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
        icon={
          <img
            src={getImageUrl(`/badges/base-game-build-badge.png`)}
            className="h-[36px] w-[36px]"
            alt="Badge denoting the build is a base game build."
          />
        }
      />
      <StatBox
        stat={{
          name: 'Total Build Views',
          value:
            typeof totalBuildsViewCount === 'number'
              ? 0
              : totalBuildsViewCount._sum?.viewCount ?? 0,
        }}
        icon={<EyeIcon className="text-accent1-500 h-[36px] w-[36px]" />}
      />
    </div>
  );
}
