'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { BuildCard } from '@/app/(builds)/_components/build-card';
import { BuildList } from '@/app/(builds)/_components/build-list';
import { CreateBuildCard } from '@/app/(builds)/_components/create-build-card';
import { LoadMoreButton } from '@/app/(builds)/_components/load-more-button';
import { BuildVisibilityFilter } from '@/app/(builds)/_features/filters/_components/build-visibility-filter';
import { OrderByFilter } from '@/app/(builds)/_features/filters/_components/order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_features/filters/_components/time-range-filter';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { useBuildVisibilityFilter } from '@/app/(builds)/_features/filters/_hooks/use-build-visibility-filter';
import { useOrderByFilter } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { useTimeRangeFilter } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { parseUrlParams } from '@/app/(builds)/_features/filters/_libs/parse-url-params';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { CreatedBuildCardActions } from '@/app/(user)/profile/_components/created-build-card-actions';
import { getUserCreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_actions/get-user-created-builds';

interface Props {
  isEditable: boolean;
  profileId: string;
  buildFiltersOverrides?: Partial<BuildFilterFields>;
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
      ? { ...DEFAULT_BUILD_FIELDS, ...buildFiltersOverrides }
      : DEFAULT_BUILD_FIELDS;
  }, [buildFiltersOverrides]);

  const searchParams = useSearchParams();
  const buildFilterFields = parseUrlParams({
    searchParams,
    defaultFilters,
  });

  const [builds, setBuilds] = useState<DBBuild[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const itemsPerPage = isEditable ? 15 : 16;

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest');
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time');
  const { buildVisibility, handleBuildVisibilityChange } =
    useBuildVisibilityFilter('all');

  // Fetch the first page on mount. A filter/sort change remounts this component
  // (via the parent's key), which resets state and re-runs this effect.
  useEffect(() => {
    const getItemsAsync = async () => {
      const response = await getUserCreatedBuilds({
        buildFilterFields,
        buildVisibility,
        cursor: null,
        featuredBuildsOnly: false,
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
      buildVisibility,
      cursor: nextCursor,
      featuredBuildsOnly: false,
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
        itemsOnThisPage={builds.length}
        label="Created Builds"
        pagination={null}
        headerActions={
          <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
            <div className="w-full max-w-[250px]">
              <TimeRangeFilter
                isLoading={isLoading}
                value={timeRange}
                onChange={(value) => {
                  handleTimeRangeChange(value);
                  setIsLoading(true);
                  onFiltersChange();
                }}
              />
            </div>
            <div className="w-full max-w-[250px]">
              <OrderByFilter
                isLoading={isLoading}
                value={orderBy}
                onChange={(value) => {
                  handleOrderByChange(value);
                  setIsLoading(true);
                  onFiltersChange();
                }}
              />
            </div>
            {isEditable ? (
              <div className="w-full max-w-[250px]">
                <BuildVisibilityFilter
                  value={buildVisibility}
                  onChange={(value) => {
                    handleBuildVisibilityChange(value);
                    setIsLoading(true);
                    onFiltersChange();
                  }}
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
              isLoading={false}
              showBuildVisibility={true}
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
