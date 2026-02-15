import type { BuildCollection } from '@/prisma';

export type BuildCollectionWithBuilds = BuildCollection & {
  builds: { id: string }[];
};
