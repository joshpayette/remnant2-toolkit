import { capitalize } from '@repo/utils';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { type ItemTrackerFilters } from '@/app/(items)/_components/filters/item-tracker/types';
import { type Item } from '@/app/(items)/_types/item';
import { BIOMES } from '@/app/(items)/_types/locations';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants';

export function getFilteredItemList(
  filters: ItemTrackerFilters,
  discoveredItemIds: string[],
): Array<Item & { discovered: boolean }> {
  let filteredItems = ALL_TRACKABLE_ITEMS.map((i) => {
    return {
      ...i,
      discovered: discoveredItemIds.includes(i.id),
    };
  });

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

  // if search text is not empty, filter by search text
  if (filters.searchText.length > 0) {
    filteredItems = filteredItems.filter((i) =>
      i.name.toLowerCase().includes(filters.searchText.toLowerCase()),
    );
  }

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
