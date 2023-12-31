import { dbBuildToBuildState } from '@/app/(lib)/utils'
import { DBBuild } from '@/app/(types)'
import ArchtypeLabel from './ArchtypeLabel'
import { StarIcon } from '@heroicons/react/24/solid'

export default function FeaturedBuildCard({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build)

  return (
    <>
      <li
        key={build.id}
        className="col-span-1 rounded-lg border border-purple-500 bg-black shadow"
      >
        <div className="flex w-full items-start justify-start space-x-6 p-6">
          <div className="flex-1 truncate">
            <div className="flex flex-col items-start justify-start ">
              <h3 className="text-md whitespace-pre-wrap font-medium text-green-500">
                {build.name}
              </h3>
              <div className="mb-2 grid w-full grid-cols-2 text-sm">
                <p className="text-left text-gray-500">
                  by {build.createdByDisplayName}
                </p>
                <p className="flex items-center justify-end text-right text-yellow-500">
                  <StarIcon className="mr-1 h-4 w-4" /> {build.totalUpvotes}
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-x-2">
                {buildState.items.archtype[0] && (
                  <ArchtypeLabel name={buildState.items.archtype[0].name} />
                )}
                {buildState.items.archtype[1] && (
                  <ArchtypeLabel name={buildState.items.archtype[1].name} />
                )}
              </div>
            </div>
          </div>
          {/* <img
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
            src={person.imageUrl}
            alt=""
          /> */}
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              {/* <a
                href={`mailto:${person.email}`}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <EnvelopeIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Email
              </a> */}
            </div>
            <div className="-ml-px flex w-0 flex-1">
              {/* <a
                href={`tel:${person.telephone}`}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <PhoneIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Call
              </a> */}
            </div>
          </div>
        </div>
      </li>
    </>
  )
}
