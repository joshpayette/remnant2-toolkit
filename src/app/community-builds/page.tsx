'use client'

// TODO move logic to CommunityBuildFilters to prevent full page rerender?

import Link from 'next/link'
import PageHeader from '../../features/ui/PageHeader'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import CommunityBuilds from './CommunityBuilds'
import CommunityBuildFilters from '@/features/filters/components/CommunityBuildFilters'
import getTotalBuildCount from '@/features/build/actions/getTotalBuildCount'
import useCommunityBuildFilters from '@/features/filters/hooks/useCommunityBuildFilters'

export default function Page() {
  const { data: sessionData } = useSession()
  const {
    areAnyFiltersActive,
    areFiltersApplied,
    communityBuildFilters,
    unappliedFilters,
    handleAmuletChange,
    handleApplyFilters,
    handleArchetypeChange,
    handleClearFilters,
    handleReleaseChange,
    handleRingChange,
    handleSearchTextChange,
    handleWeaponChange,
  } = useCommunityBuildFilters()

  const [totalBuildCount, setTotalBuildCount] = useState<number | string>(
    'HUNDREDS',
  )

  useEffect(() => {
    async function getBuildCountAsync() {
      const response = await getTotalBuildCount()
      setTotalBuildCount(response)
    }
    getBuildCountAsync()
  }, [])

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
      >
        <div className="flex items-center justify-center gap-x-4">
          {sessionData?.user ? (
            <Link
              className="rounded bg-purple-500 p-2 text-sm font-bold hover:bg-purple-700"
              href="/community-builds/by-collection"
            >
              Find builds by collection
            </Link>
          ) : (
            <button
              className="rounded bg-red-500 p-2 text-sm font-bold hover:bg-red-700"
              onClick={() => signIn()}
            >
              Sign in to find builds by collection
            </button>
          )}
        </div>
      </PageHeader>

      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <CommunityBuildFilters
          areAnyFiltersActive={areAnyFiltersActive}
          areFiltersApplied={areFiltersApplied}
          filters={unappliedFilters}
          onAmuletChange={handleAmuletChange}
          onApplyFilters={handleApplyFilters}
          onArchetypeChange={handleArchetypeChange}
          onClearFilters={handleClearFilters}
          onReleaseChange={handleReleaseChange}
          onRingChange={handleRingChange}
          onSearchTextChange={handleSearchTextChange}
          onWeaponChange={handleWeaponChange}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-2">
        <CommunityBuilds
          communityBuildFilters={communityBuildFilters}
          itemsPerPage={24}
        />
      </div>
    </>
  )
}
