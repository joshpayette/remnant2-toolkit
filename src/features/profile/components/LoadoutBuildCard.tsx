'use client'

import { BuildCard } from '@/features/build/components/BuildCard'
import { DBBuild } from '@/features/build/types'

import { RemoveFromLoadoutButton } from './RemoveFromLoadoutButton'

interface Props {
  build: DBBuild & { slot: number }
}

export function LoadoutBuildCard({ build }: Props) {
  return (
    <BuildCard
      build={build}
      isLoading={false}
      onReportBuild={undefined}
      footerActions={
        <div className="flex items-center justify-center gap-2 p-2 text-sm">
          <RemoveFromLoadoutButton buildId={build.id} slot={build.slot} />
        </div>
      }
    />
  )
}
