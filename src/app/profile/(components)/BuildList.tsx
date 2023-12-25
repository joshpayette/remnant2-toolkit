import { getServerSession } from '@/app/(lib)/auth'
import EditBuildButton from './EditBuildButton'
import { dbBuildToBuildState } from '@/app/(lib)/utils'
import DeleteBuildButton from './DeleteBuildButton'
import CopyBuildUrlButton from './CopyBuildUrlButton'
import ViewBuildButton from './ViewBuildButton'
import { prisma } from '@/app/(lib)/db'

async function getBuilds() {
  const session = await getServerSession()

  const dbResponse = prisma?.build.findMany({
    where: {
      createdById: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!dbResponse) return []
  return dbResponse
}

export default async function BuildsList() {
  const builds = await getBuilds()

  return (
    <div className="mx-auto w-full bg-black py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="w-full text-base font-semibold leading-6 text-green-500">
              Builds
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              A list of all the builds in your account.
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
                      Visibility
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
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {builds.map((build) => {
                    const buildState = dbBuildToBuildState({
                      ...build,
                      createdByDisplayName: '',
                    })
                    return (
                      <tr key={build.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          <ViewBuildButton
                            buildName={buildState.name}
                            buildId={build.id}
                          />
                        </td>
                        <td className="max-w-[300px] px-3 py-4 text-sm text-gray-300">
                          {buildState.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {buildState.items.archtype.map((archtype, index) => {
                            return (
                              <div key={index}>
                                {`${archtype.name}, ${
                                  buildState.items.skill[index]?.name ?? ''
                                }`}
                              </div>
                            )
                          })}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                          {buildState.isPublic ? 'Public' : 'Private'}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <CopyBuildUrlButton buildId={build.id} />
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <EditBuildButton build={build} />
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <DeleteBuildButton buildId={build.id} />
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
