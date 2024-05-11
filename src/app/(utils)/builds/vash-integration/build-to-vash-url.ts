import { BuildState } from '@/app/(types)/builds'
import { getArrayOfLength } from '@/app/(utils)/get-array-of-length'

export function buildToVashUrl(buildState: BuildState) {
  const { items } = buildState

  let vashUrl = 'https://cowaii.io/index.html?'

  // traits
  const traitParams = items.trait.map(
    (trait) => `${trait.name.replace(' ', '+')}${trait.amount}`,
  )
  const traitString = traitParams.join(',')
  vashUrl += `trait=${traitString}&`

  // archetypes and skills
  const archetypeParams = items.archetype.map(
    (archetype) => archetype?.name.replace(' ', '+') ?? '',
  )
  const skillParams = items.skill.map(
    (skill) => skill?.name.replace(' ', '+') ?? '',
  )
  const archetypeString = archetypeParams.join(',')
  const skillString = skillParams.join(',')
  vashUrl += `archetype=${archetypeString},${skillString}&`

  // armor
  const armorParams = [
    items.helm?.name.replace(' ', '+') ?? '',
    items.torso?.name.replace(' ', '+') ?? '',
    items.legs?.name.replace(' ', '+') ?? '',
    items.gloves?.name.replace(' ', '+') ?? '',
  ]
  const armorString = armorParams.join(',')
  vashUrl += `armor=${armorString}&`

  // main weapon
  const mainWeaponParams = [
    items.weapon[0]?.name.replace(' ', '+') ?? '',
    items.mutator[0]?.name.replace(' ', '+') ?? '',
    items.mod[0]?.name.replace(' ', '+') ?? '',
  ]
  const mainWeaponString = mainWeaponParams.join(',')
  vashUrl += `primary=${mainWeaponString}&`

  // melee weapon
  const meleeWeaponParams = [
    items.weapon[1]?.name.replace(' ', '+') ?? '',
    items.mutator[1]?.name.replace(' ', '+') ?? '',
    items.mod[1]?.name.replace(' ', '+') ?? '',
  ]
  const meleeWeaponString = meleeWeaponParams.join(',')
  vashUrl += `melee=${meleeWeaponString}&`

  // pistol weapon
  const pistolWeaponParams = [
    items.weapon[2]?.name.replace(' ', '+') ?? '',
    items.mutator[2]?.name.replace(' ', '+') ?? '',
    items.mod[2]?.name.replace(' ', '+') ?? '',
  ]
  const pistolWeaponString = pistolWeaponParams.join(',')
  vashUrl += `secondary=${pistolWeaponString}&`

  // consumable
  const concoctionParams = getArrayOfLength(7).map(
    (_, i) => items.concoction[i]?.name.replace(' ', '+') ?? '',
  )
  const consumableParams = getArrayOfLength(4).map(
    (_, i) => items.consumable[i]?.name.replace(' ', '+') ?? '',
  )

  const concoctionString = concoctionParams.join(',')
  const consumableString = consumableParams.join(',')
  vashUrl += `consumable=${concoctionString},${consumableString}&`

  // accessories
  const accessoryParams = [
    items.amulet?.name.replace(' ', '+') ?? '',
    items.ring[0]?.name.replace(' ', '+') ?? '',
    items.ring[1]?.name.replace(' ', '+') ?? '',
    items.ring[2]?.name.replace(' ', '+') ?? '',
    items.ring[3]?.name.replace(' ', '+') ?? '',
  ]
  const accessoryString = accessoryParams.join(',')
  vashUrl += `accessory=${accessoryString}&`

  // relic and relic fragments
  const relicParams = [
    items.relic?.name.replace(' ', '+') ?? '',
    items.relicfragment[0]?.name.replace(' ', '+') ?? '',
    items.relicfragment[1]?.name.replace(' ', '+') ?? '',
    items.relicfragment[2]?.name.replace(' ', '+') ?? '',
  ]
  const relicString = relicParams.join(',')
  vashUrl += `relic=${relicString}&`

  // Remove the last & from the string
  vashUrl = vashUrl.slice(0, -1)

  return vashUrl
}
