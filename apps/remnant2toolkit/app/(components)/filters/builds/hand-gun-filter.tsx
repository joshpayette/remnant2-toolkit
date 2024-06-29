import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'

import { weaponItems } from '@/app/(data)/items/weapon-items'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function HandGunFilter({ value, onChange }: Props) {
  const allHandGuns: string[] = weaponItems
    .filter((item) => item.type === 'hand gun')
    .map((item) => item.name)
  allHandGuns.unshift('All')

  const options = allHandGuns.map((weapon) => ({
    label: weapon,
    value: weapon,
  }))

  return (
    <BaseField>
      <BaseLabel>Hand Gun</BaseLabel>
      <BaseListbox
        key={value as string}
        name="hand-gun"
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
