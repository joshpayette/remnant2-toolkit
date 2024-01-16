'use server'

import { prisma } from '@/app/(lib)/db'
import { Build, BuildItems } from '@prisma/client'
import { getServerSession } from '../(lib)/auth'
import { PaginationResponse } from '../(hooks)/usePagination'
import { DEFAULT_DISPLAY_NAME } from '../(data)/constants'
import { DBBuild } from '../(types)/build'

// Need this to suppress the BigInt JSON error
BigInt.prototype.toJSON = function (): string {
  const int = Number.parseInt(this.toString())
  return int.toString()
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'

function formatDateToMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function getMostUpvotedBuilds({
  itemsPerPage,
  pageNumber,
  timeRange,
}: {
  timeRange: TimeRange
  itemsPerPage: number
  pageNumber: number
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()

  let timeCondition = ''
  const now = new Date()
  const allTime = new Date(2023, 0, 1)

  switch (timeRange) {
    case 'day':
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneDayAgo)}`
      break
    case 'week':
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneWeekAgo)}`
      break
    case 'month':
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      )
      timeCondition = `${formatDateToMySQL(oneMonthAgo)}`
      break
    case 'all-time':
      timeCondition = `${formatDateToMySQL(allTime)}`
    default:
      timeCondition = `${formatDateToMySQL(allTime)}`
      break
  }

  const topBuilds = (await prisma.$queryRaw`
  SELECT Build.*, User.name as username, User.displayName, COUNT(BuildVoteCounts.buildId) as votes,
    CASE WHEN BuildReports.buildId IS NOT NULL THEN true ELSE false END as reported,
    CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser,
    BuildItems.*
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN User on Build.createdById = User.id
  LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${session
    ?.user?.id}
  LEFT JOIN PaidUsers on User.id = PaidUsers.userId
  LEFT JOIN BuildItems on Build.id = BuildItems.buildId
  WHERE Build.isPublic = true AND Build.archtype IS NOT NULL AND Build.archtype != '' AND Build.createdAt > ${timeCondition}
  GROUP BY Build.id, User.id, BuildItems.id
  ORDER BY votes DESC
  LIMIT ${itemsPerPage} 
  OFFSET ${(pageNumber - 1) * itemsPerPage}
`) as (Build & {
    votes: number
    username: string
    displayName: string
    reported: boolean
    isPaidUser: boolean
    BuildItems: BuildItems[]
  })[]

  const totalTopBuilds = (await prisma.$queryRaw`
  SELECT COUNT(DISTINCT Build.id)
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  WHERE Build.isPublic = true AND Build.archtype IS NOT NULL AND Build.archtype != '' AND Build.createdAt > ${timeCondition}
`) as { 'count(distinct Build.id)': number }[]

  const totalBuildCount = Number(totalTopBuilds[0]['count(distinct Build.id)'])

  const returnedBuilds: DBBuild[] = topBuilds.map((build) => ({
    ...build,
    createdByDisplayName: build.displayName || build.username, // Accessing the 'displayName' or 'name' property from the 'User' table
    upvoted: false,
    totalUpvotes: Number(build.votes),
    reported: build.reported,
    isMember: build.isPaidUser,
    buildItems: build.BuildItems,
  }))

  return {
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  }
}

export type FeaturedBuildsFilter = 'date created' | 'upvotes'

export async function getFeaturedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: FeaturedBuildsFilter
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  // find all builds that the user has favorited but are not created
  // by the user
  const builds =
    filter === 'date created'
      ? await prisma.build.findMany({
          where: {
            isFeaturedBuild: true,
            isPublic: true,
          },
          include: {
            createdBy: true,
            BuildVotes: true,
            BuildReports: true,
            BuildItems: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: (pageNumber - 1) * itemsPerPage,
          take: itemsPerPage,
        })
      : await prisma.build.findMany({
          where: {
            isFeaturedBuild: true,
          },
          include: {
            createdBy: true,
            BuildVotes: true,
            BuildReports: true,
            BuildItems: true,
          },
          orderBy: {
            BuildVotes: {
              _count: 'desc',
            },
          },
          skip: (pageNumber - 1) * itemsPerPage,
          take: itemsPerPage,
        })

  // get the total number of builds that match the conditions
  const totalBuildCount = await prisma.build.count({
    where: {
      isFeaturedBuild: true,
    },
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: false,
    buildItems: build.BuildItems,
  }))

  return { items: returnedBuilds, totalItemCount: totalBuildCount }
}
