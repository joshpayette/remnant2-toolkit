import type { FilterOption } from '@repo/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';
import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';

interface Props {
  defaultFilters?: BuildFilterFields;
  searchParams: ReadonlyURLSearchParams;
}

export function parseUrlParams({
  defaultFilters = DEFAULT_BUILD_FIELDS,
  searchParams,
}: Props) {
  const parsedParams = new URLSearchParams(searchParams);

  const archetypesParam = parsedParams.get('archetypes')?.split(',');
  const searchTextParam =
    parsedParams.get('searchText') || defaultFilters.searchText;

  let archetypes: FilterOption[] = [...defaultFilters.archetypes];
  if (archetypesParam) {
    for (const archetypeId of archetypesParam) {
      const cleanArchetypeId = archetypeId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const archetypeItem = archetypeItems.find(
        (item) => item.id === cleanArchetypeId,
      );
      if (!archetypeItem) continue;

      // Check if the exclusion symbol is found
      if (archetypeId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.id) {
            return {
              ...archetype,
              state: 'excluded',
            };
          }
          return archetype;
        });
      } else {
        archetypes = archetypes.map((archetype) => {
          if (archetype.value === archetypeItem.id) {
            return {
              ...archetype,
              state: 'included',
            };
          }
          return archetype;
        });
      }
    }
  }

  const searchText = searchTextParam;

  return {
    archetypes,
    searchText,
  };
}
