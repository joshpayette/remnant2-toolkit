import { permanentRedirect } from 'next/navigation'

import { PageHeader } from '@/app/(components)/page-header'
import { getServerSession } from '@/app/(utils)/auth'

export default async function Page() {
  const session = await getServerSession()
  if (!session || !session.user) {
    return (
      <PageHeader
        title="Login Required"
        subtitle="You must be logged in to view this page"
      />
    )
  }

  permanentRedirect(`/profile/${session?.user?.id}?t=${Date.now()}`)
}
