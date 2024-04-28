import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { useBuildVisibilityFilter } from '@/app/(components)/filters/builds/secondary-filters/build-visibility-filter/use-build-visibility-filter'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function BuildVisibilityFilter({ value, onChange }: Props) {
  const { buildVisibilityOptions } = useBuildVisibilityFilter()

  return (
    <BaseListbox
      key={value}
      name="buildVisibility"
      value={value}
      onChange={onChange}
    >
      {buildVisibilityOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
