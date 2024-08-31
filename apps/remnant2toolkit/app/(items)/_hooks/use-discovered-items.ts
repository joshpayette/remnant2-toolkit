import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

import { getDiscoveredItems } from '@/app/(items)/item-tracker/_actions/get-discovered-items';
import { setDiscoveredItems } from '@/app/(items)/item-tracker/_actions/set-discovered-items';
import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants';
import {
  type ItemTrackerLocalStorage,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage';

export function useDiscoveredItems() {
  const { data: sessionData, status: sessionStatus } = useSession();

  const [tracker, setTracker] = useLocalStorage<ItemTrackerLocalStorage>(
    LOCALSTORAGE_KEY.ITEM_TRACKER,
    {
      discoveredItemIds: [],
      collapsedCategories: [],
    },
    { initializeWithValue: false },
  );
  const { discoveredItemIds: localDiscoveredItemIds } = tracker;

  const validLocalDiscoveredItemIds = useMemo(() => {
    return Array.from(new Set(localDiscoveredItemIds)).filter((item) =>
      ALL_TRACKABLE_ITEMS.some((i) => i.id === item),
    );
  }, [localDiscoveredItemIds]);

  const [discoveredItemIds, setDiscoveredItemIds] = useState<string[]>([]);

  // Check for database discovered items and use those if present
  // If no items returned, then write the local items to the database
  useEffect(() => {
    async function fetchDiscoveredItems() {
      if (sessionStatus === 'loading') return;

      if (sessionStatus === 'unauthenticated') {
        setDiscoveredItemIds(validLocalDiscoveredItemIds);
        return;
      }

      const response = await getDiscoveredItems();
      if (!response.success) {
        toast.error('Failed to get discovered items from the database.');
        return;
      }
      setDiscoveredItemIds(response.discoveredItemIds);

      // If no items in the response but it was a success, write local items to the DB
      if (
        response.success &&
        response.discoveredItemIds.length === 0 &&
        validLocalDiscoveredItemIds.length > 0
      ) {
        const { success } = await setDiscoveredItems(
          validLocalDiscoveredItemIds,
        );
        if (!success) {
          toast.error(
            'Failed to write local discovered items to the database.',
          );
        }

        setDiscoveredItemIds(validLocalDiscoveredItemIds);
        return;
      }
    }
    fetchDiscoveredItems();
  }, [validLocalDiscoveredItemIds, sessionData?.user, sessionStatus]);

  async function handleSetDiscoveredItems(newDiscoveredItemIds: string[]) {
    // If authenticated, update the database
    // If unauthenticated, update the local storage
    if (sessionStatus === 'authenticated') {
      const { success } = await setDiscoveredItems(newDiscoveredItemIds);
      if (!success) {
        toast.error('Failed to update discovered items in the database.');
        return;
      }
      setDiscoveredItemIds(newDiscoveredItemIds);
    }
    if (sessionStatus === 'unauthenticated') {
      setTracker({ ...tracker, discoveredItemIds: newDiscoveredItemIds });
      setDiscoveredItemIds(newDiscoveredItemIds);
      return;
    }
  }

  return {
    discoveredItemIds,
    handleSetDiscoveredItems,
  };
}
