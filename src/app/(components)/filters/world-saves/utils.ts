import { ReadonlyURLSearchParams } from 'next/navigation'

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

  // Validate the provided releases
  let releases =
    parsedParams.get(WORLD_SAVE_FILTER_KEYS.RELEASES)?.split(',') ||
    DEFAULT_FILTER
  // If release is the default, convert it to an array
  // Else ensure that the release provided are valid
  if (releases === DEFAULT_FILTER) {
    releases = [DEFAULT_FILTER]
  } else {
    releases = (releases as string[]).filter((r) => r.length > 0)
    // If no release, set to default
    if (releases.length === 0) {
      releases = [DEFAULT_FILTER]
    }
  }

  return {
    bossName,
    bossAffixes,
    releases,
  }
}

export function getDownloadUrl(bossName: string, bossAffixes: string[]) {
  let url = `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/world-save-archive/`

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
