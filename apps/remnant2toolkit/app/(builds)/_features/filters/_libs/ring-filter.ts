import { ringItems } from '@/app/(items)/_constants/ring-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const ringFilter = {
  buildFilterKey: 'rings',
  defaultValue: ringItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Rings',
  options: ringItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;
