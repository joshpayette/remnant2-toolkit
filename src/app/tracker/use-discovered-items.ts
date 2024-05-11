import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import {
  ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { getDiscoveredItems } from '@/app/tracker/actions/get-discovered-items'
import { setDiscoveredItems } from '@/app/tracker/actions/set-discovered-items'

export function useDiscoveredItems() {
  const { data: sessionData, status: sessionStatus } = useSession()

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  )
  const { discoveredItemIds: localDiscoveredItemIds } = tracker

  const [discoveredItemIds, setDiscoveredItemIds] = useState<string[]>([])

  // Check for database discovered items and use those if present
  // If no items returned, then write the local items to the database
  useEffect(() => {
    async function fetchDiscoveredItems() {
      if (sessionStatus === 'loading') return

      if (sessionStatus === 'unauthenticated') {
        setDiscoveredItemIds(localDiscoveredItemIds)
        return
      }
      const response = await getDiscoveredItems()
      if (!response.success) {
        toast.error('Failed to get discovered items from the database.')
        return
      }
      setDiscoveredItemIds(response.discoveredItemIds)

      // If no items in the response but it was a success, write local items to the DB
      if (
        response.success &&
        response.discoveredItemIds.length === 0 &&
        localDiscoveredItemIds.length > 0
      ) {
        const { success } = await setDiscoveredItems(localDiscoveredItemIds)
        if (!success) {
          toast.error('Failed to write local discovered items to the database.')
        }
        setDiscoveredItemIds(localDiscoveredItemIds)
        return
      }
    }
    fetchDiscoveredItems()
  }, [localDiscoveredItemIds, sessionData?.user, sessionStatus])

  async function handleSetDiscoveredItems(newDiscoveredItemIds: string[]) {
    // If authenticated, update the database
    // If unauthenticated, update the local storage
    if (sessionStatus === 'authenticated') {
      const { success } = await setDiscoveredItems(newDiscoveredItemIds)
      if (!success) {
        toast.error('Failed to update discovered items in the database.')
        return
      }
      setDiscoveredItemIds(newDiscoveredItemIds)
    }
    if (sessionStatus === 'unauthenticated') {
      setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds })
      setDiscoveredItemIds(newDiscoveredItemIds)
      return
    }
  }

  return {
    discoveredItemIds,
    handleSetDiscoveredItems,
  }
}
