'use client'

import copy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { BuilderContainer } from '@/app/(components)/builder/builder-container'
import VideoThumbnail from '@/app/(components)/builder/video-thumbnail'
import { DeleteBuildButton } from '@/app/(components)/buttons/builder-buttons/delete-build-button'
import { DetailedViewButton } from '@/app/(components)/buttons/builder-buttons/detailed-view-button'
import { DuplicateBuildButton } from '@/app/(components)/buttons/builder-buttons/duplicate-build-button'
import { EditBuildButton } from '@/app/(components)/buttons/builder-buttons/edit-build-button'
import { FavoriteBuildButton } from '@/app/(components)/buttons/builder-buttons/favorite-build-button'
import { GenerateBuildImageButton } from '@/app/(components)/buttons/builder-buttons/generate-build-image'
import { LoadoutManagementButton } from '@/app/(components)/buttons/builder-buttons/loadout-management-button'
import { ModeratorToolsButton } from '@/app/(components)/buttons/builder-buttons/moderator-tools-button'
import { NewLinkedBuildButton } from '@/app/(components)/buttons/builder-buttons/new-linked-build-button'
import { ShareBuildButton } from '@/app/(components)/buttons/builder-buttons/share-build-button'
import { ViewLinkedBuildButton } from '@/app/(components)/buttons/builder-buttons/view-linked-builds'
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import FavoriteBuildDialog from '@/app/(components)/dialogs/favorite-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { LoadoutDialog } from '@/app/(components)/dialogs/loadout-dialog'
import { ModeratorToolsDialog } from '@/app/(components)/dialogs/moderator-tools-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { DBBuild } from '@/app/(types)/builds'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'
import { urlNoCache } from '@/app/(utils)/url-no-cache'

interface Props {
  build: DBBuild
}

export function PageClient({ build }: Props) {
  const buildState = cleanUpBuildState(dbBuildToBuildState(build))

  const [showModeratorTooling, setShowModeratorTooling] = useState(false)

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
      <FavoriteBuildDialog
        open={signInRequiredDialogOpen}
        onClose={() => setSignInRequiredDialogOpen(false)}
      />
      <div className="height-full flex w-full flex-col items-center justify-center">
        <VideoThumbnail buildState={buildState} />
        <BuilderContainer
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isScreenshotMode={isScreenshotMode}
          showControls={showControls}
          builderActions={
            <>
              {session &&
                session.user?.id !== buildState.createdById &&
                session.user?.role === 'admin' && (
                  <>
                    <ModeratorToolsDialog
                      open={showModeratorTooling}
                      onClose={() => setShowModeratorTooling(false)}
                      buildToModerate={buildState}
                    />
                    <ModeratorToolsButton
                      onClick={() => setShowModeratorTooling(true)}
                    />
                  </>
                )}
              {session && session.user?.id === buildState.createdById && (
                <EditBuildButton
                  onClick={() =>
                    router.push(`/builder/edit/${buildState.buildId}`)
                  }
                />
              )}

              {session && session.user?.id === buildState.createdById && (
                <NewLinkedBuildButton
                  onClick={() =>
                    router.push(`/builder/linked/create/${buildState.buildId}`)
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

              <ViewLinkedBuildButton
                onClick={() =>
                  router.push(
                    `/profile/${buildState.createdById}/linked-builds/${buildState.buildId}`,
                  )
                }
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
