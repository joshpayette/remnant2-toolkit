import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { ItemTagWithDefault } from '@/app/(components)/dialogs/item-tag-suggestion-dialog'

interface Props {
  value: ItemTagWithDefault
  options: Array<{ label: string; value: ItemTagWithDefault }>
  onChange: (value: ItemTagWithDefault) => void
}

export function ItemTagSelect({ value, options, onChange }: Props) {
  return (
    <BaseListbox
      key={value as string}
      name="tags"
      value={value}
      onChange={(e) => onChange(e as ItemTagWithDefault)}
    >
      {options.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
