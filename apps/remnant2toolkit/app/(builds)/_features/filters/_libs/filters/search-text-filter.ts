import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';

export const searchTextFilter = {
  buildFilterKey: 'searchText',
  defaultValue: '' as string,
  label: 'Search Text',
  options: undefined,
} as const satisfies FilterDefinition;

export type SearchTextFilterValue = typeof searchTextFilter.defaultValue;
