import SelectMenu from '@/features/ui/SelectMenu'
import { OrderBy, TimeRange } from '../types'

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

export default function BuildListSecondaryFilters({
  orderBy,
  orderByOptions,
  timeRange,
  timeRangeOptions,
  onOrderByChange,
  onTimeRangeChange,
}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-end gap-x-2 sm:flex-row">
      <SelectMenu
        value={timeRange}
        options={timeRangeOptions}
        onChange={(e) => onTimeRangeChange(e.target.value)}
      />
      <SelectMenu
        value={orderBy}
        options={orderByOptions}
        onChange={(e) => onOrderByChange(e.target.value)}
      />
    </div>
  )
}
