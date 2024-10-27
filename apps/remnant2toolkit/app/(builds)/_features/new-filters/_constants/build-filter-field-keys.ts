import type { BuildFilterFieldKey } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

export const BUILD_FILTER_FIELD_KEYS = {
  AMULETS: 'amulets',
  ARCHETYPES: 'archetypes',
  SEARCH_TEXT: 'searchText',
} as const satisfies Record<string, BuildFilterFieldKey>;
