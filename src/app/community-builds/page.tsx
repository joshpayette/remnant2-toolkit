'use client'

import { useEffect, useState } from 'react'

import { getTotalBuildCount } from '@/features/build/actions/getTotalBuildCount'
import { BuildListFilters } from '@/features/filters/components/BuildListFilters'
import { BuildListFilterFields } from '@/features/filters/types'

import { PageHeader } from '../../features/ui/PageHeader'
import { CommunityBuildList } from './CommunityBuilds'

export default function Page() {
  const [buildListFilters, setCommunityBuildFilters] =
    useState<BuildListFilterFields | null>(null)

  const [totalBuildCount, setTotalBuildCount] = useState<number | string>(
    'HUNDREDS',
  )

  useEffect(() => {
    async function getBuildCountAsync() {
      const response = await getTotalBuildCount()
      setTotalBuildCount(response)
    }
    getBuildCountAsync()
  }, [])

  return (
    <>
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

      <div className="mb-8 flex w-full max-w-3xl items-center justify-center">
        <BuildListFilters
          onUpdateFilters={(newFilters) => {
            setCommunityBuildFilters(newFilters)
          }}
        />
      </div>
      {buildListFilters && (
        <div className="grid w-full grid-cols-1 gap-2">
          <CommunityBuildList
            buildListFilters={buildListFilters}
            itemsPerPage={24}
          />
        </div>
      )}
    </>
  )
}
