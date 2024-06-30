'use client'

import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'

import { BuildFilters } from '@/app/(components)/filters/builds/build-filters'
import { BuildListFilters } from '@/app/(components)/filters/builds/types'
import { CreatedBuilds } from '@/app/profile/[userId]/created-builds/created-builds'

const buildFilters: Partial<BuildListFilters> = {
  patchAffected: true,
}

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const [loadingResults, setLoadingResults] = useState(false)

  const handleToggleLoadingResults = useCallback(
    () => setLoadingResults((prev) => !prev),
    [],
  )

  const { data: session, status } = useSession()
  const isEditable = session?.user?.id === userId

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center sm:mb-6">
        <BuildFilters
          key="user-created-builds-filters"
          buildFiltersOverrides={buildFilters}
          loadingResults={loadingResults}
        />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuilds
          isEditable={isEditable}
          userId={userId}
          buildFiltersOverrides={buildFilters}
          onToggleLoadingResults={handleToggleLoadingResults}
        />
      </div>
    </>
  )
}
