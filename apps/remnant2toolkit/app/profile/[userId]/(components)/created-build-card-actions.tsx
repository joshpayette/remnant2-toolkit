import { DeleteBuildButton } from '@/app/_components/buttons/profile-buttons/delete-build-button';
import { DuplicateBuildButton } from '@/app/_components/buttons/profile-buttons/duplicate-build-button';
import { EditBuildButton } from '@/app/_components/buttons/profile-buttons/edit-build-button';
import { ShareBuildButton } from '@/app/_components/buttons/profile-buttons/share-build-button';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

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
