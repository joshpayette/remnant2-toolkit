import type { FilterOption } from '@repo/ui';
import type { ReadonlyURLSearchParams } from 'next/navigation';

import { EXCLUDE_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { BUILD_FILTER_FIELD_KEYS } from '@/app/(builds)/_features/new-filters/_constants/build-filter-field-keys';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';
import type { BuildFilterFields } from '@/app/(builds)/_features/new-filters/_types/build-filter-fields';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
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

  const archetypesParam = parsedParams
    .get(BUILD_FILTER_FIELD_KEYS.ARCHETYPES)
    ?.split(',');
  const amuletsParam = parsedParams
    .get(BUILD_FILTER_FIELD_KEYS.AMULETS)
    ?.split(',');
  const searchTextParam =
    parsedParams.get(BUILD_FILTER_FIELD_KEYS.SEARCH_TEXT) ||
    defaultFilters.searchText;

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

  let amulets: FilterOption[] = [...defaultFilters.amulets];
  if (amuletsParam) {
    for (const amuletId of amuletsParam) {
      const cleanAmuletId = amuletId.replace(EXCLUDE_ITEM_SYMBOL, '');
      const amuletItem = amuletItems.find((item) => item.id === cleanAmuletId);
      if (!amuletItem) continue;

      // Check if the exclusion symbol is found
      if (amuletId.startsWith(EXCLUDE_ITEM_SYMBOL)) {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.id) {
            return {
              ...amulet,
              state: 'excluded',
            };
          }
          return amulet;
        });
      } else {
        amulets = amulets.map((amulet) => {
          if (amulet.value === amuletItem.id) {
            return {
              ...amulet,
              state: 'included',
            };
          }
          return amulet;
        });
      }
    }
  }

  const searchText = searchTextParam;

  return {
    archetypes,
    amulets,
    searchText,
  };
}
