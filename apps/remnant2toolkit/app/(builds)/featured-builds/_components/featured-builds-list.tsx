'use client';

import { BaseLink, EyeIcon, Skeleton } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Pagination } from '@/app/_components/pagination';
import { Tooltip } from '@/app/_components/tooltip';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { BuildSecondaryFilters } from '@/app/(builds)/_components/filters/secondary-filters';
import { useOrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { parseUrlFilters } from '@/app/(builds)/_components/filters/utils';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { getFeaturedBuilds } from '@/app/(builds)/featured-builds/_actions/get-featured-builds';

interface Props {
  itemsPerPage?: number;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function FeaturedBuildsList({
  itemsPerPage = 8,
  onToggleLoadingResults,
}: Props) {
  const searchParams = useSearchParams();
  const [buildListFilters, setBuildListFilters] = useState(
    parseUrlFilters(searchParams),
  );

  const { buildListState, setBuildListState } = useBuildListState();
  const { builds, isLoading } = buildListState;

  const itemsOnThisPage = builds.length;

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    isNextPageDisabled,
    pageNumbers,
    handleNextPageClick,
    handlePreviousPageClick,
    handleSpecificPageClick,
  } = usePagination({
    itemsPerPage,
    itemsOnThisPage,
  });

  useEffect(() => {
    setBuildListFilters(parseUrlFilters(searchParams));
    setBuildListState((prevState) => ({ ...prevState, isLoading: true }));
  }, [searchParams, setBuildListState]);

  useEffect(() => {
    onToggleLoadingResults(isLoading);
  }, [isLoading, onToggleLoadingResults]);

  // Whenever loading is set to true, we should update the build items
  useEffect(() => {
    const getItemsAsync = async () => {
      if (!isLoading) return;
      const response = await getFeaturedBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        buildListFilters,
      });
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.builds,
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
        isWithQuality={buildListFilters.withQuality}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        pagination={
          <Pagination
            isLoading={isLoading}
            currentPage={currentPage}
            firstVisibleItemNumber={firstVisibleItemNumber}
            lastVisibleItemNumber={lastVisibleItemNumber}
            isNextPageDisabled={isNextPageDisabled}
            pageNumbers={pageNumbers}
            onPreviousPage={handlePreviousPageClick}
            onNextPage={handleNextPageClick}
            onSpecificPage={handleSpecificPageClick}
          />
        }
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
            onTimeRangeChange={(value) => {
              handleTimeRangeChange(value);
              setBuildListState((prevState) => ({
                ...prevState,
                isLoading: true,
              }));
            }}
          />
        }
      >
        {itemsOnThisPage > 0 ? (
          builds.map((build) => (
            <div key={`${build.id}${build.variantIndex}`} className="w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                footerActions={
                  <Tooltip content="View Build">
                    <BaseLink
                      href={`/builder/${build.id}`}
                      className="text-primary-500 hover:text-primary-300 flex flex-col items-center gap-x-3 rounded-br-lg border border-transparent px-4 py-2 text-xs font-semibold hover:underline"
                    >
                      <EyeIcon className="h-4 w-4" /> View
                    </BaseLink>
                  </Tooltip>
                }
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex w-full items-center justify-center py-8">
            <h2 className="text-primary-400 text-2xl font-bold">
              No builds found. Try adjusting your filters.
            </h2>
          </div>
        )}
      </BuildList>
    </>
  );
}
