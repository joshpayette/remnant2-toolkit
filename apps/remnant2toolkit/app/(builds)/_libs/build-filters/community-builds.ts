import { Prisma, prisma } from '@repo/db';

import { type DBBuild } from '@/app/(builds)/_types/db-build';

type Props = {
  itemsPerPage: number;
  pageNumber: number;
  userId: string | undefined;
  whereConditions: Prisma.Sql;
  orderBySegment: Prisma.Sql;
  searchText: string;
};

export function limitByPercentageOwned(percentage: 100 | 90 | 75 | 50) {
  if (!percentage) return Prisma.empty;
  if (percentage === 100) return Prisma.sql`AND percentageOwned = 100`;
  return Prisma.sql`AND percentageOwned >= ${percentage}`;
}

export function communityBuildsQuery({
  itemsPerPage,
  pageNumber,
  userId,
  orderBySegment,
  whereConditions,
  searchText,
}: Props): Prisma.PrismaPromise<DBBuild[]> {
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
      ItemCounts.totalItems,
      UserItemCounts.ownedItems,
      (UserItemCounts.ownedItems * 100.0 / ItemCounts.totalItems) as percentageOwned
    FROM Build
    LEFT JOIN User on Build.createdById = User.id
    LEFT JOIN PaidUsers on User.id = PaidUsers.userId
    LEFT JOIN BuildTags on Build.id = BuildTags.buildId
    LEFT JOIN (
      SELECT 
          BuildItems.buildId,
          COUNT(*) as totalItems,
          SUM(CASE WHEN BuildItems.category = 'archtype' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as archtypeCount,
          SUM(CASE WHEN BuildItems.category = 'skill' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as skillCount,
          SUM(CASE WHEN BuildItems.category = 'relic' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicCount,
          SUM(CASE WHEN BuildItems.category = 'relicfragment' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicfragmentCount,
          SUM(CASE WHEN BuildItems.category = 'weapon' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as weaponCount,
          SUM(CASE WHEN BuildItems.category = 'mod' THEN 1 ELSE 0 END) as modCount,
          SUM(CASE WHEN BuildItems.category = 'mutator' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as mutatorCount,
          SUM(CASE WHEN BuildItems.category = 'amulet' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as amuletCount,
          SUM(CASE WHEN BuildItems.category = 'ring' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as ringCount,
          SUM(CASE WHEN BuildItems.category = 'trait' AND BuildItems.itemId <> '' THEN BuildItems.amount ELSE 0 END) as traitSum
      FROM BuildItems
      GROUP BY BuildItems.buildId
    ) as ItemCounts ON Build.id = ItemCounts.buildId
    LEFT JOIN (
      SELECT 
          BuildItems.buildId,
          COUNT(*) as ownedItems
      FROM BuildItems
      JOIN UserItems ON BuildItems.itemId = UserItems.itemId
      WHERE UserItems.userId = ${userId}
      GROUP BY BuildItems.buildId
    ) as UserItemCounts ON Build.id = UserItemCounts.buildId
    ${whereConditions}
    AND NOT EXISTS (
      SELECT 1
      FROM BuildVariant
      WHERE BuildVariant.secondaryBuildId = Build.id
    )
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
    LIMIT ${itemsPerPage} 
    OFFSET ${(pageNumber - 1) * itemsPerPage}
) as SubQuery
WHERE SubQuery.percentageOwned >= 75`;

  return prisma.$queryRaw<DBBuild[]>(query);
}

/**
 * with the response, you can get the total via:
 * response[0].totalBuildCount
 */
export function communityBuildsCountQuery({
  whereConditions,
  searchText,
}: {
  whereConditions: Props['whereConditions'];
  searchText: Props['searchText'];
}): Prisma.PrismaPromise<
  Array<{
    totalBuildCount: number;
  }>
> {
  const query = Prisma.sql`
  SELECT 
    COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN BuildTags on Build.id = BuildTags.buildId
  LEFT JOIN User on Build.createdById = User.id
  LEFT JOIN (
    SELECT 
        BuildItems.buildId,
        SUM(CASE WHEN BuildItems.category = 'archtype' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as archtypeCount,
        SUM(CASE WHEN BuildItems.category = 'skill' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as skillCount,
        SUM(CASE WHEN BuildItems.category = 'helm' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as helmCount,
        SUM(CASE WHEN BuildItems.category = 'torso' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as torsoCount,
        SUM(CASE WHEN BuildItems.category = 'gloves' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as glovesCount,
        SUM(CASE WHEN BuildItems.category = 'legs' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as legsCount,
        SUM(CASE WHEN BuildItems.category = 'relic' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicCount,
        SUM(CASE WHEN BuildItems.category = 'relicfragment' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as relicfragmentCount,
        SUM(CASE WHEN BuildItems.category = 'weapon' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as weaponCount,
        SUM(CASE WHEN BuildItems.category = 'mod' THEN 1 ELSE 0 END) as modCount,
        SUM(CASE WHEN BuildItems.category = 'mutator' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as mutatorCount,
        SUM(CASE WHEN BuildItems.category = 'amulet' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as amuletCount,
        SUM(CASE WHEN BuildItems.category = 'ring' AND BuildItems.itemId <> '' THEN 1 ELSE 0 END) as ringCount,
        SUM(CASE WHEN BuildItems.category = 'trait' AND BuildItems.itemId <> '' THEN BuildItems.amount ELSE 0 END) as traitSum
    FROM BuildItems
    GROUP BY BuildItems.buildId
  ) as ItemCounts ON Build.id = ItemCounts.buildId
  ${whereConditions}
  AND NOT EXISTS (
    SELECT 1
    FROM BuildVariant
    WHERE BuildVariant.secondaryBuildId = Build.id
  )
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
`;

  return prisma.$queryRaw<
    Array<{
      totalBuildCount: number;
    }>
  >(query);
}
