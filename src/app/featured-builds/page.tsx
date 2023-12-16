import Link from 'next/link'
import { pageInfo as acidicBerserkerPageInfo } from './build/sheenshots-acidic-berserker/metadata'
import { pageInfo as pyroPageInfo } from './build/bolt-jamisons-pyro/metadata'
import { pageInfo as supportMedicSummonerPageInfo } from './build/support-medic-summoner/metadata'
import PageHeader from '../(components)/PageHeader'

const builds = [
  acidicBerserkerPageInfo,
  pyroPageInfo,
  supportMedicSummonerPageInfo,
]

export default function Page() {
  return (
    <>
      <PageHeader
        title="Featured Builds"
        subtitle="A collection of builds aggregated from various sources."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {builds.map((build) => (
          <div
            key={build.slug}
            className="flex flex-col items-center justify-center gap-2 border border-purple-500 p-4"
          >
            <h2 className="text-center text-2xl font-bold text-purple-500">
              {build.title}
            </h2>
            <p className="text-md flex grow items-center">
              {build.description}
            </p>

            <Link
              href={`featured-builds/build/${build.slug}`}
              className="text-green-500 hover:text-green-300 hover:underline"
            >
              View Build
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
