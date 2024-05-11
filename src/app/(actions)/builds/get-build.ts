'use server'

import { DBBuild } from '@/app/(types)/builds'
import { ErrorResponse } from '@/app/(types)/error-response'
import { getServerSession } from '@/app/(utils)/auth'
import { bigIntFix } from '@/app/(utils)/big-int-fix'
import { prisma } from '@/app/(utils)/db'
import { DEFAULT_DISPLAY_NAME } from '@/app/profile/[userId]/(lib)/constants'

export async function getBuild(
  buildId: string,
): Promise<ErrorResponse | { message: string; build: DBBuild }> {
  if (!buildId) {
    console.info('No buildId provided!')
    return { errors: ['No buildId provided!'] }
  }

  const session = await getServerSession()

  const build = await prisma.build.findUnique({
    where: {
      id: buildId,
    },
    include: {
      createdBy: true,
      BuildVotes: true,
      BuildItems: true,
      BuildTags: true,
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
    dateFeatured: build.dateFeatured,
    isPatchAffected: build.isPatchAffected,
    isPublic: build.isPublic,
    thumbnailUrl: build.thumbnailUrl ?? '',
    videoUrl: build.videoUrl ?? '',
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

  const buildReported = await prisma.buildReports.findFirst({
    where: {
      buildId,
      userId: session?.user?.id,
    },
  })
  returnedBuild.reported = Boolean(buildReported)

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
}
