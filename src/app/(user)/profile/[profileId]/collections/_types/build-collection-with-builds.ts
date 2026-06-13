import type { BuildCollection } from '@/lib/db';

export type BuildCollectionWithBuilds = BuildCollection & {
  builds: { id: string }[];
};
