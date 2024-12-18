import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { traitItems } from '@/app/(items)/_constants/trait-items';

const sortedTraitItems = traitItems.sort((a, b) =>
  a.name.localeCompare(b.name),
);

export const traitFilter = {
  buildFilterKey: 'traits',
  defaultValue: sortedTraitItems.map((item) => ({
    label: item.name,
    subLabel: item.description,
    value: item.name,
    state: 'default',
  })) as FilterOption[],
  label: 'Traits',
  options: sortedTraitItems.map((item) => ({
    label: item.name,
    value: item.name,
  })),
} as const satisfies FilterDefinition;

export type TraitFilterValue = typeof traitFilter.defaultValue;
