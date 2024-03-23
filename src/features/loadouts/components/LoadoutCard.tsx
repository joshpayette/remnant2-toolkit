'use client'

import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { DBBuild } from '@/features/build/types'
import { ChangeLoadoutSlotButton } from '@/features/loadouts/components/ChangeLoadoutSlotButton'
import { RemoveFromLoadoutButton } from '@/features/loadouts/components/RemoveFromLoadoutButton'

interface Props {
  build: DBBuild & { slot: number }
  isEditable: boolean
  onRemove?: () => void
  onSlotChange?: (
    success: boolean,
    newLoadouts: {
      oldSlot: number
      newSlot: number
    } | null,
  ) => void
}

export function LoadoutCard({
  build,
  isEditable,
  onRemove,
  onSlotChange,
}: Props) {
  return (
    <BuildCard
      build={build}
      isLoading={false}
      footerActions={
        isEditable ? (
          <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
            <ChangeLoadoutSlotButton
              buildId={build.id}
              callback={onSlotChange}
            />
            <RemoveFromLoadoutButton
              buildId={build.id}
              slot={build.slot}
              callback={onRemove}
            />
          </div>
        ) : undefined
      }
    />
  )
}
