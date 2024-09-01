import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { DeleteBuildButton } from '@/app/(user)/profile/_components/delete-build-button';
import { DuplicateBuildButton } from '@/app/(user)/profile/_components/duplicate-build-button';
import { EditBuildButton } from '@/app/(user)/profile/_components/edit-build-button';
import { ShareBuildButton } from '@/app/(user)/profile/_components/share-build-button';

interface Props {
  build: DBBuild;
  onDelete: (buildId: string) => void;
}

export function CreatedBuildCardActions({ build, onDelete }: Props) {
  return (
    <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
      <ShareBuildButton buildId={build.id} />
      <EditBuildButton buildId={build.id} />
      <DuplicateBuildButton build={build} />
      <DeleteBuildButton buildId={build.id} onDelete={onDelete} />
    </div>
  );
}
