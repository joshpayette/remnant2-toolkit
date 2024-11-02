import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { modItems } from '@/app/(items)/_constants/mod-items';

export const modFilter = {
  buildFilterKey: 'mods',
  defaultValue: modItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.weapon?.name ?? undefined,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Mod',
  options: modItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type ModFilterValue = typeof modFilter.defaultValue;
