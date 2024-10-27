import { amuletFilter } from '@/app/(builds)/_features/new-filters/_libs/amulet-filter';
import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';

import { archetypeFilter } from '../_libs/archetype-filter';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  amulets: amuletFilter.defaultValue,
  archetypes: archetypeFilter.defaultValue,
  searchText: '',
};
