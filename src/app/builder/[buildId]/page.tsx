'use client'

import Builder from '@/features/build/components/Builder'
import { ActionButton } from '../../../features/build/components/ActionButton'
import ToCsvButton from '@/features/csv/components/ToCsvButton'
import { useIsClient } from 'usehooks-ts'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { isErrorResponse } from '@/types'
import ImageDownloadLink from '../../../features/build/components/ImageDownloadLink'
import {
  addReportForBuild,
  addVoteForBuild,
  removeReportForBuild,
  removeVoteForBuild,
} from '../actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {
  buildStateToCsvData,
  buildStateToMasonryItems,
  dbBuildToBuildState,
} from '../../../features/build/lib/build'
import { cn } from '@/lib/classnames'
import { DBBuild } from '@/features/build/types'
import useBuildActions from '../../../features/build/hooks/useBuildActions'
import MasonryItemList from '@/features/items/components/MasonryItemList'

/**
 * Converts a youtube embed url to a watch url
 * @example
 * videoEmbedUrlToWatchUrl('https://www.youtube.com/embed/3QKpQjvtqE8?controls=0')
 *  => 'https://www.youtube.com/watch?v=3QKpQjvtqE8'
 */
function videoEmbedUrlToWatchUrl(videoEmbedUrl: string) {
  const url = new URL(videoEmbedUrl)
  // need to get the video id segment
  const videoId = url.pathname.split('/')[2].split('?')[0]
  return `https://www.youtube.com/watch?v=${videoId}`
}

export default function Page({
  params: { build },
}: {
  params: { build: DBBuild }
}) {
  const router = useRouter()
  const isClient = useIsClient()
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
    handleScrollToDetailedView,
  } = useBuildActions()

  const buildContainerRef = useRef<HTMLDivElement>(null)
  const detailedViewContainerRef = useRef<HTMLDivElement>(null)

  // Need to convert the build data to a format that the BuildPage component can use
  if (!session?.user) {
    buildState.upvoted = false
    buildState.reported = false
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = buildStateToCsvData(buildState)
  const masonryItems = buildStateToMasonryItems(buildState)

  if (!isClient) return null

  return (
    <>
      <ImageDownloadLink onClose={handleClearImageLink} imageLink={imageLink} />
      <div className="flex w-full flex-col items-center justify-center">
        {buildState.isFeaturedBuild && buildState.videoUrl && (
          <div className="relative mb-4 flex h-[315px] w-[560px] items-center justify-center">
            <iframe
              width="560"
              height="315"
              src={`${buildState.videoUrl}&amp;controls=0`}
              title={buildState.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="pointer-events-none absolute left-0 top-0 h-full w-full"
            />
            <a
              href={`${videoEmbedUrlToWatchUrl(buildState.videoUrl)}`}
              target="_blank"
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        )}
        <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
          <div
            id="actions-column"
            className="flex min-w-full flex-col justify-between gap-2 sm:min-w-[100px]"
          >
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
            <ActionButton.DuplicateBuild
              onClick={() => handleDuplicateBuild(buildState)}
            />
            <ToCsvButton
              data={csvBuildData.filter((item) => item?.name !== '')}
              filename={`remnant2_builder_${buildState.name}`}
              label="Export to CSV"
            />
            <ActionButton.ShowDetailedView
              onClick={() =>
                handleScrollToDetailedView(detailedViewContainerRef.current)
              }
            />
            {session?.user && (
              <>
                <hr className="my-2 w-full border-gray-500" />

                <div className="col-span-full flex w-full flex-col items-center justify-center gap-4">
                  <div className="my-4 flex flex-row items-center justify-center gap-x-4 sm:my-0 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-2">
                    <ActionButton.Vote
                      active={buildState.upvoted}
                      totalUpvotes={buildState.totalUpvotes}
                      onClick={async () => {
                        if (buildState.createdById === session.user?.id) {
                          toast.error(
                            'You cannot vote/unvote for your own build.',
                          )
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
                  </div>
                </div>

                <hr className="my-2 w-full border-gray-500" />

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
          </div>
          <div
            ref={buildContainerRef}
            className={cn(
              'w-full grow bg-black',
              isScreenshotMode && 'min-h-[731px] min-w-[502px]',
            )}
          >
            <Builder
              buildState={buildState}
              includeMemberFeatures={true}
              isEditable={false}
              isScreenshotMode={isScreenshotMode}
              showControls={showControls}
            />
          </div>
        </div>
        <div
          className="mt-12 flex w-full flex-col items-center justify-center gap-2"
          ref={detailedViewContainerRef}
        >
          <MasonryItemList items={masonryItems} />
        </div>
      </div>
    </>
  )
}
