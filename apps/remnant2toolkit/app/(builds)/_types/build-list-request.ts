import { type BuildVisibility } from '@/app/(builds)/_features/filters/secondary-filters/build-visibility-filter/use-build-visibility-filter';
import { type OrderBy } from '@/app/(builds)/_features/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter/use-time-range-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

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
