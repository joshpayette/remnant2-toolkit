import { Prisma } from '@prisma/client'

export function limitByBuildNameOrDescriptionSegment(searchText: string) {
  const trimmedSearchText = searchText.trim()
  return trimmedSearchText === ''
    ? Prisma.empty
    : Prisma.sql`AND (Build.name LIKE ${
        '%' + trimmedSearchText + '%'
      } OR Build.description LIKE ${'%' + trimmedSearchText + '%'})`
}
