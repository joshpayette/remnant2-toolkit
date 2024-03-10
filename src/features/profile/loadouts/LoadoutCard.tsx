'use client'

import { BuildCard } from '@/features/build/components/build-card/BuildCard'
import { DBBuild } from '@/features/build/types'

import { ChangeLoadoutSlotButton } from '../components/ChangeLoadoutSlotButton'
import { RemoveFromLoadoutButton } from '../components/RemoveFromLoadoutButton'

interface Props {
  build: DBBuild & { slot: number }
  onRemove?: () => void
  onSlotChange?: (
    success: boolean,
    newLoadouts: {
      oldSlot: number
      newSlot: number
    } | null,
  ) => void
}

export function LoadoutCard({ build, onRemove, onSlotChange }: Props) {
  return (
    <BuildCard
      build={build}
      isLoading={false}
      onReportBuild={undefined}
      footerActions={
        <div className="flex items-center justify-center gap-6 p-2 text-sm">
          <ChangeLoadoutSlotButton buildId={build.id} callback={onSlotChange} />
          <RemoveFromLoadoutButton
            buildId={build.id}
            slot={build.slot}
            callback={onRemove}
          />
        </div>
      }
    />
  )
}
