import { prisma } from '@/app/(lib)/db'

export default function getQuery(userId: string) {
  return prisma.$queryRaw`
  SELECT *
  FROM Build
  WHERE isPublic = true
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'helm'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'torso'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'legs'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'gloves'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'relic'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    INNER JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'amulet'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
  )
  AND EXISTS (
    SELECT 1
    FROM BuildItems
    LEFT JOIN Item ON BuildItems.itemId = Item.itemId
    WHERE Build.id = BuildItems.buildId
    AND BuildItems.category = 'ring'
    AND (
      BuildItems.itemId = ''
      OR EXISTS (
        SELECT 1
        FROM UserItems
        WHERE UserItems.itemId = Item.itemId
        AND UserItems.userId = ${userId}
      )
    )
    GROUP BY Build.id
    HAVING COUNT(*) = 4
  )
  `
}
