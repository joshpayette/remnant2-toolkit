'use server'

import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { CreatedBuilds } from '@/features/profile/components/CreatedBuilds'

export default async function Page() {
  return (
    <>
      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters key="user-created-builds-filters" />
      </div>
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatedBuilds itemsPerPage={15} />
      </div>
    </>
  )
}
