import cloneDeep from 'lodash.clonedeep';
import { toast } from 'react-toastify';

import { isErrorResponse } from '@/app/_libs/is-error-response';
import {
  createBuild,
  linkBuildVariants,
} from '@/app/(builds)/_actions/create-build';
import { incrementDuplicateCount } from '@/app/(builds)/_actions/increment-duplicate-count';
import { type SuccessResponse } from '@/app/(builds)/_types/success-response';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export async function handleDuplicateBuild({
  buildVariants,
  onDuplicate,
}: {
  buildVariants: LinkedBuildItem[];
  onDuplicate?: (buildId: string) => void;
}) {
  if (!buildVariants || buildVariants.length === 0 || !buildVariants[0]) {
    console.error('Error duplicating build. Build variants not found.');
    toast.error('Error duplicating build. Please try again later.');
    return;
  }

  const mainBuildState = buildVariants[0].build;
  const variantBuildStates = buildVariants
    .slice(1)
    .map((variant) => variant.build);
  const newBuildState = cloneDeep(mainBuildState);

  newBuildState.name = `${mainBuildState.name} (copy)`;
  newBuildState.isPublic = false;
  newBuildState.isMember = Boolean(newBuildState.isMember);
  newBuildState.upvoted = Boolean(newBuildState.upvoted);
  newBuildState.totalUpvotes =
    typeof newBuildState.totalUpvotes === 'string'
      ? 0
      : newBuildState.totalUpvotes;
  newBuildState.reported = Boolean(newBuildState.reported);

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
    variantIds: buildVariantsResponse
      .map((response) => (response as SuccessResponse).buildId as string)
      .filter((buildId) => buildId !== createBuildResponse.buildId),
  });

  toast.success(createBuildResponse.message);
  if (onDuplicate && createBuildResponse?.buildId) {
    onDuplicate(createBuildResponse?.buildId);
  }
}
