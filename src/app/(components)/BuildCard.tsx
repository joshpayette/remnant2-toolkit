'use client'

import ArchtypeLabel from '../community-builds/(components)/ArchtypeLabel'
import { StarIcon } from '@heroicons/react/24/solid'
import { cn } from '@/app/(lib)/utils'
import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import Link from 'next/link'
import PopularBuildBadge from './PopularBuildBadge'
import { POPULAR_VOTE_THRESHOLD } from '../(data)/constants'
import { DBBuild } from '../(types)/build'
import { dbBuildToBuildState } from '../(lib)/build'

interface Props {
  build: DBBuild
  footerActions?: React.ReactNode
  memberFrameEnabled?: boolean
  onReportBuild: ((buildId: string) => void) | undefined
}

export default function BuildCard({
  build,
  footerActions,
  memberFrameEnabled = true,
  onReportBuild,
}: Props) {
  const buildState = dbBuildToBuildState(build)
  const isPopular = buildState.totalUpvotes >= POPULAR_VOTE_THRESHOLD

  return (
    <div
      className={cn(
        'relative col-span-1 flex h-full flex-col rounded-lg border border-purple-500 bg-black shadow',
        buildState.isMember &&
          memberFrameEnabled &&
          'border-2 border-yellow-500',
      )}
    >
      {isPopular && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
          <PopularBuildBadge />
        </div>
      )}
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
                {onReportBuild && (
                  <button
                    onClick={() => onReportBuild(build.id)}
                    className="flex items-center justify-end text-right text-red-500"
                  >
                    {buildState.reported ? (
                      <FlagIconOn className="mr-1 h-4 w-4" />
                    ) : (
                      <FlagIconOff className="mr-1 h-4 w-4" />
                    )}
                  </button>
                )}
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
      <div>{footerActions}</div>
    </div>
  )
}
