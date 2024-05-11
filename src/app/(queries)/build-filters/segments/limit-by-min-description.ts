import { Prisma } from '@prisma/client'

import { MINIMUM_DESCRIPTION_LENGTH } from '@/app/(components)/filters/builds/build-misc-filter'

export function limitToBuildsWithMinDescription(
  limitToBuildsWithMinDescription: boolean,
) {
  if (!limitToBuildsWithMinDescription) return Prisma.empty
  return Prisma.sql`AND CHAR_LENGTH(Build.description) >= ${MINIMUM_DESCRIPTION_LENGTH}`
}
