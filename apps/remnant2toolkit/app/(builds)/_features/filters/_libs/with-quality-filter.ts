import { type FilterDefinition } from '../_types/filter-definition';

export const withQualityFilter = {
  buildFilterKey: 'withQuality',
  defaultValue: true as boolean,
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

export type WithQualityFilterValue = typeof withQualityFilter.defaultValue;
