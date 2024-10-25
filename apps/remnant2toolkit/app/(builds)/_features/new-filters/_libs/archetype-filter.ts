import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

import { type FilterDefinition } from './../_types/filter-definition';

export const archetypeFilter: FilterDefinition = {
  buildFilterKey: 'archetypes',
  defaultValue: archetypeItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  label: 'Archetypes',
  validOptions: archetypeItems.map((item) => item.id),
};
