import { Prisma } from '@prisma/client'

import { MINIMUM_QUALITY_DESCRIPTION_LENGTH } from '@/app/(components)/filters/builds/build-misc-filter'
import { MAX_TRAIT_AMOUNT } from '@/app/(data)/builds/constants'

export function limitToQualityBuilds(limitToQualityBuilds: boolean) {
  if (!limitToQualityBuilds) return Prisma.empty
  return Prisma.sql`
  AND CHAR_LENGTH(Build.description) >= ${MINIMUM_QUALITY_DESCRIPTION_LENGTH}
  AND EXISTS (SELECT 1 FROM BuildTags WHERE BuildTags.BuildId = Build.Id)
  AND (ItemCounts.archtypeCount = 2)
  AND (ItemCounts.skillCount = 2)
  AND (ItemCounts.helmCount = 1)
  AND (ItemCounts.torsoCount = 1)
  AND (ItemCounts.glovesCount = 1)
  AND (ItemCounts.legsCount = 1)
  AND (ItemCounts.relicCount = 1)
  AND (ItemCounts.relicfragmentCount = 3)
  AND (ItemCounts.weaponCount = 3)
  AND (ItemCounts.modCount = 3)
  AND (ItemCounts.mutatorCount = 3)
  AND (ItemCounts.amuletCount = 1)
  AND (ItemCounts.ringCount = 4)
  AND (ItemCounts.traitSum = ${MAX_TRAIT_AMOUNT})
  `
}
