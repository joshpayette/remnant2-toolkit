'use server'

import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { getLoadoutList } from '@/features/loadouts/actions/getLoadoutList'

import { EmptyLoadoutCard } from './EmptyLoadoutCard'
import { LoadoutCard } from './LoadoutCard'

interface Props {
  isEditable: boolean
  userId?: string
}

export async function LoadoutGrid({ isEditable, userId }: Props) {
  const userLoadoutBuilds = await getLoadoutList(userId)

  return (
    <div className="my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
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
            isEditable={isEditable}
          />
        )
      })}
    </div>
  )
}
