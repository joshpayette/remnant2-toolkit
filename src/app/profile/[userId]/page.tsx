'use server'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { UserProfile } from '@/features/profile/components/UserProfile'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return (
    <>
      <div className="mb-8 flex w-full max-w-2xl items-center justify-center">
        <BuildListFilters key="user-profile-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <UserProfile itemsPerPage={DEFAULT_ITEMS_PER_PAGE} userId={userId} />
      </div>
    </>
  )
}
