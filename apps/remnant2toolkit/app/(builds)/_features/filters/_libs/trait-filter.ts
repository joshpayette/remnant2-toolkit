import type { FilterOption } from '@repo/ui';

import { traitItems } from '@/app/(items)/_constants/trait-items';

import { type FilterDefinition } from '../_types/filter-definition';

const sortedTraitItems = traitItems.sort((a, b) =>
  a.name.localeCompare(b.name),
);

export const traitFilter = {
  buildFilterKey: 'traits',
  defaultValue: sortedTraitItems.map((item) => ({
    label: `${item.name}${
      item.type === 'archetype' ? ` (${item.linkedItems?.archetype?.name})` : ''
    }`,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Traits',
  options: sortedTraitItems.map((item) => ({
    label: `${item.name} (${item.type})`,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type TraitFilterValue = typeof traitFilter.defaultValue;
