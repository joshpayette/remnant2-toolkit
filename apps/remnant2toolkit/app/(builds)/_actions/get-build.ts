'use server';

import { prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';

import { type ErrorResponse } from '@/app/_types/error-response';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { DEFAULT_DISPLAY_NAME } from '@/app/(user)/profile/_constants/default-display-name';

export async function getBuild(
  buildId: string,
): Promise<ErrorResponse | { message: string; build: DBBuild }> {
  if (!buildId) {
    console.info('No buildId provided!');
    return { errors: ['No buildId provided!'] };
  }

  const session = await getSession();

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
        BuildVotes: true,
        BuildItems: true,
        BuildTags: true,
        BuildValidatedViews: true,
      },
    });

    if (!build) {
      return { errors: [`Build not found! ${buildId}`] };
    }

    const returnedBuild: DBBuild = {
      id: build.id,
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
      buildTags: build.BuildTags,
      buildLink: build.buildLink ?? '',
      createdAt: build.createdAt,
      updatedAt: build.updatedAt,
      createdById: build.createdById,
      createdByName: build.createdBy.name ?? '',
      createdByDisplayName:
        build.createdBy.displayName ||
        build.createdBy.name ||
        DEFAULT_DISPLAY_NAME,
      upvoted: false,
      totalUpvotes: build.BuildVotes.length,
      viewCount: build.viewCount,
      validatedViewCount: build.BuildValidatedViews.length,
      variantIndex: 0,
      duplicateCount: build.duplicateCount,
      buildItems: build.BuildItems,
      percentageOwned: 0, // TODO: Fix this
    };

    const [voteResult, isPaidUser] = await Promise.all([
      prisma.buildVoteCounts.findFirst({
        where: {
          buildId,
          userId: session?.user?.id,
        },
      }),
      prisma.paidUsers.findFirst({
        where: {
          userId: build.createdById,
        },
      }),
    ]);

    returnedBuild.upvoted = Boolean(voteResult);
    returnedBuild.isMember = Boolean(isPaidUser);

    // Check each BuildItem to see if it has an id
    // If so, check UserItems to see if the User owns it
    // Then set the isOwned property on the BuildItem to true or false
    for await (const buildItem of returnedBuild.buildItems) {
      if (!buildItem.id) {
        continue;
      }

      const userItem = session?.user?.id
        ? await prisma.userItems.findFirst({
            where: {
              userId: session?.user?.id,
              itemId: buildItem.itemId,
            },
          })
        : false;

      returnedBuild.buildItems = returnedBuild.buildItems.map((item) => {
        if (item.id === buildItem.id) {
          return {
            ...item,
            isOwned: Boolean(userItem),
          };
        }

        return item;
      });
    }

    if (returnedBuild.isPublic) {
      return { message: 'Successfully fetched build', build: returnedBuild };
    }

    if (!session || !session.user || build.createdBy.id !== session.user.id) {
      console.info(
        `You must be logged in as the build creator to view a private build. ${buildId}`,
      );
      return {
        errors: [
          'You must be logged in as the build creator to view a private build.',
        ],
      };
    }

    return bigIntFix({
      message: 'Successfully fetched build!',
      build: returnedBuild,
    });
  } catch (error) {
    console.error('Error fetching build', error);
    return { errors: ['Error fetching build'] };
  }
}
