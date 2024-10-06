'use client';

import { BaseButton } from '@repo/ui';
import { capitalize } from '@repo/utils';
import isEqual from 'lodash.isequal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIsClient } from 'usehooks-ts';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { ItemListGrid } from '@/app/(items)/_components/item-list-grid';
import { allItems } from '@/app/(items)/_constants/all-items';
import { archetypeItems } from '@/app/(items)/_constants/archetype-items';
import { perkItems } from '@/app/(items)/_constants/perk-items';
import { skillItems } from '@/app/(items)/_constants/skill-items';
import { useDiscoveredItems } from '@/app/(items)/_hooks/use-discovered-items';
import { type Item } from '@/app/(items)/_types/item';
import { BIOMES } from '@/app/(items)/_types/locations';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { itemMatchesSearchText } from '@/app/(items)/_utils/item-matches-search-text';
import { DEFAULT_ITEM_LOOKUP_FILTERS } from '@/app/(items)/item-lookup/_components/item-lookup-filters';
import { parseUrlFilters } from '@/app/(items)/item-lookup/_lib/parse-url-filters';
import { type ItemLookupFilters } from '@/app/(items)/item-lookup/_types/item-lookup-filters';

const allItemsWithDiscovered = allItems.map((item) => ({
  ...item,
  discovered: false,
}));

function getFilteredItems(
  filters: ItemLookupFilters,
  discoveredItemIds: string[],
): Array<Item & { discovered: boolean }> {
  let filteredItems = allItemsWithDiscovered.map((item) => ({
    ...item,
    discovered: discoveredItemIds.includes(item.id),
  }));

  // Loop over each archetype, and if it is discovered, then mark the
  // associated skills and perks as discovered
  for (const archetypeItem of archetypeItems) {
    const isDiscovered = filteredItems.find((i) => i.id === archetypeItem.id)
      ?.discovered;
    if (!isDiscovered) {
      continue;
    }

    if (
      !archetypeItem.linkedItems?.skills ||
      !archetypeItem.linkedItems?.perks
    ) {
      continue;
    }

    for (const skill of archetypeItem.linkedItems.skills) {
      const skillItem = skillItems.find((i) => i.name === skill.name);
      if (skillItem) {
        filteredItems = filteredItems.map((i) =>
          i.id === skillItem.id ? { ...i, discovered: true } : i,
        );
      }
    }

    for (const perk of archetypeItem.linkedItems.perks) {
      const perkItem = perkItems.find((i) => i.name === perk.name);
      if (perkItem) {
        filteredItems = filteredItems.map((i) =>
          i.id === perkItem.id ? { ...i, discovered: true } : i,
        );
      }
    }
  }

  // if categories are not default, filter by categories
  if (
    filters.categories.length > 0 &&
    !filters.categories.some((c) => c === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) => {
      if (item.category === undefined) {
        return true;
      }

      return filters.categories.some((itemCategory) => {
        if (itemCategory === 'Long Gun' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'long gun';
        }
        if (itemCategory === 'Hand Gun' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'hand gun';
        }
        if (itemCategory === 'Melee' && WeaponItem.isWeaponItem(item)) {
          return item.category === 'weapon' && item.type === 'melee';
        }
        if (
          itemCategory === 'Mutator (Gun)' &&
          MutatorItem.isMutatorItem(item)
        ) {
          return item.category === 'mutator' && item.type === 'gun';
        }
        if (
          itemCategory === 'Mutator (Melee)' &&
          MutatorItem.isMutatorItem(item)
        ) {
          return item.category === 'mutator' && item.type === 'melee';
        }
        if (
          itemCategory === 'Relic Fragment' &&
          RelicFragmentItem.isRelicFragmentItem(item)
        ) {
          return item.category === 'relicfragment';
        }

        return capitalize(item.category) === itemCategory;
      });
    });
  }

  // if collections are not default, filter by collections
  if (
    filters.collections.length > 0 &&
    !filters.collections.some((c) => c === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) => {
      // If both filters are set, just return everything
      // if the undiscovered filter is set, show only undiscovered items
      // if the discovered filter is set, show only discovered items
      if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Discovered') &&
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Undiscovered')
      ) {
        return true;
      } else if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Undiscovered')
      ) {
        return item.discovered === false;
      } else if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Discovered')
      ) {
        return item.discovered === true;
      } else {
        return false;
      }
    });
  }

  // if releases are not default, filter by releases
  if (
    filters.releases.length > 0 &&
    !filters.releases.some((r) => r === DEFAULT_FILTER)
  ) {
    filteredItems = filteredItems.filter((item) =>
      filters.releases
        .filter((release) => release !== DEFAULT_FILTER)
        .includes(item.dlc),
    );
  }

  // filter by world
  if (filters.world !== DEFAULT_FILTER) {
    filteredItems = filteredItems.filter(
      (item) => item.location?.world === filters.world,
    );
  }

  // filter by dungeon
  if (filters.dungeon !== DEFAULT_FILTER) {
    if (filters.dungeon.includes('World Drop')) {
      filteredItems = filteredItems.filter(
        (item) =>
          (item.location?.dungeon === 'World Drop') !==
          filters.dungeon.startsWith('Not'),
      );
    } else {
      filteredItems = filteredItems.filter((item) => {
        if (!item.location) return false;

        if (item.location.dungeon) {
          if (!Array.isArray(item.location.dungeon)) {
            return false;
          }

          return item.location.dungeon.some((d) => d === filters.dungeon);
        } else {
          const itemBiome = item.location.biome;
          const biome = BIOMES.find((biome) => biome.name === itemBiome);
          return biome?.dungeons.some((dungeon) => dungeon === filters.dungeon);
        }
      });
    }
  }

  // Filter by search text
  filteredItems = filteredItems.filter((item) =>
    itemMatchesSearchText({ item, searchText: filters.searchText }),
  );

  // Sort alphabetically by item.category and item.name
  filteredItems = filteredItems.sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return filteredItems;
}

export function ItemList() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(parseUrlFilters(searchParams));

  const [areFiltersApplied, setAreFiltersApplied] = useState(
    !isEqual(filters, DEFAULT_ITEM_LOOKUP_FILTERS),
  );

  useEffect(() => {
    const newFilters = parseUrlFilters(searchParams);
    setFilters(newFilters);
    if (!isEqual(newFilters, DEFAULT_ITEM_LOOKUP_FILTERS)) {
      setAreFiltersApplied(true);
    }
  }, [searchParams]);

  const { discoveredItemIds } = useDiscoveredItems();
  const filteredItems = getFilteredItems(filters, discoveredItemIds);

  const isClient = useIsClient();

  // #region Render

  return (
    <div className="mt-2 flex w-full items-center justify-center">
      {!areFiltersApplied || !isClient ? (
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h2 className="text-primary-500 mt-4 text-center text-2xl font-bold">
            Apply a filter, or...
          </h2>
          <BaseButton onClick={() => setAreFiltersApplied(true)}>
            Show All Items
          </BaseButton>
        </div>
      ) : (
        <ItemListGrid
          label={`Items (${filteredItems.length} Total)`}
          items={filteredItems}
          allowItemCompare={true}
        />
      )}
    </div>
  );
}
