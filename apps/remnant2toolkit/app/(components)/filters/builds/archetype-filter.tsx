import {
  BaseCheckbox,
  BaseCheckboxField,
  BaseCheckboxGroup,
} from '@repo/ui/base/checkbox'

import { BaseButton } from '@repo/ui/base/button'
import {
  BaseFieldset,
  BaseLabel,
  BaseLegend,
} from '@/app/(components)/_base/fieldset'
import { archetypeItems } from '@/app/(data)/items/archetype-items'

export const VALID_ARCHETYPES = archetypeItems.map((item) => item.name)

interface Props {
  values: string[]
  onChange: (archetype: string, checked: boolean) => void
  onCheckAll: () => void
  onUncheckAll: () => void
}

export function ArchetypeFilter({
  values,
  onChange,
  onCheckAll,
  onUncheckAll,
}: Props) {
  const options = VALID_ARCHETYPES.map((archetype) => ({
    label: archetype,
    value: archetype,
  }))

  return (
    <BaseFieldset>
      <BaseLegend>Archetypes</BaseLegend>
      <div className="mt-2 flex flex-row gap-x-2">
        <BaseButton outline onClick={onCheckAll}>
          Check All
        </BaseButton>
        <BaseButton outline onClick={onUncheckAll}>
          Uncheck All
        </BaseButton>
      </div>
      <BaseCheckboxGroup className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {options.map(({ label, value }) => (
          <BaseCheckboxField key={value}>
            <BaseCheckbox
              name="archetypes"
              value={value}
              onChange={(checked) => onChange(value, checked)}
              checked={values.includes(value)}
            />
            <BaseLabel>{label}</BaseLabel>
          </BaseCheckboxField>
        ))}
      </BaseCheckboxGroup>
    </BaseFieldset>
  )
}
