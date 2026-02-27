import { ALL_RELEASE_KEYS, RELEASE_TO_NAME } from '@/app/_constants/releases';
import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';
import type { FilterOption } from '@/ui/common/filters/filter-listbox';

export const releasesFilter = {
  buildFilterKey: 'releases',
  defaultValue: ALL_RELEASE_KEYS.map((item) => ({
    label: RELEASE_TO_NAME[item],
    value: item,
    state: 'default',
  })) as FilterOption[],
  label: 'Releases',
  options: ALL_RELEASE_KEYS.map((release) => ({
    label: RELEASE_TO_NAME[release],
    value: release,
  })),
} as const satisfies FilterDefinition;

export type ReleasesFilterValue = typeof releasesFilter.defaultValue;
