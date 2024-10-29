import { type FilterDefinition } from '../_types/filter-definition';

export const withQualityFilter = {
  buildFilterKey: 'withQuality',
  defaultValue: true,
  label: 'Only Quality Builds?',
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
