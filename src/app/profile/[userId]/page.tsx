import { Prisma } from '@prisma/client'

import { CreatedBuildCardActions } from '@/app/profile/[userId]/(components)/CreatedBuildCardActions'
import { getServerSession } from '@/features/auth/lib'
import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { communityBuildsQuery } from '@/features/build/filters/queries/community-builds'
import { prisma } from '@/features/db'
import { bigIntFix } from '@/lib/bigIntFix'

async function getCreatedBuilds(userId: string) {
  const itemsToFetch = 4

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  `

  const orderBySegment = Prisma.sql`ORDER BY totalUpvotes DESC`

  const builds = await communityBuildsQuery({
    userId,
    itemsPerPage: itemsToFetch,
    pageNumber: 1,
    orderBySegment,
    whereConditions,
    searchText: '',
  })

  // Then, for each Build, get the associated BuildItems
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  // Then, for each Build, get the associated BuildTags
  for (const build of builds) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    })
    build.buildTags = buildTags
  }

  return bigIntFix(builds)
}

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getServerSession()
  const isEditable = session?.user?.id === userId

  const builds = await getCreatedBuilds(userId)

  return (
    <>
      <div className="mb-4 flex w-full flex-row items-center justify-center border-b border-b-primary-500 py-2">
        <h2 className="flex w-full items-center justify-start text-2xl">
          Top Created Builds
        </h2>
      </div>
      <ul
        role="list"
        className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {builds.map((build) => (
          <li key={build.id} className="h-full w-full">
            <BuildCard
              build={build}
              isLoading={false}
              footerActions={
                isEditable ? (
                  <CreatedBuildCardActions
                    build={build}
                    pathsToRevalidate={[`/profile/${userId}`]}
                  />
                ) : undefined
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}
