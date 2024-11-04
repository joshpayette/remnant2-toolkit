'use client';

import { BaseLink, EyeIcon, Tooltip } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Pagination } from '@/app/_components/pagination';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { BuildSecondaryFilters } from '@/app/(builds)/_features/filters/_components/build-secondary-filters';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { getGimmickBuilds } from '@/app/(builds)/gimmick-builds/_actions/get-gimmick-builds';

interface Props {
  itemsPerPage?: number;
  onFiltersChange: () => void;
}

export function GimmickBuildsList({
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  onFiltersChange,
}: Props) {
  const searchParams = useSearchParams();
  const buildFilterFields = parseUrlParams({ searchParams });

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
    itemsPerPage,
    totalItems,
  });

  // Whenever loading is set to true, we should update the build items
  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getGimmickBuilds({
        itemsPerPage,
        pageNumber: currentPage,
        timeRange,
        orderBy,
        buildFilterFields,
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
        ))}
      </BuildList>
    </>
  );
}
