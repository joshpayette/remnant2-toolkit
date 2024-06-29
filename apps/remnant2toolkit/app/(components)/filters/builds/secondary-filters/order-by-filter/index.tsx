import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'

import { useOrderByFilter } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function OrderByFilter({ value, onChange }: Props) {
  const { orderByOptions } = useOrderByFilter()

  return (
    <BaseListbox key={value} name="orderBy" value={value} onChange={onChange}>
      {orderByOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  )
}
