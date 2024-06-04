'use client'

import {
  EyeIcon,
  EyeSlashIcon,
  PaperClipIcon,
  StarIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid'

import { BaseButton } from '@/app/(components)/_base/button'
import { Link } from '@/app/(components)/_base/link'
import { ArchetypeLabel } from '@/app/(components)/builder/archetype-label'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { Skeleton } from '@/app/(components)/skeleton'
import { Tooltip } from '@/app/(components)/tooltip'
import { DBBuild } from '@/app/(types)/builds'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'
import { formatUpdatedAt } from '@/app/(utils)/builds/format-updated-at'
import {
  ArchetypeName,
  getArchetypeComboName,
} from '@/app/(utils)/builds/get-archetype-combo-name'
import { isBuildNew } from '@/app/(utils)/builds/is-build-new'
import { isBuildPopular } from '@/app/(utils)/builds/is-build-popular'
import { cn } from '@/app/(utils)/classnames'
import { isValidYoutubeUrl } from '@/app/(utils)/youtube'

import { FeaturedBuildBadge } from '../builder/badges/featured-build-badge'
import { NewBuildBadge } from '../builder/badges/new-build-badge'
import { PopularBuildBadge } from '../builder/badges/popular-build-badge'
import { BuildTagsDisplay } from '../builder/build-tags/build-tags-display'

interface Props {
  build: DBBuild
  footerActions?: React.ReactNode
  isLoading: boolean
  memberFrameEnabled?: boolean
  showBuildVisibility?: boolean
}

export function BuildCard({
  build,
  footerActions,
  isLoading,
  memberFrameEnabled = true,
  showBuildVisibility = false,
}: Props) {
  const buildState = dbBuildToBuildState(build)
  const { isPopular, popularLevel } = isBuildPopular(build.totalUpvotes)
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
            'relative col-span-1 flex h-full flex-col rounded-lg border border-secondary-500 bg-background-solid shadow',
            buildState.isMember &&
              memberFrameEnabled &&
              'border-2 border-accent1-300 shadow-lg shadow-accent1-600',
          )}
        >
          {(isPopular || build.isFeaturedBuild || isNew) && (
            <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-x-2">
              {isNew ? <NewBuildBadge /> : null}
              {isPopular ? (
                <PopularBuildBadge level={popularLevel} unoptimized={true} />
              ) : null}
              {build.isFeaturedBuild ? <FeaturedBuildBadge /> : null}
            </div>
          )}
          <div className="flex w-full flex-1 items-start justify-start p-4 pb-0">
            <div className="flex w-full flex-col items-start justify-start">
              <Link
                href={`/builder/${build.id}`}
                className="w-full text-surface-solid hover:text-gray-200 hover:underline"
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
              <div className="mb-1 grid w-full grid-cols-3 truncate text-sm">
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
                    {/** Not changing this to the new button */}
                    <button
                      className="flex items-center justify-end text-right text-accent1-500"
                      aria-label="Total build favorites"
                    >
                      <StarIcon className="mr-1 h-4 w-4" /> {build.totalUpvotes}
                    </button>
                  </Tooltip>
                </div>
              </div>
              <div className="mb-1 flex flex-row items-center justify-start gap-x-2">
                {build.updatedAt && (
                  <p className="text-left text-xs text-gray-400">
                    Last Updated:{' '}
                    <span className="text-gray-400">
                      {formatUpdatedAt(build.updatedAt)}
                    </span>
                  </p>
                )}
              </div>
              <div className="mb-2 flex flex-row items-center justify-start gap-x-2">
                <p className="text-left text-xs text-gray-300">
                  {`${getArchetypeComboName({
                    archetype1:
                      (buildState.items.archetype[0]?.name.toLowerCase() as ArchetypeName) ||
                      null,
                    archetype2:
                      (buildState.items.archetype[1]?.name.toLowerCase() as ArchetypeName) ||
                      null,
                  })}`}{' '}
                  Build
                </p>
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
                  <ArchetypeLabel name={buildState.items.archetype[0].name} />
                )}
                {buildState.items.archetype[1] && (
                  <ArchetypeLabel name={buildState.items.archetype[1].name} />
                )}
              </div>
              {buildState.description && (
                <div className="mt-2 h-auto max-h-[140px] w-full flex-row items-start justify-start gap-x-2 overflow-x-auto overflow-y-auto whitespace-pre-wrap text-xs text-gray-300">
                  <DescriptionWithTokens
                    description={buildState.description}
                    highlightItems={true}
                    highlightBuildTags={true}
                  />
                </div>
              )}
              {buildState.buildTags?.length &&
              buildState.buildTags.length > 0 ? (
                <div className="mt-2 w-full max-w-full">
                  <BuildTagsDisplay
                    buildTags={buildState.buildTags}
                    isEditable={false}
                    isScreenshotMode={false}
                    showLabel={false}
                  />
                </div>
              ) : null}
              <div className="mt-2 flex w-full items-start justify-center gap-x-2">
                {showBuildVisibility ? (
                  <Tooltip
                    content={`Build is ${
                      build.isPublic ? 'public' : 'private'
                    }`}
                  >
                    <BaseButton outline>
                      {build.isPublic ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeSlashIcon className="h-4 w-4" />
                      )}
                    </BaseButton>
                  </Tooltip>
                ) : null}
                {build.buildLink ? (
                  <Tooltip content="Build includes a reference link">
                    <BaseButton outline>
                      <PaperClipIcon className="h-4 w-4" />
                    </BaseButton>
                  </Tooltip>
                ) : null}
                {buildState.videoUrl ||
                (buildState.buildLink &&
                  isValidYoutubeUrl(buildState.buildLink)) ? (
                  <Tooltip content="Build includes a video">
                    <BaseButton outline>
                      <VideoCameraIcon className="h-4 w-4" />
                    </BaseButton>
                  </Tooltip>
                ) : null}
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
