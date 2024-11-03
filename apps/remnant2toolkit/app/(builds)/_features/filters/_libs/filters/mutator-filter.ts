import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { mutatorItems } from '@/app/(items)/_constants/mutator-items';

export const mutatorFilter = {
  buildFilterKey: 'mutators',
  defaultValue: mutatorItems.map((item) => ({
    label: item.name,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Mutator',
  options: mutatorItems.map((item) => ({
    label: item.name,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type MutatorFilterValue = typeof mutatorFilter.defaultValue;
