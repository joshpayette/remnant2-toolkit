'use client'

import { BaseButton } from '@repo/ui/base/button'
import { DuplicateIcon } from '@repo/ui/icons/duplicate'

import { Tooltip } from '@/app/(components)/tooltip'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { DBBuild } from '@/app/(types)/builds'
import { dbBuildToBuildState } from '@/app/(utils)/builds/db-build-to-build-state'

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
        <DuplicateIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  )
}
