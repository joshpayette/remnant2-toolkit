'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { PageHeader } from '@/features/ui/PageHeader'

import { CommunityBuildList } from './CommunityBuilds'

export default function Page({ totalBuildCount }: { totalBuildCount: number }) {
  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

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
        <BuildListFilters filters={buildListFilters} />
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
