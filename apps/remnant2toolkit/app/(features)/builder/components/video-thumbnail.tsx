import {
  isValidYoutubeUrl,
  videoUrlToThumbnailUrl,
  videoUrlToWatchUrl,
} from '@repo/utils/youtube'
import Image from 'next/image'

import { BuildState } from '@/app/(types)/builds'

interface Props {
  buildState: BuildState
}

export function VideoThumbnail({ buildState }: Props) {
  // If the video is a featured build, show it
  const canShowFeaturedVideo =
    buildState.videoUrl &&
    isValidYoutubeUrl(buildState.videoUrl) &&
    (buildState.isFeaturedBuild ||
      buildState.isBeginnerBuild ||
      buildState.isBaseGameBuild)

  // if the video is not a featured build, show it if it was updated over 12 hours ago
  const twelveHoursAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 12)
  const canShowBuildLinkVideo =
    buildState.buildLink &&
    buildState.buildLinkUpdatedAt &&
    isValidYoutubeUrl(buildState.buildLink) &&
    (buildState.buildLinkUpdatedAt < twelveHoursAgo ||
      buildState.isModeratorApproved)

  return (
    <>
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
            <span className="text-surface-solid mb-4 text-sm underline">
              See build description and breakdown on YouTube
            </span>
          </a>
        </div>
      )}
      {buildState.buildLink &&
        canShowBuildLinkVideo &&
        !canShowFeaturedVideo && (
          <div className="mb-12 max-h-[270px] text-center sm:mb-8 sm:max-h-[430px] sm:max-w-[560px]">
            <a href={videoUrlToWatchUrl(buildState.buildLink)} target="_blank">
              <Image
                width={560}
                height={315}
                src={videoUrlToThumbnailUrl(buildState.buildLink)}
                loading="eager"
                alt={`${buildState.name} video thumbnail`}
                unoptimized={true}
              />
              <span className="text-surface-solid mb-4 text-sm underline">
                See build description and breakdown on YouTube
              </span>
            </a>
          </div>
        )}
    </>
  )
}
