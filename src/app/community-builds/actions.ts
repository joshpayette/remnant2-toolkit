'use server'

import { prisma } from '@/features/db/lib/db'
import { Build, BuildItems, Prisma } from '@prisma/client'
import { getServerSession } from '../../features/auth/lib/auth'
import { PaginationResponse } from '../../features/pagination/hooks/usePagination'
import { DBBuild } from '../../features/build/types'
import { FilterProps } from './(components)/Filters'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { remnantItems } from '@/features/items/data'
import { Archtype } from '@/features/items/constants'
import { bigIntFix } from '@/lib/bigIntFix'

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'

function formatDateToMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function getMostUpvotedBuilds({
  itemsPerPage,
  pageNumber,
  timeRange,
  globalFilters,
}: {
  timeRange: TimeRange
  itemsPerPage: number
  pageNumber: number
  globalFilters: FilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

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

  const { archtypes } = globalFilters
  const archtypeIds = archtypes.map(
    (archtype) =>
      remnantItems.find((item) => item.name.toLowerCase() === archtype)?.id,
  ) as Archtype[]

  const archtypeCondition =
    archtypeIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(archtypeIds)})
) = ${archtypeIds.length}`

  // First, get the Builds
  const topBuilds = (await prisma.$queryRaw`
        SELECT Build.*, 
        User.name as createdByName, 
        User.displayName as createdByDisplayName, 
        COUNT(BuildVoteCounts.buildId) as totalUpvotes,
        COUNT(BuildReports.id) as totalReports,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildReports
          WHERE BuildReports.buildId = Build.id
          AND BuildReports.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as reported,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildVoteCounts
          WHERE BuildVoteCounts.buildId = Build.id
          AND BuildVoteCounts.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as upvoted,
        CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN User on Build.createdById = User.id
  LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
  LEFT JOIN PaidUsers on User.id = PaidUsers.userId
  WHERE Build.isPublic = true
  ${archtypeCondition}
  AND Build.createdAt > ${timeCondition}
  GROUP BY Build.id, User.id
  ORDER BY totalUpvotes DESC
  LIMIT ${itemsPerPage} 
  OFFSET ${(pageNumber - 1) * itemsPerPage}
`) as (Build & {
    totalUpvotes: number
    createdByName: string
    createdByDisplayName: string
    reported: boolean
    upvoted: boolean
    isPaidUser: boolean
    buildItems: BuildItems[]
  })[]

  // Then, for each Build, get the associated BuildItems
  for (const build of topBuilds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  const totalTopBuilds = (await prisma.$queryRaw`
  SELECT COUNT(DISTINCT Build.id)
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  WHERE Build.isPublic = true 
  ${archtypeCondition}
  AND Build.createdAt > ${timeCondition}
