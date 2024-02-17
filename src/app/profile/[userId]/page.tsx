'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseBuildListFilters } from '@/features/filters/lib/parseBuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { UserProfile } from '@/features/profile/components/UserProfile'

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const searchParams = useSearchParams()
  const buildListFilters = parseBuildListFilters(searchParams)

  return (
    <>
      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="user-profile-filters"
        />
      </div>
      {buildListFilters && (
        <div className="mb-4 grid w-full grid-cols-1 gap-2">
          <UserProfile
            buildListFilters={buildListFilters}
            itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
            userId={userId}
          />
        </div>
      )}
    </>
  )
}
