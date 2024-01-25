'use server'

import { prisma } from '@/features/db'
import { Build, BuildItems, Prisma } from '@prisma/client'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { remnantItems } from '@/features/items/data'
import { bigIntFix } from '@/lib/bigIntFix'
import { Archtype } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/build/components/CommunityBuildFilters'
import { DBBuild } from '../types'
import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth'

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
  globalFilters: CommunityBuildFilterProps
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
