import Link from 'next/link'
import { pageInfo as acidicBerserkerPageInfo } from './build/sheenshots-acidic-berserker/metadata'
import PageHeader from '../(components)/PageHeader'

const builds = [acidicBerserkerPageInfo]

export default function Page() {
  return (
    <div className="">
      <PageHeader
        title="Featured Builds"
        subtitle="A collection of builds aggregated from various sources."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {builds.map((build) => (
          <div
            key={build.slug}
            className="flex flex-col items-center justify-center gap-2 border border-purple-500 p-4"
          >
            <h2 className="text-center text-2xl font-bold text-purple-500">
              {build.title}
            </h2>
            <p className="text-md">{build.description}</p>

            <Link
              href={`featured-builds/build/${build.slug}`}
              className="text-green-500 hover:text-green-300 hover:underline"
            >
              View Build
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
