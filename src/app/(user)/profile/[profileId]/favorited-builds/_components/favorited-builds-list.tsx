'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { Pagination } from '@/app/_components/pagination';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { BuildSecondaryFilters } from '@/app/(builds)/_features/filters/_components/build-secondary-filters';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { getFavoritedBuilds } from '@/app/(user)/profile/[profileId]/favorited-builds/_actions/get-favorited-builds';

interface Props {
  buildFiltersOverrides?: Partial<BuildFilterFields>;
  onFiltersChange: () => void;
}

export function FavoritedBuildsList({
  buildFiltersOverrides,
  onFiltersChange,
}: Props) {
  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FIELDS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FIELDS;
  }, [buildFiltersOverrides]);

  const searchParams = useSearchParams();
  const buildFilterFields = parseUrlParams({ searchParams, defaultFilters });

  const { buildListState, setBuildListState } = useBuildListState();
  const { builds, isLoading, totalItems } = buildListState;

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
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    totalItems,
  });

  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getFavoritedBuilds({
        buildFilterFields,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
        orderBy,
        pageNumber: currentPage,
        timeRange,
      });
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.builds,
        totalItems: response.totalCount,
      }));
    };
    getItemsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BuildList
        isLoading={isLoading}
        itemsOnThisPage={itemsOnThisPage}
        label="Favorited Builds"
        pagination={
          <Pagination
            isLoading={isLoading}
            currentPage={currentPage}
            firstVisibleItemNumber={firstVisibleItemNumber}
            lastVisibleItemNumber={lastVisibleItemNumber}
            isNextPageDisabled={isNextPageDisabled}
            pageNumbers={pageNumbers}
            totalItems={totalItems}
            onPreviousPage={() => {
              handlePreviousPageClick();
              onFiltersChange();
            }}
            onNextPage={() => {
              handleNextPageClick();
              onFiltersChange();
            }}
            onSpecificPage={(pageNumber: number) => {
              handleSpecificPageClick(pageNumber);
              onFiltersChange();
            }}
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
              onFiltersChange();
            }}
            timeRange={timeRange}
            onTimeRangeChange={(value) => {
              handleTimeRangeChange(value);
              setBuildListState((prevState) => ({
                ...prevState,
                isLoading: true,
              }));
              onFiltersChange();
            }}
          />
        }
      >
        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
            <BuildCard
              build={build}
              isLoading={isLoading}
              footerActions={undefined}
            />
          </div>
        ))}
      </BuildList>
    </>
  );
}
