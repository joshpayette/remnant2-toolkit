'use server'

import { BuildListFilters } from '@/features/build/filters/BuildListFilters'
import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'
import { FavoritedBuilds } from '@/features/profile/components/FavoritedBuilds'

export default async function Page() {
  return (
    <>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters key="user-favorited-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <FavoritedBuilds itemsPerPage={DEFAULT_ITEMS_PER_PAGE} />
      </div>
    </>
  )
}
