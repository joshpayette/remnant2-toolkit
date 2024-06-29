import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'

import { useTimeRangeFilter } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function TimeRangeFilter({ value, onChange }: Props) {
  const { timeRangeOptions } = useTimeRangeFilter()

  return (
    <BaseListbox key={value} name="timeRange" value={value} onChange={onChange}>
      {timeRangeOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
