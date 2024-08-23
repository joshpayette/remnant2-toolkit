import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'

import { amuletItems } from '@/app/(data)/items/amulet-items'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function AmuletFilter({ value, onChange }: Props) {
  const allAmulets: string[] = amuletItems.map((item) => item.name)
  allAmulets.unshift('All')

  const options = allAmulets.map((amulet) => ({
    label: amulet,
    value: amulet,
  }))

  return (
    <BaseField>
      <BaseLabel>Amulet</BaseLabel>
      <BaseListbox
        key={value as string}
        name="amulet"
        value={value}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
