import getSitemapData from '@/app/(actions)/get-sitemap-data'

type Route = {
  url: string
  lastModified: string
}

const baseUrl = 'https://remnant2toolkit.com'
const currentDate = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { url: baseUrl, lastModified: currentDate },
  { url: `${baseUrl}/builder`, lastModified: currentDate },
  { url: `${baseUrl}/featured-builds`, lastModified: currentDate },
  { url: `${baseUrl}/beginner-builds`, lastModified: currentDate },
  { url: `${baseUrl}/community-builds`, lastModified: currentDate },
  { url: `${baseUrl}/item-lookup`, lastModified: currentDate },
  { url: `${baseUrl}/tracker`, lastModified: currentDate },
  { url: `${baseUrl}/item-quiz`, lastModified: currentDate },
  { url: `${baseUrl}/resources`, lastModified: currentDate },
  { url: `${baseUrl}/support-r2tk`, lastModified: currentDate },
  { url: `${baseUrl}/world-save-archive`, lastModified: currentDate },
  { url: `${baseUrl}/boss-tracker`, lastModified: currentDate },
  { url: `${baseUrl}/guides/hardcore-veteran`, lastModified: currentDate },
] as const satisfies Route[]

export default async function sitemap() {
  const { buildIds, profileUserIds } = await getSitemapData()

  const buildRoutes = buildIds.map((id) => ({
    url: `${baseUrl}/builder/${id}`,
    lastModified: currentDate,
  }))

  const profileRoutes = profileUserIds.map((id) => ({
    url: `${baseUrl}/profile/${id}`,
    lastModified: currentDate,
  }))

  const createdBuildRoutes = profileUserIds.map((id) => ({
    url: `${baseUrl}/profile/${id}/created-builds`,
    lastModified: currentDate,
  }))

  const favoritedBuildRoutes = profileUserIds.map((id) => ({
    url: `${baseUrl}/profile/${id}/favorited-builds`,
    lastModified: currentDate,
  }))

  return [
    ...staticRoutes,
    ...buildRoutes,
    ...profileRoutes,
    ...createdBuildRoutes,
    ...favoritedBuildRoutes,
  ]
}
