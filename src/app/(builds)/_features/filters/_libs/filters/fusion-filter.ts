import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { fusionItems } from '@/app/(items)/_constants/fusion-items';
import type { FilterOption } from '@/components/ui';

export const fusionFilter = {
  buildFilterKey: 'fusions',
  defaultValue: fusionItems.map((item) => ({
    label: item.name,
    subLabel: item.description,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Fusions',
  options: fusionItems.map((item) => ({
    label: `${item.name} (${item.description})`,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type FusionFilterValue = typeof fusionFilter.defaultValue;
