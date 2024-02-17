'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ActionButton } from '@/features/build/components/ActionButton'
import { BuilderPage } from '@/features/build/components/BuilderPage'
import { DetailedBuildDialog } from '@/features/build/components/DetailedBuildDialog'
import { ImageDownloadLink } from '@/features/build/components/ImageDownloadLink'
import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { buildStateToCsvData } from '@/features/build/lib/buildStateToCsvData'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { DBBuild } from '@/features/build/types'
import { ToCsvButton } from '@/features/csv/ToCsvButton'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'

import {
  addReportForBuild,
  addVoteForBuild,
  removeReportForBuild,
  removeVoteForBuild,
} from '../actions'

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

  const router = useRouter()
  const { data: session } = useSession()

  const buildState = dbBuildToBuildState(build)

  const {
    isScreenshotMode,
    showControls,
    imageLink,
    imageExportLoading,
    handleClearImageLink,
    handleCopyBuildUrl,
    handleDuplicateBuild,
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
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />
      <div className="height-full flex w-full flex-col items-center justify-center">
        {buildState.isFeaturedBuild && buildState.videoUrl && (
          <div className="youtube-video-container max-h-[215px] sm:mb-8 sm:max-h-[315px] sm:max-w-[560px]">
            <a
              href={`${videoEmbedUrlToWatchUrl(buildState.videoUrl)}`}
              target="_blank"
            >
              <Image
                width={560}
                height={315}
                src={`https://i.ytimg.com/vi/${videoEmbedUrlToVideoId(
                  buildState.videoUrl,
                )}/mqdefault.jpg`}
                loading="eager"
                alt={`${buildState.name} video thumbnail`}
                unoptimized={true}
              />
            </a>
          </div>
        )}
        <BuilderPage
          buildContainerRef={buildContainerRef}
          buildState={buildState}
          isEditable={false}
          includeMemberFeatures={true}
          isScreenshotMode={isScreenshotMode}
          showControls={showControls}
          builderActions={
            <>
              <div className="col-span-full">
                <ActionButton.ExportImage
                  imageExportLoading={imageExportLoading}
                  onClick={() =>
                    handleImageExport(
                      buildContainerRef.current,
                      `${buildState.name}.png`,
                    )
                  }
                />
              </div>

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
              {buildState.createdById !== session?.user?.id && (
                <ActionButton.FavoriteBuild
                  upvoted={buildState.upvoted}
                  onClick={async () => {
                    if (buildState.createdById === session?.user?.id) {
                      toast.error('You cannot vote/unvote for your own build.')
                      return
                    }

                    const newVote = !buildState.upvoted

                    const response = newVote
                      ? await addVoteForBuild(
                          JSON.stringify({ buildId: build.id }),
                        )
                      : await removeVoteForBuild(
                          JSON.stringify({ buildId: build.id }),
                        )

                    if (isErrorResponse(response)) {
                      console.error(response.errors)
                      toast.error(
                        'Error voting for build. Please try again later.',
                      )
                    } else {
                      toast.success(
                        newVote
                          ? 'Successfully favorited build! You can find it in your profile.'
                          : 'Successfully removed favorite!',
                      )
                      buildState.upvoted = newVote
                      buildState.totalUpvotes = response.totalUpvotes ?? 1
                      router.refresh()
                    }
                  }}
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
              {session?.user && (
                <>
                  <div className="col-span-full flex w-full flex-col items-center justify-center gap-4 sm:items-start">
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
