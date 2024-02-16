'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'

import { CommunityBuildList } from './CommunityBuilds'
import { CommunityBuildsPageHeader } from './CommunityBuildsPageHeader'

export default function Page() {
  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

  return (
    <>
      <CommunityBuildsPageHeader />

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="community-build-filters"
        />
      </div>
      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <CommunityBuildList
            buildListFilters={buildListFilters}
            itemsPerPage={24}
          />
        </div>
      )}
    </>
  )
}
