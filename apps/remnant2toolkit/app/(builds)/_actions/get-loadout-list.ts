'use server';

import { prisma } from '@repo/db';

import { getIsLoadoutPublic } from '@/app/(builds)/_actions/get-is-loadout-public';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { DEFAULT_DISPLAY_NAME } from '@/app/(user)/profile/_constants/default-display-name';

export async function getLoadoutList(userId?: string) {
  const session = await getSession();
  if (!session?.user?.id && !userId) {
    return [];
  }

  const userLoadoutBuildsResponse = await prisma.userLoadouts.findMany({
    where: {
      userId: userId || session?.user?.id,
    },
    include: {
      build: {
        include: {
          createdBy: true,
          BuildItems: true,
          BuildTags: true,
          BuildValidatedViews: true,
        },
      },
      user: true,
    },
    orderBy: {
      slot: 'asc',
    },
  });

  if (userId && session?.user?.id !== userId) {
    const isLoadoutPublic = await getIsLoadoutPublic(userId);
    if (!isLoadoutPublic && session?.user?.id !== userId) {
      return [];
    }
  }

  const buildVotesCounts = await Promise.all(
    userLoadoutBuildsResponse.map((loadout) =>
      prisma.buildVoteCounts.count({
        where: {
          buildId: loadout.build.id,
        },
      }),
    ),
  );

  const userLoadoutBuilds = userLoadoutBuildsResponse.map((loadout) =>
    loadout.build.isPublic || loadout.userId === session?.user?.id
      ? {
          id: loadout.build.id,
          name: loadout.build.name,
          description: loadout.build.description,
          isPublic: loadout.build.isPublic,
          isFeaturedBuild: loadout.build.isFeaturedBuild,
          dateFeatured: loadout.build.dateFeatured,
          isPatchAffected: loadout.build.isPatchAffected,
          isBeginnerBuild: loadout.build.isBeginnerBuild,
          isBaseGameBuild: loadout.build.isBaseGameBuild,
          isGimmickBuild: loadout.build.isGimmickBuild,
          isMember: false,
          isModeratorApproved: loadout.build.isModeratorApproved,
          isModeratorLocked: loadout.build.isModeratorLocked,
          isVideoApproved: loadout.build.isVideoApproved,
          thumbnailUrl: loadout.build.thumbnailUrl,
          videoUrl: loadout.build.videoUrl,
          buildLinkUpdatedAt: loadout.build.buildLinkUpdatedAt,
          buildTags: loadout.build.BuildTags,
          buildLink: loadout.build.buildLink,
          createdById: loadout.build.createdById,
          createdByName: loadout.build.createdBy.name || DEFAULT_DISPLAY_NAME,
          createdByDisplayName:
            loadout.build.createdBy.displayName ||
            loadout.build.createdBy.name ||
            DEFAULT_DISPLAY_NAME,
          createdAt: loadout.build.createdAt,
          updatedAt: loadout.build.updatedAt,
          variantIndex: 0,
          upvoted: true,
          totalUpvotes: buildVotesCounts.shift() || 0,
          viewCount: loadout.build.viewCount,
          validatedViewCount: loadout.build.BuildValidatedViews.length,
          duplicateCount: loadout.build.duplicateCount,
          buildItems: loadout.build.BuildItems,
          slot: loadout.slot,
        }
      : {
          id: loadout.build.id,
          name: 'Private Build',
          description: 'This build is marked private by the build creator.',
          isPublic: loadout.build.isPublic,
          isFeaturedBuild: false,
          dateFeatured: loadout.build.dateFeatured,
          isPatchAffected: loadout.build.isPatchAffected,
          isBeginnerBuild: false,
          isBaseGameBuild: false,
          isGimmickBuild: false,
          isMember: false,
          isModeratorApproved: loadout.build.isModeratorApproved,
          isModeratorLocked: loadout.build.isModeratorLocked,
          isVideoApproved: loadout.build.isVideoApproved,
          thumbnailUrl: '',
          videoUrl: '',
          buildLinkUpdatedAt: loadout.build.buildLinkUpdatedAt,
          buildTags: [],
          buildLink: '',
          createdById: loadout.build.createdById,
          createdByName: loadout.build.createdBy.name || DEFAULT_DISPLAY_NAME,
          createdByDisplayName:
            loadout.build.createdBy.displayName ||
            loadout.build.createdBy.name ||
            DEFAULT_DISPLAY_NAME,
          createdAt: loadout.build.createdAt,
          updatedAt: loadout.build.updatedAt,
          upvoted: true,
          variantIndex: 0,
          totalUpvotes: 0,
          viewCount: 0,
          validatedViewCount: 0,
          duplicateCount: 0,
          buildItems: [],
          slot: loadout.slot,
        },
  ) satisfies Array<DBBuild & { slot: number }>;

  return userLoadoutBuilds;
}
