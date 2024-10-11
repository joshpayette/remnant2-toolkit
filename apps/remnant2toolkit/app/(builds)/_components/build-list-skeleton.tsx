import { getArrayOfLength } from '@repo/utils';

import { DEFAULT_ITEMS_PER_PAGE } from '@/app/_constants/pagination';
import { BuildCardSkeleton } from '@/app/(builds)/_components/build-card-skeleton';

export function BuildListSkeleton() {
  return (
    <ul
      role="list"
      className="mb-4 mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {getArrayOfLength(DEFAULT_ITEMS_PER_PAGE).map((_, index) => (
        <BuildCardSkeleton key={index} />
      ))}
    </ul>
  );
}
