'use client'

import { BaseButton } from '@repo/ui/base/button'
import { Link } from '@repo/ui/base/link'
import { cn } from '@repo/ui/classnames'
import { EyeIcon } from '@repo/ui/icons/eye'
import { EyeSlashIcon } from '@repo/ui/icons/eyeslash'
import { FavoriteIcon } from '@repo/ui/icons/favorite'
import { PaperClipIcon } from '@repo/ui/icons/paperclip'
import { VideoIcon } from '@repo/ui/icons/video'
import { isValidYoutubeUrl } from '@repo/utils/youtube'

import { ArchetypeLabel } from '@/app/(components)/builder/archetype-label'
import { FeaturedBuildBadge } from '@/app/(components)/builder/badges/featured-build-badge'
import { NewBuildBadge } from '@/app/(components)/builder/badges/new-build-badge'
import { PopularBuildBadge } from '@/app/(components)/builder/badges/popular-build-badge'
import { BuildTagsDisplay } from '@/app/(components)/builder/build-tags/build-tags-display'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { Skeleton } from '@/app/(components)/skeleton'
import { Tooltip } from '@/app/(components)/tooltip'
import { DBBuild } from '@/app/(types)/builds'
import { buildHasFeaturedBadge } from '@/app/(utils)/builds/build-has-featured-badge'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'
import { formatUpdatedAt } from '@/app/(utils)/builds/format-updated-at'
import {
  ArchetypeName,
  getArchetypeComboName,
} from '@/app/(utils)/builds/get-archetype-combo-name'
import { isBuildNew } from '@/app/(utils)/builds/is-build-new'
import { isBuildPopular } from '@/app/(utils)/builds/is-build-popular'

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
  const hasFeaturedBadge = buildHasFeaturedBadge(build)

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
            'border-secondary-500 bg-background-solid relative col-span-1 flex h-full flex-col rounded-lg border shadow',
            buildState.isMember &&
              memberFrameEnabled &&
              'border-accent1-300 shadow-accent1-600 border-2 shadow-lg',
          )}
        >
          {isPopular || isNew || hasFeaturedBadge ? (
            <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-x-2">
              {isNew ? <NewBuildBadge /> : null}
              {isPopular ? (
                <PopularBuildBadge level={popularLevel} unoptimized={true} />
              ) : null}
              {hasFeaturedBadge ? <FeaturedBuildBadge /> : null}
            </div>
          ) : null}
          <div className="flex w-full flex-1 items-start justify-start p-4 pb-0">
            <div className="flex w-full flex-col items-start justify-start">
              <Link
                href={`/builder/${build.id}`}
                className="text-surface-solid w-full hover:text-gray-200 hover:underline"
              >
                <h3
                  className={cn(
                    'text-md whitespace-pre-wrap font-medium',
                    (isPopular || isNew || hasFeaturedBadge) && 'mt-3',
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
                    className="text-primary-500 hover:text-primary-300 underline"
                  >
                    {build.createdByDisplayName ?? build.createdByName}
                  </Link>
                </div>
                <div className="flex flex-row items-center justify-end gap-x-2">
                  <Tooltip content="Total Favorites">
                    {/** Not changing this to the new button */}
                    <button
                      className="text-accent1-500 flex items-center justify-end text-right"
                      aria-label="Total build favorites"
                    >
                      <FavoriteIcon className="mr-1 h-4 w-4" />{' '}
                      {build.totalUpvotes}
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
                    highlightBuildTokens={true}
                    highlightExternalTokens={false}
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
                      <VideoIcon className="h-4 w-4" />
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
