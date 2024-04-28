import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'

export const VALID_ITEM_CATEGORIES = [
  'Amulet',
  'Archetype',
  'Concoction',
  'Consumable',
  'Gloves',
  'Hand Gun',
  'Helm',
  'Legs',
  'Long Gun',
  'Melee',
  'Mod',
  'Mutator (Gun)',
  'Mutator (Melee)',
  'Relic',
  'Relic Fragment',
  'Ring',
  'Torso',
  'Trait',
]

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function CategoriesFilter({ value, onChange }: Props) {
  const options = VALID_ITEM_CATEGORIES.map((category) => ({
    label: category as string,
    value: category,
  }))
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER })

  return (
    <BaseField>
      <BaseLabel>Categories</BaseLabel>
      <BaseListbox multiple name="categories" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
