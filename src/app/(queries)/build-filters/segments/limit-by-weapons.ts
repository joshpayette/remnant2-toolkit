import { Prisma } from '@prisma/client'

import { weaponItems } from '@/app/(data)/items/weapon-items'

export function limitByWeaponsSegment(weaponIds: string[]) {
  if (weaponIds.length === 0) return Prisma.empty

  return Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(weaponIds)})
) = ${weaponIds.length}`
}

export function weaponFiltersToIds({
  longGun,
  handGun,
  melee,
}: {
  longGun: string
  handGun: string
  melee: string
}): string[] {
  const weaponIds: string[] = []
  if (longGun && longGun !== 'All' && longGun !== '') {
    const weapon = weaponItems.find(
      (item) => item.name.toLowerCase() === longGun.toLowerCase(),
    )?.id
    if (weapon) weaponIds.push(weapon)
  }
  if (handGun && handGun !== 'All' && handGun !== '') {
    const weapon = weaponItems.find(
      (item) => item.name.toLowerCase() === handGun.toLowerCase(),
    )?.id
    if (weapon) weaponIds.push(weapon)
  }
  if (melee && melee !== 'All' && melee !== '') {
    const weapon = weaponItems.find(
      (item) => item.name.toLowerCase() === melee.toLowerCase(),
    )?.id
    if (weapon) weaponIds.push(weapon)
  }
  return weaponIds
}
