import { Prisma } from '@repo/db';

import { MINIMUM_QUALITY_DESCRIPTION_LENGTH } from '@/app/(builds)/_components/filters/build-misc-filter';
import {
  MAX_TRAIT_AMOUNT,
  MAX_TRAIT_AMOUNT_WITH_TRAITOR,
} from '@/app/(builds)/_constants/max-trait-amount';

export function limitToQualityBuilds(limitToQualityBuilds: boolean) {
  if (!limitToQualityBuilds) return Prisma.empty;
  return Prisma.sql`
  AND CHAR_LENGTH(Build.description) >= ${MINIMUM_QUALITY_DESCRIPTION_LENGTH}
  AND Build.name != 'My Build'
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
