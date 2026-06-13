import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { FeaturedBuilds } from '@/app/(user)/profile/[profileId]/featured-builds/_components/featured-builds';

export default async function Page({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const session = await getSession();
  const isEditable = session?.user?.id === profileId;

  return <FeaturedBuilds isEditable={isEditable} profileId={profileId} />;
}
