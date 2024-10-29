import { amuletItems } from '@/app/(items)/_constants/amulet-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const amuletFilter = {
  buildFilterKey: 'amulets',
  defaultValue: amuletItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Amulets',
  options: amuletItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;
