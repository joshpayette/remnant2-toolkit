import { isErrorResponse } from '@/app/_libs/is-error-response';
import { getBuild } from '@/app/(builds)/_actions/get-build';
import { getBuildVariantIds } from '@/app/(builds)/_actions/get-build-variant-ids';
import { incrementViewCount } from '@/app/(builds)/_actions/increment-view-count';
import { cleanUpBuildState } from '@/app/(builds)/_libs/clean-up-build-state';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

export async function dbBuildToBuildVariants(
  build: DBBuild,
): Promise<BuildState[]> {
  const { buildVariants: buildVariantsResponse } = await getBuildVariantIds(
    build.id,
  );

  // Need to loop over each id and fetch the build
  const buildVariantsBuildResponse = await Promise.all(
    buildVariantsResponse.map((buildVariant) => getBuild(buildVariant.buildId)),
  );

  const buildVariants: BuildState[] = [];
  for (const response of buildVariantsBuildResponse) {
    // if there is an error, remover item from array
    if (!isErrorResponse(response)) {
      buildVariants.push(
        cleanUpBuildState(dbBuildToBuildState(response.build)),
      );
    }
  }
  // Add main build to the start
  buildVariants.unshift(cleanUpBuildState(dbBuildToBuildState(build)));

  // Loop through all build variants and increment the view count
  for await (const buildVariant of buildVariants) {
    if (!buildVariant.buildId) return [];
    await incrementViewCount({ buildId: buildVariant.buildId });
  }

  // loop through build variants and copy videoUrl and buildLink from the main build to each variant
  buildVariants.forEach((buildVariant) => {
    buildVariant.videoUrl = build.videoUrl;
    buildVariant.buildLink = build.buildLink;
    buildVariant.duplicateCount = build.duplicateCount;
    buildVariant.totalUpvotes = build.totalUpvotes;
    buildVariant.isPublic = build.isPublic;
  });

  return buildVariants;
}
