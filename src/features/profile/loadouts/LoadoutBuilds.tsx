'use server'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

import { getLoadoutList } from './actions'
import { EmptyLoadoutCard } from './EmptyLoadoutCard'
import { LoadoutCard } from './LoadoutCard'

export async function LoadoutBuilds() {
  const userLoadoutBuilds = await getLoadoutList()

  return (
    <>
      {getArrayOfLength(8).map((_, index) => {
        const userLoadoutBuild = userLoadoutBuilds.find(
          (build) => build.slot - 1 === index,
        )

        if (!userLoadoutBuild) {
          return (
            <EmptyLoadoutCard
              key={index}
              showHover={false}
              label="No loadout selected for this slot."
            />
          )
        }

        return (
          <LoadoutCard
            key={`${userLoadoutBuild.id}-${index}`}
            build={userLoadoutBuild}
          />
        )
      })}
    </>
  )
}
