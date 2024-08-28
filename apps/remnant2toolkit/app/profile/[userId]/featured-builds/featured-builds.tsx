'use client';

import { Skeleton } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { BuildList } from '@/app/(components)/build-list';
import { DEFAULT_BUILD_FILTERS } from '@/app/(features)/builds/filters/build-filters';
import { BuildSecondaryFilters } from '@/app/(features)/builds/filters/secondary-filters';
import { useOrderByFilter } from '@/app/(features)/builds/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(features)/builds/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { BuildListFilters } from '@/app/(features)/builds/filters/types';
import { parseUrlFilters } from '@/app/(features)/builds/filters/utils';
import { BuildCard } from '@/app/(features)/builds/components/cards/build-card';
import { CreateBuildCard } from '@/app/(features)/builds/components/cards/create-build-card';
import { useBuildListState } from '@/app/(features)/builds/utils/hooks/use-build-list-state';
import { usePagination } from '@/app/(utils)/pagination/use-pagination';
import { CreatedBuildCardActions } from '@/app/profile/[userId]/(components)/created-build-card-actions';
import { getCreatedBuilds } from '@/app/profile/[userId]/created-builds/actions/get-created-builds';

interface Props {
  isEditable: boolean;
  userId: string;
  buildFiltersOverrides?: Partial<BuildListFilters>;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function FeaturedBuilds({
  buildFiltersOverrides,
  isEditable,
  userId,
  onToggleLoadingResults,
}: Props) {
  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS;
  }, [buildFiltersOverrides]);

  const searchParams = useSearchParams();
  const [buildListFilters, setBuildListFilters] = useState(
    parseUrlFilters(searchParams, defaultFilters),
  );

  const { buildListState, setBuildListState } = useBuildListState();
  const { builds, totalBuildCount, isLoading } = buildListState;

  const itemsPerPage = isEditable ? 15 : 16;

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

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
    totalItemCount: totalBuildCount,
    itemsPerPage,
  });

  useEffect(() => {
    setBuildListFilters(parseUrlFilters(searchParams, defaultFilters));
    setBuildListState((prevState) => ({ ...prevState, isLoading: true }));
  }, [searchParams, defaultFilters, setBuildListState]);

  useEffect(() => {
    onToggleLoadingResults(isLoading);
  }, [isLoading, onToggleLoadingResults]);

  // Whenever loading is set to true, we should update the build items
  useEffect(() => {
    const getItemsAsync = async () => {
      if (!isLoading) return;
      const response = await getCreatedBuilds({
        buildListFilters,
        featuredBuildsOnly: true,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        userId,
        isEditable,
        buildVisibility: 'all',
      });
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.items,
        totalBuildCount: response.totalItemCount,
      }));
    };
    getItemsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
              setBuildListState((prevState) => ({
                ...prevState,
                isLoading: true,
              }));
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

          {builds.map((build) => (
            <div key={build.id} className="w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                showBuildVisibility={isEditable}
                footerActions={
                  isEditable ? (
                    <CreatedBuildCardActions
                      build={build}
                      onDelete={(buildId: string) => {
                        setBuildListState((prevState) => ({
                          ...prevState,
                          builds: prevState.builds.filter(
                            (b) => b.id !== buildId,
                          ),
                          totalBuildCount: prevState.totalBuildCount - 1,
                        }));
                      }}
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
