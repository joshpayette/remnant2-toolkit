import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';

const items = relicFragmentItems.filter((item) => item.color !== 'legendary');

export const relicFragmentFilter = {
  buildFilterKey: 'relicFragments',
  defaultValue: items.map((item) => ({
    label: item.name,
    subLabel: item.description,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Relic Fragments',
  options: items.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type RelicFragmentFilterValue = typeof relicFragmentFilter.defaultValue;
