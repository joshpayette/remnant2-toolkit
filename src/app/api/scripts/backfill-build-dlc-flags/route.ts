import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { getDlcFlagsFromItemIds } from '@/app/(builds)/_libs/get-build-dlc-flags';
import { prisma } from '@/lib/db';

// Backfill can touch every build, so allow a generous execution window.
export const maxDuration = 300;

/**
 * One-off backfill for the denormalized DLC columns
 * (`Build.hasBaseItems` / `hasDlc1Items` / `hasDlc2Items` / `hasDlc3Items`).
 *
 * - Default: recomputes the flags from each build's BuildItems.
 * - `?audit=true`: does NOT write; reports any build whose stored flags disagree
 *   with the freshly computed ones (integrity check).
 */
export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${envVars.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isAudit = request.nextUrl.searchParams.get('audit') === 'true';

  // One build's items per row; group them into itemId lists keyed by build.
  const buildItems = await prisma.buildItems.findMany({
    select: { buildId: true, itemId: true },
  });

  const itemIdsByBuild = new Map<string, string[]>();
  for (const { buildId, itemId } of buildItems) {
    if (!itemId) continue;
    const existing = itemIdsByBuild.get(buildId);
    if (existing) existing.push(itemId);
    else itemIdsByBuild.set(buildId, [itemId]);
  }

  if (isAudit) {
    const builds = await prisma.build.findMany({
      select: {
        id: true,
        hasBaseItems: true,
        hasDlc1Items: true,
        hasDlc2Items: true,
        hasDlc3Items: true,
      },
    });

    const mismatches = builds
      .map((build) => {
        const expected = getDlcFlagsFromItemIds(
          itemIdsByBuild.get(build.id) ?? [],
        );
        if (
          build.hasBaseItems === expected.hasBaseItems &&
          build.hasDlc1Items === expected.hasDlc1Items &&
          build.hasDlc2Items === expected.hasDlc2Items &&
          build.hasDlc3Items === expected.hasDlc3Items
        ) {
          return null;
        }
        return {
          id: build.id,
          stored: {
            hasBaseItems: build.hasBaseItems,
            hasDlc1Items: build.hasDlc1Items,
            hasDlc2Items: build.hasDlc2Items,
            hasDlc3Items: build.hasDlc3Items,
          },
          expected,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    return Response.json({
      mode: 'audit',
      totalBuilds: builds.length,
      mismatchCount: mismatches.length,
      sampleMismatches: mismatches.slice(0, 100),
    });
  }

  const existingBuildIds = new Set(
    (await prisma.build.findMany({ select: { id: true } })).map((b) => b.id),
  );

  const candidateIds = [...itemIdsByBuild.keys()];
  const buildIds = candidateIds.filter((id) => existingBuildIds.has(id));
  const orphanedIdsSkipped = candidateIds.length - buildIds.length;

  let buildsUpdated = 0;
  const CHUNK_SIZE = 10;
  for (let i = 0; i < buildIds.length; i += CHUNK_SIZE) {
    const chunk = buildIds.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map((id) =>
        prisma.build.updateMany({
          where: { id },
          data: getDlcFlagsFromItemIds(itemIdsByBuild.get(id) ?? []),
        }),
      ),
    );
    buildsUpdated += chunk.length;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return Response.json({
    message: 'DLC flag backfill complete.',
    buildsUpdated,
    orphanedIdsSkipped,
    buildsWithItems: itemIdsByBuild.size,
  });
}
