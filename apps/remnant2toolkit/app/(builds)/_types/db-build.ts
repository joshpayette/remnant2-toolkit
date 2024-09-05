import { type Build, type BuildItems, type BuildTags } from '@repo/db';

export interface DBBuild {
  id: Build['id'];
  name: Build['name'];
  description: Build['description'];
  isPublic: Build['isPublic'];
  isFeaturedBuild: Build['isFeaturedBuild'];
  isBeginnerBuild: Build['isBeginnerBuild'];
  isBaseGameBuild: Build['isBaseGameBuild'];
  isGimmickBuild: Build['isGimmickBuild'];
  dateFeatured: Build['dateFeatured'];
  isPatchAffected: Build['isPatchAffected'];
  isMember: boolean;
  isModeratorApproved: Build['isModeratorApproved'];
  isModeratorLocked: Build['isModeratorLocked'];
  isVideoApproved: Build['isVideoApproved'];
  thumbnailUrl: Build['thumbnailUrl'];
  videoUrl: Build['videoUrl'];
  buildLinkUpdatedAt: Build['buildLinkUpdatedAt'];
  buildLink: Build['buildLink'];
  createdById: Build['createdById'];
  createdByName: string;
  createdByDisplayName: string;
  createdAt: Build['createdAt'];
  updatedAt: Build['updatedAt'];
  reported: boolean;
  upvoted: boolean;
  totalUpvotes: number;
  viewCount: number;
  validatedViewCount: number;
  duplicateCount: number;
  buildItems: Array<BuildItems & { isOwned?: boolean }>;
  buildTags: BuildTags[];
}
