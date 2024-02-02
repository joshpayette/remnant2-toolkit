import { useState } from 'react'
import { OrderBy, TimeRange } from '../types'

export default function useBuildListFilters() {
  const [timeRange, setTimeRange] = useState<TimeRange>('all-time')
  const timeRangeOptions: Array<{ label: TimeRange; value: string }> = [
    { label: 'day', value: 'day' },
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
    { label: 'all-time', value: 'all-time' },
  ]
  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange as TimeRange)
  }

  const [orderBy, setOrderBy] = useState<OrderBy>('most favorited')
  const orderByOptions: Array<{ label: OrderBy; value: string }> = [
    { label: 'alphabetical', value: 'alphabetical' },
    { label: 'most favorited', value: 'most favorited' },
    { label: 'newest', value: 'newest' },
  ]
  function handleOrderByChange(orderBy: string) {
    setOrderBy(orderBy as OrderBy)
  }

  return {
    orderBy,
    orderByOptions,
    handleOrderByChange,
    timeRange,
    timeRangeOptions,
    handleTimeRangeChange,
  }
}
