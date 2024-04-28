import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import {
  ALL_RELEASE_KEYS,
  RELEASE_TO_NAME,
} from '@/app/(data)/releases/constants'
import { ReleaseKey } from '@/app/(data)/releases/types'

export const VALID_RELEASE_KEYS = ALL_RELEASE_KEYS

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function ReleasesFilter({ value, onChange }: Props) {
  const options = VALID_RELEASE_KEYS.map((release) => ({
    label: RELEASE_TO_NAME[release as ReleaseKey] as string,
    value: release,
  }))
  options.unshift({ label: DEFAULT_FILTER, value: DEFAULT_FILTER })

  return (
    <BaseField>
      <BaseLabel>Releases</BaseLabel>
      <BaseListbox multiple name="releases" value={value} onChange={onChange}>
        {options.map(({ label, value }) => (
          <BaseListboxOption key={value} value={value}>
            <BaseListboxLabel>{label}</BaseListboxLabel>
          </BaseListboxOption>
        ))}
      </BaseListbox>
    </BaseField>
  )
}
