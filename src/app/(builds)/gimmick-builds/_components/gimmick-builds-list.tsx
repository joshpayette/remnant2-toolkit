'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { LoadMoreButton } from '@/app/(builds)/_components/load-more-button';
import { BuildSecondaryFilters } from '@/app/(builds)/_features/filters/_components/build-secondary-filters';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getGimmickBuilds } from '@/app/(builds)/gimmick-builds/_actions/get-gimmick-builds';
import { BaseLink, EyeIcon, Tooltip } from '@/components/ui';

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

  const [builds, setBuilds] = useState<DBBuild[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

  // Fetch the first page on mount. A filter/sort change remounts this component
  // (via the parent's key), which resets state and re-runs this effect.
  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getGimmickBuilds({
        buildFilterFields,
        cursor: null,
        itemsPerPage,
        orderBy,
        timeRange,
      });
      setBuilds(response.builds);
      setNextCursor(response.nextCursor);
      setIsLoading(false);
    };
    getItemsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    if (nextCursor === null || isLoadingMore) return;
    setIsLoadingMore(true);
    const response = await getGimmickBuilds({
      buildFilterFields,
      cursor: nextCursor,
      itemsPerPage,
      orderBy,
      timeRange,
    });
    setBuilds((prevBuilds) => [...prevBuilds, ...response.builds]);
    setNextCursor(response.nextCursor);
    setIsLoadingMore(false);
  };

  return (
    <>
      <BuildList
        isLoading={isLoading}
        itemsOnThisPage={builds.length}
        pagination={null}
        headerActions={
          <BuildSecondaryFilters
            isLoading={isLoading}
            orderBy={orderBy}
            onOrderByChange={(value) => {
              handleOrderByChange(value);
              setIsLoading(true);
              onFiltersChange();
            }}
            timeRange={timeRange}
            onTimeRangeChange={(value) => {
              handleTimeRangeChange(value);
              setIsLoading(true);
              onFiltersChange();
            }}
          />
        }
      >
        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
            <BuildCard
              build={build}
              isLoading={false}
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
      <LoadMoreButton
        hasMore={nextCursor !== null}
        isLoading={isLoadingMore}
        onClick={handleLoadMore}
      />
    </>
  );
}
