import { OrderByFilter } from '@/app/(builds)/_features/filters/_components/order-by-filter';
import { TimeRangeFilter } from '@/app/(builds)/_features/filters/_components/time-range-filter';
import type { OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import type { TimeRange } from '@/app/(builds)/_features/filters/_hooks/use-time-range-filter';

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
    <div className="mt-8 flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
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
