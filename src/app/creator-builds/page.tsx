'use client'

import { useSearchParams } from 'next/navigation'

import { FeaturedBuilds } from '@/app/creator-builds/FeaturedBuilds'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { PageHeader } from '@/features/ui/PageHeader'

export default function Page() {
  const searchParams = useSearchParams()
  const buildListFilters = parseBuildListFilters(searchParams)

  return (
    <>
      <PageHeader
        title="Featured builds"
        subtitle="Popular creator builds from the community"
      />

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="featured-build-filters"
        />
      </div>
      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <FeaturedBuilds
            buildListFilters={buildListFilters}
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          />
        </div>
      )}
    </>
  )
}
