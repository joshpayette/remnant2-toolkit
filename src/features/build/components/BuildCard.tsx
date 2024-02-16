'use client'

import { FlagIcon as FlagIconOff } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { FlagIcon as FlagIconOn } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { DescriptionWithTags } from '@/features/items/components/DescriptionWithTags'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { POPULAR_VOTE_THRESHOLD } from '../constants'
import { dbBuildToBuildState } from '../lib/dbBuildToBuildState'
import { formatUpdatedAt } from '../lib/formatUpdatedAt'
import { isBuildNew } from '../lib/isBuildNew'
import { DBBuild } from '../types'
import { ArchtypeLabel } from './ArchtypeLabel'
import { NewBuildBadge } from './NewBuildBadge'
import { PopularBuildBadge } from './PopularBuildBadge'

interface Props {
  build: DBBuild
  footerActions?: React.ReactNode
  memberFrameEnabled?: boolean
  onReportBuild: ((buildId: string) => void) | undefined
}

export function BuildCard({
  build,
  footerActions,
  memberFrameEnabled = true,
  onReportBuild,
}: Props) {
  const buildState = dbBuildToBuildState(build)
  const isPopular = buildState.totalUpvotes >= POPULAR_VOTE_THRESHOLD
  const isNew = isBuildNew(buildState.createdAt)

  return (
    <div
      className={cn(
        'relative col-span-1 flex h-full min-h-[350px] flex-col rounded-lg border border-purple-500 bg-black shadow',
        buildState.isMember &&
          memberFrameEnabled &&
          'border-2 border-yellow-300 shadow-lg shadow-yellow-600',
      )}
    >
      {isPopular && !isNew && (
        <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
          <PopularBuildBadge />
        </div>
      )}
      {isNew && (
        <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
          <NewBuildBadge />
        </div>
      )}
      <div className="flex w-full flex-1 items-start justify-start space-x-6 p-4">
        <div className="flex flex-col items-start justify-start overflow-x-auto">
          <Link
            href={`/builder/${build.id}`}
            className="w-full text-green-500 hover:text-green-700 hover:underline"
          >
            <h3
              className={cn(
                'text-md whitespace-pre-wrap font-medium',
                (isPopular || isNew) && 'mt-2',
              )}
            >
              {build.name}
            </h3>
          </Link>
          <div className="mb-2 grid w-full grid-cols-3 truncate text-sm">
            <div className="col-span-2 truncate text-left text-gray-500">
              by{' '}
              <Link
                href={`/profile/${build.createdById}`}
                className="text-purple-500 hover:text-purple-700 hover:underline"
              >
                {build.createdByDisplayName ?? build.createdByName}
              </Link>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-2">
              {onReportBuild && (
                <Tooltip content="Report this build">
                  <button
                    onClick={() => onReportBuild(build.id)}
                    className="flex items-center justify-end text-right text-red-500"
                  >
                    {buildState.reported ? (
                      <FlagIconOn className="mr-0.5 h-4 w-4" />
                    ) : (
                      <FlagIconOff className="mr-0.5 h-4 w-4" />
                    )}
                  </button>
                </Tooltip>
              )}
              <Tooltip content="Total Favorites">
                <button className="flex items-center justify-end text-right text-yellow-500">
                  <StarIcon className="mr-1 h-4 w-4" /> {build.totalUpvotes}
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="mb-2 flex flex-row items-center justify-start gap-x-2">
            {build.updatedAt && (
              <p className="text-left text-xs text-gray-500">
                Last Updated:{' '}
                <span className="text-gray-400">
                  {formatUpdatedAt(build.updatedAt)}
                </span>
              </p>
            )}
          </div>
          <div className="mt-2 flex w-full flex-row items-center justify-center gap-x-2">
            {buildState.items.archetype[0] && (
              <ArchtypeLabel name={buildState.items.archetype[0].name} />
            )}
            {buildState.items.archetype[1] && (
              <ArchtypeLabel name={buildState.items.archetype[1].name} />
            )}
          </div>
          {buildState.description && (
            <div className="mt-4 max-h-[100px] flex-row items-start justify-start gap-x-2 overflow-y-auto whitespace-pre-wrap text-xs text-gray-300">
              <DescriptionWithTags description={buildState.description} />
            </div>
          )}
        </div>
      </div>
      <div>{footerActions}</div>
    </div>
  )
}
