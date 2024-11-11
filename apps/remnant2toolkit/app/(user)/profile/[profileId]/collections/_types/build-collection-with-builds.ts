import type { BuildCollection } from '@repo/db';

export type BuildCollectionWithBuilds = BuildCollection & {
  builds: { id: string }[];
};
