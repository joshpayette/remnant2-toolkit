'use client';

import { Skeleton } from '@repo/ui';
import { useMemo } from 'react';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_components/filters/build-filters';
import { BuildSecondaryFilters } from '@/app/(builds)/_components/filters/secondary-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
const ITEMS_PER_PAGE = 16;

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>;
  profileId: string;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function FavoritedBuildsList({
  buildFiltersOverrides,
  profileId,
  onToggleLoadingResults,
}: Props) {
  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS;
  }, [buildFiltersOverrides]);

  const {
    buildList,
    buildListFilters,
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    isLoading,
    orderBy,
    handleOrderByChange,
    pageNumbers,
    timeRange,
    handleTimeRangeChange,
    totalBuildCount,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = useBuildListState({
    apiEndpoint: '/api/profile/get-favorited-builds',
    defaultFilters,
    itemsPerPage: ITEMS_PER_PAGE,
    profileProps: {
      featuredBuildsOnly: false,
      isEditable: false,
      profileId,
    },
    onToggleLoadingResults,
  });

  if (!buildListFilters) {
    return <Skeleton className="min-h-[1100px] w-full" />;
  }

  return (
    <>
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        label="Favorited Builds"
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <BuildSecondaryFilters
            isLoading={isLoading}
            orderBy={orderBy}
            onOrderByChange={(value) => {
              handleOrderByChange(value);
            }}
            timeRange={timeRange}
            onTimeRangeChange={(value) => {
              handleTimeRangeChange(value);
            }}
          />
        }
      >
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {buildList.map((build) => (
            <div key={build.id} className="w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                footerActions={undefined}
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </>
  );
}
