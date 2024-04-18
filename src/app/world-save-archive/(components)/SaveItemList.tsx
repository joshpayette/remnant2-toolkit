'use client'

import { useSearchParams } from 'next/navigation'

import { SaveCard } from '@/app/world-save-archive/(components)/SaveCard'
import { worldSaves } from '@/app/world-save-archive/(data)/worldSaves'
import { parseSearchFilters } from '@/app/world-save-archive/(lib)/parseSearchFilters'
import { BOSSES } from '@/app/world-save-archive/constants'
import { FilteredSave, SearchFilters } from '@/app/world-save-archive/types'

function getFilteredSaves(filters: SearchFilters): FilteredSave[] {
  let filteredSaves: FilteredSave[] = worldSaves.map((s) => {
    const bossItem = BOSSES.find((b) => b.name === s.bossName)
    return {
      ...s,
      imagePath: bossItem?.imagePath || '',
    }
  })

  if (filters.bossName && filters.bossName !== 'Choose') {
    filteredSaves = filteredSaves.filter(
      (save) => save.bossName === filters.bossName,
    )
  }

  if (filters.affixes.length > 0) {
    // Need to only get saves that have at least two of the affixes
    // If only one affix is in the filters.affixes, show all saves that have that affix
    filteredSaves = filteredSaves.filter((save) => {
      const matchingAffixes = save.bossAffixes.filter((affix) =>
        filters.affixes.includes(affix),
      )

      if (filters.affixes.length === 1) {
        return matchingAffixes.length > 0
      } else {
        return matchingAffixes.length >= 2
      }
    })
  }

  // sort by boss name
  filteredSaves.sort((a, b) => {
    if (a.bossName < b.bossName) return -1
    if (a.bossName > b.bossName) return 1
    return a.bossAffixes.join(',').localeCompare(b.bossAffixes.join(','))
  })

  return filteredSaves
}

interface Props {}

export function SaveItemList({}: Props) {
  const searchParams = useSearchParams()
  const filters = parseSearchFilters(searchParams)
  const filteredSaves = getFilteredSaves(filters)

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-auto p-4">
      {filteredSaves.length === worldSaves.length && (
        <h2 className="text-center text-2xl font-bold text-primary-500">
          Apply a filter to search the {worldSaves.length} world saves
        </h2>
      )}
      {filteredSaves.length === 0 && (
        <h2 className="text-center text-2xl font-bold text-primary-500">
          No items found
        </h2>
      )}

      {filteredSaves.length > 0 &&
        filteredSaves.length !== worldSaves.length && (
          <h2 className="my-4 text-2xl font-bold text-primary-500">
            World Saves ({filteredSaves.length} Results)
          </h2>
        )}

      {filteredSaves.length !== worldSaves.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredSaves.map((save) => (
            <SaveCard
              key={`${save.bossName}-${save.bossAffixes.join(',')}`}
              saveItem={save}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
