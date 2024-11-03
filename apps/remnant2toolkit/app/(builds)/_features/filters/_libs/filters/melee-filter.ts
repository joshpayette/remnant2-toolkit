import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

const meleeItems = weaponItems.filter((item) => item.type === 'melee');

export const meleeFilter = {
  buildFilterKey: 'melees',
  defaultValue: meleeItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.mod?.name ?? undefined,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Melee',
  options: meleeItems.map((item) => ({
    label: item.name,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type MeleeFilterValue = typeof meleeFilter.defaultValue;
