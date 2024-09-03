import { type DBBuild } from '@/app/(builds)/_types/db-build';

export type CommunityBuildQueryResponse = Array<
  DBBuild & {
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
  }
>;
