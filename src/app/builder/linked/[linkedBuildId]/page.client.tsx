'use client'

import copy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { BuilderContainer } from '@/app/(components)/builder/builder-container'
import VideoThumbnail from '@/app/(components)/builder/video-thumbnail'
import { DeleteBuildButton } from '@/app/(components)/buttons/builder-buttons/delete-build-button'
import { DetailedViewButton } from '@/app/(components)/buttons/builder-buttons/detailed-view-button'
import { DuplicateBuildButton } from '@/app/(components)/buttons/builder-buttons/duplicate-build-button'
import { EditBuildButton } from '@/app/(components)/buttons/builder-buttons/edit-build-button'
import { EditLinkedBuildButton } from '@/app/(components)/buttons/builder-buttons/edit-linked-build-button'
import { FavoriteBuildButton } from '@/app/(components)/buttons/builder-buttons/favorite-build-button'
import { GenerateBuildImageButton } from '@/app/(components)/buttons/builder-buttons/generate-build-image'
import { LoadoutManagementButton } from '@/app/(components)/buttons/builder-buttons/loadout-management-button'
import { NewLinkedBuildButton } from '@/app/(components)/buttons/builder-buttons/new-linked-build-button'
import { ShareBuildButton } from '@/app/(components)/buttons/builder-buttons/share-build-button'
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import FavoriteBuildDialog from '@/app/(components)/dialogs/favorite-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { LoadoutDialog } from '@/app/(components)/dialogs/loadout-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { DBBuild } from '@/app/(types)/builds'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'
import { cn } from '@/app/(utils)/classnames'
import { urlNoCache } from '@/app/(utils)/url-no-cache'

interface Props {
  linkedBuild: {
    id: string
    label: string
    linkedBuilds: {
      label: string
      build: DBBuild
    }[]
  }
}

export function PageClient({ linkedBuild }: Props) {
  const { linkedBuilds } = linkedBuild
  const [currentLinkedBuild, setCurrentLinkedBuild] = useState(linkedBuilds[0])

  const buildState = cleanUpBuildState(
    dbBuildToBuildState(currentLinkedBuild.build),
  )

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
        <div className="mb-8 w-full max-w-lg">
          <h2 className="mb-2 border-b border-b-primary-500 pb-2 text-center text-2xl font-bold">
            {linkedBuild.label}
          </h2>
          <div className="sm:hidden">
            <BaseListbox
              name="linkedBuilds"
              defaultValue={
                linkedBuilds.find(
                  (linkedBuild) =>
                    linkedBuild.build.id === currentLinkedBuild.build.id,
                )?.label
              }
              onChange={(value) => {
                const linkedBuild = linkedBuilds.find(
                  (linkedBuild) => linkedBuild.label === value,
                )
                if (linkedBuild) {
                  setCurrentLinkedBuild(linkedBuild)
                }
              }}
            >
              {linkedBuilds.map((linkedBuild) => (
                <BaseListboxOption
                  key={linkedBuild.build.id}
                  value={linkedBuild.label}
                >
                  <BaseListboxLabel>{linkedBuild.label}</BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </div>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-700 rounded-lg shadow"
              aria-label="Tabs"
            >
              {linkedBuilds.map((linkedBuild, tabIdx) => (
                <button
                  key={linkedBuild.build.id}
                  onClick={() => setCurrentLinkedBuild(linkedBuild)}
                  className={cn(
                    linkedBuild.build.id === currentLinkedBuild.build.id
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:text-gray-300',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === linkedBuilds.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
                  )}
                >
                  <span>{linkedBuild.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      linkedBuild.build.id === currentLinkedBuild.build.id
                        ? 'bg-purple-500'
                        : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5',
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
        <VideoThumbnail buildState={buildState} />
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

              {session && session.user?.id === buildState.createdById && (
                <EditLinkedBuildButton
                  onClick={() =>
                    router.push(`/builder/linked/edit/${linkedBuild.id}`)
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
