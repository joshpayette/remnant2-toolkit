'use client';

import {
  BaseButton,
  BaseLink,
  cn,
  EyeIcon,
  EyeOffIcon,
  FavoriteIcon,
  IndentIcon,
  PaperClipIcon,
  Skeleton,
  VideoIcon,
} from '@repo/ui';
import { isValidYoutubeUrl } from '@repo/utils';
import { useSession } from 'next-auth/react';

import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { Tooltip } from '@/app/_components/tooltip';
import { useBadges } from '@/app/_hooks/use-badges';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { formatUpdatedAt } from '@/app/(builds)/_libs/format-updated-at';
import {
  type ArchetypeName,
  getArchetypeComboName,
} from '@/app/(builds)/_libs/get-archetype-combo-name';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { ArchetypeLabel } from '@/app/(builds)/builder/_components/archetype-label';
import { BuildBadges } from '@/app/(builds)/builder/_components/build-badges';
import { BuildTagsDisplay } from '@/app/(builds)/builder/_components/build-tags-display';

interface Props {
  build: DBBuild;
  footerActions?: React.ReactNode;
  isLoading: boolean;
  memberFrameEnabled?: boolean;
  showBuildVisibility?: boolean;
}

export function BuildCard({
  build,
  footerActions,
  isLoading,
  memberFrameEnabled = true,
  showBuildVisibility = false,
}: Props) {
  const { data: session } = useSession();

  const buildState = dbBuildToBuildState(build);

  const { hasAnyBadge } = useBadges({ buildState });

  return (
    <div
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
          {hasAnyBadge || buildState.isMember ? (
            <div className="absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-x-2">
              <BuildBadges buildState={buildState} />
            </div>
          ) : null}
          <div className="flex w-full flex-1 items-start justify-start p-4 pb-0">
            <div className="flex w-full flex-col items-start justify-start">
              <BaseLink
                href={`/builder/${build.id}${
                  buildState.variantIndex > 0
                    ? `?variant=${buildState.variantIndex}`
                    : ''
                }`}
                className="text-surface-solid w-full hover:text-gray-200 hover:underline"
              >
                <h3
                  className={cn(
                    'text-md whitespace-pre-wrap font-medium',
                    hasAnyBadge && 'mt-4',
                  )}
                >
                  {build.name}
                </h3>
              </BaseLink>
              {build.totalVariants && build.totalVariants > 0 ? (
                <div className="col-span-3 flex flex-row items-center justify-start gap-x-2 text-left text-xs text-gray-400">
                  {build.totalVariants} Build{' '}
                  {build.totalVariants > 1 ? 'Variants' : 'Variant'}
                </div>
              ) : null}
              <div className="grid w-full grid-cols-3 text-sm">
                {build.variantIndex > 0 ? (
                  <div className="col-span-3 flex flex-row text-left text-xs text-gray-300">
                    <IndentIcon className="mr-1 h-4 w-4" />
                    {build.buildVariantName
                      ? `Variant: ${build.buildVariantName}`
                      : `Build Variant`}
                  </div>
                ) : null}
                <div className="col-span-2 truncate text-left text-gray-300">
                  by{' '}
                  <BaseLink
                    href={`/profile/${build.createdById}/created-builds`}
                    className="text-primary-500 hover:text-primary-300 underline"
                  >
                    {build.createdByDisplayName ?? build.createdByName}
                  </BaseLink>
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
              <div className="my-1 flex flex-row items-center justify-start gap-x-2">
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
                        <EyeOffIcon className="h-4 w-4" />
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
                {buildState.percentageOwned > 0 && session?.user?.id && (
                  <Tooltip
                    content={`You own >= ${Number(
                      buildState.percentageOwned,
                    ).toFixed(
                      0,
                    )}% of the items in this build. Excludes armor and other non-essential items.`}
                  >
                    <BaseButton outline>
                      <span className="text-xs text-gray-300">
                        {Number(buildState.percentageOwned).toFixed(0)}% Owned
                      </span>
                    </BaseButton>
                  </Tooltip>
                )}
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
  );
}
