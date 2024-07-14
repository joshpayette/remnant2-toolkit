import { prisma } from '@repo/db'
import { MetadataRoute } from 'next'

const baseUrl = 'https://remnant2toolkit.com'
const currentDate = new Date().toISOString().split('T')[0]

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency']

const staticRoutes = [
  { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly' },
  {
    url: `${baseUrl}/builder`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/featured-builds`,
    lastModified: currentDate,
    changeFrequency: 'daily' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/beginner-builds`,
    lastModified: currentDate,
    changeFrequency: 'daily' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/community-builds`,
    lastModified: currentDate,
    changeFrequency: 'hourly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/item-lookup`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/tracker`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/item-quiz`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/resources`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/support-r2tk`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/world-save-archive`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/boss-tracker`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
  {
    url: `${baseUrl}/guides/hardcore-veteran`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as ChangeFrequency,
  },
] as const satisfies MetadataRoute.Sitemap

async function getSitemapData() {
  const [builds, profiles] = await Promise.all([
    await prisma.build.findMany({
      where: { isPublic: true },
    }),
    await prisma.userProfile.findMany(),
  ])

  return {
    buildIds: builds.map((build) => build.id),
    profileUserIds: profiles.map((profile) => profile.userId),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { buildIds, profileUserIds } = await getSitemapData()

  const buildRoutes: MetadataRoute.Sitemap = buildIds.map((id) => ({
    url: `${baseUrl}/builder/${id}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as ChangeFrequency,
  }))

  const profileRoutes: MetadataRoute.Sitemap = profileUserIds.map((id) => ({
    url: `${baseUrl}/profile/${id}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as ChangeFrequency,
  }))

  const createdBuildRoutes: MetadataRoute.Sitemap = profileUserIds.map(
    (id) => ({
      url: `${baseUrl}/profile/${id}/created-builds`,
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
    }),
  )

  const favoritedBuildRoutes: MetadataRoute.Sitemap = profileUserIds.map(
    (id) => ({
      url: `${baseUrl}/profile/${id}/favorited-builds`,
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
    }),
  )

  return [
    ...staticRoutes,
    ...buildRoutes,
    ...profileRoutes,
    ...createdBuildRoutes,
    ...favoritedBuildRoutes,
  ]
}
