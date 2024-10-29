import { Prisma } from '@repo/db';

export function limitByReferenceSegment(withReference: string) {
  if (!withReference || withReference !== 'true') return Prisma.empty;
  return Prisma.sql`AND Build.buildLink IS NOT NULL AND Build.buildLink != ''`;
}
