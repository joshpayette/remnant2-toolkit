import { hydrateBuilds } from '@/app/(builds)/_actions/hydrate-builds';
import { type OrderBy } from '@/app/(builds)/_features/filters/_hooks/use-order-by-filter';
import {
  decodeFeedCursor,
  encodeFeedCursor,
} from '@/app/(builds)/_features/filters/_libs/queries/build-feed-cursor';
import {
  buildFeedBaseJoins,
  buildFeedSearchClause,
  buildFeedSelectColumns,
  excludeSecondaryVariantsSegment,
  feedNeedsOwnership,
  ownershipDerivedJoins,
  ownershipOuterFilter,
} from '@/app/(builds)/_features/filters/_libs/queries/build-feed-query-parts';
import { getOrderBySegment } from '@/app/(builds)/_features/filters/_libs/queries/segments/order-by';
import { type PercentageOwned } from '@/app/(builds)/_features/filters/_types/percentage-owned';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { Prisma, prisma } from '@/lib/db';

type UserBuildFeedProps = {
  cursor: string | null;
  itemsPerPage: number;
  orderBy: OrderBy;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  withCollection: number;
};

type UserBuildFeedResult = {
  builds: DBBuild[];
  nextCursor: string | null;
};

type KeysetSort = {
  orderBySql: Prisma.Sql;
  predicate: (value: string | number, id: string) => Prisma.Sql;
  getValue: (build: DBBuild) => string | number;
};

/**
 * Keyset config per sort, or null for sorts that fall back to OFFSET. Mirrors
 * the public feed's config minus the featured `dateFeatured` override (profile
 * feeds always key `newest` off `createdAt`).
 */
function getKeysetSort(orderBy: OrderBy): KeysetSort | null {
  switch (orderBy) {
    case 'newest':
      return {
        orderBySql: Prisma.sql`ORDER BY Build.createdAt DESC, Build.id DESC`,
        predicate: (value, id) =>
          Prisma.sql`AND (Build.createdAt < ${new Date(value)} OR (Build.createdAt = ${new Date(
            value,
          )} AND Build.id < ${id}))`,
        getValue: (build) =>
          build.createdAt instanceof Date
            ? build.createdAt.toISOString()
            : String(build.createdAt),
      };
    case 'most viewed':
      return {
        orderBySql: Prisma.sql`ORDER BY Build.validatedViewCount DESC, Build.id DESC`,
        predicate: (value, id) =>
          Prisma.sql`AND (Build.validatedViewCount < ${Number(
            value,
          )} OR (Build.validatedViewCount = ${Number(
            value,
          )} AND Build.id < ${id}))`,
        getValue: (build) => build.validatedViewCount,
      };
    case 'alphabetical':
    case 'percentage owned':
      return null;
    // 'most favorited' and any future default sort by upvotes.
    default:
      return {
        orderBySql: Prisma.sql`ORDER BY Build.totalUpvotes DESC, Build.id DESC`,
        predicate: (value, id) =>
          Prisma.sql`AND (Build.totalUpvotes < ${Number(
            value,
          )} OR (Build.totalUpvotes = ${Number(value)} AND Build.id < ${id}))`,
        getValue: (build) => build.totalUpvotes,
      };
  }
}

export async function getUserBuildFeed({
  cursor,
  itemsPerPage,
  orderBy,
  searchText,
  userId,
  whereConditions,
  withCollection,
}: UserBuildFeedProps): Promise<UserBuildFeedResult> {
  const trimmedSearchText = searchText.trim();
  const percentageOwned = (userId ? withCollection : 0) as PercentageOwned;
  const withOwnership = feedNeedsOwnership({ orderBy, userId, withCollection });

  const keysetSort = getKeysetSort(orderBy);
  const useKeyset = !withOwnership && keysetSort !== null;

  const decoded = decodeFeedCursor(cursor);
  const currentPage = decoded?.type === 'offset' ? decoded.page : 1;

  // Fetch one extra row to know whether another page exists.
  const rawRows =
    useKeyset && keysetSort
      ? await keysetQuery({
          itemsPerPage,
          keysetCursor: decoded?.type === 'keyset' ? decoded : null,
          keysetSort,
          searchText: trimmedSearchText,
          userId,
          whereConditions,
        })
      : await offsetQuery({
          itemsPerPage,
          orderBySql: getOrderBySegment(orderBy),
          page: currentPage,
          percentageOwned,
          searchText: trimmedSearchText,
          userId,
          whereConditions,
          withOwnership,
        });

  const hasMore = rawRows.length > itemsPerPage;
  const pageRows = hasMore ? rawRows.slice(0, itemsPerPage) : rawRows;

  // Compute the cursor from the RAW last row before hydration mutates ids.
  let nextCursor: string | null = null;
  if (hasMore) {
    const lastRow = pageRows[pageRows.length - 1];
    if (useKeyset && keysetSort && lastRow) {
      nextCursor = encodeFeedCursor({
        type: 'keyset',
        value: keysetSort.getValue(lastRow),
        id: lastRow.id,
      });
    } else {
      nextCursor = encodeFeedCursor({ type: 'offset', page: currentPage + 1 });
    }
  }

  const builds = await hydrateBuilds(pageRows, { includeBuildVariants: false });

  return { builds, nextCursor };
}

function keysetQuery({
  itemsPerPage,
  keysetCursor,
  keysetSort,
  searchText,
  userId,
  whereConditions,
}: {
  itemsPerPage: number;
  keysetCursor: { value: string | number; id: string } | null;
  keysetSort: KeysetSort;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
}): Prisma.PrismaPromise<DBBuild[]> {
  const keysetPredicate = keysetCursor
    ? keysetSort.predicate(keysetCursor.value, keysetCursor.id)
    : Prisma.empty;

  // Keyset only runs when ownership is off, so no derived joins / outer filter
  // and no subquery wrapper — a flat, index-friendly query.
  const query = Prisma.sql`
SELECT ${buildFeedSelectColumns(userId, false)}
  ${buildFeedBaseJoins}
  ${whereConditions}
  ${excludeSecondaryVariantsSegment}
  ${buildFeedSearchClause(searchText)}
  ${keysetPredicate}
  ${keysetSort.orderBySql}
LIMIT ${itemsPerPage + 1}
`;

  return prisma.$queryRaw<DBBuild[]>(query);
}

function offsetQuery({
  itemsPerPage,
  orderBySql,
  page,
  percentageOwned,
  searchText,
  userId,
  whereConditions,
  withOwnership,
}: {
  itemsPerPage: number;
  orderBySql: Prisma.Sql;
  page: number;
  percentageOwned: PercentageOwned;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  withOwnership: boolean;
}): Prisma.PrismaPromise<DBBuild[]> {
  const ownershipJoins = withOwnership
    ? ownershipDerivedJoins(userId)
    : Prisma.empty;

  const query = Prisma.sql`
SELECT * FROM (
  SELECT ${buildFeedSelectColumns(userId, withOwnership)}
    ${buildFeedBaseJoins}
    ${ownershipJoins}
    ${whereConditions}
    ${excludeSecondaryVariantsSegment}
    ${buildFeedSearchClause(searchText)}
    ${orderBySql}
) as SubQuery
WHERE ${ownershipOuterFilter(userId, percentageOwned)}
LIMIT ${itemsPerPage + 1}
OFFSET ${(page - 1) * itemsPerPage}
`;

  return prisma.$queryRaw<DBBuild[]>(query);
}
