import { ReadonlyURLSearchParams } from 'next/navigation'

import { DEFAULT_SEARCH_FILTERS } from '@/app/world-save-archive/(components)/SaveLookupFilters'
import {
  BossAffixName,
  BossName,
  SearchFilters,
} from '@/app/world-save-archive/types'

export function parseSearchFilters(
  searchParams: ReadonlyURLSearchParams,
): SearchFilters {
  const params = new URLSearchParams(searchParams)
  let affixes = params.get('affixes')
  let bossName = params.get('bossName')

  // check if affixes are valid
  if (affixes) {
    const allAffixes: BossAffixName[] = DEFAULT_SEARCH_FILTERS['affixes']
    const affixesArray = affixes.split(',')
    affixesArray.forEach((affix) => {
      if (!allAffixes.includes(affix as BossAffixName)) {
        affixes = DEFAULT_SEARCH_FILTERS['affixes'].join(',')
      }
    })
  }

  return {
    affixes: affixes
      ? (affixes.split(',') as BossAffixName[])
      : DEFAULT_SEARCH_FILTERS['affixes'],
    bossName: (bossName as BossName) || DEFAULT_SEARCH_FILTERS['bossName'],
  }
}
