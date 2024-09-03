import { OrderByFilter } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter';
import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter';
import { type TimeRange } from '@/app/(builds)/_components/filters/secondary-filters/time-range-filter/use-time-range-filter';

interface Props {
  isLoading: boolean;
  orderBy: OrderBy;
  onOrderByChange: (orderBy: OrderBy) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

export function BuildSecondaryFilters({
  isLoading,
  orderBy,
  timeRange,
  onOrderByChange,
  onTimeRangeChange,
}: Props) {
  return (
    <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
      <div className="w-full max-w-[250px]">
        <TimeRangeFilter
          value={timeRange}
          onChange={onTimeRangeChange}
          isLoading={isLoading}
        />
      </div>
      <div className="w-full max-w-[250px]">
        <OrderByFilter
          value={orderBy}
          onChange={onOrderByChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
