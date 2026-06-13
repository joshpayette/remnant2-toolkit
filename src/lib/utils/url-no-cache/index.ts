/**
 * Discord and other social media sites cache their previews when
 * a URL is pasted. This adds a `t` query parameter to the URL to
 * prevent caching.
 */
export function urlNoCache(baseUrl: string) {
  const url = new URL(baseUrl)
  const params = new URLSearchParams(url.search)
  params.append('t', Date.now().toString())
  url.search = params.toString()
  return url.toString()
}
