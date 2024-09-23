import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { createBuild } from '@/app/(builds)/_actions/create-build';
import { incrementDuplicateCount } from '@/app/(builds)/_actions/increment-duplicate-count';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export async function handleDuplicateBuild({
  buildVariants,
  onDuplicate,
}: {
  buildVariants: BuildState[];
  onDuplicate?: (buildId: string) => void;
}) {
  if (!buildVariants || buildVariants.length === 0 || !buildVariants[0]) {
    console.error('Error duplicating build. Build variants not found.');
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  const mainBuildState = buildVariants[0];

  buildVariants[0].name = `${mainBuildState.name} (copy)`;
  buildVariants[0].isPublic = false;
  buildVariants[0].isMember = Boolean(mainBuildState.isMember);
  buildVariants[0].upvoted = Boolean(mainBuildState.upvoted);
  buildVariants[0].totalUpvotes =
    typeof buildVariants[0].totalUpvotes === 'string'
      ? 0
      : mainBuildState.totalUpvotes;

  if (!mainBuildState.buildId) {
    console.error('Error duplicating build. Build ID not found.');
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  const [createBuildsResponse, _incrementResponse] = await Promise.all([
    createBuild({
      buildVariants,
    }),
    incrementDuplicateCount({ buildId: mainBuildState.buildId as string }),
  ]);

  if (isErrorResponse(createBuildsResponse)) {
    console.error(createBuildsResponse.errors);
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  toast.success(createBuildsResponse.message);
  if (onDuplicate && createBuildsResponse?.buildId) {
    onDuplicate(createBuildsResponse?.buildId);
  }
}
