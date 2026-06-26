import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { CreatedBuilds } from '@/app/(user)/profile/[profileId]/created-builds/_components/created-builds';

export const maxDuration = 60;

export default async function Page(
  props: {
    params: Promise<{ profileId: string }>;
  }
) {
  const params = await props.params;

  const {
    profileId
  } = params;

  const session = await getSession();
  const isEditable = session?.user?.id === profileId;

  return <CreatedBuilds isEditable={isEditable} profileId={profileId} />;
}
