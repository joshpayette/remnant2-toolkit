import { type DBBuild } from '@/app/(builds)/_types/db-build';

export type DBBuildDetailed = DBBuild & {
  createdByDisplayName: string;
  createdByName: string;
  displayName: string;
  name: string;
  isMember: boolean;
  reported: boolean;
  totalUpvotes: number;
  totalReports: number;
  upvoted: boolean;
  validatedViews: number;
};
