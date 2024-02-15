'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { PageHeader } from '@/features/ui/PageHeader'

import { CommunityBuildList } from './CommunityBuilds'

export default function Page() {
  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

  const [totalBuildCount, setTotalBuildCount] = useState(0)

  useEffect(() => {
    async function fetchTotalBuildCount() {
      const response = await getTotalBuildCount()
      setTotalBuildCount(response)
    }
    fetchTotalBuildCount()
  })

  return (
    <>
      <PageHeader
        title="Community Builds"
        subtitle={
          <span>
            Search from{' '}
            <span className="text-2xl font-bold text-green-500">
              {totalBuildCount}
            </span>{' '}
            community submitted builds!
          </span>
        }
      />

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="community-build-filters"
        />
      </div>
      {buildListFilters && (
        <div className="grid w-full grid-cols-1 gap-2">
          <CommunityBuildList
            buildListFilters={buildListFilters}
            itemsPerPage={24}
          />
        </div>
      )}
    </>
  )
}
