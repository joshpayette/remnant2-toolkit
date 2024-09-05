import { getArrayOfLength } from '@repo/utils';
import { useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { useOrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

interface State {
  builds: DBBuild[];
  totalBuildCount: number;
  isLoading: boolean;
}

const DEFAULT_STATE: State = {
  builds: getArrayOfLength(DEFAULT_ITEMS_PER_PAGE).map((item) => ({
    id: `placeholder-${item}`,
    name: '',
    description: '',
    imageUrl: '',
    buildUrl: '',
    isFeaturedBuild: false,
    isBeginnerBuild: false,
    isBaseGameBuild: false,
    isGimmickBuild: false,
    dateFeatured: new Date(),
    isPatchAffected: false,
    isPublic: true,
    isMember: false,
    isModeratorApproved: false,
    isModeratorLocked: false,
    thumbnailUrl: '',
    buildTags: [],
    videoUrl: '',
    buildLinkUpdatedAt: new Date(),
    buildLink: '',
    createdById: '',
    createdByName: '',
    createdByDisplayName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    reported: false,
    upvoted: false,
    totalUpvotes: 0,
    viewCount: 0,
    validatedViewCount: 0,
    duplicateCount: 0,
    buildItems: [],
  })),
  totalBuildCount: 0,
  isLoading: false,
};

export function useBuildListState() {
  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

  const [buildListState, setBuildListState] = useState<State>(DEFAULT_STATE);

  return {
    buildListState,
    setBuildListState,
    orderBy,
    handleOrderByChange,
    timeRange,
    handleTimeRangeChange,
  };
}
