import { type FilterDefinition } from '../_types/filter-definition';

export const patchAffectedFilter: FilterDefinition = {
  buildFilterKey: 'withPatchAffected',
  defaultValue: false,
  label: 'Include Patch Affected Builds?',
  options: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
};
