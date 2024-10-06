import { Prisma, prisma } from '@repo/db';

import { type PercentageOwned } from '@/app/(builds)/_components/filters/build-collection-filter';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

const EXCLUDED_CATEGORIES = [
  'skill',
  'prism',
  'fusion',
  'helm',
  'torso',
  'legs',
  'gloves',
  'concoction',
  'consumable',
];

type Props = {
  includeBuildVariants: boolean;
  itemsPerPage: number;
  pageNumber: number;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  orderBySegment: Prisma.Sql;
  searchText: string;
  percentageOwned: PercentageOwned;
};

export function communityBuildsQuery({
  includeBuildVariants,
  itemsPerPage,
  pageNumber,
  userId,
  orderBySegment,
  whereConditions,
  searchText,
  percentageOwned,
}: Props): Prisma.PrismaPromise<DBBuild[]> {
  if (!userId) {
    percentageOwned = 0;
  }

  const query = Prisma.sql`
SELECT * FROM (
  SELECT 
      Build.*, 
      User.name as createdByName, 
      User.displayName as createdByDisplayName,
      (SELECT COUNT(*) FROM BuildVoteCounts WHERE BuildVoteCounts.buildId = Build.id) as totalUpvotes,
      (SELECT COUNT(*) FROM BuildValidatedViews WHERE BuildValidatedViews.buildId = Build.id) as validatedViewCount,
      0 as totalReports,
      FALSE as reported,
      CASE WHEN EXISTS (
        SELECT 1
        FROM BuildVoteCounts
        WHERE BuildVoteCounts.buildId = Build.id
        AND BuildVoteCounts.userId = ${userId}
      ) THEN TRUE ELSE FALSE END as upvoted,
      CASE WHEN PaidUsers.userId IS NOT NULL THEN 1 ELSE 0 END as isMember,
      ItemCounts.totalItems as totalItems,
      UserItemCounts.ownedItems as totalOwnedItems,
      (UserItemCounts.ownedItems * 100.0 / ItemCounts.totalItems) as percentageOwned
    FROM Build
    LEFT JOIN User on Build.createdById = User.id
    LEFT JOIN PaidUsers on User.id = PaidUsers.userId
    LEFT JOIN BuildTags on Build.id = BuildTags.buildId
    LEFT JOIN (
      SELECT 
          BuildItems.buildId,
          COUNT(CASE WHEN BuildItems.category NOT IN (${Prisma.join(
            EXCLUDED_CATEGORIES,
          )}) THEN 1 ELSE NULL END) as totalItems,
          SUM(CASE WHEN BuildItems.category = 'archtype' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as archtypeCount,
          SUM(CASE WHEN BuildItems.category = 'skill' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as skillCount,
          SUM(CASE WHEN BuildItems.category = 'relic' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicCount,
          SUM(CASE WHEN BuildItems.category = 'relicfragment' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicfragmentCount,
          SUM(CASE WHEN BuildItems.category = 'weapon' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as weaponCount,
          SUM(CASE WHEN BuildItems.category = 'mod' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as modCount,
          SUM(CASE WHEN BuildItems.category = 'mutator' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as mutatorCount,
          SUM(CASE WHEN BuildItems.category = 'amulet' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as amuletCount,
          SUM(CASE WHEN BuildItems.category = 'ring' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as ringCount,
          SUM(CASE WHEN BuildItems.category = 'trait' AND BuildItems.itemId <> '' THEN BuildItems.amount ELSE 0 END) as traitSum
      FROM BuildItems
      WHERE BuildItems.itemId <> ''
      GROUP BY BuildItems.buildId
    ) as ItemCounts ON Build.id = ItemCounts.buildId
    LEFT JOIN (
      SELECT 
          BuildItems.buildId,
          COUNT(*) as ownedItems
      FROM BuildItems
      JOIN UserItems ON BuildItems.itemId = UserItems.itemId
      WHERE BuildItems.ItemId <> ''
      AND BuildItems.category NOT IN (${Prisma.join(EXCLUDED_CATEGORIES)})
      AND UserItems.userId = ${userId}
      GROUP BY BuildItems.buildId
    ) as UserItemCounts ON Build.id = UserItemCounts.buildId
    ${whereConditions}
    ${
      !includeBuildVariants
        ? Prisma.sql`AND NOT EXISTS (
      SELECT 1
      FROM BuildVariant
      WHERE BuildVariant.secondaryBuildId = Build.id
    )`
        : Prisma.empty
    }
    ${
      searchText && searchText.length > 0
        ? Prisma.sql`AND (
      User.displayName LIKE ${'%' + searchText + '%'} 
      OR User.name LIKE ${'%' + searchText + '%'} 
      OR Build.name LIKE ${'%' + searchText + '%'} 
      OR Build.description LIKE ${'%' + searchText + '%'}
    )`
        : Prisma.sql``
    }

    GROUP BY Build.id, User.id, ItemCounts.totalItems, UserItemCounts.ownedItems
    ${orderBySegment}
) as SubQuery
WHERE ${
    userId && percentageOwned !== 0
      ? percentageOwned === 100
        ? Prisma.sql`SubQuery.percentageOwned = 100`
        : Prisma.sql`SubQuery.percentageOwned >= ${percentageOwned}`
      : Prisma.sql`1=1`
  }
LIMIT ${itemsPerPage}
OFFSET ${(pageNumber - 1) * itemsPerPage}
`;

  return prisma.$queryRaw<DBBuild[]>(query);
}
