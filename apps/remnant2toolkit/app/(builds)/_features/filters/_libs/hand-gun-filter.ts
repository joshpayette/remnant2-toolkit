import { weaponItems } from '@/app/(items)/_constants/weapon-items';

import { type FilterDefinition } from '../_types/filter-definition';

const handGunItems = weaponItems.filter((item) => item.type === 'hand gun');

export const handGunFilter: FilterDefinition = {
  buildFilterKey: 'handGuns',
  defaultValue: handGunItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Hand Gun',
  validOptions: handGunItems.map((item) => item.id),
};
