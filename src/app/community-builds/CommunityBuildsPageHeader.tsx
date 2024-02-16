import { useEffect, useState } from 'react'

import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'
import { PageHeader } from '@/features/ui/PageHeader'

export function CommunityBuildsPageHeader() {
  const [totalBuildCount, setTotalBuildCount] = useState(0)

  useEffect(() => {
    async function fetchTotalBuildCount() {
      const response = await getTotalBuildCount()
      setTotalBuildCount(response)
    }
    fetchTotalBuildCount()
  })

  return (
    <PageHeader
      title="Community Builds"
      subtitle={
        <span>
          Search from{' '}
          <span className="text-2xl font-bold text-green-500">
            {totalBuildCount}
          </span>{' '}
          community submitted builds!
        </span>
      }
    />
  )
}
