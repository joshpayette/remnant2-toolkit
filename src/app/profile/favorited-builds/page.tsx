'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { FavoritedBuilds } from '@/features/profile/components/FavoritedBuilds'

const ITEMS_PER_PAGE = 16

export default function Page() {
  const searchParams = useSearchParams()
  const buildListFilters = parseBuildListFilters(searchParams)

  return (
    <>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="user-favorited-builds-filters"
        />
      </div>
      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <FavoritedBuilds
            buildListFilters={buildListFilters}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      )}
    </>
  )
}
