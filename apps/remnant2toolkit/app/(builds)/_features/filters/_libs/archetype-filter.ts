import type { FilterOption } from '@repo/ui';

import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

import { type FilterDefinition } from '../_types/filter-definition';

export const archetypeFilter = {
  buildFilterKey: 'archetypes',
  defaultValue: archetypeItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Archetypes',
  options: archetypeItems.map((item) => ({
    label: item.name,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type ArchetypeFilterValue = typeof archetypeFilter.defaultValue;
