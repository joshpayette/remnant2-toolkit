import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { ItemTokenWithDefault } from '@/app/(components)/dialogs/item-tag-suggestion-dialog'

interface Props {
  value: ItemTokenWithDefault
  options: Array<{ label: string; value: ItemTokenWithDefault }>
  onChange: (value: ItemTokenWithDefault) => void
}

export function ItemTagSelect({ value, options, onChange }: Props) {
  return (
    <BaseListbox
      key={value as string}
      name="tags"
      value={value}
      onChange={(e) => onChange(e as ItemTokenWithDefault)}
    >
      {options.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
