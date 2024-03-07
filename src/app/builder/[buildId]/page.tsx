'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { addReportForBuild } from '@/features/build/actions/addReportForBuild'
import { removeReportForBuild } from '@/features/build/actions/removeReportForBuild'
import { BuilderPage } from '@/features/build/components/builder/BuilderPage'
import { ActionButton } from '@/features/build/components/buttons/ActionButton'
import { DetailedBuildDialog } from '@/features/build/components/dialogs/DetailedBuildDialog'
import { ImageDownloadInfo } from '@/features/build/components/dialogs/ImageDownloadInfo'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { buildStateToCsvData } from '@/features/build/lib/buildStateToCsvData'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { DBBuild } from '@/features/build/types'
import { ToCsvButton } from '@/features/csv/ToCsvButton'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { LoadoutDialog } from '@/features/profile/loadouts/LoadoutDialog'

function videoEmbedUrlToVideoId(videoEmbedUrl: string) {
  const url = new URL(videoEmbedUrl)
  // need to get the video id segment
  return url.pathname.split('/')[2].split('?')[0]
}

/**
 * Converts a youtube embed url to a watch url
 * @example
 * videoEmbedUrlToWatchUrl('https://www.youtube.com/embed/3QKpQjvtqE8?controls=0')
 *  => 'https://www.youtube.com/watch?v=3QKpQjvtqE8'
 */
function videoEmbedUrlToWatchUrl(videoEmbedUrl: string) {
  const videoId = videoEmbedUrlToVideoId(videoEmbedUrl)
  return `https://www.youtube.com/watch?v=${videoId}`
}

export default function Page({
  params: { build },
}: {
  params: { build: DBBuild }
}) {
  const [detailedBuildDialogOpen, setDetailedBuildDialogOpen] = useState(false)
  const [loadoutDialogOpen, setLoadoutDialogOpen] = useState(false)

  const router = useRouter()
  const { data: session } = useSession()

  const buildState = dbBuildToBuildState(build)

  const {
    isScreenshotMode,
    showControls,
    imageDownloadInfo,
    imageExportLoading,
    handleClearImageDownloadInfo,
    handleCopyBuildUrl,
    handleDeleteBuild,
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
      />
      <ImageDownloadInfo
        onClose={handleClearImageDownloadInfo}
        imageDownloadInfo={imageDownloadInfo}
      />
      <div className="height-full flex w-full flex-col items-center justify-center">
        {buildState.isFeaturedBuild && buildState.videoUrl && (
          <div className="mb-8 max-h-[270px] text-center sm:mb-8 sm:max-h-[430px] sm:max-w-[560px]">
            <a
              href={`${videoEmbedUrlToWatchUrl(buildState.videoUrl)}`}
              target="_blank"
            >
              <Image
                width={560}
                height={315}
                src={`https://i.ytimg.com/vi/${videoEmbedUrlToVideoId(
                  buildState.videoUrl,
                )}/sddefault.jpg`}
                loading="eager"
                alt={`${buildState.name} video thumbnail`}
                unoptimized={true}
              />
              <span className="mb-4 text-sm text-white underline">
                See build description and breakdown on YouTube
              </span>
            </a>
          </div>
        )}
        <BuilderPage
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          isScreenshotMode={isScreenshotMode}
          showControls={showControls}
          builderActions={
            <>
              <ActionButton.ExportImage
                imageExportLoading={imageExportLoading}
                onClick={() =>
                  handleImageExport(
                    buildContainerRef.current,
                    `${buildState.name}`,
                  )
                }
              />

              {session && session.user?.id === buildState.createdById && (
                <ActionButton.EditBuild
                  onClick={() =>
                    router.push(`/builder/edit/${buildState.buildId}`)
                  }
                />
              )}

              <ActionButton.ShareBuild
                onClick={() =>
                  handleCopyBuildUrl(
                    window.location.href,
                    'Copied Build URL to clipboard.',
                  )
                }
              />
              {session?.user?.id &&
                buildState.createdById !== session.user.id && (
                  <ActionButton.FavoriteBuild
                    upvoted={buildState.upvoted}
                    onClick={() =>
                      handleFavoriteBuild(buildState, session?.user?.id)
                    }
                  />
                )}

              {session?.user?.id && (
                <ActionButton.LoadoutManagement
                  onClick={() => setLoadoutDialogOpen(true)}
                />
              )}

              <ActionButton.DuplicateBuild
                onClick={() => handleDuplicateBuild(buildState)}
              />
              <ToCsvButton
                data={csvBuildData.filter((item) => item?.name !== '')}
                filename={`remnant2_builder_${buildState.name}`}
                label="Export to CSV"
              />
              <ActionButton.ShowDetailedView
                onClick={() => setDetailedBuildDialogOpen(true)}
              />

              {session && session.user?.id === buildState.createdById && (
                <ActionButton.DeleteBuild
                  onClick={() => handleDeleteBuild(buildState.buildId)}
                />
              )}

              {session?.user && (
                <>
                  <div className="flex w-[200px] flex-col items-center justify-center gap-4 sm:items-end md:w-[150px] md:items-center">
                    <div className="my-4 flex flex-row items-center justify-center gap-x-4 sm:my-0 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-2">
                      <ActionButton.ReportBuild
                        active={buildState.reported}
                        onClick={async () => {
                          const newReported = !buildState.reported

                          // prompt for the reason
                          const reason = newReported
                            ? prompt(
                                'Please enter a reason for reporting this build.',
                              )
                            : null

                          if (newReported && !reason) {
                            toast.error(
                              'You must enter a reason for reporting this build.',
                            )
                            return
                          }

                          const response = newReported
                            ? await addReportForBuild(
                                JSON.stringify({
                                  buildId: build.id,
                                  reason,
                                }),
                              )
                            : await removeReportForBuild(
                                JSON.stringify({ buildId: build.id }),
                              )

                          if (isErrorResponse(response)) {
                            console.error(response.errors)
                            toast.error(response.errors?.[0])
                          } else {
                            toast.success(response.message)
                            buildState.reported = newReported
                            router.refresh()
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          }
        />
      </div>
    </div>
  )
}
