'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { Pagination } from '@/app/_components/pagination';
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_features/filters/build-filters';
import { parseSearchParams } from '@/app/(builds)/_features/filters/parse-search-params';
import { BuildSecondaryFilters } from '@/app/(builds)/_features/filters/secondary-filters';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_features/filters/types';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';
import { getUserCreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_actions/get-user-created-builds';

interface Props {
  buildFiltersOverrides?: Partial<BuildListFilters>;
  isEditable: boolean;
  profileId: string;
  onFiltersChange: () => void;
}

export function FeaturedBuildsList({
  buildFiltersOverrides,
  isEditable,
  profileId,
  onFiltersChange,
}: Props) {
  const defaultFilters = useMemo(() => {
    return buildFiltersOverrides
      ? { ...DEFAULT_BUILD_FILTERS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FILTERS;
  }, [buildFiltersOverrides]);

  const searchParams = useSearchParams();
  const buildListFilters = parseSearchParams(searchParams, defaultFilters);

  const { buildListState, setBuildListState } = useBuildListState();
  const { builds, isLoading } = buildListState;

  const itemsPerPage = isEditable
    ? DEFAULT_ITEMS_PER_PAGE - 1
    : DEFAULT_ITEMS_PER_PAGE;

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
    itemsOnThisPage: builds.length,
  });

  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getUserCreatedBuilds({
        buildListFilters,
        featuredBuildsOnly: true,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        profileId,
        buildVisibility: 'all',
      });
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.builds,
      }));
    };
    getItemsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BuildList
        isLoading={isLoading}
        label="Featured builds"
        itemsOnThisPage={builds.length}
        pagination={
          <Pagination
            isLoading={isLoading}
            currentPage={currentPage}
            firstVisibleItemNumber={firstVisibleItemNumber}
            lastVisibleItemNumber={lastVisibleItemNumber}
            isNextPageDisabled={isNextPageDisabled}
            pageNumbers={pageNumbers}
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
            onTimeRangeChange={() => {
              handleTimeRangeChange(timeRange);
              setBuildListState((prevState) => ({
                ...prevState,
                isLoading: true,
              }));
              onFiltersChange();
            }}
          />
        }
      >
        {isEditable ? <CreateBuildCard /> : null}

        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
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
                      }));
                    }}
                  />
                ) : undefined
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  );
}
