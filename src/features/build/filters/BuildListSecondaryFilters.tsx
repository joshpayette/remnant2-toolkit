import { SelectMenu } from '@/features/ui/SelectMenu'

import { OrderBy, TimeRange } from './types'

interface Props {
  orderBy: OrderBy
  orderByOptions: Array<{
    label: OrderBy
    value: string
  }>
  onOrderByChange: (orderBy: string) => void
  timeRange: TimeRange
  timeRangeOptions: Array<{
    label: TimeRange
    value: string
  }>
  onTimeRangeChange: (timeRange: string) => void
}

export function BuildListSecondaryFilters({
  orderBy,
  orderByOptions,
  timeRange,
  timeRangeOptions,
  onOrderByChange,
  onTimeRangeChange,
}: Props) {
  return (
    <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
      <div className="w-full max-w-[250px]">
        <SelectMenu
          label="Time Range"
          showLabel={false}
          name="timeRange"
          value={timeRange}
          options={timeRangeOptions}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        />
      </div>
      <div className="w-full max-w-[250px]">
        <SelectMenu
          label="Order By"
          showLabel={false}
          name="orderBy"
          value={orderBy}
          options={orderByOptions}
          onChange={(e) => onOrderByChange(e.target.value)}
        />
      </div>
    </div>
  )
}
