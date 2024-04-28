import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'

export const VALID_DISCOVERED_FILTERS = ['Discovered', 'Undiscovered']

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function DiscoveredFilter({ value, onChange }: Props) {
  const options = VALID_DISCOVERED_FILTERS.map((value) => ({
    label: value as string,
    value: value,
  }))
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER })

  return (
    <BaseField>
      <BaseLabel>Discovered?</BaseLabel>
      <BaseListbox multiple name="discovered" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
