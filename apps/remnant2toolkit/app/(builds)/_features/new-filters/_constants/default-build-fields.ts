import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

export const DEFAULT_BUILD_FIELDS: BuildFilterFields = {
  archetypes: archetypeItems.map((item) => ({
    label: item.name,
    value: item.id,
    state: 'default',
  })),
  searchText: '',
};
