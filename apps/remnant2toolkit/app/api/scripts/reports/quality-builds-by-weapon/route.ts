import { Prisma, prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';
import { type NextRequest } from 'next/server';

import { validateEnv } from '@/app/_libs/validate-env';
import {
  MAX_TRAIT_AMOUNT,
  MAX_TRAIT_AMOUNT_WITH_TRAITOR,
} from '@/app/(builds)/_constants/max-trait-amount';
import { MINIMUM_QUALITY_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/minimum-quality-description-length';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

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

function getQuery(weaponIds: string[]) {
  return Prisma.sql`
    SELECT 
      COUNT(*) as totalQualityBuilds
    FROM Build
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
    LEFT JOIN BuildTags on Build.id = BuildTags.buildId
    WHERE Build.isPublic = 1
    AND Build.isPatchAffected = 0
    AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(weaponIds)})
    ) = 1
    AND CHAR_LENGTH(Build.description) >= ${MINIMUM_QUALITY_DESCRIPTION_LENGTH}
    AND Build.name != 'My Build'
    AND Build.name NOT LIKE '%(copy)%'
    AND EXISTS (SELECT 1 FROM BuildTags WHERE BuildTags.BuildId = Build.Id)
    AND (ItemCounts.archtypeCount = 2)
    AND (ItemCounts.skillCount = 2)
    AND (ItemCounts.relicCount = 1)
    AND (ItemCounts.relicfragmentCount > 2)
    AND (ItemCounts.weaponCount = 3)
    AND (ItemCounts.modCount >= 2)
    AND (ItemCounts.mutatorCount = 3)
    AND (ItemCounts.amuletCount = 1)
    AND (ItemCounts.ringCount = 4)
    AND (ItemCounts.traitSum = ${MAX_TRAIT_AMOUNT} OR ItemCounts.traitSum = ${MAX_TRAIT_AMOUNT_WITH_TRAITOR})
`;
}

export async function GET(request: NextRequest) {
  const envVars = validateEnv();

  if (envVars.NODE_ENV === 'production') {
    return Response.json({
      message: 'This script is only available in development',
    });
  }

  const authHeader = request.headers.get('authorization');
  if (
    authHeader !== `Bearer ${envVars.CRON_SECRET}` &&
    envVars.NODE_ENV === 'production'
  ) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const results: Array<{ weaponName: string; totalQualityBuilds: number }> = [];

  for await (const weapon of weaponItems) {
    try {
      const weaponName = weapon.name;

      console.info(`Fetching total quality builds for ${weaponName}...`);

      const totalQualityBuildsResponse = await prisma.$queryRaw<
        Array<{ totalQualityBuilds: number }>
      >(getQuery([weapon.id]));

      const totalQualityBuilds = Number(
        bigIntFix(totalQualityBuildsResponse[0]?.totalQualityBuilds || 0),
      );

      if (totalQualityBuilds <= 0) {
        console.info('totalQualityBuildsResponse', totalQualityBuildsResponse);
        results.push({
          weaponName,
          totalQualityBuilds,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  console.info('Done!');

  return Response.json({ results });
}
