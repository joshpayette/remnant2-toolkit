import { DBBuild } from '@/app/(features)/builds/types/db-build';

export type LinkedBuildItem = {
  label: string;
  build: DBBuild;
};
