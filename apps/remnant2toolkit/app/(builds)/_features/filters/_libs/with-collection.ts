import { type FilterDefinition } from '../_types/filter-definition';

export const withCollectionFilter: FilterDefinition = {
  buildFilterKey: 'withCollection',
  defaultValue: 'All',
  label: '% Owned',
  validOptions: [
    'All',
    '100% Owned',
    '>= 95% Owned',
    '>= 90% Owned',
    '>= 75% Owned',
    '>= 50% Owned',
  ],
};
