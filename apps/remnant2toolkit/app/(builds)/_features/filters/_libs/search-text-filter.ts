import { type FilterDefinition } from '../_types/filter-definition';

export const searchTextFilter: FilterDefinition = {
  buildFilterKey: 'searchText',
  defaultValue: '',
  label: 'Search Text',
};
