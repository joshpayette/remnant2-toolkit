import { type DBBuild } from '@/app/(builds)/_types/db-build';

export interface BuildListResponse {
  builds: DBBuild[];
  totalBuildCount: number;
}
