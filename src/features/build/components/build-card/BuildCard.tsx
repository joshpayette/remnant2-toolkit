'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { POPULAR_VOTE_THRESHOLD } from '@/features/build/constants'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { formatUpdatedAt } from '@/features/build/lib/formatUpdatedAt'
import { getArchetypeBuildName } from '@/features/build/lib/getArchetypeBuildName'
import { isBuildNew } from '@/features/build/lib/isBuildNew'
import { DBBuild } from '@/features/build/types'
import { Archetype } from '@/features/items/types'
import { DescriptionWithTags } from '@/features/ui/DescriptionWithTags'
import { Skeleton } from '@/features/ui/Skeleton'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { BuildTagsDisplay } from '../../build-tags/BuildTagsDisplay'
import { ArchtypeLabel } from './ArchtypeLabel'
import { FeaturedBuildBadge } from './FeaturedBuildBadge'
import { NewBuildBadge } from './NewBuildBadge'
import { PopularBuildBadge } from './PopularBuildBadge'

interface Props {
  build: DBBuild
  footerActions?: React.ReactNode
  isLoading: boolean
  memberFrameEnabled?: boolean
}

export function BuildCard({
  build,
  footerActions,
  isLoading,
  memberFrameEnabled = true,
}: Props) {
  const buildState = dbBuildToBuildState(build)
  const isPopular = buildState.totalUpvotes >= POPULAR_VOTE_THRESHOLD
  const isNew = isBuildNew(buildState.createdAt)

  return (
    <div
      key={build.id}
      className={cn('h-full min-h-[440px] w-full text-left')}
      role="listitem"
    >
      {build.id.includes('placeholder') || isLoading ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <div
          className={cn(
            'relative col-span-1 flex h-full flex-col rounded-lg border border-secondary-500 bg-black shadow',
            buildState.isMember &&
              memberFrameEnabled &&
              'border-2 border-accent1-300 shadow-lg shadow-accent1-600',
          )}
        >
          {(isPopular || build.isFeaturedBuild || isNew) && (
            <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-x-2">
              {isNew ? <NewBuildBadge /> : null}
              {isPopular ? <PopularBuildBadge /> : null}
              {build.isFeaturedBuild ? <FeaturedBuildBadge /> : null}
            </div>
          )}
          <div className="flex w-full flex-1 items-start justify-start p-4 pb-0">
            <div className="flex w-full flex-col items-start justify-start overflow-x-auto">
              <Link
                href={`/builder/${build.id}`}
                className="w-full text-white hover:text-gray-200 hover:underline"
              >
                <h3
                  className={cn(
                    'text-md whitespace-pre-wrap font-medium',
                    (isPopular || isNew || buildState.isFeaturedBuild) &&
                      'mt-3',
                  )}
                >
                  {build.name}
                </h3>
              </Link>
              <div className="mb-2 mt-1 grid w-full grid-cols-3 truncate text-sm">
                <div className="col-span-full truncate text-left text-xs text-gray-400">
                  {`${getArchetypeBuildName({
                    archetype1:
                      (buildState.items.archetype[0]?.name.toLowerCase() as Archetype) ||
                      null,
                    archetype2:
                      (buildState.items.archetype[1]?.name.toLowerCase() as Archetype) ||
                      null,
                  })}`}{' '}
                </div>
                <div className="col-span-2 truncate text-left text-gray-300">
                  by{' '}
                  <Link
                    href={`/profile/${build.createdById}/created-builds`}
                    className="text-primary-500 underline hover:text-primary-300"
                  >
                    {build.createdByDisplayName ?? build.createdByName}
                  </Link>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-2">
                  <Tooltip content="Total Favorites">
                    <button
                      className="flex items-center justify-end text-right text-yellow-500"
                      aria-label="Total build favorites"
                    >
                      <StarIcon className="mr-1 h-4 w-4" /> {build.totalUpvotes}
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="mb-2 flex flex-row items-center justify-start gap-x-2">
                {build.updatedAt && (
                  <p className="text-left text-xs text-gray-400">
                    Last Updated:{' '}
                    <span className="text-gray-400">
                      {formatUpdatedAt(build.updatedAt)}
                    </span>
                  </p>
                )}
              </div>
              {buildState.isPatchAffected && (
                <div className="mb-2 flex flex-row items-center justify-start gap-x-2">
                  <p className="border border-red-500 p-2 text-left text-xs font-bold text-red-500">
                    This build might have been affected by a past update.
                  </p>
                </div>
              )}
              <div className="mt-2 flex w-full flex-row items-center justify-center gap-x-2">
                {buildState.items.archetype[0] && (
                  <ArchtypeLabel name={buildState.items.archetype[0].name} />
                )}
                {buildState.items.archetype[1] && (
                  <ArchtypeLabel name={buildState.items.archetype[1].name} />
                )}
              </div>
              {buildState.description && (
                <div
                  className={cn(
                    'mt-4 max-h-[140px] flex-row items-start justify-start gap-x-2 overflow-y-auto whitespace-pre-wrap text-xs text-gray-300',
                  )}
                >
                  <DescriptionWithTags
                    description={buildState.description}
                    highlightItems={true}
                    highlightBuildTags={true}
                  />
                </div>
              )}
              <div className="mt-4 w-full max-w-full">
                <BuildTagsDisplay
                  buildTags={buildState.buildTags}
                  isEditable={false}
                  isScreenshotMode={false}
                  showLabel={false}
                />
              </div>
            </div>
          </div>
          {footerActions ? (
            <div className="mt-2 flex items-center justify-end gap-x-2 text-sm">
              {footerActions}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
