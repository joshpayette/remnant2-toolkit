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

/**
 * Which indexed column the `newest` sort keys off. Community/Beginner/Base
 * Game/Gimmick order by creation date; Featured orders by when the build was
 * featured. Both are backed by a composite index ending in `id`.
 */
type NewestColumn = 'createdAt' | 'dateFeatured';

type PublicBuildFeedProps = {
  cursor: string | null;
  includeBuildVariants: boolean;
  itemsPerPage: number;
  orderBy: OrderBy;
  searchText: string;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  withCollection: number;
  /** Defaults to `createdAt`; Featured passes `dateFeatured`. */
  newestColumn?: NewestColumn;
};

type PublicBuildFeedResult = {
  builds: DBBuild[];
  nextCursor: string | null;
};

type KeysetSort = {
  orderBySql: Prisma.Sql;
  predicate: (value: string | number, id: string) => Prisma.Sql;
  getValue: (build: DBBuild) => string | number;
};

/**
 * Keyset config per sort, or null for sorts that fall back to OFFSET. Each
 * predicate seeks strictly past `(value, id)` in the sort's direction, with
 * `Build.id` as the tiebreaker (matching the composite indexes).
 */
function getKeysetSort(
  orderBy: OrderBy,
  newestColumn: NewestColumn,
): KeysetSort | null {
  switch (orderBy) {
    case 'newest': {
      // Featured keys off `dateFeatured`; every other feed off `createdAt`.
      const column =
        newestColumn === 'dateFeatured'
          ? Prisma.sql`Build.dateFeatured`
          : Prisma.sql`Build.createdAt`;

      return {
        orderBySql: Prisma.sql`ORDER BY ${column} DESC, Build.id DESC`,
        predicate: (value, id) =>
          Prisma.sql`AND (${column} < ${new Date(value)} OR (${column} = ${new Date(
            value,
          )} AND Build.id < ${id}))`,
        getValue: (build) => {
          const raw =
            newestColumn === 'dateFeatured'
              ? build.dateFeatured
              : build.createdAt;
          return raw instanceof Date ? raw.toISOString() : String(raw);
        },
      };
    }
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

export async function getPublicBuildFeed({
  cursor,
  includeBuildVariants,
  itemsPerPage,
  orderBy,
  searchText,
  userId,
  whereConditions,
  withCollection,
  newestColumn = 'createdAt',
}: PublicBuildFeedProps): Promise<PublicBuildFeedResult> {
  const trimmedSearchText = searchText.trim();
  const percentageOwned = (userId ? withCollection : 0) as PercentageOwned;
  const withOwnership = feedNeedsOwnership({ orderBy, userId, withCollection });
  const excludeVariants = includeBuildVariants
    ? Prisma.empty
    : excludeSecondaryVariantsSegment;

  const keysetSort = getKeysetSort(orderBy, newestColumn);
  const useKeyset = !withOwnership && keysetSort !== null;

  // Offset fallback ORDER BY mirrors the featured `newest` = dateFeatured
  // override; every other case defers to the shared segment.
  const offsetOrderBy =
    orderBy === 'newest' && newestColumn === 'dateFeatured'
      ? Prisma.sql`ORDER BY Build.dateFeatured DESC`
      : getOrderBySegment(orderBy);

  const decoded = decodeFeedCursor(cursor);
  const currentPage = decoded?.type === 'offset' ? decoded.page : 1;

  // Fetch one extra row to know whether another page exists.
  const rawRows =
    useKeyset && keysetSort
      ? await keysetQuery({
          excludeVariants,
          itemsPerPage,
          keysetCursor: decoded?.type === 'keyset' ? decoded : null,
          keysetSort,
          searchText: trimmedSearchText,
          userId,
          whereConditions,
        })
      : await offsetQuery({
          excludeVariants,
          itemsPerPage,
          orderBySql: offsetOrderBy,
          page: currentPage,
          percentageOwned,
          searchText: trimmedSearchText,
          userId,
          whereConditions,
          withOwnership,
        });

  const hasMore = rawRows.length > itemsPerPage;
  const pageRows = hasMore ? rawRows.slice(0, itemsPerPage) : rawRows;

  // Compute the cursor from the RAW last row before hydration mutates ids/counts
  // (variant hydration reassigns build.id to the primary build).
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

  const builds = await hydrateBuilds(pageRows, { includeBuildVariants });

  return { builds, nextCursor };
}

function keysetQuery({
  excludeVariants,
  itemsPerPage,
  keysetCursor,
  keysetSort,
  searchText,
  userId,
  whereConditions,
}: {
  excludeVariants: Prisma.Sql;
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
  // and no subquery wrapper, just a flat, index-friendly query.
  const query = Prisma.sql`
SELECT ${buildFeedSelectColumns(userId, false)}
  ${buildFeedBaseJoins}
  ${whereConditions}
  ${excludeVariants}
  ${buildFeedSearchClause(searchText)}
  ${keysetPredicate}
  ${keysetSort.orderBySql}
LIMIT ${itemsPerPage + 1}
`;

  return prisma.$queryRaw<DBBuild[]>(query);
}

function offsetQuery({
  excludeVariants,
  itemsPerPage,
  orderBySql,
  page,
  percentageOwned,
  searchText,
  userId,
  whereConditions,
  withOwnership,
}: {
  excludeVariants: Prisma.Sql;
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
    ${excludeVariants}
    ${buildFeedSearchClause(searchText)}
    ${orderBySql}
) as SubQuery
WHERE ${ownershipOuterFilter(userId, percentageOwned)}
LIMIT ${itemsPerPage + 1}
OFFSET ${(page - 1) * itemsPerPage}
`;

  return prisma.$queryRaw<DBBuild[]>(query);
}
