import { type FilterDefinition } from '../_types/filter-definition';

export const withVideoFilter = {
  buildFilterKey: 'withVideo',
  defaultValue: false,
  label: 'Only Builds w/ Video?',
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
