import { Suspense } from 'react'

import { Link } from '@/app/(components)/_base/link'
import { WorldSaveFilters } from '@/app/(components)/filters/world-saves/world-save-filters'
import { worldSaves } from '@/app/(data)/world-saves/world-saves'
import { WorldSaves } from '@/app/world-save-archive/world-saves'
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
        <p className="text-md mb-2 text-on-background">
          Before you start, it is important to understand how to back up your
          own world saves, and how to install the world saves provided by the
          Remnant 2 Toolkit.{' '}
        </p>
        <p className="text-md mb-2 text-red-500">
          It is possible to lose your Cass inventory and other progress. While
          restoring a backup save should fix this, at least one user stated it
          did not.
        </p>
        <p className="text-md mb-4 font-bold text-on-background">
          <Link
            href="/world-save-archive/instructions"
            className="text-highlight-container underline hover:text-highlight"
          >
            Please click here for complete instructions.
          </Link>
        </p>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-xl">
          <Suspense fallback={<Skeleton className="h-[497px] w-full" />}>
            <WorldSaveFilters />
          </Suspense>
        </div>

        <div className="flex w-full items-center justify-center">
          <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <WorldSaves />
          </Suspense>
        </div>
      </div>
    </>
  )
}
