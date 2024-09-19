import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { getBuildVariantIds } from '@/app/(builds)/_actions/get-build-variant-ids';
import { incrementViewCount } from '@/app/(builds)/_actions/increment-view-count';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export async function dbBuildToBuildVariants(
  build: DBBuild,
): Promise<LinkedBuildItem[]> {
  const { buildVariants: buildVariantsResponse } = await getBuildVariantIds(
    build.id,
  );

  // Need to loop over each id and fetch the build
  const buildVariantsBuildResponse = await Promise.all(
    buildVariantsResponse.map((buildVariant) => getBuild(buildVariant.buildId)),
  );

  const buildVariantStates: BuildState[] = [];
  for (const response of buildVariantsBuildResponse) {
    // if there is an error, remover item from array
    if (!isErrorResponse(response)) {
      buildVariantStates.push(
        cleanUpBuildState(dbBuildToBuildState(response.build)),
      );
    }
  }

  const linkedBuildItems: LinkedBuildItem[] = buildVariantStates.map(
    (variant) => ({
      build: buildVariantStates.find(
        (buildVariantState) => buildVariantState.buildId === variant.buildId,
      ) as BuildState,
      label: variant.name,
    }),
  );

  // Add all build variants, then add the main build to the start
  const buildVariants = linkedBuildItems.map((linkedBuildItem) => ({
    ...linkedBuildItem,
    label: linkedBuildItem.build.name,
  }));
  buildVariants.unshift({
    build: cleanUpBuildState(dbBuildToBuildState(build)),
    label: build.name,
  });

  // Loop through all build variants and increment the view count
  for await (const buildVariant of buildVariants) {
    if (!buildVariant.build.buildId) return [];
    await incrementViewCount({ buildId: buildVariant.build.buildId });
  }

  // loop through build variants and copy videoUrl and buildLink from the main build to each variant
  buildVariants.forEach((buildVariant) => {
    buildVariant.build.videoUrl = build.videoUrl;
    buildVariant.build.buildLink = build.buildLink;
    buildVariant.build.duplicateCount = build.duplicateCount;
    buildVariant.build.totalUpvotes = build.totalUpvotes;
    buildVariant.build.isPublic = build.isPublic;
  });

  return buildVariants;
}
