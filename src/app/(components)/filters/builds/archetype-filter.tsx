import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { archetypeItems } from '@/app/(data)/items/archetype-items'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function ArchetypeFilter({ value, onChange }: Props) {
  const allArchetypes: string[] = archetypeItems.map((item) => item.name)
  allArchetypes.unshift(DEFAULT_FILTER)

  const options = allArchetypes.map((archetype) => ({
    label: archetype,
    value: archetype,
  }))

  return (
    <BaseField>
      <BaseLabel>Archetype</BaseLabel>
      <BaseListbox multiple name="archetype" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
