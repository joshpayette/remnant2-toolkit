import { getImageUrl } from '@repo/ui/utils/get-image-url'
import { ReadonlyURLSearchParams } from 'next/navigation'

import { VALID_RELEASE_KEYS } from '@/app/(components)/filters/releases-filter'
import { DEFAULT_FILTER } from '@/app/(components)/filters/types'
import {
  WORLD_SAVE_FILTER_KEYS,
  WorldSaveFilters,
} from '@/app/(components)/filters/world-saves/types'
import { ALL_BOSSES } from '@/app/(data)/world-saves/constants'

export function parseUrlFilters(
  searchParams: ReadonlyURLSearchParams,
): WorldSaveFilters {
  const parsedParams = new URLSearchParams(searchParams)

  // Validate the provided boss name
  let bossName = parsedParams.get(WORLD_SAVE_FILTER_KEYS.BOSSNAME) || 'All'
  const bossNameIsValid =
    bossName === DEFAULT_FILTER || ALL_BOSSES.some((b) => b.name === bossName)
  if (!bossNameIsValid) {
    bossName = DEFAULT_FILTER
  }

  // Validate the provided boss affixes
  let bossAffixes =
    parsedParams.get(WORLD_SAVE_FILTER_KEYS.BOSSAFFIXES)?.split(',') ||
    DEFAULT_FILTER
  // If boss affixes is the default, convert it to an array
  // Else ensure that the boss affixes provided are valid
  if (bossAffixes === DEFAULT_FILTER) {
    bossAffixes = [DEFAULT_FILTER]
  } else {
    bossAffixes = (bossAffixes as string[]).filter((affix) => affix.length > 0)
    // If no boss affixes, set to default
    if (bossAffixes.length === 0) {
      bossAffixes = [DEFAULT_FILTER]
    }
  }

  // validate the provided releases
  let releases =
    parsedParams.get(WORLD_SAVE_FILTER_KEYS.RELEASES)?.split(',') || []
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

  return {
    bossName,
    bossAffixes,
    releases,
  }
}

export function getDownloadUrl(bossName: string, bossAffixes: string[]) {
  const url = getImageUrl(`/remnant2/world-save-archive/`)

  const cleanBossName = bossName
    // replace apostrophes with empty string
    .replace(/'/g, '')
    // replace commas with empty string
    .replace(/,/g, '')
    // replace colons with empty string
    .replace(/:/g, '')
    // replace spaces with underscores
    .replace(/ /g, '_')
    // replace open parentheses with empty string
    .replace(/\(/g, '')
    // replace close parentheses with empty string
    .replace(/\)/g, '')
    .toLowerCase()

  const cleanAffixes = bossAffixes
    .join(',')
    // replace spaces with underscores
    .replace(/ /g, '_')
    .toLowerCase()

  return `${url}${cleanBossName}/${
    cleanAffixes ? `${cleanAffixes}/` : ''
  }save_0.sav`
}
