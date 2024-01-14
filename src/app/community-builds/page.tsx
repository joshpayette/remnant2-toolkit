import PageHeader from '../(components)/PageHeader'
import CreatorBuilds from './(components)/FeaturedBuilds'
import MostPopularBuilds from './(components)/MostPopularBuilds'

export default function Page() {
  return (
    <>
      <PageHeader title="Community Builds" subtitle="Find your next build" />
      <div className="mb-4 grid w-full grid-cols-1 gap-2">
        <CreatorBuilds itemsPerPage={4} />
      </div>
      <hr className="my-12 w-full border-gray-800" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds itemsPerPage={8} />
      </div>
    </>
  )
}
