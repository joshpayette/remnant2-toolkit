import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { ringItems } from '@/app/(items)/_constants/ring-items';

export const ringFilter = {
  buildFilterKey: 'rings',
  defaultValue: ringItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Rings',
  options: ringItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type RingFilterValue = typeof ringFilter.defaultValue;
