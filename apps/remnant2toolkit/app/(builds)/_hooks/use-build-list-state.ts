import { getArrayOfLength } from '@repo/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { usePagination } from '@/app/_hooks/use-pagination';
import { useBuildVisibilityFilter } from '@/app/(builds)/_components/filters/secondary-filters/build-visibility-filter/use-build-visibility-filter';
import { useOrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { parseUrlFilters } from '@/app/(builds)/_components/filters/utils';
import {
  type BuildListRequest,
  type ProfileBuildListRequest,
} from '@/app/(builds)/_types/build-list-request';
import { type BuildListResponse } from '@/app/(builds)/_types/build-list-response';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

const DEFAULT_BUILD_LIST: DBBuild[] = getArrayOfLength(
  DEFAULT_ITEMS_PER_PAGE,
).map((item) => ({
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
}));

export function useBuildListState({
  apiEndpoint,
  defaultFilters,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  onToggleLoadingResults,
  profileProps,
}: {
  apiEndpoint: string;
  defaultFilters?: BuildListFilters;
  itemsPerPage?: number;
  profileProps?: {
    featuredBuildsOnly: boolean;
    isEditable: boolean;
    profileId: string;
  };
  onToggleLoadingResults: (isLoading: boolean) => void;
}) {
  const buildList = useRef(DEFAULT_BUILD_LIST);
  const totalBuildCount = useRef(0);

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');
  const { buildVisibility, handleBuildVisibilityChange } =
    useBuildVisibilityFilter('all');

  const searchParams = useSearchParams();
  const buildListFilters = parseUrlFilters(searchParams, defaultFilters);

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: totalBuildCount.current,
    itemsPerPage,
  });

  const {
    data,
    error: _error,
    isLoading,
  } = useSWR<BuildListResponse>(
    [
      apiEndpoint,
      {
        buildVisibility: buildVisibility,
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        buildListFilters,
        profileId: profileProps?.profileId,
        featuredBuildsOnly: profileProps?.featuredBuildsOnly,
      } as const satisfies BuildListRequest | ProfileBuildListRequest,
    ],
    ([url, req]) =>
      fetch(url, { method: 'POST', body: JSON.stringify(req) }).then((r) =>
        r.json(),
      ),
  );

  if (data) {
    buildList.current = data.builds;
    totalBuildCount.current = data.totalBuildCount;
  }

  useEffect(() => {
    onToggleLoadingResults(isLoading);
  }, [isLoading, onToggleLoadingResults]);

  return {
    buildList: buildList.current,
    buildListFilters,
    buildVisibility,
    handleBuildVisibilityChange,
    totalBuildCount: totalBuildCount.current,
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    isLoading,
    orderBy,
    handleOrderByChange,
    timeRange,
    handleTimeRangeChange,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handlePreviousPageClick,
    handleNextPageClick,
  };
}
