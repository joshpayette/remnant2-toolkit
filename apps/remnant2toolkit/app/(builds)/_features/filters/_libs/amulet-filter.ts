import { amuletItems } from '@/app/(items)/_constants/amulet-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const amuletFilter: FilterDefinition = {
  buildFilterKey: 'amulets',
  defaultValue: amuletItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Amulets',
  validOptions: amuletItems.map((item) => item.id),
};
