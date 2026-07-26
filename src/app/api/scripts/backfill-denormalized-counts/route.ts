import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { prisma } from '@/lib/db';

// Backfill can touch every build, so allow a generous execution window.
export const maxDuration = 300;

/**
 * One-off backfill for the denormalized columns `Build.denormalizedUpvotes`
 * and `Build.denormalizedViewCount`.
 *
 * - Default: recomputes both columns from the live BuildVoteCounts /
 *   BuildValidatedViews rows.
 * - `?audit=true`: does NOT write; instead reports any build whose stored
 *   columns disagree with the live counts (integrity check).
 */
export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${envVars.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isAudit = request.nextUrl.searchParams.get('audit') === 'true';

  // Live counts per build, one grouped query each.
  const [voteCounts, viewCounts] = await Promise.all([
    prisma.buildVoteCounts.groupBy({
      by: ['buildId'],
      _count: { _all: true },
    }),
    prisma.buildValidatedViews.groupBy({
      by: ['buildId'],
      _count: { _all: true },
    }),
  ]);

  const voteMap = new Map(voteCounts.map((v) => [v.buildId, v._count._all]));
  const viewMap = new Map(viewCounts.map((v) => [v.buildId, v._count._all]));

  if (isAudit) {
    const builds = await prisma.build.findMany({
      select: {
        id: true,
        denormalizedUpvotes: true,
        denormalizedViewCount: true,
      },
    });

    const mismatches = builds
      .map((build) => {
        const expectedUpvotes = voteMap.get(build.id) ?? 0;
        const expectedViews = viewMap.get(build.id) ?? 0;
        if (
          build.denormalizedUpvotes === expectedUpvotes &&
          build.denormalizedViewCount === expectedViews
        ) {
          return null;
        }
        return {
          id: build.id,
          storedUpvotes: build.denormalizedUpvotes,
          expectedUpvotes,
          storedViews: build.denormalizedViewCount,
          expectedViews,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    return Response.json({
      mode: 'audit',
      totalBuilds: builds.length,
      mismatchCount: mismatches.length,
      // Cap the payload; a non-zero count means the backfill should be re-run.
      sampleMismatches: mismatches.slice(0, 100),
    });
  }

  const existingBuildIds = new Set(
    (await prisma.build.findMany({ select: { id: true } })).map((b) => b.id),
  );

  const candidateIds = [
    ...new Set<string>([...voteMap.keys(), ...viewMap.keys()]),
  ];
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
          data: {
            denormalizedUpvotes: voteMap.get(id) ?? 0,
            denormalizedViewCount: viewMap.get(id) ?? 0,
          },
        }),
      ),
    );
    buildsUpdated += chunk.length;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  return Response.json({
    message: 'Backfill complete.',
    buildsUpdated,
    orphanedIdsSkipped,
    buildsWithVotes: voteMap.size,
    buildsWithViews: viewMap.size,
  });
}
