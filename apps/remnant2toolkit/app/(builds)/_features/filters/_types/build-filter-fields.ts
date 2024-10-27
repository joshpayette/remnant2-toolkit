import type { FilterOption } from '@repo/ui';

export interface BuildFilterFields {
  amulets: FilterOption[];
  archetypes: FilterOption[];
  rings: FilterOption[];
  searchText: string;
  patchAffected: string;
  withQuality: string;
  withVideo: string;
  withReference: string;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
