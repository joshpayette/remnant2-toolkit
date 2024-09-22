import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { CreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_components/created-builds';

export const maxDuration = 60;

const buildFilters: Partial<BuildListFilters> = {
  patchAffected: true,
  withQuality: false,
};

export default async function Page({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const session = await getSession();
  const isEditable = session?.user?.id === profileId;

  return (
    <CreatedBuilds
      buildFilters={buildFilters}
      isEditable={isEditable}
      profileId={profileId}
    />
  );
}
