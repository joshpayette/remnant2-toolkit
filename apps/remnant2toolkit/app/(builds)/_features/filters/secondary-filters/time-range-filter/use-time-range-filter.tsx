import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export type TimeRange = 'day' | 'week' | 'month' | 'all-time';

export function useTimeRangeFilter(defaultTimeRange: TimeRange = 'all-time') {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramTimeRange = searchParams.get('timeRange');

  const [timeRange, setTimeRange] = useState<TimeRange>(
    paramTimeRange ? (paramTimeRange as TimeRange) : defaultTimeRange,
  );
  const timeRangeOptions: Array<{ label: TimeRange; value: string }> = [
    { label: 'day', value: 'day' },
    { label: 'week', value: 'week' },
    { label: 'month', value: 'month' },
    { label: 'all-time', value: 'all-time' },
  ];
  function handleTimeRangeChange(timeRange: string) {
    setTimeRange(timeRange as TimeRange);
    const params = new URLSearchParams(searchParams.toString());
    params.set('timeRange', timeRange);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    timeRange,
    timeRangeOptions,
    handleTimeRangeChange,
  };
}
