'use client'

import { DocumentDuplicateIcon } from '@heroicons/react/24/solid'

import { useBuildActions } from '@/features/build/hooks/useBuildActions'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { DBBuild } from '@/features/build/types'
import { Tooltip } from '@/features/ui/Tooltip'

export function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build)
  const { handleDuplicateBuild } = useBuildActions()

  return (
    <Tooltip content="Duplicate Build">
      <button
        className="flex flex-col items-center gap-y-1 text-xs text-accent1-500 hover:text-accent1-300"
        onClick={() => handleDuplicateBuild(buildState)}
        aria-label="Duplicate Build"
      >
        <DocumentDuplicateIcon className="h-4 w-4" /> Duplicate
      </button>
    </Tooltip>
  )
}
