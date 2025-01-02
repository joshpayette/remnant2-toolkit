'use server';

import { BaseLink, Skeleton } from '@repo/ui';
import { getArrayOfLength } from '@repo/utils';
import { Suspense } from 'react';

import { QualityBuildFeedInfoDialog } from '@/app/(builds)/_components/quality-build-feed-info-dialog';
import { QualityBuildFeedItems } from '@/app/(builds)/_components/quality-build-feed-items';

export async function QualityBuildFeed() {
  return (
    <>
      <div className="border-b-primary-500 flex w-full flex-row items-end justify-center border-b py-2">
        <div className="flex w-full flex-row justify-between text-xl sm:justify-start sm:gap-x-4">
          Latest Quality Builds
          <QualityBuildFeedInfoDialog />
        </div>
      </div>

      <ul
        role="list"
        className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Suspense
          fallback={getArrayOfLength(4).map((_, index) => (
            <Skeleton className="h-[440px] w-[263px]" key={index} />
          ))}
        >
          <QualityBuildFeedItems />
        </Suspense>
      </ul>

      <div className="flex w-full flex-row items-end justify-end">
        <BaseLink href="/community-builds" className="text-sm underline">
          View more quality builds
        </BaseLink>
      </div>
    </>
  );
}
