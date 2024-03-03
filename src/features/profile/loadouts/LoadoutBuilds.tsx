'use server'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

import { getLoadoutList } from './actions'
import { EmptyBuildCard } from './EmptyLoadoutCard'
import { LoadoutBuildCard } from './LoadoutBuildCard'

export async function LoadoutBuilds() {
  const userLoadoutBuilds = await getLoadoutList()

  return (
    <>
      {getArrayOfLength(8).map((_, index) => {
        const userLoadoutBuild = userLoadoutBuilds.find(
          (build) => build.slot - 1 === index,
        )

        if (!userLoadoutBuild) {
          return <EmptyBuildCard key={index} />
        }

        return (
          <LoadoutBuildCard
            key={`${userLoadoutBuild.id}-${index}`}
            build={userLoadoutBuild}
          />
        )
      })}
    </>
  )
}
