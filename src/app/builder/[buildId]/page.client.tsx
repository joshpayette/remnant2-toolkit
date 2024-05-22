'use client'

import copy from 'clipboard-copy'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { BuilderContainer } from '@/app/(components)/builder/builder-container'
import { DeleteBuildButton } from '@/app/(components)/buttons/builder-buttons/delete-build-button'
import { DetailedViewButton } from '@/app/(components)/buttons/builder-buttons/detailed-view-button'
import { DuplicateBuildButton } from '@/app/(components)/buttons/builder-buttons/duplicate-build-button'
import { EditBuildButton } from '@/app/(components)/buttons/builder-buttons/edit-build-button'
import { FavoriteBuildButton } from '@/app/(components)/buttons/builder-buttons/favorite-build-button'
import { GenerateBuildImageButton } from '@/app/(components)/buttons/builder-buttons/generate-build-image'
import { LoadoutManagementButton } from '@/app/(components)/buttons/builder-buttons/loadout-management-button'
import { ShareBuildButton } from '@/app/(components)/buttons/builder-buttons/share-build-button'
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import GenericDialog from '@/app/(components)/dialogs/generic-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { LoadoutDialog } from '@/app/(components)/dialogs/loadout-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { DBBuild } from '@/app/(types)/builds'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'
import { urlNoCache } from '@/app/(utils)/url-no-cache'
import {
  isValidYoutubeUrl,
  videoUrlToThumbnailUrl,
  videoUrlToWatchUrl,
} from '@/app/(utils)/youtube'

interface Props {
  build: DBBuild
}

export function PageClient({ build }: Props) {
  const buildState = cleanUpBuildState(dbBuildToBuildState(build))

  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)
  const [loadoutDialogOpen, setLoadoutDialogOpen] = useState(false)

  const router = useRouter()
  const { data: session } = useSession()

  const [signInRequiredDialogOpen, setSignInRequiredDialogOpen] =
    useState(false)

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleDuplicateBuild,
    handleFavoriteBuild,
    handleImageExport,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)

  // Need to convert the build data to a format that the BuildPage component can use
  if (!session?.user) {
    buildState.upvoted = false
    buildState.reported = false
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState)

  const twelveHoursAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 12)

  // If the video is a featured build, show it
  const canShowFeaturedVideo =
    buildState.videoUrl &&
    isValidYoutubeUrl(buildState.videoUrl) &&
    buildState.isFeaturedBuild

  // if the video is not a featured build, show it if it was updated over 12 hours ago
  const canShowBuildLinkVideo =
    buildState.buildLink &&
    buildState.buildLinkUpdatedAt &&
    isValidYoutubeUrl(buildState.buildLink) &&
    buildState.buildLinkUpdatedAt < twelveHoursAgo

  return (
    <div className="flex w-full flex-col items-center">
      <DetailedBuildDialog
        buildState={buildState}
        open={detailedBuildDialogOpen}
        onClose={() => setDetailedBuildDialogOpen(false)}
      />
      <LoadoutDialog
        key={loadoutDialogOpen.toString()}
        buildId={buildState.buildId}
        open={loadoutDialogOpen}
        onClose={() => setLoadoutDialogOpen(false)}
        isEditable={true}
      />
      <ImageDownloadInfoDialog
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />
      <GenericDialog
        open={signInRequiredDialogOpen}
        onClose={() => setSignInRequiredDialogOpen(false)}
        title="Sign In Required"
      >
        <p>
          You must be signed in to favorite builds. Favorited builds will always
          be available in your profile, can be used in your loadouts, and will
          support the creator by increasing the build&apos;s visibility.
        </p>
        <p>Sign in or create an account to favorite this build.</p>
      </GenericDialog>
      <div className="height-full flex w-full flex-col items-center justify-center">
        {canShowFeaturedVideo && buildState.videoUrl && (
          <div className="mb-12 max-h-[270px] text-center sm:mb-8 sm:max-h-[430px] sm:max-w-[560px]">
            <a href={videoUrlToWatchUrl(buildState.videoUrl)} target="_blank">
              <Image
                width={560}
                height={315}
                src={videoUrlToThumbnailUrl(buildState.videoUrl)}
                loading="eager"
                alt={`${buildState.name} video thumbnail`}
                unoptimized={true}
              />
              <span className="mb-4 text-sm text-surface-solid underline">
                See build description and breakdown on YouTube
              </span>
            </a>
          </div>
        )}
        {buildState.buildLink &&
          canShowBuildLinkVideo &&
          !canShowFeaturedVideo && (
            <div className="mb-12 max-h-[270px] text-center sm:mb-8 sm:max-h-[430px] sm:max-w-[560px]">
              <a
                href={videoUrlToWatchUrl(buildState.buildLink)}
                target="_blank"
              >
                <Image
                  width={560}
                  height={315}
                  src={videoUrlToThumbnailUrl(buildState.buildLink)}
                  loading="eager"
                  alt={`${buildState.name} video thumbnail`}
                  unoptimized={true}
                />
                <span className="mb-4 text-sm text-surface-solid underline">
                  See build description and breakdown on YouTube
                </span>
              </a>
            </div>
          )}
        <BuilderContainer
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isScreenshotMode={isScreenshotMode}
          showControls={showControls}
          builderActions={
            <>
              {session && session.user?.id === buildState.createdById && (
                <EditBuildButton
                  onClick={() =>
                    router.push(`/builder/edit/${buildState.buildId}`)
                  }
                />
              )}

              <GenerateBuildImageButton
                imageExportLoading={imageExportLoading}
                onClick={() =>
                  handleImageExport(
                    buildContainerRef.current,
                    `${buildState.name}`,
                  )
                }
              />

              <ShareBuildButton
                onClick={() => {
                  const url = urlNoCache(window.location.href)
                  copy(url)
                  toast.success('Copied Build URL to clipboard.')
                }}
              />

              {session?.user?.id && (
                <LoadoutManagementButton
                  buildId={buildState.buildId}
                  onClick={() => setLoadoutDialogOpen(true)}
                />
              )}

              {buildState.createdById !== session?.user?.id && (
                <FavoriteBuildButton
                  upvoted={buildState.upvoted}
                  onClick={() => {
                    // if user is not signed in, let them know signin is required
                    if (!session?.user?.id) {
                      setSignInRequiredDialogOpen(true)
                      return
                    }
                    handleFavoriteBuild(buildState, session?.user?.id)
                  }}
                />
              )}

              {session &&
                session.user?.id === buildState.createdById &&
                buildState.buildId && (
                  <DeleteBuildButton buildId={buildState.buildId} />
                )}

              <DetailedViewButton
                onClick={() => setDetailedBuildDialogOpen(true)}
              />

              <DuplicateBuildButton
                onClick={() => handleDuplicateBuild(buildState)}
              />

              <ToCsvButton
                data={csvBuildData.filter((item) => item?.name !== '')}
                filename={`remnant2_builder_${buildState.name}`}
                label="Export to CSV"
              />
            </>
          }
        />
      </div>
    </div>
  )
}
