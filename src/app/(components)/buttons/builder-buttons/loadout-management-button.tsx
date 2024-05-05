'use client'

import { useEffect, useState } from 'react'

import { getLoadoutList } from '@/app/(actions)/loadouts/get-loadout-list'
import { BaseButton } from '@/app/(components)/_base/button'
import { DBBuild } from '@/features/build/types'

interface Props {
  onClick: () => void
}

export function LoadoutManagementButton({ onClick }: Props) {
  const [loading, setLoading] = useState(true)
  const [loadoutList, setLoadoutList] = useState<
    Array<DBBuild & { slot: number }>
  >([])

  useEffect(() => {
    async function getItemsAsync() {
      const userLoadoutBuilds = await getLoadoutList()
      setLoadoutList(userLoadoutBuilds)
      setLoading(false)
    }
    getItemsAsync()
  }, [])

  return (
    <BaseButton
      color="violet"
      aria-label="Loadout Builds"
      onClick={onClick}
      className="sm:w-full"
    >
      Add To Loadout
    </BaseButton>
  )
}
