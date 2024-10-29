import { type FilterDefinition } from '../_types/filter-definition';

export const withReferenceFilter = {
  buildFilterKey: 'withReference',
  defaultValue: false,
  label: 'Only Builds w/ Reference Link?',
  options: [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ],
} as const satisfies FilterDefinition;
