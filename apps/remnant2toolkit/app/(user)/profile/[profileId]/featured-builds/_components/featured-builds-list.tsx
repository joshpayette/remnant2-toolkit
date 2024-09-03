'use client';

import { Skeleton } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_components/filters/build-filters';
import { BuildSecondaryFilters } from '@/app/(builds)/_components/filters/secondary-filters';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>;
  isEditable: boolean;
  profileId: string;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function FeaturedBuildsList({
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
      featuredBuildsOnly: true,
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
        label="Featured builds"
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
            onTimeRangeChange={handleTimeRangeChange}
          />
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
                showBuildVisibility={isEditable}
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
