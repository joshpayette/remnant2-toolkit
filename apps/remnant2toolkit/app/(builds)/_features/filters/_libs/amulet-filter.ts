import type { FilterOption } from '@repo/ui';

import { amuletItems } from '@/app/(items)/_constants/amulet-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const amuletFilter = {
  buildFilterKey: 'amulets',
  defaultValue: amuletItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Amulets',
  options: amuletItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type AmuletFilterValue = typeof amuletFilter.defaultValue;
