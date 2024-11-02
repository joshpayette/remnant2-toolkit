import type { FilterOption } from '@repo/ui';

import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import { skillItems } from '@/app/(items)/_constants/skill-items';

export const skillFilter = {
  buildFilterKey: 'skills',
  defaultValue: skillItems.map((item) => ({
    label: item.name,
    subLabel: item.linkedItems?.archetype?.name ?? undefined,
    value: item.id,
    state: 'default',
  })) as FilterOption[],
  label: 'Skills',
  options: skillItems.map((item) => ({
    label: `${item.name} (${item.linkedItems?.archetype?.name})`,
    value: item.id,
  })),
} as const satisfies FilterDefinition;

export type SkillFilterValue = typeof skillFilter.defaultValue;
