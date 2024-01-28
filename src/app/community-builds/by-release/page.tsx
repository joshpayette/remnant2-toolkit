'use client'

import BuildCard from '@/features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import PageHeader from '@/features/ui/PageHeader'
import usePagination from '@/features/pagination/hooks/usePagination'
import { DBBuild } from '@/features/build/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBuildsByRelease } from '@/features/build/actions/getBuildsByRelease'
import BuildListFilters from '@/features/build/components/BuildListFilters'
import ByReleaseBuildFilters, {
  ByReleaseFilters,
  DEFAULT_BY_RELEASE_FILTERS,
} from '@/features/filters/components/ByReleaseBuildFilters'

export type SortFilter = 'date created' | 'upvotes'

const itemsPerPage = 24
const sortFilterOptions: SortFilter[] = ['date created', 'upvotes']

export default function Page() {
  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sortFilter, setSortFilter] = useState<SortFilter>('upvotes')
  const [byReleaseFilters, setByReleaseFilters] = useState<ByReleaseFilters>(
    DEFAULT_BY_RELEASE_FILTERS,
  )

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: totalBuildCount,
    itemsPerPage,
  })

  useEffect(() => {
    async function getItemsAsync() {
      const response = await getBuildsByRelease({
        itemsPerPage,
        pageNumber: currentPage,
        sortFilter,
        byReleaseFilters,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }

    getItemsAsync()
  }, [currentPage, sortFilter, byReleaseFilters])

  function handleSortFilterChange(filter: string) {
    setSortFilter(filter as SortFilter)
  }

  function handleChangeFilters(filters: ByReleaseFilters) {
    setByReleaseFilters(filters)
  }

  return (
    <>
      <PageHeader
        title="Builds By Release"
        subtitle="Browse all community builds that contain only items from specific releases"
      />

      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <ByReleaseBuildFilters onUpdate={handleChangeFilters} />
      </div>

      <BuildList
        label="Build Results"
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        isLoading={isLoading}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <BuildListFilters
            filter={sortFilter}
            onFilterChange={handleSortFilterChange}
            options={sortFilterOptions}
          />
        }
      >
        {builds.map((build) => (
          <div key={build.id} className="h-full w-full">
            <BuildCard
              build={build}
              onReportBuild={undefined}
              footerActions={
                <div className="flex items-center justify-end gap-2 p-2 text-sm">
                  <Link
                    href={`/builder/${build.id}`}
                    className="relative inline-flex items-center justify-center gap-x-3 rounded-br-lg border border-transparent p-4 text-sm font-semibold text-green-500 hover:text-green-700 hover:underline"
                  >
                    View Build
                  </Link>
                </div>
              }
            />
          </div>
        ))}
      </BuildList>
    </>
  )
}
