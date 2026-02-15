import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';

export const withVideoFilter = {
  buildFilterKey: 'withVideo',
  defaultValue: false as boolean,
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

export type WithVideoFilterValue = typeof withVideoFilter.defaultValue;
