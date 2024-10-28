import { weaponItems } from '@/app/(items)/_constants/weapon-items';

import { type FilterDefinition } from '../_types/filter-definition';

const meleeItems = weaponItems.filter((item) => item.type === 'melee');

export const meleeFilter: FilterDefinition = {
  buildFilterKey: 'melees',
  defaultValue: meleeItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Melee',
  validOptions: meleeItems.map((item) => item.id),
};
