import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

const longGunItems = weaponItems.filter((item) => item.type === 'long gun');

export const longGunFilter = {
  buildFilterKey: 'longGuns',
  defaultValue: longGunItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.mod?.name ?? undefined,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Long Gun',
  options: longGunItems.map((item) => ({
    label: item.name,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type LongGunFilterValue = typeof longGunFilter.defaultValue;
