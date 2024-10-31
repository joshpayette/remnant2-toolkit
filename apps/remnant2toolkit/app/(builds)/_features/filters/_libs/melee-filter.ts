import type { FilterOption } from '@repo/ui';

import { weaponItems } from '@/app/(items)/_constants/weapon-items';

import { type FilterDefinition } from '../_types/filter-definition';

const meleeItems = weaponItems.filter((item) => item.type === 'melee');

export const meleeFilter = {
  buildFilterKey: 'melees',
  defaultValue: meleeItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.mod?.name ?? undefined,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Melee',
  options: meleeItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type MeleeFilterValue = typeof meleeFilter.defaultValue;
