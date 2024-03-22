'use server'

import { Suspense } from 'react'

import { getServerSession } from '@/features/auth/lib'
import { BuildListFilters } from '@/features/build/filters/BuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { UserProfile } from '@/features/profile/components/UserProfile'
import { getIsLoadoutPublic } from '@/features/profile/loadouts/actions/getIsLoadoutPublic'
import { LoadoutBuilds } from '@/features/profile/loadouts/components/LoadoutBuilds'
import { LoadoutSkeleton } from '@/features/profile/loadouts/components/LoadoutSkeleton'
import { PublicProfileHeader } from '@/features/profile/loadouts/components/PublicProfileHeader'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isLoadoutPublic = await getIsLoadoutPublic(userId)

  return (
    <>
      {isLoadoutPublic ? (
        <div className="my-12 flex w-full items-center justify-center">
          <PublicProfileHeader userId={userId} />
        </div>
      ) : null}
      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <BuildListFilters key="user-profile-filters" />
      </div>
      <div id="createdBuilds" className="mb-4 grid w-full grid-cols-1 gap-2">
        <UserProfile itemsPerPage={DEFAULT_ITEMS_PER_PAGE} userId={userId} />
        {isLoadoutPublic ? (
          <div
            className="mt-12 flex flex-col items-start justify-center"
            id="loadouts"
          >
            <h3 className="mb-12 w-full border-b border-b-primary-500 pb-2 text-2xl">
              Loadouts
            </h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              <Suspense fallback={<LoadoutSkeleton />}>
                <LoadoutBuilds
                  userId={userId}
                  isEditable={session?.user?.id === userId}
                />
              </Suspense>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
