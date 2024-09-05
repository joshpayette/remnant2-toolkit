import { type DBBuild } from '@/app/(builds)/_types/db-build';

export type LinkedBuildItem = {
  id?: string;
  label: string;
  build: DBBuild;
};
