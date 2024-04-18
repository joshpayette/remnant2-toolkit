import { Prisma } from '@prisma/client'

import { OrderBy } from '../../types'

export function getOrderBySegment(
  orderBy: OrderBy,
  isFeaturedBuilds?: boolean,
) {
  let orderBySegment = Prisma.sql`
  ORDER BY totalUpvotes DESC
  `

  if (orderBy === 'alphabetical') {
    orderBySegment = Prisma.sql`
    ORDER BY TRIM(Build.name) ASC
    `
  } else if (orderBy === 'newest') {
    if (Boolean(isFeaturedBuilds)) {
      orderBySegment = Prisma.sql`
    ORDER BY dateFeatured DESC
    `
    } else {
      orderBySegment = Prisma.sql`
      ORDER BY createdAt DESC
      `
    }
  }

  return orderBySegment
}
