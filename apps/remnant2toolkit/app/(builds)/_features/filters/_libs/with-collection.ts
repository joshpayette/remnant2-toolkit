import type { PercentageOwned } from '@/app/(builds)/_features/filters/_components/build-collection-filter';

import { type FilterDefinition } from '../_types/filter-definition';

export const withCollectionFilter = {
  buildFilterKey: 'withCollection',
  defaultValue: 0 as number,
  label: '% Owned',
  options: [
    {
      label: 'All',
      value: 0,
    },
    {
      label: '100% Owned',
      value: 100,
    },
    {
      label: '>= 95% Owned',
      value: 95,
    },
    {
      label: '>= 90% Owned',
      value: 90,
    },
    {
      label: '>= 75% Owned',
      value: 75,
    },
    {
      label: '>= 50% Owned',
      value: 50,
    },
  ] as Array<{ label: string; value: PercentageOwned }>,
} as const satisfies FilterDefinition;

export type WithCollectionFilterValue =
  typeof withCollectionFilter.defaultValue;
