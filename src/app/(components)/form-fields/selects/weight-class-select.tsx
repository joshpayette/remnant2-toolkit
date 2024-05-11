import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { WeightClassKeysWithDefault } from '@/app/(types)/armor-calculator'

interface Props {
  value: WeightClassKeysWithDefault
  options: Array<{ label: string; value: string }>
  onChange: (value: WeightClassKeysWithDefault) => void
}

export function WeightClassSelect({ value, options, onChange }: Props) {
  return (
    <BaseListbox
      key={value as string}
      name="weight-class"
      value={value}
      onChange={(e) => onChange(e as WeightClassKeysWithDefault)}
    >
      {options.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
