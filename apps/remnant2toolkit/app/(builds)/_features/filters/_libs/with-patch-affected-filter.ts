import { type FilterDefinition } from '../_types/filter-definition';

export const withPatchAffectedFilter = {
  buildFilterKey: 'withPatchAffected',
  defaultValue: false as boolean,
  label: 'Include Patch Affected Builds?',
  options: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
} as const satisfies FilterDefinition;

export type WithPatchAffectedFilterValue =
  typeof withPatchAffectedFilter.defaultValue;
