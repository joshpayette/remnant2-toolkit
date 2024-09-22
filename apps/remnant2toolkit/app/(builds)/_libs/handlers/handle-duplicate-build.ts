import cloneDeep from 'lodash.clonedeep';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import {
  createBuild,
  linkBuildVariants,
} from '@/app/(builds)/_actions/create-build';
import { incrementDuplicateCount } from '@/app/(builds)/_actions/increment-duplicate-count';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type SuccessResponse } from '@/app/(builds)/_types/success-response';

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
  const variantBuildStates = buildVariants.slice(1);
  const newBuildState = cloneDeep(mainBuildState);

  newBuildState.name = `${mainBuildState.name} (copy)`;
  newBuildState.isPublic = false;
  newBuildState.isMember = Boolean(newBuildState.isMember);
  newBuildState.upvoted = Boolean(newBuildState.upvoted);
  newBuildState.totalUpvotes =
    typeof newBuildState.totalUpvotes === 'string'
      ? 0
      : newBuildState.totalUpvotes;

  if (!newBuildState.buildId) {
    console.error('Error duplicating build. Build ID not found.');
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  const [createBuildResponse, _incrementResponse] = await Promise.all([
    createBuild(JSON.stringify(newBuildState)),
    incrementDuplicateCount({ buildId: newBuildState.buildId as string }),
  ]);

  if (isErrorResponse(createBuildResponse)) {
    console.error(createBuildResponse.errors);
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  // Create build variants
  const buildVariantsResponse = await Promise.all(
    variantBuildStates.map((buildVariant) =>
      createBuild(JSON.stringify(buildVariant)),
    ),
  );

  if (buildVariantsResponse.some(isErrorResponse)) {
    console.error('Error duplicating build variants.');
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  // Create build variant record
  const _response = await linkBuildVariants({
    mainBuildId: createBuildResponse.buildId as string,
    variants: buildVariantsResponse
      .map((response, index) => {
        return {
          id: (response as SuccessResponse).buildId as string,
          index: index + 1,
        };
      })
      .filter((response) => response.id !== createBuildResponse.buildId),
  });

  toast.success(createBuildResponse.message);
  if (onDuplicate && createBuildResponse?.buildId) {
    onDuplicate(createBuildResponse?.buildId);
  }
}
