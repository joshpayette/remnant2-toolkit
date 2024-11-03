import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';

const items = relicFragmentItems.filter((item) => item.color === 'legendary');

export const legendaryFragmentFilter = {
  buildFilterKey: 'legendaryFragments',
  defaultValue: items.map((item) => ({
    label: item.name,
    subLabel: item.description,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Legendary Fragments',
  options: items.map((item) => ({
    label: item.name,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type LegendaryFragmentFilterValue =
  (typeof legendaryFragmentFilter)['defaultValue'];
