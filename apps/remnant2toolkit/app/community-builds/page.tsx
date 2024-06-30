'use client'

import { useCallback, useState } from 'react'

import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/app/(utils)/pagination/constants'

import { CommunityBuilds } from './community-builds'

export default function Page() {
  const [loadingResults, setLoadingResults] = useState(false)

  const handleToggleLoadingResults = useCallback(
    () => setLoadingResults((prev) => !prev),
    [],
  )

  return (
    <>
      <div className="flex w-full items-center justify-center sm:mb-6">
        <BuildFilters
          key="community-build-filters"
          loadingResults={loadingResults}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-2">
        <CommunityBuilds
          itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  )
}
