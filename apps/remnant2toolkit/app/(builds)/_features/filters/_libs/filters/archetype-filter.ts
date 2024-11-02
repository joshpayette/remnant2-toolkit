import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

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
