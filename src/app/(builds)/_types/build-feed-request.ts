import type { BuildVisibility } from '@/app/(builds)/_features/filters/_hooks/use-build-visibility-filter';
import type { OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import type { TimeRange } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';
import type { DBBuild } from '@/app/(builds)/_types/db-build';

export interface BuildFeedRequest {
  buildFilterFields: BuildFilterFields;
  cursor: string | null;
  itemsPerPage: number;
  orderBy: OrderBy;
  timeRange: TimeRange;
}

export interface BuildFeedResponse {
  builds: DBBuild[];
  nextCursor: string | null;
}

/**
 * Cursor request for a profile's own build feeds (created/featured), which add
 * visibility, a featured-only flag, and the profile being viewed.
 */
export interface ProfileBuildFeedRequest extends BuildFeedRequest {
  buildVisibility?: BuildVisibility;
  featuredBuildsOnly: boolean;
  profileId: string;
}
