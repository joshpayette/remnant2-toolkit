'use server';

import { prisma } from '@repo/db';

import { type LinkedBuild } from '@/app/(builds)/builder/linked/_types/linked-build';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { DEFAULT_DISPLAY_NAME } from '@/app/(user)/profile/_constants/default-display-name';

export async function getLinkedBuild(linkedBuildId: string): Promise<{
  status: 'success' | 'error';
  message: string;
  linkedBuildState?: LinkedBuild;
}> {
  const session = await getSession();
  const userId = session?.user?.id;

  try {
    // delete all linkedBuildItems that are not public
    await prisma.linkedBuildItems.deleteMany({
      where: {
        linkedBuildId,
        NOT: {
          Build: {
            isPublic: true,
          },
        },
      },
    });

    const linkedBuild = await prisma.linkedBuild.findUnique({
      where: {
        id: linkedBuildId,
      },
      include: {
        LinkedBuildItems: {
          include: {
            Build: {
              include: {
                createdBy: true,
                BuildVotes: true,
                BuildItems: true,
                BuildTags: true,
                BuildValidatedViews: true,
              },
            },
          },
        },
        createdBy: {
          select: {
            displayName: true,
          },
        },
      },
    });

    if (!linkedBuild) {
      return { status: 'error', message: 'Linked build not found.' };
    }

    const createdByDisplayName =
      linkedBuild?.createdBy?.displayName ?? DEFAULT_DISPLAY_NAME;

    const publicLinkedBuilds = linkedBuild.LinkedBuildItems.filter(
      (linkedBuildItem) => linkedBuildItem.Build.isPublic,
    );

    // Check each BuildItem in each publicLinkedBuild to see if it has an id
    // if so, check UserItems to see if the User owns it
    // then set the isOwned property on the BuildItem to true or false
    for await (const [index, linkedBuild] of publicLinkedBuilds.entries()) {
      for await (const buildItem of linkedBuild.Build.BuildItems) {
        if (!buildItem.id) {
          continue;
        }

        const userItem = await prisma.userItems.findFirst({
          where: {
            userId,
            itemId: buildItem.itemId,
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (publicLinkedBuilds[index] as any).Build.BuildItems =
          linkedBuild.Build.BuildItems.map((item) => {
            if (item.id === buildItem.id) {
              return {
                ...item,
                isOwned: Boolean(userItem),
              };
            }

            return item;
          });
      }
    }

    return {
      status: 'success',
      message: 'Linked build found.',
      linkedBuildState: {
        id: linkedBuild.id,
        createdById: linkedBuild.createdById,
        createdByDisplayName,
        createdAt: linkedBuild.createdAt,
        name: linkedBuild.name,
        description: linkedBuild.description ?? '',
        isModeratorLocked: linkedBuild.isModeratorLocked,
        linkedBuilds: publicLinkedBuilds.map((linkedBuildItem) => {
          const build = linkedBuildItem.Build;
          const upvoted = build.BuildVotes.some(
            (vote) => vote.userId === userId,
          );

          return {
            id: linkedBuildItem.id,
            label: linkedBuildItem.label,
            build: {
              id: build.id,
              name: build.name,
              createdByDisplayName,
              description: build.description ?? '',
              isMember: false,
              isFeaturedBuild: build.isFeaturedBuild,
              isBeginnerBuild: build.isBeginnerBuild,
              isBaseGameBuild: build.isBaseGameBuild,
              isGimmickBuild: build.isGimmickBuild,
              dateFeatured: build.dateFeatured,
              isPatchAffected: build.isPatchAffected,
              isPublic: build.isPublic,
              isModeratorApproved: build.isModeratorApproved,
              isModeratorLocked: build.isModeratorLocked,
              isVideoApproved: build.isVideoApproved,
              thumbnailUrl: build.thumbnailUrl ?? '',
              videoUrl: build.videoUrl ?? '',
              buildLinkUpdatedAt: build.buildLinkUpdatedAt,
              buildTags: build.BuildTags,
              buildLink: build.buildLink ?? '',
              createdAt: build.createdAt,
              updatedAt: build.updatedAt,
              createdById: build.createdById,
              createdByName: build.createdBy.name ?? '',
              upvoted,
              totalUpvotes: build.BuildVotes.length,
              viewCount: build.viewCount,
              validatedViewCount: build.BuildValidatedViews.length,
              duplicateCount: build.duplicateCount,
              reported: false,
              buildItems: build.BuildItems,
            },
          };
        }),
      },
    };
  } catch (e) {
    console.error(e);
    return { status: 'error', message: 'Error fetching linked build.' };
  }
}
