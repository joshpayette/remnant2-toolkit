import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { FavoritedBuilds } from '@/app/(user)/profile/[profileId]/favorited-builds/_components/favorited-builds';

export const maxDuration = 60;

export default async function Page({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const session = await getSession();

  if (session?.user?.id !== profileId) {
    return (
      <p className="text-accent3-500">You are not authorized to view this page.</p>
    );
  }

  return <FavoritedBuilds />;
}
