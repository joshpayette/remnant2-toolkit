
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { generateAllNotifications } from './_actions/generate-all-notifications';
import { getNotifications } from './_actions/get-notifications';
import { NotificationHistory } from './_components/notification-history';

export default async function Page({
    params: { profileId },
  }: {
    params: { profileId: string };
  }) {
    const session = await getSession();
    const isEditable = session?.user?.id === profileId;
    await generateAllNotifications(profileId);
    const notifications = await getNotifications(profileId);
  
    return (
      <NotificationHistory
        isEditable={isEditable}
        notifications={notifications}
      />
    );
  }
