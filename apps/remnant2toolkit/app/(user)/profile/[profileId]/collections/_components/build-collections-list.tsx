'use client';

import { BuildCollectionCard } from '@/app/(user)/profile/[profileId]/collections/_components/build-collection-card';
import type { BuildCollectionWithBuilds } from '@/app/(user)/profile/[profileId]/collections/_types/build-collection-with-builds';

interface Props {
  collections: BuildCollectionWithBuilds[];
}

export function BuildCollectionsList({ collections }: Props) {
  return (
    <ul
      role="list"
      className="mb-4 mt-8 grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {collections.map((collection) => (
        <BuildCollectionCard key={collection.id} collection={collection} />
      ))}
    </ul>
  );
}
