import type { FilterOption } from '@repo/ui';

import { relicItems } from '@/app/(items)/_constants/relic-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const relicFilter = {
  buildFilterKey: 'relics',
  defaultValue: relicItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Relic',
  options: relicItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type RelicFilterValue = typeof relicFilter.defaultValue;
