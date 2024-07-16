'use client'

import { BaseDivider } from '@repo/ui/base/divider'
import { BaseField, BaseLabel } from '@repo/ui/base/fieldset'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui/base/listbox'
import { cn } from '@repo/ui/classnames'
import { urlNoCache } from '@repo/utils/url-no-cache'
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
import { EditLinkedBuildButton } from '@/app/(components)/buttons/builder-buttons/edit-linked-build-button'
import { FavoriteBuildButton } from '@/app/(components)/buttons/builder-buttons/favorite-build-button'
import { GenerateBuildImageButton } from '@/app/(components)/buttons/builder-buttons/generate-build-image'
import { LoadoutManagementButton } from '@/app/(components)/buttons/builder-buttons/loadout-management-button'
import { ModeratorToolsButton } from '@/app/(components)/buttons/builder-buttons/moderator-tools-button'
import { ShareBuildButton } from '@/app/(components)/buttons/builder-buttons/share-build-button'
import { ToCsvButton } from '@/app/(components)/buttons/to-csv-button'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { DetailedBuildDialog } from '@/app/(components)/dialogs/detailed-build-dialog'
import FavoriteBuildDialog from '@/app/(components)/dialogs/favorite-build-dialog'
import { ImageDownloadInfoDialog } from '@/app/(components)/dialogs/image-download-info-dialog'
import { LoadoutDialog } from '@/app/(components)/dialogs/loadout-dialog'
import { ModeratorLinkedBuildToolsDialog } from '@/app/(components)/dialogs/moderator-linkedbuild-tools-dialog'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import type {
  LinkedBuildItem,
  LinkedBuildState,
} from '@/app/(types)/linked-builds'
import { buildStateToCsvData } from '@/app/(utils)/builds/build-state-to-csv-data'
import { cleanUpBuildState } from '@/app/(utils)/builds/clean-up-build-state'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'

interface Props {
  linkedBuildState: LinkedBuildState
}

export function PageClient({ linkedBuildState }: Props) {
  const { linkedBuildItems } = linkedBuildState
  const [currentLinkedBuild, setCurrentLinkedBuild] = useState<LinkedBuildItem>(
    linkedBuildItems[0] as LinkedBuildItem,
  )

  const buildState = cleanUpBuildState(
    dbBuildToBuildState(currentLinkedBuild.build),
  )

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
        <div className="mb-8 w-full max-w-lg">
          <h2 className="border-b-primary-500 mb-2 border-b pb-2 text-center text-2xl font-bold">
            {linkedBuildState.name}
          </h2>
          <div className="mb-2 flex flex-col">
            {linkedBuildState.description &&
              linkedBuildState.description.length > 0 && (
                <div
                  className={cn(
                    'text-md overflow-x-auto overflow-y-auto whitespace-pre-wrap text-gray-200',
                    isScreenshotMode && 'max-h-none',
                  )}
                >
                  <DescriptionWithTokens
                    description={linkedBuildState.description}
                    highlightBuildTokens={true}
                    highlightExternalTokens={false}
                    highlightItems={true}
                  />
                </div>
              )}
          </div>

          <BaseDivider className="my-4 sm:my-0 sm:hidden" />

          <BaseField className="sm:hidden">
            <BaseLabel>
              <div className="mb-2 w-full text-center">Linked Builds</div>
            </BaseLabel>
            <BaseListbox
              name="linkedBuilds"
              value={currentLinkedBuild.label}
              onChange={(value) => {
                const linkedBuild = linkedBuildItems.find(
                  (linkedBuildItem) => linkedBuildItem.label === value,
                )
                if (linkedBuild) {
                  setCurrentLinkedBuild(linkedBuild)
                }
              }}
            >
              {linkedBuildItems.map((linkedBuildItem) => (
                <BaseListboxOption
                  key={linkedBuildItem.id}
                  value={linkedBuildItem.label}
                >
                  <BaseListboxLabel>{linkedBuildItem.label}</BaseListboxLabel>
                </BaseListboxOption>
              ))}
            </BaseListbox>
          </BaseField>
          <div className="hidden sm:block">
            <nav
              className="isolate flex divide-x divide-gray-700 rounded-lg shadow"
              aria-label="Tabs"
            >
              {linkedBuildItems.map((linkedBuildItem, tabIdx) => (
                <button
                  key={linkedBuildItem.build.id}
                  onClick={() => setCurrentLinkedBuild(linkedBuildItem)}
                  className={cn(
                    linkedBuildItem.build.id === currentLinkedBuild.build.id
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:text-gray-300',
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === linkedBuildItems.length - 1
                      ? 'rounded-r-lg'
                      : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-gray-900 px-4 py-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10',
                  )}
                >
                  <span>{linkedBuildItem.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      linkedBuildItem.build.id === currentLinkedBuild.build.id
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
              {session &&
                session.user?.id !== buildState.createdById &&
                session.user?.role === 'admin' && (
                  <>
                    <ModeratorLinkedBuildToolsDialog
                      open={showModeratorTooling}
                      onClose={() => setShowModeratorTooling(false)}
                      buildToModerate={linkedBuildState}
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
                <EditLinkedBuildButton
                  onClick={() =>
                    router.push(`/builder/linked/edit/${linkedBuildState.id}`)
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
                  const url = urlNoCache(
                    `https://remnant2toolkit.com/builder/${currentLinkedBuild.build.id}`,
                  )
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
                    setCurrentLinkedBuild({
                      ...currentLinkedBuild,
                      build: {
                        ...currentLinkedBuild.build,
                        upvoted: !currentLinkedBuild.build.upvoted,
                        totalUpvotes: currentLinkedBuild.build.upvoted
                          ? currentLinkedBuild.build.totalUpvotes - 1
                          : currentLinkedBuild.build.totalUpvotes + 1,
                      },
                    })
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
