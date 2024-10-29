import type { FilterOption } from '@repo/ui';

export interface BuildFilterFields {
  amulets: FilterOption[];
  archetypes: FilterOption[];
  handGuns: FilterOption[];
  longGuns: FilterOption[];
  melees: FilterOption[];
  releases: FilterOption[];
  relics: FilterOption[];
  rings: FilterOption[];
  searchText: string;
  withPatchAffected: string;
  withQuality: string;
  withVideo: string;
  withReference: string;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
