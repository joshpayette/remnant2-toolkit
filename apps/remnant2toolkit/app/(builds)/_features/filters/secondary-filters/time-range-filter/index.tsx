import { BaseListbox, BaseListboxLabel, BaseListboxOption } from '@repo/ui';

import {
  type TimeRange,
  useTimeRangeFilter,
} from '@/app/(builds)/_features/filters/secondary-filters/time-range-filter/use-time-range-filter';

interface Props {
  isLoading: boolean;
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export function TimeRangeFilter({ isLoading, value, onChange }: Props) {
  const { timeRangeOptions } = useTimeRangeFilter();

  return (
    <BaseListbox
      key={value}
      name="timeRange"
      value={value}
      disabled={isLoading}
      onChange={onChange}
    >
      {timeRangeOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  );
}
