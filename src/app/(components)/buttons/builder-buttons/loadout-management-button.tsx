'use client'

import { useEffect, useState } from 'react'

import { getLoadoutList } from '@/app/(actions)/loadouts/get-loadout-list'
import { BaseButton } from '@/app/(components)/_base/button'
import { Skeleton } from '@/app/(components)/skeleton'
import { DBBuild } from '@/app/(types)/builds'

interface Props {
  buildId: string | null
  onClick: () => void
}

export function LoadoutManagementButton({ buildId, onClick }: Props) {
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

  if (loading) {
    return (
      <Skeleton className="col-span-1 flex h-full min-h-[36px] w-[150px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 bg-black text-center shadow" />
    )
  }

  const loadoutBuild = loadoutList.find(
    (loadoutBuild) => loadoutBuild.id === buildId,
  )

  const label = loadoutBuild
    ? `Loadout Slot ${loadoutBuild.slot}`
    : `Add To Loadout`

  return (
    <BaseButton
      color="violet"
      aria-label={label}
      onClick={onClick}
      className="sm:w-full"
    >
      {label}
    </BaseButton>
  )
}
