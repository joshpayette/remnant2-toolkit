import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import { type OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import { type BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';

/**
 * Cache tag for the public feeds' default anonymous view. Every build
 * mutation that can change what a logged-out visitor sees on the first page of
 * a feed revalidates this tag via {@link revalidatePublicBuildFeeds}.
 */
export const PUBLIC_BUILD_FEEDS_CACHE_TAG = 'public-build-feeds';

/**
 * Time-based backstop for the cached default views. Writes invalidate the tag
 * eagerly, so this only hits if an invalidation path is ever missed.
 */
export const PUBLIC_BUILD_FEEDS_REVALIDATE_SECONDS = 60 * 60;

/** True when the given filter fields are all at their default (unfiltered) value. */
export function areBuildFilterFieldsDefault(
  fields: BuildFilterFields,
): boolean {
  return (
    Object.keys(DEFAULT_BUILD_FIELDS) as Array<keyof BuildFilterFields>
  ).every(
    (key) =>
      JSON.stringify(fields[key]) === JSON.stringify(DEFAULT_BUILD_FIELDS[key]),
  );
}

/**
 * The bulk of feed traffic is logged-out visitors loading a feed's landing view:
 * first page, default sort, no filters. That result is identical for every such
 * visitor (no per-user columns), so it is safe to cache. Anything with a session,
 * a cursor, a non-default sort/page size, or any active filter bypasses the cache.
 */
export function isDefaultPublicFeedView({
  buildFilterFields,
  cursor,
  defaultOrderBy,
  itemsPerPage,
  orderBy,
  timeRange,
  userId,
}: {
  buildFilterFields: BuildFilterFields;
  cursor: string | null;
  defaultOrderBy: OrderBy;
  itemsPerPage: number;
  orderBy: OrderBy;
  timeRange: TimeRange;
  userId: string | undefined;
}): boolean {
  return (
    !userId &&
    cursor === null &&
    itemsPerPage === DEFAULT_ITEMS_PER_PAGE &&
    orderBy === defaultOrderBy &&
    timeRange === 'all-time' &&
    areBuildFilterFieldsDefault(buildFilterFields)
  );
}
