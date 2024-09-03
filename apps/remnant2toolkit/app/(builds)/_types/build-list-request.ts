import { type BuildVisibility } from '@/app/(builds)/_components/filters/secondary-filters/build-visibility-filter/use-build-visibility-filter';
import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';
import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';

export interface BuildListRequest {
  buildListFilters: BuildListFilters;
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
