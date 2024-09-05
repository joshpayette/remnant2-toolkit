import { BaseListbox, BaseListboxLabel, BaseListboxOption } from '@repo/ui';

import {
  type OrderBy,
  useOrderByFilter,
} from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';

interface Props {
  isLoading: boolean;
  value: OrderBy;
  onChange: (value: OrderBy) => void;
}

export function OrderByFilter({ isLoading, value, onChange }: Props) {
  const { orderByOptions } = useOrderByFilter();

  return (
    <BaseListbox
      key={value}
      name="orderBy"
      value={value}
      disabled={isLoading}
      onChange={onChange}
    >
      {orderByOptions.map(({ label, value }) => (
        <BaseListboxOption key={value} value={value}>
          <BaseListboxLabel>{label}</BaseListboxLabel>
        </BaseListboxOption>
      ))}
    </BaseListbox>
  );
}
