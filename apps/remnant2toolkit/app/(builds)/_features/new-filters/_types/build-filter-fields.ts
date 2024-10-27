import type { FilterOption } from '@repo/ui';

export interface BuildFilterFields {
  amulets: FilterOption[];
  archetypes: FilterOption[];
  searchText: string;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
