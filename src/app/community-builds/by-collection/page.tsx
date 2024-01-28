'use client'

import BuildCard from '@/features/build/components/BuildCard'
import BuildList from '@/features/build/components/BuildList'
import PageHeader from '@/features/ui/PageHeader'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import usePagination from '@/features/pagination/usePagination'
import { DBBuild } from '@/features/build/types'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getBuildsByCollection } from '@/features/build/actions/getBuildsByCollection'
import BuildListFilters from '@/features/build/components/BuildListFilters'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '@/features/filters/constants'

const ITEMS_PER_PAGE = 24

export type SortFilter = 'date created' | 'upvotes'
const sortFilterOptions: SortFilter[] = ['date created', 'upvotes']

export default function Page() {
  const { data: sessionData } = useSession()

  const [builds, setBuilds] = useState<DBBuild[]>([])
  const [totalBuildCount, setTotalBuildCount] = useState<number>(0)
  const [sortFilter, setSortFilter] = useState<SortFilter>('upvotes')
  const [communityBuildFilters, setCommunityBuildFilters] =
    useState<CommunityBuildFilterProps>(DEFAULT_COMMUNITY_BUILD_FILTERS)

  function handleChangeFilters(filters: CommunityBuildFilterProps) {
    setCommunityBuildFilters(filters)
  }
  const [isLoading, setIsLoading] = useState(true)

  const { discoveredItemIds } = useLocalStorage()

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
    itemsPerPage: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    async function getItemsAsync() {
      const response = await getBuildsByCollection({
        itemsPerPage: ITEMS_PER_PAGE,
        pageNumber: currentPage,
        sortFilter,
        discoveredItemIds,
        communityBuildFilters,
      })
      setBuilds(response.items)
      setTotalBuildCount(response.totalItemCount)
      setIsLoading(false)
    }
    getItemsAsync()
  }, [currentPage, communityBuildFilters, sortFilter, discoveredItemIds])

  function handleSortFilterChange(filter: string) {
    setSortFilter(filter as SortFilter)
  }

  if (!sessionData?.user) {
    return (
      <>
        <PageHeader
          title="Builds By Collection"
          subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
        >
          <button
            className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
            onClick={() => signIn()}
          >
            Sign in to find builds by collection
          </button>
        </PageHeader>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Builds By Collection"
        subtitle="Browse all community builds that contain only items in your collection, based on the data in the Item Tracker."
      />

      <div className="mb-8 flex w-full max-w-xl items-center justify-center">
        <CommunityBuildFilters onUpdate={handleChangeFilters} />
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
