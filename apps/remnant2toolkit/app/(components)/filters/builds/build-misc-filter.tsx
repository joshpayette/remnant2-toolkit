import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'

import { BUILD_FILTER_KEYS } from '@/app/(components)/filters/builds/types'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export const MINIMUM_QUALITY_DESCRIPTION_LENGTH = 200

export function BuildMiscFilter({ value, onChange }: Props) {
  const options = [
    {
      label: `Only Owned Items`,
      value: BUILD_FILTER_KEYS.WITHCOLLECTION,
    },
    {
      label: `Only Quality Builds`,
      value: BUILD_FILTER_KEYS.WITHQUALITY,
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
