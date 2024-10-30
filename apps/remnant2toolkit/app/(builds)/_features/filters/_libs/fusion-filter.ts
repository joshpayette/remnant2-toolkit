import type { FilterOption } from '@repo/ui';

import { fusionItems } from '@/app/(items)/_constants/fusion-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const fusionFilter = {
  buildFilterKey: 'fusions',
  defaultValue: fusionItems.map((item) => ({
    label: `${item.name} (${item.description})`,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Fusions',
  options: fusionItems.map((item) => ({
    label: `${item.name} (${item.description})`,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type FusionFilterValue = typeof fusionFilter.defaultValue;
