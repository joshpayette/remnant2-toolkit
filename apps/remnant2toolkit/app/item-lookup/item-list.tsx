'use client';

import { BaseButton } from '@repo/ui/base/button';
import { capitalize } from '@repo/utils/capitalize';
import isEqual from 'lodash.isequal';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';

import { DEFAULT_ITEM_LOOKUP_FILTERS } from '@/app/(components)/filters/item-lookup/item-lookup-filters';
import { ItemLookupFilters } from '@/app/(components)/filters/item-lookup/types';
import { parseUrlFilters } from '@/app/(components)/filters/item-lookup/utils';
import { DEFAULT_FILTER } from '@/app/(components)/filters/types';
import { MasonryItemList } from '@/app/(components)/masonry-item-list';
import { allItems } from '@/app/(data)/items/all-items';
import { Item } from '@/app/(data)/items/types';
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem';
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem';
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem';
import { BIOMES } from '@/app/(features)/items/types/locations';
import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage';
import { itemMatchesSearchText } from '@/app/(utils)/items/item-matches-search-text';

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
        // If the item is a mod, we want to show if the linked weapon is undiscovered
        // If the item is a skill or perk, we want to show if the linked archetype is undiscovered
        if (item.category === 'mod') {
          const linkedWeapon = filteredItems.find(
            (i) => i.name === item.linkedItems?.weapon?.name,
          );
          return linkedWeapon?.discovered === false;
        } else if (item.category === 'skill' || item.category === 'perk') {
          const linkedArchetype = filteredItems.find(
            (i) => i.name === item.linkedItems?.archetype?.name,
          );
          return linkedArchetype?.discovered === false;
        } else {
          return item.discovered === false;
        }
      } else if (
        filters.collections
          .filter((i) => i !== DEFAULT_FILTER)
          .includes('Discovered')
      ) {
        // If the item is a mod, we want to show if the linked weapon is discovered
        // If the item is a skill or perk, we want to show if the linked archetype is discovered
        if (item.category === 'mod') {
          const linkedWeapon = filteredItems.find(
            (i) => i.name === item.linkedItems?.weapon?.name,
          );
          return linkedWeapon?.discovered === true;
        } else if (item.category === 'skill' || item.category === 'perk') {
          const linkedArchetype = filteredItems.find(
            (i) => i.name === item.linkedItems?.archetype?.name,
          );

          return linkedArchetype?.discovered === true;
        } else {
          return item.discovered === true;
        }
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
    if (filters.dungeon === 'World Drop') {
      filteredItems = filteredItems.filter(
        (item) => item.location?.dungeon === 'World Drop',
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
    setFilters(parseUrlFilters(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!isEqual(filters, DEFAULT_ITEM_LOOKUP_FILTERS)) {
      setAreFiltersApplied(true);
    }
  }, [filters]);

  const [tracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  );
  const { discoveredItemIds } = tracker;

  const filteredItems = getFilteredItems(filters, discoveredItemIds);

  const isClient = useIsClient();

  // #region Render

  return !areFiltersApplied || !isClient ? (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h2 className="text-primary-500 mt-4 text-center text-2xl font-bold">
        Apply a filter, or...
      </h2>
      <BaseButton onClick={() => setAreFiltersApplied(true)}>
        Show All Items
      </BaseButton>
    </div>
  ) : (
    <MasonryItemList
      key={uuidv4()}
      label={`Items (${filteredItems.length} Total)`}
      items={filteredItems}
      allowItemCompare={true}
    />
  );
}
