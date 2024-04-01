import Link from 'next/link'
import { Suspense } from 'react'

import { SaveItemList } from '@/app/world-save-archive/(components)/SaveItemList'
import { SaveLookupFilters } from '@/app/world-save-archive/(components)/SaveLookupFilters'
import { worldSaves } from '@/app/world-save-archive/(data)/worldSaves'
import { PageHeader } from '@/features/ui/PageHeader'
import { Skeleton } from '@/features/ui/Skeleton'

export default function Page() {
  return (
    <>
      <PageHeader
        title="World Save Archive"
        subtitle={`A collection of ${worldSaves.length} curated world saves for apocalypse bosses with specific affixes.`}
      />
      <div className="flex max-w-xl flex-col items-start justify-center">
        <p className="text-md mb-2 text-white">
          Before you start, it is important to understand how to back up your
          own world saves, and how to install the world saves provided by the
          Remnant 2 Toolkit.{' '}
        </p>
        <p className="text-md mb-4 font-bold text-white">
          <Link
            href="/world-save-archive/instructions"
            className="text-accent1-500 underline hover:text-accent1-300"
          >
            Please click here for complete instructions.
          </Link>
        </p>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-xl">
          <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
            <SaveLookupFilters />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-center">
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <SaveItemList />
          </Suspense>
        </div>
      </div>
    </>
  )
}
