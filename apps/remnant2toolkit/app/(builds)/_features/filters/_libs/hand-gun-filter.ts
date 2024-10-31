import type { FilterOption } from '@repo/ui';

import { weaponItems } from '@/app/(items)/_constants/weapon-items';

import { type FilterDefinition } from '../_types/filter-definition';

const handGunItems = weaponItems.filter((item) => item.type === 'hand gun');

export const handGunFilter = {
  buildFilterKey: 'handGuns',
  defaultValue: handGunItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.mod?.name ?? undefined,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Hand Gun',
  options: handGunItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type HandGunFilterValue = typeof handGunFilter.defaultValue;
