'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { Skeleton } from '@/features/ui/Skeleton'

import { CommunityBuildList } from './CommunityBuilds'
import { CommunityBuildsPageHeader } from './CommunityBuildsPageHeader'

export default function Page() {
  const searchParams = useSearchParams()
  const buildListFilters = parseBuildListFilters(searchParams)

  return (
    <>
      <CommunityBuildsPageHeader />

      {/* <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="community-build-filters"
        />
      </div> */}

      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        {buildListFilters ? (
          <CommunityBuildList
            buildListFilters={buildListFilters}
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          />
        ) : (
          <Skeleton className="min-h-[1100px] w-full" />
        )}
      </div>
    </>
  )
}
