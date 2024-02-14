'use client'

import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { parseFiltersFromUrl } from '@/features/filters/lib/parseFiltersFromUrl'
import { ProfileHeader } from '@/features/profile/ProfileHeader'
import { Tabs } from '@/features/profile/Tabs'

import { FavoritedBuilds } from '../../../features/profile/FavoritedBuilds'

const ITEMS_PER_PAGE = 16

export default function Page() {
  const { data: sessionData } = useSession()

  const searchParams = useSearchParams()
  const buildListFilters = parseFiltersFromUrl(searchParams)

  return (
    <AuthWrapper>
      {sessionData?.user && (
        <ProfileHeader
          editable={true}
          userId={sessionData.user.id}
          image={sessionData.user.image}
        />
      )}
      <div className="mb-8 flex w-full flex-col items-center">
        <Tabs />
      </div>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          filters={buildListFilters}
          key="user-favorited-builds-filters"
        />
      </div>
      {buildListFilters && (
        <FavoritedBuilds
          buildListFilters={buildListFilters}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </AuthWrapper>
  )
}
