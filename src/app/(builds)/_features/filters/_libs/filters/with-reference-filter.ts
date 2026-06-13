import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';

export const withReferenceFilter = {
  buildFilterKey: 'withReference',
  defaultValue: false as boolean,
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

export type WithReferenceFilterValue = typeof withReferenceFilter.defaultValue;
