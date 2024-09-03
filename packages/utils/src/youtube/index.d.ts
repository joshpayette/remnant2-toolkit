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
export declare function isValidYoutubeUrl(videoUrl: string): boolean;
/**
 * Converts a Youtube video url to a thumbnail url
 * @example
 * videoUrlToThumbnailUrl('https://www.youtube.com/watch?v=4kIQKHxZGS8')
 *  => 'https://i.ytimg.com/vi/4kIQKHxZGS8/0.jpg'
 */
export declare function videoUrlToThumbnailUrl(videoUrl: string): string;
/**
 * Converts a Youtube video url to a watch url
 * @example
 * videoUrlToWatchUrl('https://www.youtube.com/embed/4kIQKHxZGS8')
 *  => 'https://www.youtube.com/watch?v=4kIQKHxZGS8'
 */
export declare function videoUrlToWatchUrl(videoUrl: string): string;
//# sourceMappingURL=index.d.ts.map