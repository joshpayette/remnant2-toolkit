import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { relicItems } from '@/app/(items)/_constants/relic-items';

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
