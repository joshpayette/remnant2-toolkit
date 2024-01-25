'use server'

import { z } from 'zod'
import { getServerSession } from '../../features/auth/lib/auth'
import { ErrorResponse } from '../../types'
import { badWordsFilter } from '../../features/badwords/lib/badwords-filter'
import { prisma } from '../../features/db/lib/db'
import { PaginationResponse } from '../../features/pagination/hooks/usePagination'
import { DBBuild } from '../../features/build/types'
import {
  DEFAULT_DISPLAY_NAME,
  MAX_PROFILE_BIO_LENGTH,
} from '@/features/profile/constants'
import { bigIntFix } from '@/lib/bigIntFix'

export type CreatedBuildsFilter = 'date created' | 'upvotes'

export async function getCreatedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: CreatedBuildsFilter
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  // select all builds created by the user
  // including the total votes for each build
  const builds =
    filter === 'date created'
      ? await prisma.build.findMany({
          where: {
            createdById: userId,
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
    }
  }

  const totalBuildCount = await prisma.build.count({
    where: {
      createdById: userId,
    },
  })

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    videoUrl: build.videoUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      session?.user?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: build.createdBy.PaidUsers.length > 0, // Check if the user is a member
    buildItems: build.BuildItems,
  }))

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}

export type FavoritedBuildsFilter = 'date favorited' | 'upvotes'

export async function getFavoritedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: FavoritedBuildsFilter
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()

  const userId = session?.user?.id

  // find all builds that the user has favorited but are not created
  // by the user
  const builds =
    filter === 'date favorited'
      ? await prisma.build.findMany({
          where: {
            BuildVotes: {
              some: {
                userId,
              },
            },
            createdById: {
              not: userId,
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
          skip: (pageNumber - 1) * itemsPerPage,
          take: itemsPerPage,
        })
      : await prisma.build.findMany({
          where: {
            BuildVotes: {
              some: {
                userId,
              },
            },
            createdById: {
              not: userId,
            },
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
          skip: (pageNumber - 1) * itemsPerPage,
          take: itemsPerPage,
        })

  // get the total number of builds that match the conditions
  const totalBuildCount = await prisma.build.count({
    where: {
      BuildVotes: {
        some: {
          userId,
        },
      },
      createdById: {
        not: userId,
      },
    },
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    videoUrl: build.videoUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: build.createdBy.PaidUsers.length > 0, // Check if the user is a member
    buildItems: build.BuildItems,
  }))

  return bigIntFix({ items: returnedBuilds, totalItemCount: totalBuildCount })
}

export async function updateUserDisplayName(
  data: string,
): Promise<ErrorResponse | { message: string; updatedDisplayName?: string }> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // data validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      displayName: z
        .string()
        .min(1, { message: 'Display name is required.' })
        .max(50, {
          message: 'Display name cannot be longer than 50 characters.',
        }),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { displayName: dirtyDisplayName } = validatedData.data

  try {
    const displayName = badWordsFilter(dirtyDisplayName)

    const dbResponse = await prisma.user.update({
      where: { id: session.user.id },
      data: { displayName },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    return {
      message: 'Successfully updated user!',
      updatedDisplayName: dbResponse.displayName ?? '',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error updating user!'],
    }
  }
}

export async function updateUserBio(
  data: string,
): Promise<ErrorResponse | { message: string; updatedBio?: string }> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // data validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      bio: z
        .string()
        .min(5, { message: 'Bio is required.' })
        .max(MAX_PROFILE_BIO_LENGTH, {
          message: `Bio cannot be longer than ${MAX_PROFILE_BIO_LENGTH} characters.`,
        }),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { bio: dirtyBio } = validatedData.data

  try {
    const bio = badWordsFilter(dirtyBio)

    const dbResponse = await prisma.userProfile.update({
      where: { userId: session.user.id },
      data: { bio },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    return {
      message: 'Successfully updated user!',
      updatedBio: dbResponse.bio ?? '',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error updating user!'],
    }
  }
}

export async function getUserBio(
  userId: string,
): Promise<ErrorResponse | { bio?: string; displayName: string }> {
  try {
    const userResponse = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userResponse?.displayName || userResponse.displayName === '') {
      await prisma.user.update({
        where: { id: userId },
        data: { displayName: userResponse?.name || DEFAULT_DISPLAY_NAME },
      })
    }

    const profileResponse = await prisma.userProfile.findUnique({
      where: { userId },
    })

    if (!profileResponse) {
      // create a profile for the user if one doesn't exist
      const newProfile = await prisma.userProfile.create({
        data: {
          bio: 'No bio is set yet',
          userId,
        },
      })
      return {
        bio: newProfile.bio !== '' ? newProfile.bio : 'No bio is set yet',
        displayName:
          userResponse?.displayName ??
          userResponse?.name ??
          DEFAULT_DISPLAY_NAME,
      }
    }

    return {
      bio:
        profileResponse.bio !== '' ? profileResponse.bio : 'No bio is set yet',
      displayName:
        userResponse?.displayName ?? userResponse?.name ?? DEFAULT_DISPLAY_NAME,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error fetching user!'],
    }
  }
}
