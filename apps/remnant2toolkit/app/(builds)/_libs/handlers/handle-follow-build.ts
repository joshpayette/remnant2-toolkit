import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { addFollowForBuild } from '@/app/(builds)/_actions/add-follow-for-build';
import { removeFollowForBuild } from '@/app/(builds)/_actions/remove-follow-for-build';
export async function handleFollowBuild({
  buildId,
  isFollowingBuild,
  userId,
  onFollow,
}: {
  buildId: string;
  isFollowingBuild: boolean;
  userId: string | undefined;
  onFollow?: () => void;
}) {
  if (!userId) return;

  // TODO - Disable following your own build
  // if (buildState.createdById === userId) {
  //   toast.error('You cannot follow/unfollow for your own build.');
  //   return;
  // }

  const newIsFollowingBuild = !isFollowingBuild;

  const response = newIsFollowingBuild
    ? await addFollowForBuild({ buildId })
    : await removeFollowForBuild({ buildId });

  if (isErrorResponse(response)) {
    console.error(response.errors);
    toast.error('Error voting for build. Please try again later.');
  } else {
    toast.success(
      newIsFollowingBuild
        ? 'Successfully followed build! You can find it in your profile.'
        : 'Successfully removed follow!',
    );
    if (onFollow) {
      onFollow();
    }
  }
}
