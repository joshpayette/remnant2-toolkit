'use client';

import { Skeleton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_components/filters/build-filters';
import { BuildVisibilityFilter } from '@/app/(builds)/_components/filters/secondary-filters/build-visibility-filter';
import { OrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>;
  isEditable: boolean;
  profileId: string;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function CreatedBuildsList({
  buildFiltersOverrides,
  isEditable,
  profileId,
  onToggleLoadingResults,
}: Props) {
  const router = useRouter();

  const itemsPerPage = isEditable ? 15 : 16;

  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS;
  }, [buildFiltersOverrides]);

  const {
    buildList,
    buildListFilters,
    buildVisibility,
    handleBuildVisibilityChange,
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
    apiEndpoint: '/api/profile/get-created-builds',
    defaultFilters,
    itemsPerPage,
    profileProps: {
      featuredBuildsOnly: false,
      isEditable,
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
        label="Created Builds"
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
            <div className="w-full max-w-[250px]">
              <TimeRangeFilter
                isLoading={isLoading}
                value={timeRange}
                onChange={(value) => {
                  handleTimeRangeChange(value);
                }}
              />
            </div>
            <div className="w-full max-w-[250px]">
              <OrderByFilter
                isLoading={isLoading}
                value={orderBy}
                onChange={(value) => {
                  handleOrderByChange(value);
                }}
              />
            </div>
            {isEditable ? (
              <div className="w-full max-w-[250px]">
                <BuildVisibilityFilter
                  value={buildVisibility}
                  onChange={handleBuildVisibilityChange}
                  isLoading={isLoading}
                />
              </div>
            ) : null}
          </div>
        }
      >
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {isEditable ? <CreateBuildCard /> : null}

          {buildList.map((build) => (
            <div key={build.id} className="w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                showBuildVisibility={true}
                footerActions={
                  isEditable ? (
                    <CreatedBuildCardActions
                      build={build}
                      onDelete={() => router.refresh()}
                    />
                  ) : undefined
                }
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </>
  );
}
