'use server'

import { prisma } from '@repo/db'

import { DEFAULT_DISPLAY_NAME } from '@/app/(constants)/profile'
import { getServerSession } from '@/app/(features)/auth'
import type { LinkedBuildState } from '@/app/(types)/linked-builds'

export default async function getLinkedBuild(linkedBuildId: string): Promise<{
  status: 'success' | 'error'
  message: string
  linkedBuildState?: LinkedBuildState
}> {
  const session = await getServerSession()
  const userId = session?.user?.id

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
    })

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
    })

    if (!linkedBuild) {
      return { status: 'error', message: 'Linked build not found.' }
    }

    const createdByDisplayName =
      linkedBuild?.createdBy?.displayName ?? DEFAULT_DISPLAY_NAME

    // Find out whether the user has upvoted the build
    const upvotes: Array<{ buildId: string; upvoted: boolean }> = []
    if (userId) {
      for (const linkedBuildItem of linkedBuild.LinkedBuildItems) {
        const build = await prisma.buildVoteCounts.findFirst({
          where: {
            buildId: linkedBuildItem.buildId,
            userId: userId,
          },
        })

        if (build) {
          upvotes.push({ buildId: linkedBuildItem.buildId, upvoted: true })
        }
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
        linkedBuildItems: linkedBuild.LinkedBuildItems.filter(
          (linkedBuildItem) => linkedBuildItem.Build.isPublic,
        ).map((linkedBuildItem) => {
          const build = linkedBuildItem.Build
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
              upvoted: upvotes.some(
                (upvote) => upvote.buildId === build.id && upvote.upvoted,
              ),
              totalUpvotes: build.BuildVotes.length,
              reported: false,
              buildItems: build.BuildItems,
            },
          }
        }),
      },
    }
  } catch (e) {
    console.error(e)
    return { status: 'error', message: 'Error fetching linked build.' }
  }
}
