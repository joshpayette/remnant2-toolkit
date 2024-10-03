import { type Build, type BuildItems, type BuildTags } from '@repo/db';

export interface DBBuild {
  id: Build['id'];
  buildItems: Array<BuildItems & { isOwned?: boolean }>;
  buildTags: BuildTags[];
  buildLink: Build['buildLink'];
  buildLinkUpdatedAt: Build['buildLinkUpdatedAt'];
  createdAt: Build['createdAt'];
  createdById: Build['createdById'];
  createdByDisplayName: string;
  createdByName: string;
  dateFeatured: Build['dateFeatured'];
  description: Build['description'];
  duplicateCount: number;
  isBaseGameBuild: Build['isBaseGameBuild'];
  isBeginnerBuild: Build['isBeginnerBuild'];
  isFeaturedBuild: Build['isFeaturedBuild'];
  isGimmickBuild: Build['isGimmickBuild'];
  isMember: boolean;
  isModeratorApproved: Build['isModeratorApproved'];
  isModeratorLocked: Build['isModeratorLocked'];
  isPatchAffected: Build['isPatchAffected'];
  isPublic: Build['isPublic'];
  isVideoApproved: Build['isVideoApproved'];
  name: Build['name'];
  thumbnailUrl: Build['thumbnailUrl'];
  totalUpvotes: number;
  updatedAt: Build['updatedAt'];
  upvoted: boolean;
  validatedViewCount: number;
  variantIndex: number;
  videoUrl: Build['videoUrl'];
  viewCount: number;
  percentageOwned: number;
  buildVariantName?: string;
  totalVariants?: number;
}
