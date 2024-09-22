import { type BuildListFilters } from '@/app/(builds)/_components/filters/types';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { FeaturedBuilds } from '@/app/(user)/profile/[profileId]/featured-builds/_components/featured-builds';

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
    <FeaturedBuilds
      buildFilters={buildFilters}
      isEditable={isEditable}
      profileId={profileId}
    />
  );
}
