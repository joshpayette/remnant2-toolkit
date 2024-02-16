'use client'

import { useSearchParams } from 'next/navigation'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { UserProfile } from '@/features/profile/components/UserProfile'

const ITEMS_PER_PAGE = 16

export default function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

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
            itemsPerPage={ITEMS_PER_PAGE}
            userId={userId}
          />
        </div>
      )}
    </>
  )
}
