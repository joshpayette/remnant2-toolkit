'use client'

import { useLocalStorage as useLS } from 'usehooks-ts'
import type { LocalStorage } from '@/types'

const initialValue: LocalStorage = {
  tracker: {
    discoveredItemIds: [],
  },
  builds: [],
}

export const useLocalStorage = () => {
  const [itemTracker, setItemTracker] = useLS<LocalStorage['tracker']>(
    'item-tracker',
    initialValue.tracker,
  )

  const [builds, setBuilds] = useLS<LocalStorage['builds']>(
    'builds',
    initialValue.builds,
  )

  return { builds, setBuilds, itemTracker, setItemTracker }
}
