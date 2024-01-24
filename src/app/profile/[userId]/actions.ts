'use server'

import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { prisma } from '@/features/db/lib/db'
import { bigIntFix } from '@/lib/utils'
import { ErrorResponse } from '@/types'
import { DBBuild } from '@/features/build/types'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { User, UserProfile } from '@prisma/client'

export async function getProfile(userId: string): Promise<
  | ErrorResponse
  | {
      message: string
      user: User
      profile: UserProfile
    }
> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return {
      errors: [`User with id ${userId} not found`],
    }
  }

  let profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  })

  if (!profile) {
    // create a new profile
    profile = await prisma.userProfile.create({
      data: {
        userId,
        bio: '',
      },
    })
  }

  return {
    message: 'User found',
    user,
    profile,
  }
}

export type BuildsFilter = 'date created' | 'upvotes'

export async function getUserProfilePage({
  itemsPerPage,
  pageNumber,
  filter,
  userId,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: BuildsFilter
  userId: string
}): Promise<
  PaginationResponse<DBBuild> & { user: User | null; totalFavorites: number }
> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      PaidUsers: true, // Include the related PaidUsers record
      UserProfile: true,
    },
  })

  if (!user) {
    return {
      items: [],
      totalItemCount: 0,
      totalFavorites: 0,
      user: null,
    }
  }

  const builds =
    filter === 'date created'
      ? await prisma.build.findMany({
          where: {
            createdById: userId,
            isPublic: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            createdBy: {
              include: {
                PaidUsers: true, // Include the related PaidUsers record
              },
            },
            BuildVotes: true,
            BuildReports: true,
            BuildItems: true,
          },
          take: itemsPerPage,
          skip: (pageNumber - 1) * itemsPerPage,
        })
      : await prisma.build.findMany({
          where: {
            createdById: userId,
            isPublic: true,
          },
          orderBy: {
            BuildVotes: {
              _count: 'desc',
            },
          },
          include: {
            createdBy: {
              include: {
                PaidUsers: true, // Include the related PaidUsers record
              },
            },
            BuildVotes: true,
            BuildReports: true,
            BuildItems: true,
          },
          take: itemsPerPage,
          skip: (pageNumber - 1) * itemsPerPage,
        })

  if (!builds) {
    return {
      items: [],
      totalItemCount: 0,
      totalFavorites: 0,
      user: null,
    }
  }

  const totalBuildCount = await prisma.build.count({
    where: {
      createdById: userId,
      isPublic: true,
    },
  })

  const totalFavorites = await prisma.buildVoteCounts.aggregate({
    _count: {
      _all: true,
    },
    where: {
      build: {
        createdById: userId,
        isPublic: true,
      },
    },
  })

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length,
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId),
    reported: build.BuildReports.some((report) => report.userId === userId),
    isMember: build.createdBy.PaidUsers.length > 0,
    buildItems: build.BuildItems,
  }))

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
    totalFavorites: totalFavorites._count._all,
    user,
  })
}
