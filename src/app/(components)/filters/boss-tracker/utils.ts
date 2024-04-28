import { ReadonlyURLSearchParams } from 'next/navigation'

import { VALID_BOSS_CATEGORIES } from '@/app/(components)/filters/boss-tracker/categories-filter'
import {
  BOSS_TRACKER_KEYS,
  BossTrackerFilters,
} from '@/app/(components)/filters/boss-tracker/types'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): BossTrackerFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // validate the provided categories
  let categories =
    parsedParams.get(BOSS_TRACKER_KEYS.CATEGORIES)?.split(',') || []
  // If categories is the default, convert it to an array
  // Else ensure that the categories provided are valid
  if (categories.length === 0) {
    categories = [DEFAULT_FILTER]
  } else {
    categories = categories.filter((category) =>
      VALID_BOSS_CATEGORIES.includes(category),
    )
    // If no categories, set to default
    if (categories.length === 0) {
      categories = [DEFAULT_FILTER]
    }
  }

  // validate the provided searchText
  let searchText = parsedParams.get(BOSS_TRACKER_KEYS.SEARCHTEXT) || ''

  return {
    categories,
    searchText,
  }
}
