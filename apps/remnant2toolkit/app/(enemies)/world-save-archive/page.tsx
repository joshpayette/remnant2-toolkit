import { BaseLink, Skeleton } from '@repo/ui';
import { Suspense } from 'react';

import { PageHeader } from '@/app/_components/page-header';
import { WorldSaveFilters } from '@/app/(enemies)/world-save-archive/_components/world-save-filters';
import { WorldSaves } from '@/app/(enemies)/world-save-archive/_components/world-saves';
import { worldSaves } from '@/app/(enemies)/world-save-archive/_constants/world-saves';

export default function Page() {
  return (
    <>
      <PageHeader
        title="World Save Archive"
        subtitle={`A collection of ${worldSaves.length} curated world saves for apocalypse bosses with specific affixes.`}
      />
      <div className="flex max-w-xl flex-col items-start justify-center">
        <p className="text-md text-surface-solid mb-2">
          Before you start, it is important to understand how to back up your
          own world saves, and how to install the world saves provided by the
          Remnant 2 Toolkit.{' '}
        </p>
        <p className="text-md mb-2 text-red-500">
          It is possible to lose your Cass inventory and other progress. While
          restoring a backup save should fix this, at least one user stated it
          did not.
        </p>
        <p className="text-md text-surface-solid mb-4 font-bold">
          <BaseLink
            href="/world-save-archive/instructions"
            className="text-accent1-500 hover:text-accent1-300 underline"
          >
            Please click here for complete instructions.
          </BaseLink>
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
  );
}
