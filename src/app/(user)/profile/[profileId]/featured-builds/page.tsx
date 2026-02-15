import { auth } from '@/auth';
import { FeaturedBuilds } from '@/app/(user)/profile/[profileId]/featured-builds/_components/featured-builds';

export default async function Page({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const session = await auth();
  const isEditable = session?.user?.id === profileId;

  return <FeaturedBuilds isEditable={isEditable} profileId={profileId} />;
}
