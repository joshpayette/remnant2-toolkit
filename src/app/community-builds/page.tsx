import PageHeader from '../(components)/PageHeader'
import MostPopularBuilds from './(components)/MostPopularBuilds'

export default function Page() {
  return (
    <>
      <PageHeader title="Community Builds" subtitle="Find your next build" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds itemsPerPage={8} />
      </div>
    </>
  )
}
