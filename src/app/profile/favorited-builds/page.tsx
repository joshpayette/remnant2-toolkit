import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import ViewBuildButton from '../(components)/ViewBuildButton'
import CopyBuildUrlButton from '../(components)/CopyBuildUrlButton'
import { StarIcon } from '@heroicons/react/24/solid'
import { extendedBuildToBuildState } from '@/app/(lib)/build'
import { ExtendedBuild } from '@/app/(types)/build'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'

async function getBuilds() {
  const session = await getServerSession()

  const userId = session?.user?.id

  // find all builds that the user has favorited but are not created
  // by the user
  const builds = await prisma.build.findMany({
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
  })

  if (!builds) return []

  const buildsWithExtraFields: ExtendedBuild[] = builds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: build.createdBy.PaidUsers.length > 0, // Check if the user is a member
  }))

  return buildsWithExtraFields
}

export default async function Page() {
  const builds = await getBuilds()

  return (
    <div className="mx-auto w-full bg-black py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="w-full text-base font-semibold leading-6 text-green-500">
              Builds favorited by you
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              All builds that you have favorited are listed here.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Archtypes
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Votes
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">View</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">Share</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {builds.map((build) => {
                    const buildState = extendedBuildToBuildState(build)
                    return (
                      <tr key={build.id}>
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          <ViewBuildButton
                            buildName={buildState.name}
                            buildId={build.id}
                          />
                        </td>
                        <td className="max-w-[300px] truncate px-3 py-4 text-sm text-gray-300">
                          {buildState.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {buildState.items.archtype.map((archtype, index) => {
                            return (
                              <div key={index}>
                                {`${archtype?.name}, ${
                                  buildState.items.skill[index]?.name ?? ''
                                }`}
                              </div>
                            )
                          })}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium text-yellow-500 sm:pr-0">
                          <div className="flex flex-row items-start justify-start">
                            <StarIcon className="mr-2 h-5 w-5" />
                            {build.totalUpvotes}
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <CopyBuildUrlButton buildId={build.id} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
