import { getArrayOfLength } from '@repo/utils';
import { useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

interface State {
  builds: DBBuild[];
  isLoading: boolean;
  totalItems: number;
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
    isVideoApproved: false,
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
    variantIndex: 0,
    upvoted: false,
    totalUpvotes: 0,
    viewCount: 0,
    validatedViewCount: 0,
    duplicateCount: 0,
    buildItems: [],
    percentageOwned: 0,
  })),
  isLoading: false,
  totalItems: 0,
};

export function useBuildListState() {
  const [buildListState, setBuildListState] = useState<State>(DEFAULT_STATE);

  return {
    buildListState,
    setBuildListState,
  };
}
