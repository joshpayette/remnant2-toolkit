'use server'

import { prisma } from '@repo/db'
import { bigIntFix } from '@repo/utils/big-int-fix'

import { DEFAULT_DISPLAY_NAME } from '@/app/(constants)/profile'
import { getSession } from '@/app/(features)/auth/services/sessionService'
import { DBBuild } from '@/app/(types)/builds'
import { ErrorResponse } from '@/app/(types)/error-response'

export async function getBuild(
  buildId: string,
): Promise<ErrorResponse | { message: string; build: DBBuild }> {
  if (!buildId) {
    console.info('No buildId provided!')
    return { errors: ['No buildId provided!'] }
  }

  const session = await getSession()

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
    })

    if (!build) {
      return { errors: [`Build not found! ${buildId}`] }
    }

    const returnedBuild: DBBuild = {
      id: build.id,
      name: build.name,
      description: build.description ?? '',
      isMember: false,
      isFeaturedBuild: build.isFeaturedBuild,
      isBeginnerBuild: build.isBeginnerBuild,
      isBaseGameBuild: build.isBaseGameBuild,
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
      duplicateCount: build.duplicateCount,
      reported: false,
      buildItems: build.BuildItems,
    }

    const voteResult = await prisma.buildVoteCounts.findFirst({
      where: {
        buildId,
        userId: session?.user?.id,
      },
    })
    returnedBuild.upvoted = Boolean(voteResult)

    const isPaidUser = await prisma.paidUsers.findFirst({
      where: {
        userId: build.createdById,
      },
    })
    returnedBuild.isMember = Boolean(isPaidUser)

    if (returnedBuild.isPublic) {
      return { message: 'Successfully fetched build', build: returnedBuild }
    }

    if (!session || !session.user || build.createdBy.id !== session.user.id) {
      console.info(
        `You must be logged in as the build creator to view a private build. ${buildId}`,
      )
      return {
        errors: [
          'You must be logged in as the build creator to view a private build.',
        ],
      }
    }

    return bigIntFix({
      message: 'Successfully fetched build!',
      build: returnedBuild,
    })
  } catch (error) {
    console.error('Error fetching build', error)
    return { errors: ['Error fetching build'] }
  }
}
