import { Prisma } from '@prisma/client'
import { OrderBy } from '../../types'

export default function getOrderBySegment(orderBy: OrderBy) {
  let orderBySegment = Prisma.sql`
  ORDER BY totalUpvotes DESC
  `

  if (orderBy === 'alphabetical') {
    orderBySegment = Prisma.sql`
    ORDER BY TRIM(Build.name) ASC
    `
  } else if (orderBy === 'newest') {
    orderBySegment = Prisma.sql`
    ORDER BY createdAt DESC
    `
  }

  return orderBySegment
}
