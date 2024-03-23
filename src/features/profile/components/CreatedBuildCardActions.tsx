import { DBBuild } from '@/features/build/types'
import { CopyBuildUrlButton } from '@/features/profile/components/buttons/CopyBuildUrlButton'
import { DeleteBuildButton } from '@/features/profile/components/buttons/DeleteBuildButton'
import { DuplicateBuildButton } from '@/features/profile/components/buttons/DuplicateBuildButton'
import { EditBuildButton } from '@/features/profile/components/buttons/EditBuildButton'

interface Props {
  build: DBBuild
  pathsToRevalidate: string[]
}

export function CreatedBuildCardActions({ build, pathsToRevalidate }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
      <CopyBuildUrlButton buildId={build.id} />
      <EditBuildButton buildId={build.id} />
      <DuplicateBuildButton build={build} />
      <DeleteBuildButton
        buildId={build.id}
        pathsToRevalidate={pathsToRevalidate}
      />
    </div>
  )
}
