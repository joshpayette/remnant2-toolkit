'use client'

import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { DBBuild } from '@/features/build/types'

export function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build)
  const { handleDuplicateBuild } = useBuildActions()

  return (
    <button
      className="text-yellow-500 hover:text-yellow-300"
      onClick={() => handleDuplicateBuild(buildState)}
      aria-label="Duplicate Build"
    >
      Duplicate
    </button>
  )
}
