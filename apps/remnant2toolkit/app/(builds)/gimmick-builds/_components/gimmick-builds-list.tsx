'use client';

import { BaseLink, EyeIcon, Skeleton } from '@repo/ui';

import { Tooltip } from '@/app/_components/tooltip';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { BuildSecondaryFilters } from '@/app/(builds)/_components/filters/secondary-filters';
import { useBuildListState } from '@/app/(builds)/_hooks/use-build-list-state';

interface Props {
  itemsPerPage?: number;
  onToggleLoadingResults: (isLoading: boolean) => void;
}

export function GimmickBuildsList({
  itemsPerPage = 8,
  onToggleLoadingResults,
}: Props) {
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
    apiEndpoint: '/api/builds/get-gimmick-builds',
    itemsPerPage,
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
          className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {buildList.map((build) => (
            <div key={build.id} className="w-full">
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
        </ul>
      </BuildList>
    </>
  );
}
