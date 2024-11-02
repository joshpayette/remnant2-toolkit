import type { FilterOption } from '@repo/ui';

import { ALL_BUILD_TAGS } from '@/app/(builds)/_constants/all-build-tags';
import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';

export const buildTagFilter = {
  buildFilterKey: 'buildTags',
  defaultValue: ALL_BUILD_TAGS.map((tag) => ({
    label: tag.label,
    value: tag.value,
    state: 'default',
  })) as FilterOption[],
  label: 'Build Tags',
  options: ALL_BUILD_TAGS.map((tag) => ({
    label: tag.label,
    value: tag.value,
  })),
} as const satisfies FilterDefinition;

export type BuildTagFilterValue = typeof buildTagFilter.defaultValue;
