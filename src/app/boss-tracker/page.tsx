import { Suspense } from 'react'

import { BossTrackerFilters } from '@/app/(components)/filters/boss-tracker/boss-tracker-filters'
import { PageHeader } from '@/app/(components)/page-header'
import { Skeleton } from '@/app/(components)/skeleton'
import { BossList } from '@/app/boss-tracker/boss-list'

export default function Page() {
  return (
    <>
      <div className="flex w-full items-start justify-start sm:items-center sm:justify-center">
        <PageHeader
          title="Remnant 2 Boss Tracker"
          subtitle="Discover all the bosses in Remnant 2"
        />
      </div>
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <div className="w-full max-w-xl">
            <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
              <BossTrackerFilters />
            </Suspense>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <BossList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
