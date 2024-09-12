import { type DBBuild } from '@/app/(builds)/_types/db-build';

export type LinkedBuildItem = {
  label: string;
  build: DBBuild;
};
