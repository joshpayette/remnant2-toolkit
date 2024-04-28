import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { ALL_BUILD_TAGS } from '@/features/build/build-tags/constants'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function BuildTagFilter({ value, onChange }: Props) {
  const allTags = ALL_BUILD_TAGS.map((item) => item.label)
  allTags.unshift(DEFAULT_FILTER)

  const options = allTags.map((tag) => ({
    label: tag,
    value: tag,
  }))

  return (
    <BaseField>
      <BaseLabel>Build Tags</BaseLabel>
      <BaseListbox multiple name="build-tag" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
