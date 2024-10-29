import { type FilterDefinition } from '../_types/filter-definition';

export const searchTextFilter = {
  buildFilterKey: 'searchText',
  defaultValue: '',
  label: 'Search Text',
  options: undefined,
} as const satisfies FilterDefinition;
