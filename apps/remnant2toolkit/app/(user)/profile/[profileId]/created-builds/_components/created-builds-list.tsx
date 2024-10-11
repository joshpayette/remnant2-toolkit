'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { Pagination } from '@/app/_components/pagination';
import { usePagination } from '@/app/_hooks/use-pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { DEFAULT_BUILD_FILTERS } from '@/app/(builds)/_features/filters/build-filters';
import { parseSearchParams } from '@/app/(builds)/_features/filters/parse-search-params';
import { BuildVisibilityFilter } from '@/app/(builds)/_features/filters/secondary-filters/build-visibility-filter';
import { useBuildVisibilityFilter } from '@/app/(builds)/_features/filters/secondary-filters/build-visibility-filter/use-build-visibility-filter';
import { OrderByFilter } from '@/app/(builds)/_features/filters/secondary-filters/order-by-filter';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_features/filters/types';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';
import { getUserCreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_actions/get-user-created-builds';

interface Props {
  isEditable: boolean;
  profileId: string;
  buildFiltersOverrides?: Partial<BuildListFilters>;
  onFiltersChange: () => void;
}

export function CreatedBuildsList({
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

  const itemsOnThisPage = builds.length;
  const itemsPerPage = isEditable ? 15 : 16;

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');
  const { buildVisibility, handleBuildVisibilityChange } =
    useBuildVisibilityFilter('all');

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
    const getItemsAsync = async () => {
      const response = await getUserCreatedBuilds({
        buildListFilters,
        featuredBuildsOnly: false,
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        profileId,
        buildVisibility,
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
        itemsOnThisPage={itemsOnThisPage}
        label="Created Builds"
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
          <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
            <div className="w-full max-w-[250px]">
              <TimeRangeFilter
                isLoading={isLoading}
                value={timeRange}
                onChange={(value) => {
                  handleTimeRangeChange(value);
                  setBuildListState((prevState) => ({
                    ...prevState,
                    isLoading: true,
                  }));
                }}
              />
            </div>
            <div className="w-full max-w-[250px]">
              <OrderByFilter
                isLoading={isLoading}
                value={orderBy}
                onChange={(value) => {
                  handleOrderByChange(value);
                  setBuildListState((prevState) => ({
                    ...prevState,
                    isLoading: true,
                  }));
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
        {isEditable ? <CreateBuildCard /> : null}

        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
            <BuildCard
              build={build}
              isLoading={isLoading}
              showBuildVisibility={true}
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
