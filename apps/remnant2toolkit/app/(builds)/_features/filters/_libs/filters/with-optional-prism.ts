import type { FilterDefinition } from '@/app/(builds)/_features/filters/_types/filter-definition';

export const withOptionalPrismFilter = {
  buildFilterKey: 'withOptionalPrism',
  defaultValue: false as boolean,
  label: 'Only Builds w/ Optional Leg. Gem?',
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

export type WithOptionalPrismValue =
  typeof withOptionalPrismFilter.defaultValue;
