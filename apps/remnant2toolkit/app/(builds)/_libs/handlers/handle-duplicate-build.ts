import cloneDeep from 'lodash.clonedeep';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import { createBuild } from '@/app/(builds)/_actions/create-build';
import { incrementDuplicateCount } from '@/app/(builds)/_actions/increment-duplicate-count';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export async function handleDuplicateBuild({
  buildState,
  onDuplicate,
}: {
  buildState: BuildState;
  onDuplicate?: (buildId: string) => void;
}) {
  const newBuildState = cloneDeep(buildState);
  newBuildState.name = `${buildState.name} (copy)`;
  newBuildState.isPublic = false;
  newBuildState.isMember = Boolean(newBuildState.isMember);
  newBuildState.upvoted = Boolean(newBuildState.upvoted);
  newBuildState.totalUpvotes =
    typeof newBuildState.totalUpvotes === 'string'
      ? 0
      : newBuildState.totalUpvotes;
  newBuildState.reported = Boolean(newBuildState.reported);
  const [createBuildResponse, _incrementResponse] = await Promise.all([
    createBuild(JSON.stringify(newBuildState)),
    incrementDuplicateCount({ buildId: buildState.buildId as string }),
  ]);
  if (isErrorResponse(createBuildResponse)) {
    console.error(createBuildResponse.errors);
    toast.error('Error duplicating build. Please try again later.');
  } else {
    toast.success(createBuildResponse.message);
    if (onDuplicate && createBuildResponse?.buildId) {
      onDuplicate(createBuildResponse?.buildId);
    }
  }
}
