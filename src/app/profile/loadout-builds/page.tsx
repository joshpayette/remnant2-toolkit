import { Suspense } from 'react'

import { LoadoutBuilds } from '@/features/profile/loadouts/LoadoutBuilds'
import { Skeleton } from '@/features/ui/Skeleton'

export default async function Page() {
  return (
    <div className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<Skeleton className="h-full min-h-[362px] w-full" />}>
        <LoadoutBuilds />
      </Suspense>
    </div>
  )
}
