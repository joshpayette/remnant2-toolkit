import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { PageClient } from '@/app/(user)/profile/[userId]/linked-builds/[[...optionalBuildId]]/page.client';

export default async function Page({
  params: { userId, optionalBuildId },
}: {
  params: { userId: string; optionalBuildId: string[] };
}) {
  const session = await getSession();
  const isEditable = session?.user?.id === userId;

  const buildId = optionalBuildId ? optionalBuildId[0] : undefined;

  return (
    <div className="mb-4 grid w-full grid-cols-1 gap-2">
      <PageClient isEditable={isEditable} userId={userId} buildId={buildId} />
    </div>
  );
}
