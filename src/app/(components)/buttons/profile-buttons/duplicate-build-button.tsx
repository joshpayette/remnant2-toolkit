'use client'

import { DocumentDuplicateIcon } from '@heroicons/react/24/solid'

import { BaseButton } from '@/app/(components)/_base/button'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { dbBuildToBuildState } from '@/features/build/lib/dbBuildToBuildState'
import { DBBuild } from '@/features/build/types'
import { Tooltip } from '@/features/ui/Tooltip'

export function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build)
  const { handleDuplicateBuild } = useBuildActions()

  return (
    <Tooltip content="Duplicate Build">
      <BaseButton
        color="yellow"
        onClick={() => handleDuplicateBuild(buildState)}
        aria-label="Duplicate Build"
      >
        <DocumentDuplicateIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  )
}
