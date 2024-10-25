import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

import { archetypeFilter } from '../_libs/archetype-filter';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  archetypes: archetypeFilter.defaultValue,
  searchText: '',
};
