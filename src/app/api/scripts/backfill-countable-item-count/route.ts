import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { getCountableItemCountFromBuildItems } from '@/app/(builds)/_libs/get-countable-item-count';
import { prisma } from '@/lib/db';

// Backfill can touch every build, so allow a generous execution window.
export const maxDuration = 300;

/**
 * One-off backfill for the denormalized `Build.countableItemCount`
 * column (the old `ItemCounts.totalItems` value).
 *
 * - Default: recomputes the count from each build's BuildItems.
 * - `?audit=true`: does NOT write; reports any build whose stored count
 *   disagrees with the freshly computed one (integrity check).
 */
export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${envVars.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isAudit = request.nextUrl.searchParams.get('audit') === 'true';

  // Everything the countable-item predicate needs, grouped per build.
  const buildItems = await prisma.buildItems.findMany({
    select: { buildId: true, itemId: true, category: true, index: true },
  });

  const itemsByBuild = new Map<
    string,
    Array<{ itemId: string; category: string | null; index: number | null }>
  >();
  for (const { buildId, itemId, category, index } of buildItems) {
    const row = { itemId, category, index };
    const existing = itemsByBuild.get(buildId);
    if (existing) existing.push(row);
    else itemsByBuild.set(buildId, [row]);
  }

  if (isAudit) {
    const builds = await prisma.build.findMany({
      select: { id: true, countableItemCount: true },
    });

    const mismatches = builds
      .map((build) => {
        const expected = getCountableItemCountFromBuildItems(
          itemsByBuild.get(build.id) ?? [],
        );
        if (build.countableItemCount === expected) return null;
        return {
          id: build.id,
          stored: build.countableItemCount,
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

  // Only builds that have items need a non-zero count; the rest keep default 0.
  const buildIds = [...itemsByBuild.keys()];

  let buildsUpdated = 0;
  const CHUNK_SIZE = 25;
  for (let i = 0; i < buildIds.length; i += CHUNK_SIZE) {
    const chunk = buildIds.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map((id) =>
        prisma.build.update({
          where: { id },
          data: {
            countableItemCount: getCountableItemCountFromBuildItems(
              itemsByBuild.get(id) ?? [],
            ),
          },
        }),
      ),
    );
    buildsUpdated += chunk.length;
  }

  return Response.json({
    message: 'Countable item count backfill complete.',
    buildsUpdated,
    buildsWithItems: itemsByBuild.size,
  });
}
