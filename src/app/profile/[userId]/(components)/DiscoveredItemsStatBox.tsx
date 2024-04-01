'use client'

import { toast } from 'react-toastify'
import { useIsClient, useLocalStorage } from 'usehooks-ts'

import { updateTotalDiscoveredItems } from '@/app/profile/[userId]/(actions)/updateTotalDiscoveredItems'
import { StatBox } from '@/app/profile/[userId]/(components)/StatBox'
import { LocalStorage } from '@/app/tracker/(lib)/types'

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
  const isItemCountSynced = discoveredItemIds.length >= stat.value

  if (!isClient || !isEditable || isItemCountSynced) {
    return <StatBox stat={stat} index={index} />
  }

  return (
    <StatBox
      stat={stat}
      index={index}
      footer={
        <>
          <hr className="my-1 border-gray-400" />
          <p className="text-xs text-gray-400 ">
            Your local tracked item total is not synced with the database.
          </p>
          <button
            className="text-xs text-white underline hover:text-accent1-500"
            onClick={async () => {
              const response = await updateTotalDiscoveredItems({
                userId,
                totalDiscoveredItems: discoveredItemIds.length,
              })
              if (response.success) {
                toast.success(response.message)
              } else {
                toast.error(response.message)
              }
            }}
          >
            Sync now?
          </button>
        </>
      }
    />
  )
}
