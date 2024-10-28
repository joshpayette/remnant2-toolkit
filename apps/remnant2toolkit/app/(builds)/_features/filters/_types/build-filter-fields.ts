import type { FilterOption } from '@repo/ui';

export interface BuildFilterFields {
  amulets: FilterOption[];
  archetypes: FilterOption[];
  patchAffected: string;
  relics: FilterOption[];
  rings: FilterOption[];
  searchText: string;
  withQuality: string;
  withVideo: string;
  withReference: string;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
