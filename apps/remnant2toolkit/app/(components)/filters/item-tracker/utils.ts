import { capitalize } from '@repo/utils';
import { type ReadonlyURLSearchParams } from 'next/navigation';

import { VALID_DISCOVERED_FILTERS } from '@/app/(components)/filters/discovered-filter';
import { VALID_ITEM_CATEGORIES } from '@/app/(components)/filters/item-tracker/categories-filter';
import {
  ITEM_TRACKER_KEYS,
  type ItemTrackerFilters,
} from '@/app/(components)/filters/item-tracker/types';
import { VALID_RELEASE_KEYS } from '@/app/(components)/filters/releases-filter';
import { DEFAULT_FILTER } from '@/app/(components)/filters/types';
import { type Item } from '@/app/(data)/items/types';
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem';
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem';
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem';
import {
  BIOMES,
  LABYRINTH_DUNGEONS,
  LOSOMN_DUNGEONS,
  NERUD_DUNGEONS,
  ROOT_EARTH_DUNGEONS,
  YAESHA_DUNGEONS,
} from '@/app/(features)/items/types/locations';
import { ALL_TRACKABLE_ITEMS } from '@/app/tracker/constants';
import { type ItemTrackerCategory } from '@/app/tracker/types';

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): ItemTrackerFilters {
  const parsedParams = new URLSearchParams(searchParams);

  // validate the provided categories
  let categories =
    parsedParams.get(ITEM_TRACKER_KEYS.CATEGORIES)?.split(',') ||
    VALID_ITEM_CATEGORIES;
  // If categories is the default, convert it to an array
  // Else ensure that the categories provided are valid
  if (categories.length > 0) {
    categories = categories.filter((category) =>
      (VALID_ITEM_CATEGORIES as string[]).includes(category),
    );
  }

  // validate the provided collections
  let collections =
    parsedParams.get(ITEM_TRACKER_KEYS.COLLECTIONS)?.split(',') || [];
  // If collections is the default, convert it to an array
  // Else ensure that the collections provided are valid
  if (collections.length === 0) {
    collections = VALID_DISCOVERED_FILTERS;
  } else {
    collections = collections.filter((collection) =>
      VALID_DISCOVERED_FILTERS.includes(collection),
    );
    // If no collections, set to default
    if (collections.length === 0) {
      collections = VALID_DISCOVERED_FILTERS;
    }
  }

  // validate the provided releases
  let releases = parsedParams.get(ITEM_TRACKER_KEYS.RELEASES)?.split(',') || [];
  // If releases is the default, convert it to an array
  // Else ensure that the releases provided are valid
  if (releases.length === 0) {
    releases = VALID_RELEASE_KEYS;
  } else {
    releases = releases.filter((release) =>
      VALID_RELEASE_KEYS.includes(release),
    );
    // If no releases, set to default
    if (releases.length === 0) {
      releases = VALID_RELEASE_KEYS;
    }
  }

  const world = parsedParams.get(ITEM_TRACKER_KEYS.WORLD) || DEFAULT_FILTER;
  let dungeon = parsedParams.get(ITEM_TRACKER_KEYS.DUNGEON) || DEFAULT_FILTER;

  // if the dungeon doesn't match the world, set it to default
  if (dungeon !== DEFAULT_FILTER && dungeon !== 'World Drop') {
    switch (world) {
      case 'Losomn':
        if (!(LOSOMN_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER;
        }
        break;
      case `N'Erud`:
        if (!(NERUD_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER;
        }
        break;
      case 'Yaesha':
        if (!(YAESHA_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER;
        }
        break;
      case 'Root Earth':
        if (!(ROOT_EARTH_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER;
        }
        break;
      case 'Labyrinth':
        if (!(LABYRINTH_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER;
        }
        break;
      default:
        dungeon = DEFAULT_FILTER;
        break;
    }
  }

  // validate the provided searchText
  const searchText = parsedParams.get(ITEM_TRACKER_KEYS.SEARCHTEXT) || '';

  return {
    categories,
    collections,
    releases,
    searchText,
    world,
    dungeon,
  };
}

export function getCategoryProgressStats({
  filteredItems,
  discoveredItemIds,
}: {
  filteredItems: Item[];
  discoveredItemIds: string[];
}) {
  const undiscoveredCount = filteredItems.reduce(
    (acc, item) => (discoveredItemIds.includes(item.id) ? acc : acc + 1),
    0,
  );
  const filteredItemsCount = filteredItems.length;
  const discoveredCount = filteredItemsCount - undiscoveredCount;

  return {
    discoveredCount,
    undiscoveredCount,
    filteredItemsCount,
  };
}

export function getCategoryProgressLabel({
  filteredItems,
  discoveredItemIds,
}: {
  filteredItems: Item[];
  discoveredItemIds: string[];
}) {
  const { discoveredCount, undiscoveredCount, filteredItemsCount } =
    getCategoryProgressStats({ filteredItems, discoveredItemIds });
  return `${((discoveredCount / filteredItemsCount) * 100).toFixed(
    2,
  )}% (${undiscoveredCount} undiscovered)`;
}

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

export function getFilteredItemCategories(
  filteredItems: Array<Item & { discovered: boolean }>,
): ItemTrackerCategory[] {
  const filteredItemCategories: ItemTrackerCategory[] = [];

  const helmItemsFound = filteredItems.some((item) => item.category === 'helm');
  if (helmItemsFound) filteredItemCategories.push('Helm');

  const torsoItemsFound = filteredItems.some(
    (item) => item.category === 'torso',
  );
  if (torsoItemsFound) filteredItemCategories.push('Torso');

  const legsItemsFound = filteredItems.some((item) => item.category === 'legs');
  if (legsItemsFound) filteredItemCategories.push('Legs');

  const glovesItemsFound = filteredItems.some(
    (item) => item.category === 'gloves',
  );
  if (glovesItemsFound) filteredItemCategories.push('Gloves');

  const amuletItemsFound = filteredItems.some(
    (item) => item.category === 'amulet',
  );
  if (amuletItemsFound) filteredItemCategories.push('Amulet');

  const ringItemsFound = filteredItems.some((item) => item.category === 'ring');
  if (ringItemsFound) filteredItemCategories.push('Ring');

  const relicItemsFound = filteredItems.some(
    (item) => item.category === 'relic',
  );
  if (relicItemsFound) filteredItemCategories.push('Relic');

  const relicFragmentItemsFound = filteredItems.some(
    (item) => item.category === 'relicfragment',
  );
  if (relicFragmentItemsFound) filteredItemCategories.push('Relic Fragment');

  const archetypeItemsFound = filteredItems.some(
    (item) => item.category === 'archetype',
  );
  if (archetypeItemsFound) filteredItemCategories.push('Archetype');

  const traitItemsFound = filteredItems.some(
    (item) => item.category === 'trait',
  );
  if (traitItemsFound) filteredItemCategories.push('Trait');

  const longGunItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun',
  );
  if (longGunItemsFound) filteredItemCategories.push('Long Gun');

  const handGunItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun',
  );
  if (handGunItemsFound) filteredItemCategories.push('Hand Gun');

  const meleeItemsFound = filteredItems.some(
    (item) => WeaponItem.isWeaponItem(item) && item.type === 'melee',
  );
  if (meleeItemsFound) filteredItemCategories.push('Melee');

  const modItemsFound = filteredItems.some((item) => item.category === 'mod');
  if (modItemsFound) filteredItemCategories.push('Mod');

  const mutatorGunItemsFound = filteredItems.some(
    (item) => MutatorItem.isMutatorItem(item) && item.type === 'gun',
  );
  if (mutatorGunItemsFound) filteredItemCategories.push('Mutator (Gun)');

  const mutatorMeleeItemsFound = filteredItems.some(
    (item) => MutatorItem.isMutatorItem(item) && item.type === 'melee',
  );
  if (mutatorMeleeItemsFound) filteredItemCategories.push('Mutator (Melee)');

  const concoctionItemsFound = filteredItems.some(
    (item) => item.category === 'concoction',
  );
  if (concoctionItemsFound) filteredItemCategories.push('Concoction');

  const consumableItemsFound = filteredItems.some(
    (item) => item.category === 'consumable',
  );
  if (consumableItemsFound) filteredItemCategories.push('Consumable');

  return filteredItemCategories;
}

export function getFilteredItemsForCategory(
  items: Array<Item & { discovered: boolean }>,
  itemCategory: ItemTrackerCategory,
): Array<Item & { discovered: boolean }> {
  return items
    .filter((item) => {
      if (itemCategory === 'Long Gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'long gun';
      }
      if (itemCategory === 'Hand Gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'hand gun';
      }
      if (itemCategory === 'Melee') {
        return WeaponItem.isWeaponItem(item) && item.type === 'melee';
      }
      if (itemCategory === 'Mutator (Gun)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'gun';
      }
      if (itemCategory === 'Mutator (Melee)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'melee';
      }
      if (itemCategory === 'Relic Fragment') {
        return item.category.toLowerCase() === 'relicfragment';
      }
      return item.category.toLowerCase() === itemCategory.toLowerCase();
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
}
