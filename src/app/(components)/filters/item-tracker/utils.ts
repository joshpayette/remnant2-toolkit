import { ReadonlyURLSearchParams } from 'next/navigation'

import { VALID_DISCOVERED_FILTERS } from '@/app/(components)/filters/discovered-filter'
import { VALID_ITEM_CATEGORIES } from '@/app/(components)/filters/item-tracker/categories-filter'
import {
  ITEM_TRACKER_KEYS,
  ItemTrackerFilters,
} from '@/app/(components)/filters/item-tracker/types'
import { VALID_RELEASE_KEYS } from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { Item } from '@/app/(data)/items/types'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import {
  LABYRINTH_DUNGEONS,
  LOSOMN_DUNGEONS,
  NERUD_DUNGEONS,
  ROOT_EARTH_DUNGEONS,
  YAESHA_DUNGEONS,
} from '@/app/(types)/locations'
import { ItemTrackerCategory } from '@/app/tracker/types'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): ItemTrackerFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // validate the provided categories
  let categories =
    parsedParams.get(ITEM_TRACKER_KEYS.CATEGORIES)?.split(',') ||
    VALID_ITEM_CATEGORIES
  // If categories is the default, convert it to an array
  // Else ensure that the categories provided are valid
  if (categories.length > 0) {
    categories = categories.filter((category) =>
      VALID_ITEM_CATEGORIES.includes(category),
    )
  }

  // validate the provided collections
  let collections =
    parsedParams.get(ITEM_TRACKER_KEYS.COLLECTIONS)?.split(',') || []
  // If collections is the default, convert it to an array
  // Else ensure that the collections provided are valid
  if (collections.length === 0) {
    collections = VALID_DISCOVERED_FILTERS
  } else {
    collections = collections.filter((collection) =>
      VALID_DISCOVERED_FILTERS.includes(collection),
    )
    // If no collections, set to default
    if (collections.length === 0) {
      collections = VALID_DISCOVERED_FILTERS
    }
  }

  // validate the provided releases
  let releases = parsedParams.get(ITEM_TRACKER_KEYS.RELEASES)?.split(',') || []
  // If releases is the default, convert it to an array
  // Else ensure that the releases provided are valid
  if (releases.length === 0) {
    releases = VALID_RELEASE_KEYS
  } else {
    releases = releases.filter((release) =>
      VALID_RELEASE_KEYS.includes(release),
    )
    // If no releases, set to default
    if (releases.length === 0) {
      releases = VALID_RELEASE_KEYS
    }
  }

  const world = parsedParams.get(ITEM_TRACKER_KEYS.WORLD) || DEFAULT_FILTER
  let dungeon = parsedParams.get(ITEM_TRACKER_KEYS.DUNGEON) || DEFAULT_FILTER

  // if the dungeon doesn't match the world, set it to default
  if (dungeon !== DEFAULT_FILTER && dungeon !== 'World Drop') {
    switch (world) {
      case 'Losomn':
        if (!(LOSOMN_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER
        }
        break
      case `N'Erud`:
        if (!(NERUD_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER
        }
        break
      case 'Yaesha':
        if (!(YAESHA_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER
        }
        break
      case 'Root Earth':
        if (!(ROOT_EARTH_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER
        }
        break
      case 'Labyrinth':
        if (!(LABYRINTH_DUNGEONS as string[]).includes(dungeon)) {
          dungeon = DEFAULT_FILTER
        }
        break
      default:
        dungeon = DEFAULT_FILTER
        break
    }
  }

  // validate the provided searchText
  const searchText = parsedParams.get(ITEM_TRACKER_KEYS.SEARCHTEXT) || ''

  return {
    categories,
    collections,
    releases,
    searchText,
    world,
    dungeon,
  }
}

export function getFilteredItemsForCategory(
  items: Array<Item & { discovered: boolean }>,
  itemCategory: ItemTrackerCategory,
): Array<Item & { discovered: boolean }> {
  return items
    .filter((item) => {
      if (itemCategory === 'long gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'long gun'
      }
      if (itemCategory === 'hand gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'hand gun'
      }
      if (itemCategory === 'melee') {
        return WeaponItem.isWeaponItem(item) && item.type === 'melee'
      }
      if (itemCategory === 'mutator (gun)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'gun'
      }
      if (itemCategory === 'mutator (melee)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'melee'
      }
      if (itemCategory === 'relic fragment') {
        return item.category.toLowerCase() === 'relicfragment'
      }
      return item.category.toLowerCase() === itemCategory.toLowerCase()
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
}
