import type { FilterOption } from '@repo/ui';

import { weaponItems } from '@/app/(items)/_constants/weapon-items';

import { type FilterDefinition } from '../_types/filter-definition';

const longGunItems = weaponItems.filter((item) => item.type === 'long gun');

export const longGunFilter = {
  buildFilterKey: 'amulets',
  defaultValue: longGunItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Long Gun',
  options: longGunItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type LongGunFilterValue = typeof longGunFilter.defaultValue;
