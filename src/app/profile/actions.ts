'use server'

import { z } from 'zod'
import { getServerSession } from '../(lib)/auth'
import { ErrorResponse } from '../(types)'
import { badWordFilter } from '../(lib)/badword-filter'
import { prisma } from '../(lib)/db'
import { DEFAULT_DISPLAY_NAME } from '../(data)/constants'
import { ExtendedBuild } from '../(types)/build'
import { PaginationResponse } from '../(hooks)/usePagination'

export type CreatedBuildsFilter = 'date created' | 'upvotes'

export async function getCreatedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: CreatedBuildsFilter
}): Promise<PaginationResponse<ExtendedBuild>> {
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

  const returnedBuilds: ExtendedBuild[] = builds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      session?.user?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: build.createdBy.PaidUsers.length > 0, // Check if the user is a member
  })) satisfies ExtendedBuild[]

  return {
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  }
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
}): Promise<PaginationResponse<ExtendedBuild>> {
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

  const returnedBuilds: ExtendedBuild[] = builds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      session?.user?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: build.createdBy.PaidUsers.length > 0, // Check if the user is a member
  })) satisfies ExtendedBuild[]

  return { items: returnedBuilds, totalItemCount: totalBuildCount }
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
    const displayName = badWordFilter(dirtyDisplayName)

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
