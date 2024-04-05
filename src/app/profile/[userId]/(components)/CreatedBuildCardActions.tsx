import { CopyBuildUrlButton } from '@/app/profile/[userId]/(components)/buttons/CopyBuildUrlButton'
import { DeleteBuildButton } from '@/app/profile/[userId]/(components)/buttons/DeleteBuildButton'
import { DuplicateBuildButton } from '@/app/profile/[userId]/(components)/buttons/DuplicateBuildButton'
import { EditBuildButton } from '@/app/profile/[userId]/(components)/buttons/EditBuildButton'
import { DBBuild } from '@/features/build/types'

interface Props {
  build: DBBuild
  onDelete: (buildId: string) => void
}

export function CreatedBuildCardActions({ build, onDelete }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
      <CopyBuildUrlButton buildId={build.id} />
      <EditBuildButton buildId={build.id} />
      <DuplicateBuildButton build={build} />
      <DeleteBuildButton buildId={build.id} onDelete={onDelete} />
    </div>
  )
}
