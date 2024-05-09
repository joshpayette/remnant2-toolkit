'use client'

import { toast } from 'react-toastify'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { getDiscoveredCount } from '@/app/(utils)/tracker/get-discovered-count'
import { updateTotalDiscoveredItems } from '@/app/profile/[userId]/(actions)/updateTotalDiscoveredItems'
import { StatBox } from '@/app/profile/[userId]/(components)/StatBox'
import { TOTAL_TRACKABLE_ITEM_COUNT } from '@/app/tracker/constants'

interface Props {
  stat: { name: string; value: number; unit?: string }
  index: number
  isEditable: boolean
  userId: string
}

export function DiscoveredItemsStatBox({
  stat,
  index,
  isEditable,
  userId,
}: Props) {
  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds } = tracker

  const isClient = useIsClient()

  /**
   * Whether the total items in the user's local storage
   * match the total count in the DB.
   */
  const discoveredCount = getDiscoveredCount(discoveredItemIds)

  const validItemCount =
    discoveredCount > TOTAL_TRACKABLE_ITEM_COUNT
      ? TOTAL_TRACKABLE_ITEM_COUNT
      : discoveredCount
  const isItemCountSynced = validItemCount === stat.value

  if (!isClient || !isEditable || isItemCountSynced) {
    return <StatBox stat={stat} index={index} />
  }

  return (
    <StatBox
      stat={stat}
      index={index}
      footer={
        <div className="flex flex-col items-center justify-center">
          <hr className="my-1 w-full border-outline" />
          <p className="mt-1 w-full text-left text-xs text-on-background-container">
            Your local tracked item total is not synced with the database.
          </p>
          <BaseButton
            plain
            onClick={async () => {
              const response = await updateTotalDiscoveredItems({
                userId,
                totalDiscoveredItems: validItemCount,
              })
              if (response.success) {
                toast.success(response.message)
              } else {
                toast.error(response.message)
              }
            }}
            className="mt-1 underline"
          >
            Sync Items Now
          </BaseButton>
        </div>
      }
    />
  )
}
