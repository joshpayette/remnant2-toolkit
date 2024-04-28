import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export function BuildMiscFilter({ value, onChange }: Props) {
  const options = [
    {
      label: 'Patch Affected Builds',
      value: 'patchAffected',
    },
    {
      label: 'Builds with Video',
      value: 'withVideo',
    },
    {
      label: 'Builds with Reference Link',
      value: 'withReference',
    },
  ]

  return (
    <BaseField>
      <BaseLabel>Include</BaseLabel>
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
