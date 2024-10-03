import { type BuildState } from '@/app/(builds)/_types/build-state';

// TODO Separate videos for each build

export function syncBuildVariantsToBuild({
  build,
  buildVariants,
}: {
  build: BuildState;
  buildVariants: BuildState[];
}) {
  const newBuildVariants = buildVariants.map((buildVariant) => {
    buildVariant.duplicateCount = build.duplicateCount;
    buildVariant.totalUpvotes = build.totalUpvotes;
    buildVariant.isPublic = build.isPublic;
    buildVariant.totalUpvotes = build.totalUpvotes;
    buildVariant.viewCount = build.viewCount;
    buildVariant.validatedViewCount = build.validatedViewCount;
    buildVariant.upvoted = build.upvoted;
    buildVariant.buildTags = build.buildTags;
    buildVariant.isFeaturedBuild = build.isFeaturedBuild;
    return buildVariant;
  });

  newBuildVariants.unshift(build);
  return newBuildVariants;
}
