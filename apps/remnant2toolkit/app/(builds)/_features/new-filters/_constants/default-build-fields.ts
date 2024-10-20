import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  archetypes: {
    checked: archetypeItems.map((item) => item.id),
    excluded: [],
    unchecked: [],
  },
  searchText: '',
};
