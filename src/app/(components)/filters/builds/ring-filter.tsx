import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { ringItems } from '@/app/(data)/items/ring-items'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function RingFilter({ value, onChange }: Props) {
  const allRings: string[] = ringItems.map((item) => item.name)
  allRings.unshift(DEFAULT_FILTER)

  const options = allRings.map((ring) => ({
    label: ring,
    value: ring,
  }))

  return (
    <BaseField>
      <BaseLabel>Rings</BaseLabel>
      <BaseListbox multiple name="ring" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
