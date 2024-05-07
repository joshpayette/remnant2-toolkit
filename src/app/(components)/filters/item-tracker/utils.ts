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
import { ItemTrackerCategory } from '@/app/tracker/types'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): ItemTrackerFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // validate the provided categories
  let categories =
    parsedParams.get(ITEM_TRACKER_KEYS.CATEGORIES)?.split(',') || []
  // If categories is the default, convert it to an array
  // Else ensure that the categories provided are valid
  if (categories.length === 0) {
    categories = [DEFAULT_FILTER]
  } else {
    categories = categories.filter((category) =>
      VALID_ITEM_CATEGORIES.includes(category),
    )
    // If no categories, set to default
    if (categories.length === 0) {
      categories = [DEFAULT_FILTER]
    }
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

  // validate the provided searchText
  const searchText = parsedParams.get(ITEM_TRACKER_KEYS.SEARCHTEXT) || ''

  return {
    categories,
    collections,
    releases,
    searchText,
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
      return item.category.toLowerCase() === itemCategory.toLowerCase()
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
}
