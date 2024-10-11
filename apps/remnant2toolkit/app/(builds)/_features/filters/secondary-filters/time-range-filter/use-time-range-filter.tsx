import { useState } from 'react';

export type TimeRange = 'day' | 'week' | 'month' | 'all-time';

export function useTimeRangeFilter(defaultTimeRange: TimeRange = 'all-time') {
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);
  const timeRangeOptions: Array<{ label: TimeRange; value: string }> = [
    { label: 'day', value: 'day' },
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
    { label: 'all-time', value: 'all-time' },
  ];
  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange as TimeRange);
  }

  return {
    timeRange,
    timeRangeOptions,
    handleTimeRangeChange,
  };
}
