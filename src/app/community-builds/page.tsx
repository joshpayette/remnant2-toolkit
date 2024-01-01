import PageHeader from '../(components)/PageHeader'
import PageActions from '../(components)/PageActions'
import BackToTopButton from '../(components)/BackToTopButton'
import MostPopularBuilds from './(components)/MostPopularBuilds'

export default function Page() {
  return (
    <>
      <PageActions>
        <BackToTopButton />
      </PageActions>
      <PageHeader title="Community Builds" subtitle="Find your next build" />
      <div className="grid w-full grid-cols-1 gap-2">
        <MostPopularBuilds limit={8} />
      </div>
    </>
  )
}
