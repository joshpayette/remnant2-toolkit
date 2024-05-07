import { Prisma } from '@prisma/client'

import { communityBuildsQuery } from '@/app/(queries)/build-filters/community-builds'
import { getServerSession } from '@/features/auth/lib'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { prisma } from '@/features/db'
import { bigIntFix } from '@/lib/bigIntFix'

async function getCreatedBuilds(userId: string) {
  const itemsToFetch = 4

  const whereConditionsAllTime = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  `

  const whereConditionsCurrent = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  AND Build.isPatchAffected = false
  `

  const orderBySegment = Prisma.sql`ORDER BY totalUpvotes DESC`

  const [topBuildsAllTime, topBuildsCurrent] = await prisma.$transaction([
    communityBuildsQuery({
      userId,
      itemsPerPage: itemsToFetch,
      pageNumber: 1,
      orderBySegment,
      whereConditions: whereConditionsAllTime,
      searchText: '',
    }),
    communityBuildsQuery({
      userId,
      itemsPerPage: itemsToFetch,
      pageNumber: 1,
      orderBySegment,
      whereConditions: whereConditionsCurrent,
      searchText: '',
    }),
  ])

  // Then, for each Build, get the associated BuildItems
  for (const build of topBuildsAllTime) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }
  for (const build of topBuildsCurrent) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  // Then, for each Build, get the associated BuildTags
  for (const build of topBuildsAllTime) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    })
    build.buildTags = buildTags
  }
  for (const build of topBuildsCurrent) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    })
    build.buildTags = buildTags
  }

  return bigIntFix({ topBuildsAllTime, topBuildsCurrent })
}

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()

  const { topBuildsAllTime, topBuildsCurrent } = await getCreatedBuilds(userId)

  return (
    <>
      {topBuildsCurrent.length > 0 && (
        <div>
          <div className="mb-4 flex w-full flex-row items-center justify-center border-b border-b-primary py-2">
            <h2 className="flex w-full items-center justify-start text-2xl">
              Top Created Builds (Current)
            </h2>
          </div>
          <ul
            role="list"
            className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {topBuildsCurrent.map((build) => (
              <li key={build.id} className="h-full w-full">
                <BuildCard build={build} isLoading={false} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <div className="mb-4 flex w-full flex-row items-center justify-center border-b border-b-primary py-2">
          <h2 className="flex w-full items-center justify-start text-2xl">
            Top Created Builds (All Time)
          </h2>
        </div>
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {topBuildsAllTime.map((build) => (
            <li key={build.id} className="h-full w-full">
              <BuildCard build={build} isLoading={false} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
