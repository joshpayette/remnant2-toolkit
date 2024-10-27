import { type FilterDefinition } from '../_types/filter-definition';

export const patchAffectedFilter: FilterDefinition = {
  buildFilterKey: 'patchAffected',
  defaultValue: 'true',
  label: 'Include Patch Affected Builds?',
  validOptions: ['true', 'false'],
};
