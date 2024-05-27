'use server'

import type { Build } from '@prisma/client'

import type { LinkedBuildState } from '@/app/(types)/linked-builds'
import { prisma } from '@/app/(utils)/db'
import { DEFAULT_DISPLAY_NAME } from '@/app/profile/[userId]/(lib)/constants'

export default async function getLinkedBuilds({
  buildId,
  userId,
  itemsPerPage,
  pageNumber,
}: {
  buildId: string | undefined
  userId: string
  itemsPerPage: number
  pageNumber: number
}): Promise<{
  status: 'success' | 'error'
  message: string
  linkedBuilds: LinkedBuildState[]
  totalCount: number
  requestedBuildName?: string
}> {
  try {
    // delete all linkedBuildItems that are not public attached to linkedBuilds
    // created by userId
    await prisma.linkedBuildItems.deleteMany({
      where: {
        linkedBuild: {
          createdById: userId,
        },
        NOT: {
          Build: {
            isPublic: true,
          },
        },
      },
    })

    // if buildId is set, fetch the build
    let requestedBuild: Build | null | undefined = undefined
    if (buildId) {
      requestedBuild = await prisma.build.findFirst({
        where: {
          id: buildId,
          isPublic: true,
        },
      })

      if (!requestedBuild) {
        return {
          status: 'error',
          message: 'Specified build not found',
          linkedBuilds: [],
          totalCount: 0,
        }
      }
    }

    const [linkedBuilds, linkedBuildsCount] = await prisma.$transaction([
      prisma.linkedBuild.findMany({
        where: {
          createdById: userId,
          // only return the LinkedBuildItems where the linked build is public
          LinkedBuildItems: {
            some: {
              Build: {
                isPublic: true,
              },
            },
          },
          // if buildId is defined, return linkedBuilds where at least one linkedBuildItem has the buildId
          ...(buildId
            ? {
                LinkedBuildItems: {
                  some: {
                    buildId,
                  },
                },
              }
            : {}),
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
        orderBy: {
          name: 'asc',
        },
        skip: (pageNumber - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      prisma.linkedBuild.count({
        where: {
          createdById: userId,
          // only return the LinkedBuildItems where the linked build is public
          LinkedBuildItems: {
            some: {
              Build: {
                isPublic: true,
              },
            },
          },
          // if buildId is defined, return linkedBuilds where at least one linkedBuildItem has the buildId
          ...(buildId
            ? {
                LinkedBuildItems: {
                  some: {
                    buildId,
                  },
                },
              }
            : {}),
        },
      }),
    ])

    if (!linkedBuilds) {
      return {
        status: 'success',
        message: 'No linked builds found',
        linkedBuilds: [],
        totalCount: 0,
      }
    }

    const createdByDisplayName =
      linkedBuilds[0].createdBy?.displayName ?? DEFAULT_DISPLAY_NAME

    // Find out whether the user has upvoted the build
    const upvotes: Array<{ buildId: string; upvoted: boolean }> = []
    if (userId) {
      for (const linkedBuild of linkedBuilds) {
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
    }

    return {
      status: 'success',
      message: 'Successfully fetched linked builds.',
      totalCount: linkedBuildsCount,
      requestedBuildName: requestedBuild?.name ?? undefined,
      linkedBuilds: linkedBuilds.map((linkedBuild) => ({
        id: linkedBuild.id,
        createdById: linkedBuild.createdById,
        createdByDisplayName,
        createdAt: linkedBuild.createdAt,
        name: linkedBuild.name,
        description: linkedBuild.description ?? '',
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
              buildItems: [],
            },
          }
        }),
      })),
    }
  } catch (e) {
    console.error(e)
    return {
      status: 'error',
      message: 'Failed to fetch linked builds.',
      totalCount: 0,
      linkedBuilds: [],
    }
  }
}
