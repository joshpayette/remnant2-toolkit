'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { getBuildsByCollection } from '@/features/build/actions/getBuildsByCollection'
import { BuildCard } from '@/features/build/components/BuildCard'
import { BuildList } from '@/features/build/components/BuildList'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { useBuildListState } from '@/features/build/hooks/useBuildListState'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { BuildListSecondaryFilters } from '@/features/filters/components/BuildListSecondaryFilters'
import { useBuildListSecondaryFilters } from '@/features/filters/hooks/useBuildListSecondaryFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { saveDiscoveredItemIds } from '@/features/items/actions/saveDiscoveredItemIds'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { usePagination } from '@/features/pagination/usePagination'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'

import { CollectionBuilds } from './CollectionBuilds'

const ITEMS_PER_PAGE = 24

export default function Page() {
  const { data: sessionData } = useSession()

  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

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

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="by-collection-filters"
        />
      </div>

      {buildListFilters && (
        <CollectionBuilds
          buildListFilters={buildListFilters}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </>
  )
}
