import type { OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import type { PercentageOwned } from '@/app/(builds)/_features/filters/_types/percentage-owned';
import { Prisma } from '@/lib/db';

/**
 * Categories that do NOT count toward a build's "ownable" item total when
 * computing the `% owned` collection filter (they are either not trackable
 * items, or are always-owned base items).
 */
export const EXCLUDED_CATEGORIES_FOR_OWNERSHIP = [
  'skill',
  'prism',
  'fusion',
  'pylon',
  'helm',
  'torso',
  'legs',
  'gloves',
  'concoction',
  'consumable',
];

/**
 * Whether a feed request needs the (expensive) ownership derived tables. They
 * are only required when the `% owned` collection filter is active, or when the
 * feed is sorted by `% owned`.
 *
 * When this is false the ownership joins and `percentageOwned` column are
 * dropped from the query entirely. Aanonymous traffic and default logged-in
 * browsing never pay for them.
 */
export function feedNeedsOwnership({
  orderBy,
  userId,
  withCollection,
}: {
  orderBy: OrderBy;
  userId: string | undefined;
  withCollection: number;
}): boolean {
  return (
    orderBy === 'percentage owned' || (Boolean(userId) && withCollection > 0)
  );
}

/**
 * The `% owned` expression, aliased as `percentageOwned`. The outer
 * `ownershipOuterFilter` references `SubQuery.percentageOwned`, so any subquery
 * whose wrapper applies that filter (both the list and the count query) must
 * select this column. Otherwise, MySQL errors with "Unknown column
 * 'SubQuery.percentageOwned'".
 */
export const ownershipPercentageColumn = Prisma.sql`(UserItemCounts.ownedItems * 100.0 / Build.countableItemCount) as percentageOwned`;

/**
 * The outer SELECT column list shared by every build feed. Kept here (rather
 * than inlined per feed) because it must stay in lock-step with the `DBBuild`
 * type. The one piece of the query that is genuinely invariant across feeds.
 *
 * The ownership columns are only emitted when `withOwnership` is true;
 * otherwise `percentageOwned` is a constant `0` so
 * the row shape stays stable and the "% owned" badge stays hidden.
 */
export function buildFeedSelectColumns(
  userId: string | undefined,
  withOwnership: boolean,
): Prisma.Sql {
  const ownershipColumns = withOwnership
    ? Prisma.sql`,
      Build.countableItemCount as totalItems,
      UserItemCounts.ownedItems as totalOwnedItems,
      ${ownershipPercentageColumn}`
    : Prisma.sql`,
      0 as percentageOwned`;

  // The denormalized columns are aliased back to the legacy field names
  return Prisma.sql`
      Build.*,
      Build.denormalizedUpvotes as totalUpvotes,
      Build.denormalizedViewCount as validatedViewCount,
      User.name as createdByName,
      User.displayName as createdByDisplayName,
      0 as totalReports,
      FALSE as reported,
      CASE WHEN EXISTS (
        SELECT 1
        FROM BuildVoteCounts
        WHERE BuildVoteCounts.buildId = Build.id
        AND BuildVoteCounts.userId = ${userId}
      ) THEN TRUE ELSE FALSE END as upvoted,
      CASE WHEN EXISTS (
        SELECT 1
        FROM PaidUsers
        WHERE PaidUsers.userId = Build.createdById
      ) THEN 1 ELSE 0 END as isMember${ownershipColumns}`;
}

/**
 * Build + creator join shared by every build feed.
 * Membership is now an EXISTS subquery in the SELECT, so no join here
 * can multiply rows. This is what lets the feeds run without a GROUP BY.
 */
export const buildFeedBaseJoins = Prisma.sql`
    FROM Build
    LEFT JOIN User on Build.createdById = User.id`;

/**
 * The per-user derived join that powers the `% owned` collection filter:
 * `UserItemCounts` (how many of a build's ownable items the current user owns).
 * Only included when a feed actually needs ownership, gate the call with
 * {@link feedNeedsOwnership}.
 */
export function ownershipDerivedJoins(userId: string | undefined): Prisma.Sql {
  return Prisma.sql`
    LEFT JOIN (
      SELECT
          BuildItems.buildId,
          COUNT(*) as ownedItems
      FROM BuildItems
      JOIN UserItems ON BuildItems.itemId = UserItems.itemId
      WHERE BuildItems.itemId <> ''
      AND BuildItems.category NOT IN (${Prisma.join(
        EXCLUDED_CATEGORIES_FOR_OWNERSHIP,
      )})
      AND UserItems.userId = ${userId ?? ''}
      GROUP BY BuildItems.buildId
    ) as UserItemCounts ON Build.id = UserItemCounts.buildId`;
}

/**
 * Excludes secondary build variants from a feed. Feeds that surface variants
 * (currently only Community builds) omit this; every other feed applies it.
 */
export const excludeSecondaryVariantsSegment = Prisma.sql`
    AND NOT EXISTS (
      SELECT 1
      FROM BuildVariant
      WHERE BuildVariant.secondaryBuildId = Build.id
    )`;

/** Free-text search across creator + build name/description. */
export function buildFeedSearchClause(searchText: string): Prisma.Sql {
  if (!searchText || searchText.length === 0) return Prisma.empty;
  return Prisma.sql`
    AND (
      User.displayName LIKE ${'%' + searchText + '%'}
      OR User.name LIKE ${'%' + searchText + '%'}
      OR Build.name LIKE ${'%' + searchText + '%'}
      OR Build.description LIKE ${'%' + searchText + '%'}
    )`;
}

/**
 * The outer `% owned` predicate applied to the wrapped subquery. Resolves to a
 * no-op (`1=1`) for anonymous users or when the collection filter is off.
 */
export function ownershipOuterFilter(
  userId: string | undefined,
  percentageOwned: PercentageOwned,
): Prisma.Sql {
  if (!userId || percentageOwned === 0) return Prisma.sql`1=1`;
  if (percentageOwned === 100)
    return Prisma.sql`SubQuery.percentageOwned = 100`;
  return Prisma.sql`SubQuery.percentageOwned >= ${percentageOwned}`;
}
