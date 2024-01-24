'use client'

import { dbBuildToBuildState } from '@/app/(lib)/build'
import { DBBuild } from '@/features/build/types'
import useBuildActions from '@/app/builder/(hooks)/useBuildActions'

export default function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build)
  const { handleDuplicateBuild } = useBuildActions()

  return (
    <button
      className="text-yellow-500 hover:text-yellow-300"
      onClick={() => handleDuplicateBuild(buildState)}
    >
      Duplicate
    </button>
  )
}
