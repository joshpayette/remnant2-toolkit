import type { FilterSwitchValue } from '@repo/ui';

export type FilterField = Record<FilterSwitchValue, string[]>;

export interface BuildFilterFields {
  archetypes: FilterField;
  searchText: string;
}
