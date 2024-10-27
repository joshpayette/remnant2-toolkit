import { type FilterDefinition } from '../_types/filter-definition';

export const withVideoFilter: FilterDefinition = {
  buildFilterKey: 'withVideo',
  defaultValue: 'false',
  label: 'Only Builds w/ Video',
  validOptions: ['true', 'false'],
};
