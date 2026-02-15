import type { BuildVisibility } from '@/app/(builds)/_features/filters/_hooks/use-build-visibility-filter';
import type { OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import type { TimeRange } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/filters/_types/build-filter-fields';

export interface BuildListRequest {
  buildFilterFields: BuildFilterFields;
  itemsPerPage: number;
  orderBy: OrderBy;
  pageNumber: number;
  timeRange: TimeRange;
}

export interface ProfileBuildListRequest extends BuildListRequest {
  buildVisibility?: BuildVisibility;
  featuredBuildsOnly: boolean;
  profileId: string;
}
