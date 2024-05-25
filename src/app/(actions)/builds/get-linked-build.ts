'use server'

import { DBBuild } from '@/app/(types)/builds'
import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'
import { DEFAULT_DISPLAY_NAME } from '@/app/profile/[userId]/(lib)/constants'

export default async function getLinkedBuild(linkedBuildId: string): Promise<{
  status: 'success' | 'error'
  message: string
  linkedBuild?: {
    id: string
    createdById: string
    label: string
    linkedBuilds: Array<{
      label: string
      build: DBBuild
    }>
  }
  createdByDisplayName?: string
}> {
  const session = await getServerSession()
  const userId = session?.user?.id

  try {
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
      linkedBuild: {
        id: linkedBuild.id,
        createdById: linkedBuild.createdById,
        label: linkedBuild.label,
        linkedBuilds: linkedBuild.LinkedBuildItems.filter(
          (linkedBuildItem) => linkedBuildItem.Build.isPublic,
        ).map((linkedBuildItem) => {
          const build = linkedBuildItem.Build
          return {
            label: linkedBuildItem.label,
            build: {
              id: build.id,
              name: build.name,
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
              createdByDisplayName:
                build.createdBy.displayName ||
                build.createdBy.name ||
                DEFAULT_DISPLAY_NAME,
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
      createdByDisplayName,
    }
  } catch (e) {
    console.error(e)
    return { status: 'error', message: 'Error fetching linked build.' }
  }
}
