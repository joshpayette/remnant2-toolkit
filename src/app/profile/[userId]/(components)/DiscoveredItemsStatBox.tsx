'use client'

import { toast } from 'react-toastify'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { Button } from '@/app/(components)/base/button'
import { updateTotalDiscoveredItems } from '@/app/profile/[userId]/(actions)/updateTotalDiscoveredItems'
import { StatBox } from '@/app/profile/[userId]/(components)/StatBox'
import { LocalStorage } from '@/app/tracker/(lib)/types'
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
  const [tracker, setTracker] = useLocalStorage<LocalStorage>(
    'item-tracker',
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
  const validItemCount =
    discoveredItemIds.length > TOTAL_TRACKABLE_ITEM_COUNT
      ? TOTAL_TRACKABLE_ITEM_COUNT
      : discoveredItemIds.length
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
          <hr className="my-1 w-full border-gray-700" />
          <p className="mt-1 w-full text-left text-xs text-gray-400">
            Your local tracked item total is not synced with the database.
          </p>
          <Button
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
          </Button>
        </div>
      }
    />
  )
}
