/**
 * Determines whether a provided URL is a valid Youtube video URL
 * @example
 * videoUrlType('https://youtu.be/4kIQKHxZGS8`)
 *  => 'share'
 * videoUrlType('https://www.youtube.com/embed/4kIQKHxZGS8')
 *  => 'embed'
 * videoUrlType('https://www.youtube.com/watch?v=4kIQKHxZGS8')
 *  => 'watch'
 */
function getVideoUrlType(
  videoUrl: string | null,
): 'share' | 'embed' | 'watch' | 'invalid' {
  if (!videoUrl) {
    return 'invalid';
  }
  if (videoUrl.startsWith('https://youtu.be/')) {
    return 'share';
  }
  if (videoUrl.startsWith('https://www.youtube.com/embed/')) {
    return 'embed';
  }
  if (videoUrl.startsWith('https://www.youtube.com/watch?v=')) {
    return 'watch';
  }
  return 'invalid';
}

/**
 * Removes all URL parameters except for the `v` parameter
 * @example
 * removeAllParamsExceptV('https://www.youtube.com/watch?v=4kIQKHxZGS8&si=XXXX
 */
function removeAllParamsExceptV(videoUrl: string): string {
  const url = new URL(videoUrl);
  const vParam = url.searchParams.get('v');

  if (vParam) {
    return `${url.origin}${url.pathname}?v=${vParam}`;
  }

  return `${url.origin}${url.pathname}`;
}

/**
 * Converts a Youtube video embed url to a video id
 * @example
 * videoEmbedUrlToVideoId('https://www.youtube.com/embed/4kIQKHxZGS8')
 *  => '4kIQKHxZGS8'
 */
function videoUrlToVideoId(videoUrl: string): string | undefined {
  const videoUrlType = getVideoUrlType(videoUrl);

  // Remove ?si=XXXX from the url
  // remove the ?t=XXX part of the url
  // remove the ?list=XXX part of the url
  // remove the ?index=XXX part of the url
  const videoUrlWithoutParams = removeAllParamsExceptV(videoUrl);

  if (!videoUrlWithoutParams) return undefined;

  if (videoUrlType === 'watch') {
    return videoUrlWithoutParams.split('v=')[1];
  }
  if (videoUrlType === 'embed') {
    return videoUrlWithoutParams.split('embed/')[1];
  }
  if (videoUrlType === 'share') {
    return videoUrlWithoutParams.split('youtu.be/')[1];
  }
}

/**
 * Converts a Youtube video embed url to a watch url
 * @example
 * videoEmbedUrlToWatchUrl('https://www.youtube.com/embed/4kIQKHxZGS8')
 *  => 'https://www.youtube.com/watch?v=4kIQKHxZGS8'
 */
function videoEmbedUrlToWatchUrl(videoEmbedUrl: string) {
  // if start=XXX is in the url, grab it for the &t=XXX part of the watch url
  const startValue = videoEmbedUrl.match(/start=(\d+)/)?.[1];

  const videoId = videoUrlToVideoId(videoEmbedUrl);
  return `https://www.youtube.com/watch?v=${videoId}${
    startValue ? `&t=${startValue}` : ''
  }`;
}

/**
 * Determines whether a provided URL is a valid Youtube video URL
 * @example
 * isValidYoutubeUrl('https://www.youtube.com/watch?v=4kIQKHxZGS8')
 * => true
 * isValidYoutubeUrl('https://www.youtube.com/embed/4kIQKHxZGS8')
 * => true
 * isValidYoutubeUrl('https://www.youtube.com')
 * => false
 */
export function isValidYoutubeUrl(videoUrl: string) {
  return getVideoUrlType(videoUrl) !== 'invalid';
}

/**
 * Converts a Youtube video url to a thumbnail url
 * @example
 * videoUrlToThumbnailUrl('https://www.youtube.com/watch?v=4kIQKHxZGS8')
 *  => 'https://i.ytimg.com/vi/4kIQKHxZGS8/0.jpg'
 */
export function videoUrlToThumbnailUrl(videoUrl: string) {
  const videoId = videoUrlToVideoId(videoUrl);
  return `https://i.ytimg.com/vi/${videoId}/0.jpg`;
}

/**
 * Converts a Youtube video url to a watch url
 * @example
 * videoUrlToWatchUrl('https://www.youtube.com/embed/4kIQKHxZGS8')
 *  => 'https://www.youtube.com/watch?v=4kIQKHxZGS8'
 */
export function videoUrlToWatchUrl(videoUrl: string) {
  const videoUrlType = getVideoUrlType(videoUrl);
  if (videoUrlType === 'invalid') {
    return videoUrl;
  }
  if (videoUrlType === 'embed') {
    return videoEmbedUrlToWatchUrl(videoUrl);
  }
  return videoUrl;
}