`) as { 'count(distinct Build.id)': number }[]

  const totalBuildCount = Number(totalTopBuilds[0]['count(distinct Build.id)'])

  const returnedBuilds: DBBuild[] = topBuilds.map((build) => ({
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
    createdByDisplayName: build.createdByDisplayName || build.createdByName,
    upvoted: false,
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: build.isPaidUser,
    buildItems: build.buildItems,
  }))

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}

export type FeaturedBuildsFilter = 'date created' | 'upvotes'

export async function getFeaturedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
  globalFilters,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: FeaturedBuildsFilter
  globalFilters: FilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const { archtypes } = globalFilters
  const archtypeIds = archtypes.map(
    (archtype) =>
      remnantItems.find((item) => item.name.toLowerCase() === archtype)?.id,
  ) as Archtype[]

  const archtypeCondition =
    archtypeIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(archtypeIds)})
) = ${archtypeIds.length}`

  if (filter === 'date created') {
    const builds = (await prisma.$queryRaw`
        SELECT Build.*, 
        User.name as createdByName, 
        User.displayName as createdByDisplayName, 
        COUNT(BuildVoteCounts.buildId) as totalUpvotes,
        COUNT(BuildReports.id) as totalReports,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildReports
          WHERE BuildReports.buildId = Build.id
          AND BuildReports.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as reported,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildVoteCounts
          WHERE BuildVoteCounts.buildId = Build.id
          AND BuildVoteCounts.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as upvoted,
        CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
      FROM Build
      LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
      LEFT JOIN User on Build.createdById = User.id
      LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
      LEFT JOIN PaidUsers on User.id = PaidUsers.userId
      WHERE Build.isPublic = true
      ${archtypeCondition}
      AND Build.isFeaturedBuild = true
      GROUP BY Build.id, User.id
      ORDER BY Build.createdAt DESC
      LIMIT ${itemsPerPage}
      OFFSET ${(pageNumber - 1) * itemsPerPage}
    `) as (Build & {
      totalUpvotes: number
      createdByName: string
      createdByDisplayName: string
      reported: boolean
      upvoted: boolean
      isPaidUser: boolean
      buildItems: BuildItems[]
    })[]

    const totalBuildCount = (await prisma.$queryRaw`
      SELECT COUNT(DISTINCT Build.id)
      FROM Build
      LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
      WHERE Build.isPublic = true
      ${archtypeCondition}
      AND Build.isFeaturedBuild = true
    `) as { 'count(distinct Build.id)': number }[]

    const totalBuilds = Number(totalBuildCount[0]['count(distinct Build.id)'])

    if (!builds) return { items: [], totalItemCount: 0 }

    // Find al build items for each build
    for (const build of builds) {
      const buildItems = await prisma.buildItems.findMany({
        where: { buildId: build.id },
      })
      build.buildItems = buildItems
    }

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
        build.createdByDisplayName ||
        build.createdByName ||
        DEFAULT_DISPLAY_NAME,
      totalUpvotes: build.totalUpvotes,
      upvoted: build.upvoted,
      reported: build.reported,
      isMember: build.isPaidUser,
      buildItems: build.buildItems,
    }))

    return bigIntFix({ items: returnedBuilds, totalItemCount: totalBuilds })
  } else {
    const builds = (await prisma.$queryRaw`
        SELECT Build.*, 
        User.name as createdByName, 
        User.displayName as createdByDisplayName, 
        COUNT(BuildVoteCounts.buildId) as totalUpvotes,
        COUNT(BuildReports.id) as totalReports,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildReports
          WHERE BuildReports.buildId = Build.id
          AND BuildReports.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as reported,
        CASE WHEN EXISTS (
          SELECT 1
          FROM BuildVoteCounts
          WHERE BuildVoteCounts.buildId = Build.id
          AND BuildVoteCounts.userId = ${userId}
        ) THEN TRUE ELSE FALSE END as upvoted,
        CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
        FROM Build
        LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
        LEFT JOIN User on Build.createdById = User.id
        LEFT JOIN BuildReports on Build.id = BuildReports.buildId 
        LEFT JOIN PaidUsers on User.id = PaidUsers.userId
        WHERE Build.isPublic = true 
        AND Build.isFeaturedBuild = true
        ${archtypeCondition}
        GROUP BY Build.id, User.id
        ORDER BY totalUpvotes DESC
        LIMIT ${itemsPerPage}
        OFFSET ${(pageNumber - 1) * itemsPerPage}
    `) as (Build & {
      totalUpvotes: number
      createdByName: string
      createdByDisplayName: string
      reported: boolean
      upvoted: boolean
      isPaidUser: boolean
      buildItems: BuildItems[]
    })[]

    const totalBuildCount = (await prisma.$queryRaw`
      SELECT COUNT(DISTINCT Build.id)
      FROM Build
      LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
      WHERE Build.isPublic = true
      AND Build.isFeaturedBuild = true
      ${archtypeCondition}
    `) as { 'count(distinct Build.id)': number }[]

    const totalBuilds = Number(totalBuildCount[0]['count(distinct Build.id)'])

    if (!builds) return { items: [], totalItemCount: 0 }

    // Find al build items for each build
    for (const build of builds) {
      const buildItems = await prisma.buildItems.findMany({
        where: { buildId: build.id },
      })
      build.buildItems = buildItems
    }

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
        build.createdByDisplayName ||
        build.createdByName ||
        DEFAULT_DISPLAY_NAME,
      totalUpvotes: build.totalUpvotes,
      upvoted: build.upvoted,
      reported: build.reported,
      isMember: build.isPaidUser,
      buildItems: build.buildItems,
    }))

    return bigIntFix({ items: returnedBuilds, totalItemCount: totalBuilds })
  }
}
