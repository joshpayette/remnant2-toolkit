import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { weaponItems } from '@/app/(data)/items/weapon-items'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function LongGunFilter({ value, onChange }: Props) {
  const allLongGuns: string[] = weaponItems
    .filter((item) => item.type === 'long gun')
    .map((item) => item.name)
  allLongGuns.unshift('All')

  const options = allLongGuns.map((weapon) => ({
    label: weapon,
    value: weapon,
  }))

  return (
    <BaseField>
      <BaseLabel>Long Gun</BaseLabel>
      <BaseListbox
        key={value as string}
        name="long-gun"
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
