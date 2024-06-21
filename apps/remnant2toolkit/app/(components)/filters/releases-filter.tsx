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
import {
  ALL_RELEASE_KEYS,
  RELEASE_TO_NAME,
} from '@/app/(data)/releases/constants'
import { ReleaseKey } from '@/app/(data)/releases/types'

export const VALID_RELEASE_KEYS = ALL_RELEASE_KEYS

interface Props {
  values: string[]
  onChange: (release: string, checked: boolean) => void
  onCheckAll: () => void
  onUncheckAll: () => void
}

export function ReleasesFilter({
  values,
  onChange,
  onCheckAll,
  onUncheckAll,
}: Props) {
  const options = VALID_RELEASE_KEYS.map((release) => ({
    label: RELEASE_TO_NAME[release as ReleaseKey] as string,
    value: release,
  }))

  return (
    <BaseFieldset>
      <BaseLegend>Releases</BaseLegend>
      <div className="mt-2 flex flex-row gap-x-2">
        <BaseButton outline onClick={onCheckAll}>
          Check All
        </BaseButton>
        <BaseButton outline onClick={onUncheckAll}>
          Uncheck All
        </BaseButton>
      </div>
      <BaseCheckboxGroup className="grid grid-cols-1 sm:grid-cols-2">
        {options.map(({ label, value }) => (
          <BaseCheckboxField key={value}>
            <BaseCheckbox
              name="releases"
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
