import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { prisma } from '@/lib/db';

/**
 * Hydrates the related data (items, tags, variant info) onto the raw rows
 * returned by a build-feed query. Shared by every feed so the query builders
 * only concern themselves with SQL.
 *
 * Rather than issuing 3+ round-trips per build in a loop, this fetches each
 * relation once for the whole page with a single query, then stitches
 * the results together.
 */
export async function hydrateBuilds(
  builds: DBBuild[],
  { includeBuildVariants }: { includeBuildVariants: boolean },
): Promise<DBBuild[]> {
  if (builds.length === 0) return builds;

  const buildIds = builds.map((build) => build.id);

  // Pass 1: Determine which of these builds are secondary variants
  const secondaryVariants = includeBuildVariants
    ? await prisma.buildVariant.findMany({
        where: { secondaryBuildId: { in: buildIds } },
      })
    : [];

  const secondaryVariantByBuildId = new Map<
    string,
    (typeof secondaryVariants)[number]
  >();
  for (const variant of secondaryVariants) {
    // keep only the first match per secondary build id
    if (!secondaryVariantByBuildId.has(variant.secondaryBuildId)) {
      secondaryVariantByBuildId.set(variant.secondaryBuildId, variant);
    }
  }

  const primaryBuildIds = secondaryVariants.map(
    (variant) => variant.primaryBuildId,
  );

  // Pass 2: everything that only depends on the ids gathered above
  const [allBuildItems, allBuildTags, primaryBuilds, variantRows] =
    await Promise.all([
      prisma.buildItems.findMany({ where: { buildId: { in: buildIds } } }),
      prisma.buildTags.findMany({ where: { buildId: { in: buildIds } } }),
      primaryBuildIds.length > 0
        ? prisma.build.findMany({
            where: { id: { in: primaryBuildIds }, isPublic: true },
            include: {
              BuildVotes: true,
              BuildValidatedViews: true,
            },
          })
        : Promise.resolve([]),
      
      // Variant counts keyed by primary build id
      prisma.buildVariant.findMany({
        where: { primaryBuildId: { in: [...buildIds, ...primaryBuildIds] } },
      }),
    ]);

  const buildItemsByBuildId = groupBy(allBuildItems, (item) => item.buildId);
  const buildTagsByBuildId = groupBy(allBuildTags, (tag) => tag.buildId);
  const primaryBuildById = new Map(
    primaryBuilds.map((build) => [build.id, build]),
  );
  const variantCountByPrimaryId = new Map<string, number>();
  for (const variant of variantRows) {
    variantCountByPrimaryId.set(
      variant.primaryBuildId,
      (variantCountByPrimaryId.get(variant.primaryBuildId) ?? 0) + 1,
    );
  }

  for (const build of builds) {
    build.buildItems = buildItemsByBuildId.get(build.id) ?? [];
    build.buildTags = buildTagsByBuildId.get(build.id) ?? [];

    const buildVariant = secondaryVariantByBuildId.get(build.id) ?? null;

    // If this is a build variant, we need to use the primary build name
    if (buildVariant) {
      const primaryBuild =
        primaryBuildById.get(buildVariant.primaryBuildId) ?? null;

      build.id = primaryBuild?.id ?? build.id;
      build.buildVariantName = build.name;
      build.totalVariants = primaryBuild
        ? variantCountByPrimaryId.get(primaryBuild.id) ?? 0
        : 0;
      build.name = primaryBuild?.name ?? build.name;
      build.variantIndex = buildVariant.index ?? 0;
      build.totalUpvotes = primaryBuild?.BuildVotes.length ?? 0;
    } else {
      build.totalVariants = variantCountByPrimaryId.get(build.id) ?? 0;
    }
  }

  return builds;
}

/** Groups an array into a Map keyed by the provided selector. */
function groupBy<T>(items: T[], getKey: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = getKey(item);
    const existing = map.get(key);
    if (existing) {
      existing.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}
