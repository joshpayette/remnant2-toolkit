import { type ReadonlyURLSearchParams } from 'next/navigation';

import { VALID_DISCOVERED_FILTERS } from '@/app/_components/discovered-filter';
import { VALID_RELEASE_KEYS } from '@/app/_components/releases-filter';
import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import type { ReleaseKey } from '@/app/_types/releases';
import {
  ITEM_TRACKER_KEYS,
  type ItemTrackerFilters,
} from '@/app/(items)/_components/filters/item-tracker/types';
import {
  LABYRINTH_DUNGEONS,
  LOSOMN_DUNGEONS,
  NERUD_DUNGEONS,
  ROOT_EARTH_DUNGEONS,
  YAESHA_DUNGEONS,
} from '@/app/(items)/_types/locations';
import { VALID_ITEM_CATEGORIES } from '@/app/(items)/item-tracker/_constants/valid-item-categories';

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
      VALID_RELEASE_KEYS.includes(release as ReleaseKey),
    );
    // If no releases, set to default
    if (releases.length === 0) {
      releases = VALID_RELEASE_KEYS;
    }
  }

  const world = parsedParams.get(ITEM_TRACKER_KEYS.WORLD) || DEFAULT_FILTER;
  let dungeon = parsedParams.get(ITEM_TRACKER_KEYS.DUNGEON) || DEFAULT_FILTER;

  // if the dungeon doesn't match the world, set it to default
  if (dungeon !== DEFAULT_FILTER && !dungeon.includes('World Drop')) {
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
