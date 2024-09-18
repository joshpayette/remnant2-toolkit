'use server';

import { generateBuildNewNotifications } from './generate-build-new-notifications';
import { generateBuildUpdateNotifications } from './generate-build-update-notifications';
import { getBuildFollows } from './get-build-follows';
import { getUserFollows } from './get-user-follows';

export async function generateAllNotifications(profileId: string) {
  // TODO generate announcements
  await generateBuildNewNotifications(await getUserFollows(profileId));
  await generateBuildUpdateNotifications(await getBuildFollows(profileId));
}
