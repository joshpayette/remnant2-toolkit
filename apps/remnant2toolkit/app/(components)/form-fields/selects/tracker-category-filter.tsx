import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { ItemTrackerCategory } from '@/app/tracker/types'

interface Props {
  value: ItemTrackerCategory
  options: Array<{ label: string; value: string }>
  onChange: (value: string) => void
}

export function TrackerCategoryFilter({ value, options, onChange }: Props) {
  return (
    <BaseListbox
      key={value as string}
      name="tracker-category"
      value={value}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
