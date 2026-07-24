'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { LoadMoreButton } from '@/app/(builds)/_components/load-more-button';
import { BuildSecondaryFilters } from '@/app/(builds)/_features/filters/_components/build-secondary-filters';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';
import { getUserCreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_actions/get-user-created-builds';

interface Props {
  defaultFiltersOverrides?: Partial<BuildFilterFields>;
  isEditable: boolean;
  profileId: string;
  onFiltersChange: () => void;
}

export function FeaturedBuildsList({
  defaultFiltersOverrides,
  isEditable,
  profileId,
  onFiltersChange,
}: Props) {
  const defaultFilters = useMemo(() => {
    return defaultFiltersOverrides
      ? { ...DEFAULT_BUILD_FIELDS, ...defaultFiltersOverrides }
      : DEFAULT_BUILD_FIELDS;
  }, [defaultFiltersOverrides]);

  const searchParams = useSearchParams();
  const buildFilterFields = parseUrlParams({ searchParams, defaultFilters });

  const [builds, setBuilds] = useState<DBBuild[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const itemsPerPage = isEditable
    ? DEFAULT_ITEMS_PER_PAGE - 1
    : DEFAULT_ITEMS_PER_PAGE;

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');

  // Fetch the first page on mount. A filter/sort change remounts this component
  // (via the parent's key), which resets state and re-runs this effect.
  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getUserCreatedBuilds({
        buildFilterFields,
        buildVisibility: 'all',
        cursor: null,
        featuredBuildsOnly: true,
        itemsPerPage,
        orderBy,
        profileId,
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
    const response = await getUserCreatedBuilds({
      buildFilterFields,
      buildVisibility: 'all',
      cursor: nextCursor,
      featuredBuildsOnly: true,
      itemsPerPage,
      orderBy,
      profileId,
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
        label="Featured builds"
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
        {isEditable ? <CreateBuildCard /> : null}

        {builds.map((build) => (
          <div key={`${build.id}${build.variantIndex}`} className="w-full">
            <BuildCard
              build={build}
              isLoading={false}
              showBuildVisibility={isEditable}
              footerActions={
                isEditable ? (
                  <CreatedBuildCardActions
                    build={build}
                    onDelete={(buildId: string) => {
                      setBuilds((prevBuilds) =>
                        prevBuilds.filter((b) => b.id !== buildId),
                      );
                    }}
                  />
                ) : undefined
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
