import { getArrayOfLength } from '@repo/utils';
import { useState } from 'react';

import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/(utils)/pagination/constants';

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
  isLoading: true,
};

export function useBuildListState() {
  const [buildListState, setBuildListState] = useState<State>(DEFAULT_STATE);
  return { buildListState, setBuildListState };
}
