import { type FilterDefinition } from '../_types/filter-definition';

export const withQualityFilter: FilterDefinition = {
  buildFilterKey: 'withQuality',
  defaultValue: 'true',
  label: 'Only Quality Builds?',
  validOptions: ['true', 'false'],
};
