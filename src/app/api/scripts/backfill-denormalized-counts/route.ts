import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import { prisma } from '@/lib/db';

// Backfill can touch every build, so allow a generous execution window.
export const maxDuration = 300;

/**
 * One-off backfill for the denormalized columns `Build.totalUpvotes`
 * and `Build.validatedViewCount`.
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
      select: { id: true, totalUpvotes: true, validatedViewCount: true },
    });

    const mismatches = builds
      .map((build) => {
        const expectedUpvotes = voteMap.get(build.id) ?? 0;
        const expectedViews = viewMap.get(build.id) ?? 0;
        if (
          build.totalUpvotes === expectedUpvotes &&
          build.validatedViewCount === expectedViews
        ) {
          return null;
        }
        return {
          id: build.id,
          storedUpvotes: build.totalUpvotes,
          expectedUpvotes,
          storedViews: build.validatedViewCount,
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

  // Only builds with at least one vote or view need a non-zero value; the
  // columns default to 0 for everything else.
  const buildIds = [...new Set<string>([...voteMap.keys(), ...viewMap.keys()])];

  let buildsUpdated = 0;
  const CHUNK_SIZE = 25;
  for (let i = 0; i < buildIds.length; i += CHUNK_SIZE) {
    const chunk = buildIds.slice(i, i + CHUNK_SIZE);
    await Promise.all(
      chunk.map((id) =>
        prisma.build.update({
          where: { id },
          data: {
            totalUpvotes: voteMap.get(id) ?? 0,
            validatedViewCount: viewMap.get(id) ?? 0,
          },
        }),
      ),
    );
    buildsUpdated += chunk.length;
  }

  return Response.json({
    message: 'Backfill complete.',
    buildsUpdated,
    buildsWithVotes: voteMap.size,
    buildsWithViews: viewMap.size,
  });
}
