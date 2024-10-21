import type { FilterSwitchState } from '@repo/ui';

export type FilterField = Record<FilterSwitchState, string[]>;

export interface BuildFilterFields {
  archetypes: FilterField;
  searchText: string;
}
