import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { BUILD_FILTER_KEYS } from '@/app/(components)/filters/builds/types'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export const MINIMUM_DESCRIPTION_LENGTH = 100

export function BuildMiscFilter({ value, onChange }: Props) {
  const options = [
    {
      label: `Only Builds w/ ${MINIMUM_DESCRIPTION_LENGTH}+ description length`,
      value: BUILD_FILTER_KEYS.WITHMINDESCRIPTION,
    },
    {
      label: 'Only Builds w/ Video',
      value: BUILD_FILTER_KEYS.WITHVIDEO,
    },
    {
      label: 'Only Builds w/ Reference Link',
      value: BUILD_FILTER_KEYS.WITHREFERENCE,
    },
    {
      label: 'Patch Affected Builds',
      value: BUILD_FILTER_KEYS.PATCHAFFECTED,
    },
  ]

  return (
    <BaseField>
      <BaseLabel>Include...</BaseLabel>
      <BaseListbox multiple name="misc" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
