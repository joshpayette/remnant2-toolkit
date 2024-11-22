'use server';

import { type BuildCollection, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import type { ErrorResponse } from '@/app/_types/error-response';
import type { DBBuild } from '@/app/(builds)/_types/db-build';
import { DEFAULT_DISPLAY_NAME } from '@/app/(user)/profile/_constants/default-display-name';

export async function getBuildCollection(
  collectionId: string,
  profileId: string,
): Promise<
  | ErrorResponse
  | { message: string; collection: BuildCollection; builds: DBBuild[] }
> {
  if (!collectionId) {
    console.info('No collectionId provided!');
    return { errors: ['No collectionId provided!'] };
  }

  try {
    const collection = await prisma.buildCollection.findUnique({
      where: {
        id: collectionId,
        createdById: profileId,
      },
      include: {
        createdBy: true,
        BuildsToBuildCollections: {
          include: {
            build: true,
          },
        },
      },
    });

    if (!collection) {
      return { errors: [`Collection not found! ${collectionId}`] };
    }

    const builds: DBBuild[] = [];

    for await (const collectionItem of collection.BuildsToBuildCollections) {
      const build = collectionItem.build;

      const buildResponse = await prisma.build.findUnique({
        where: {
          id: build.id,
        },
        include: {
          createdBy: true,
          BuildVotes: true,
          BuildItems: true,
          BuildTags: true,
          BuildValidatedViews: true,
        },
      });

      if (!buildResponse) {
        console.error('Build not found:', build.id);
        continue;
      }

      // Need to determine if each build is a variant
      // If it is, we need to return the main build id, but set the variant
      const variantBuild = await prisma.buildVariant.findFirst({
        where: {
          secondaryBuildId: build.id,
        },
      });

      builds.push({
        id: variantBuild?.primaryBuildId ?? build.id,
        name: build.name,
        description: build.description ?? '',
        isMember: false,
        isFeaturedBuild: build.isFeaturedBuild,
        isBeginnerBuild: build.isBeginnerBuild,
        isBaseGameBuild: build.isBaseGameBuild,
        isGimmickBuild: build.isGimmickBuild,
        isVideoApproved: build.isVideoApproved,
        dateFeatured: build.dateFeatured,
        isPatchAffected: build.isPatchAffected,
        isPublic: build.isPublic,
        isModeratorApproved: build.isModeratorApproved,
        isModeratorLocked: build.isModeratorLocked,
        thumbnailUrl: build.thumbnailUrl ?? '',
        videoUrl: build.videoUrl ?? '',
        buildLinkUpdatedAt: build.buildLinkUpdatedAt,
        buildTags: buildResponse.BuildTags,
        buildLink: build.buildLink ?? '',
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
        createdById: build.createdById,
        createdByName: buildResponse.createdBy.name ?? '',
        createdByDisplayName:
          buildResponse.createdBy.displayName ||
          buildResponse.createdBy.name ||
          DEFAULT_DISPLAY_NAME,
        upvoted: false,
        totalUpvotes: buildResponse.BuildVotes.length,
        viewCount: build.viewCount,
        validatedViewCount: buildResponse.BuildValidatedViews.length,
        variantIndex: variantBuild?.index ?? 0,
        duplicateCount: build.duplicateCount,
        buildItems: buildResponse.BuildItems,
        percentageOwned: 0, // TODO: Fix
      });
    }

    return {
      message: 'Collection found!',
      collection,
      builds: bigIntFix(builds),
    };
  } catch (error) {
    console.error('Error getting collection:', error);
    return { errors: ['Error getting collection'] };
  }
}
