import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseCheckbox,
  BaseCheckboxField,
  BaseCheckboxGroup,
} from '@/app/(components)/_base/checkbox'
import {
  BaseFieldset,
  BaseLabel,
  BaseLegend,
} from '@/app/(components)/_base/fieldset'
import { ALL_BUILD_TAGS } from '@/app/(components)/builder/build-tags/constants'

export const VALID_BUILD_TAGS = ALL_BUILD_TAGS.map((item) => item.label)

interface Props {
  values: string[]
  onChange: (newTag: string, checked: boolean) => void
  onCheckAll: () => void
  onUncheckAll: () => void
}

export function BuildTagFilter({
  values,
  onChange,
  onCheckAll,
  onUncheckAll,
}: Props) {
  const options = VALID_BUILD_TAGS.map((tag) => ({
    label: tag,
    value: tag,
  }))

  return (
    <BaseFieldset>
      <BaseLegend>Build Tags</BaseLegend>
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
              name="build-tags"
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
