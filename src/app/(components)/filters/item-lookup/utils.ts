import { ReadonlyURLSearchParams } from 'next/navigation'

import { VALID_DISCOVERED_FILTERS } from '@/app/(components)/filters/discovered-filter'
import { VALID_ITEM_CATEGORIES } from '@/app/(components)/filters/item-lookup/categories-filter'
import {
  ITEM_FILTER_KEYS,
  ItemLookupFilters,
} from '@/app/(components)/filters/item-lookup/types'
import { VALID_RELEASE_KEYS } from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import { VALID_WORLDS } from '@/app/(components)/filters/worlds-filter'
import { allItems } from '@/app/(data)/items/all-items'
import { ITEM_TOKENS } from '@/app/(types)/tokens'

export function buildAutoCompleteSuggestions(): Array<{
  id: string
  name: string
}> {
  let items = allItems
    // Remove relic fragments
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }))

  // add item tags
  items = ITEM_TOKENS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  })).concat(items)

  items = items.sort((a, b) => a.name.localeCompare(b.name))

  // remove duplicates
  items = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.name === item.name),
  )

  return items
}

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): ItemLookupFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // validate the provided categories
  let categories =
    parsedParams.get(ITEM_FILTER_KEYS.CATEGORIES)?.split(',') || []
  // If categories is the default, convert it to an array
  // Else ensure that the categories provided are valid
  if (categories.length > 0) {
    categories = categories.filter((category) =>
      VALID_ITEM_CATEGORIES.includes(category),
    )
  }

  // validate the provided collections
  let collections =
    parsedParams.get(ITEM_FILTER_KEYS.COLLECTIONS)?.split(',') || []
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
  let releases = parsedParams.get(ITEM_FILTER_KEYS.RELEASES)?.split(',') || []
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

  let worlds = parsedParams.get(ITEM_FILTER_KEYS.WORLDS)?.split(',') || []
  // If worlds is the default, convert it to an array
  // Else ensure that the worlds provided are valid
  if (worlds.length === 0) {
    worlds = [DEFAULT_FILTER]
  } else {
    worlds = worlds.filter((world) =>
      (VALID_WORLDS as string[]).includes(world),
    )
    // If no worlds, set to default
    if (worlds.length === 0) {
      worlds = [DEFAULT_FILTER]
    }
  }

  // validate the provided searchText
  const searchText = parsedParams.get(ITEM_FILTER_KEYS.SEARCHTEXT) || ''

  return {
    categories,
    collections,
    releases,
    searchText,
    worlds,
  }
}
