'use server'

import { prisma } from '@/app/(lib)/db'
import { Build } from '@prisma/client'
import { ExtendedBuild } from '../(types)'
import { getServerSession } from '../(lib)/auth'

// Need this to suppress the BigInt JSON error
BigInt.prototype.toJSON = function (): string {
  const int = Number.parseInt(this.toString())
  return int.toString()
}

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'

function formatDateToMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function getMostUpvotedBuilds(
  timeRange: TimeRange,
  limit: number,
) {
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
    CASE WHEN BuildReports.buildId IS NOT NULL THEN true ELSE false END as reported
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN User on Build.createdById = User.id
  LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${session?.user?.id}
  WHERE Build.isPublic = true AND Build.archtype IS NOT NULL AND Build.archtype != '' AND Build.createdAt > ${timeCondition}
  GROUP BY Build.id, User.id
  ORDER BY votes DESC
  LIMIT ${limit}
`) as (Build & {
    votes: number
    username: string
    displayName: string
    reported: boolean
  })[]

  const returnedBuilds: ExtendedBuild[] = topBuilds.map((build) => ({
    ...build,
    createdByDisplayName: build.displayName || build.username, // Accessing the 'displayName' or 'name' property from the 'User' table
    upvoted: false,
    totalUpvotes: Number(build.votes),
    reported: build.reported,
  }))

  return returnedBuilds
}
