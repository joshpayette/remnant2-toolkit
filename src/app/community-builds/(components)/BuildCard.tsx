'use client'

import { ExtendedBuild } from '@/app/(types)'
import ArchtypeLabel from './ArchtypeLabel'
import { EyeIcon, StarIcon } from '@heroicons/react/24/solid'
import { cn, extendedBuildToBuildState } from '@/app/(lib)/utils'
import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import useBuildActions from '@/app/(hooks)/useBuildActions'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  build: ExtendedBuild
  onReportBuild: (reported: boolean, buildId: string) => void
}

export default function BuildCard({ build, onReportBuild }: Props) {
  const buildState = extendedBuildToBuildState(build)
  const { handleReportBuild } = useBuildActions()

  return (
    <div
      className={cn(
        'relative col-span-1 flex h-full flex-col rounded-lg border border-purple-500 bg-black shadow',
        buildState.isMember && 'border-2 border-yellow-500',
      )}
    >
      {buildState.isMember ? (
        <div className="absolute right-[-15px] top-[-15px]">
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkitten_small.png`}
            width={43}
            height={50}
            alt="Toolkitten image denoting user is a member"
          />
        </div>
      ) : null}
      <div className="flex w-full flex-1 items-start justify-start space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex flex-col items-start justify-start ">
            <Link
              href={`/builder/${build.id}`}
              className="w-full text-green-500 hover:text-green-700 hover:underline"
            >
              <h3 className="text-md whitespace-pre-wrap font-medium">
                {build.name}
              </h3>
            </Link>
            <div className="mb-2 grid w-full grid-cols-2 text-sm">
              <p className="text-left text-gray-500">
                by {build.createdByDisplayName}
              </p>
              <div className="flex flex-row items-center justify-end gap-x-2">
                <button
                  onClick={async () => {
                    const newReported = !buildState.reported
                    await handleReportBuild(newReported, build.id)
                    onReportBuild(newReported, build.id)
                  }}
                  className="flex items-center justify-end text-right text-red-500"
                >
                  {buildState.reported ? (
                    <FlagIconOn className="mr-1 h-4 w-4" />
                  ) : (
                    <FlagIconOff className="mr-1 h-4 w-4" />
                  )}
                </button>
                <p className="flex items-center justify-end text-right text-yellow-500">
                  <StarIcon className="mr-1 h-4 w-4" /> {build.totalUpvotes}
                </p>
              </div>
            </div>
            <div className="mt-2 flex flex-row items-center justify-start gap-x-2">
              {buildState.items.archtype[0] && (
                <ArchtypeLabel name={buildState.items.archtype[0].name} />
              )}
              {buildState.items.archtype[1] && (
                <ArchtypeLabel name={buildState.items.archtype[1].name} />
              )}
            </div>
            {buildState.description && (
              <div className="mt-4 flex flex-row items-start justify-start gap-x-2 text-ellipsis whitespace-break-spaces text-sm text-gray-300">
                {buildState.description?.slice(0, 200)}
                {buildState.description?.length > 200 && '...'}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="-mt-px flex flex-1">
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
            <Link
              href={`/builder/${build.id}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm font-semibold text-green-500 hover:text-green-700 hover:underline"
            >
              <EyeIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
              View Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
