import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { addVoteForBuild } from '@/app/(builds)/_actions/add-vote-for-build';
import { removeVoteForBuild } from '@/app/(builds)/_actions/remove-vote-for-build';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export async function handleFavoriteBuild({
  buildState,
  userId,
  onFavorite,
}: {
  buildState: BuildState;
  userId: string | undefined;
  onFavorite?: () => void;
}) {
  if (!userId) return;
  if (!buildState.buildId) return;

  if (buildState.createdById === userId) {
    toast.error('You cannot vote/unvote for your own build.');
    return;
  }

  const newVote = !buildState.upvoted;

  const response = newVote
    ? await addVoteForBuild({ buildId: buildState.buildId })
    : await removeVoteForBuild({ buildId: buildState.buildId });

  if (isErrorResponse(response)) {
    console.error(response.errors);
    toast.error('Error voting for build. Please try again later.');
  } else {
    toast.success(
      newVote
        ? 'Successfully favorited build! You can find it in your profile.'
        : 'Successfully removed favorite!',
    );
    if (onFavorite) {
      onFavorite();
    }
  }
}
