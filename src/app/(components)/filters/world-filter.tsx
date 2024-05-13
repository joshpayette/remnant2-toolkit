import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { WORLD_LOCATIONS } from '@/app/(types)/locations'

export const VALID_WORLDS = WORLD_LOCATIONS

interface Props {
  value: string
  onChange: (value: string) => void
}

export function WorldFilter({ value, onChange }: Props) {
  const options = VALID_WORLDS.map((world) => ({
    label: world as string,
    value: world as string,
  }))
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER })

  return (
    <BaseField>
      <BaseLabel>World</BaseLabel>
      <BaseListbox name="world" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
