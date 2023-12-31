import { prisma } from '@/app/(lib)/db'
import PageHeader from '../(components)/PageHeader'
import { Build } from '@prisma/client'
import FeaturedBuildCard from './(components)/FeaturedBuildCard'
import { DBBuild } from '../(types)'
import PageActions from '../(components)/PageActions'
import BackToTopButton from '../(components)/BackToTopButton'

async function getMostUpvotedBuilds() {
  const topBuilds = (await prisma.$queryRaw`
  SELECT Build.*, User.name as username, User.displayName, COUNT(BuildVoteCounts.buildId) as votes
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN User on Build.createdById = User.id
  WHERE Build.isPublic = true
  GROUP BY Build.id, User.id
  ORDER BY votes DESC
  LIMIT 10
`) as (Build & { votes: number; username: string; displayName: string })[]

  console.info('topBuilds', topBuilds[0])

  const returnedBuilds: DBBuild[] = topBuilds.map((build) => ({
    ...build,
    createdByDisplayName: build.displayName || build.username, // Accessing the 'displayName' or 'name' property from the 'User' table
    upvoted: false,
    totalUpvotes: Number(build.votes),
    reported: false,
  }))

  return returnedBuilds
}

export default async function Page() {
  const topBuilds = await getMostUpvotedBuilds()

  return (
    <>
      <PageActions>
        <BackToTopButton />
      </PageActions>
      <PageHeader title="Community Builds" subtitle="Find your next build" />
      <div className="grid grid-cols-1 gap-2">
        <h2 className="border-b border-b-green-500 py-2 text-2xl">
          Most Popular
        </h2>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topBuilds.map((build) => (
            <>
              <FeaturedBuildCard build={build} />
            </>
          ))}
        </ul>
      </div>
    </>
  )
}
