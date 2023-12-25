import { BuildState, type CsvItem } from '@/app/(types)'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GenericItem } from '../(types)/GenericItem'
import { Build } from '@prisma/client'
import { ArmorItem } from '../(types)/ArmorItem'
import { WeaponItem } from '../(types)/WeaponItem'
import { MutatorItem } from '../(types)/MutatorItem'
import { TraitItem } from '../(types)/TraitItem'
import { remnantItemCategories, remnantItems } from '../(data)'
import { DEFAULT_TRAIT_AMOUNT } from './constants'

/**
 * capitalizes the first letter of a string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * shadcn utility function combining clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Generates an array of the specified length
 */
export function getArrayOfLength(length: number): number[] {
  return Array.from(Array(length).keys())
}

/**
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends {}>(data: T[], filename: string) {
  let csvContent = 'data:text/csv;charset=utf-8,'
  // Add header row with keys
  csvContent += Object.keys(data[0]).join(',') + '\n'
  // Add data rows with values
  csvContent += data
    .filter((item) => item !== undefined)
    .map((item) => Object.values(item).join(','))
    .join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link) // Required for FF
  link.click()
}

/**
 * Converts an Item to a CSV item for export
 */
export function itemToCsvItem(item: GenericItem): CsvItem {
  function cleanString(string: string): string {
    return (
      string
        // replace commas with spaces
        .replaceAll(',', ' ')
        // replace line breaks with spaces
        .replace(/(?:\r\n|\r|\n)/g, ' ')
    )
  }

  return {
    name: item.name,
    category: item.category,
    description: cleanString(item.description || ''),
    howToGet: cleanString(item.howToGet || ''),
    wikiLinks: item.wikiLinks?.join('; ') || '',
  }
}

/**
 * Removes dangling comma from the end of a string
 */
export function trimTrailingComma(string: string): string {
  return string.replace(/,\s*$/, '')
}

/**
 * Converts the build string into a CSV file
 */
export function buildToCsvData(buildState: BuildState) {
  return remnantItemCategories
    .map((category) => {
      const itemOrItems = buildState.items[category]

      if (!itemOrItems)
        return {
          name: '',
          category,
          description: '',
          howToGet: '',
          wikiLinks: '',
        }

      if (Array.isArray(itemOrItems)) {
        // If the category is a trait, we need to add the trait amount to the name
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            if (!TraitItem.isTraitItem(item)) return itemToCsvItem(item)
            const { name, ...csvItem } = itemToCsvItem(item)
            return {
              name: `${name} - ${item.amount}`,
              ...csvItem,
            }
          })
        }

        return itemOrItems.map((item) => itemToCsvItem(item))
      }

      if (itemOrItems.category === 'trait') {
        if (!Array.isArray(itemOrItems)) {
          return {
            name: '',
            category,
            description: '',
            howToGet: '',
            wikiLinks: '',
          }
        }
        return itemOrItems.map((item) => itemToCsvItem(item.item))
      }
    })
    .flat()
}

/**
 * Converts the build state to a query string
 */
export function buildToQueryParams(buildState: BuildState) {
  const { items } = buildState

  let editBuildUrl = `/builder?`
  editBuildUrl += `name=${buildState.name}`

  if (items.helm) editBuildUrl += `&helm=${ArmorItem.toParams(items.helm)}`
  if (items.torso) editBuildUrl += `&torso=${ArmorItem.toParams(items.torso)}`
  if (items.gloves)
    editBuildUrl += `&gloves=${ArmorItem.toParams(items.gloves)}`
  if (items.legs) editBuildUrl += `&legs=${ArmorItem.toParams(items.legs)}`

  if (items.relic)
    editBuildUrl += `&relic=${GenericItem.toParamsFromSingle(items.relic)}`
  if (items.relicfragment && items.relicfragment.length > 0)
    editBuildUrl += `&relicfragment=${GenericItem.toParamsFromArray(
      items.relicfragment,
    )}`

  if (items.weapon && items.weapon.length > 0)
    editBuildUrl += `&weapon=${WeaponItem.toParams(items.weapon)}`
  if (items.mod && items.mod.length > 0)
    editBuildUrl += `&mod=${GenericItem.toParamsFromArray(items.mod)}`
  if (items.mutator && items.mutator.length > 0)
    editBuildUrl += `&mutator=${MutatorItem.toParams(items.mutator)}`

  if (items.amulet)
    editBuildUrl += `&amulet=${GenericItem.toParamsFromSingle(items.amulet)}`
  if (items.ring && items.ring.length > 0)
    editBuildUrl += `&ring=${GenericItem.toParamsFromArray(items.ring)}`

  if (items.archtype && items.archtype.length > 0)
    editBuildUrl += `&archtype=${GenericItem.toParamsFromArray(items.archtype)}`
  if (items.skill && items.skill.length > 0)
    editBuildUrl += `&skill=${GenericItem.toParamsFromArray(items.skill)}`

  if (items.concoction && items.concoction.length > 0)
    editBuildUrl += `&concoction=${GenericItem.toParamsFromArray(
      items.concoction,
    )}`
  if (items.consumable && items.consumable.length > 0)
    editBuildUrl += `&consumable=${GenericItem.toParamsFromArray(
      items.consumable,
    )}`

  if (items.trait && items.trait.length > 0)
    editBuildUrl += `&trait=${TraitItem.toParams(items.trait)}`

  return editBuildUrl
}

/**
 * Converts a build from the database to a build state that the
 * Builder component can use
 */
export function dbBuildToBuildState(
  dbBuild: Build & { createdByDisplayName: string },
): BuildState {
  return {
    name: dbBuild.name,
    description: dbBuild.description,
    isPublic: dbBuild.isPublic,
    createdById: dbBuild.createdById,
    createdByDisplayName: dbBuild.createdByDisplayName,
    buildId: dbBuild.id,
    items: {
      helm: dbBuild.helm ? ArmorItem.fromDBValue(dbBuild.helm) : null,
      torso: dbBuild.torso ? ArmorItem.fromDBValue(dbBuild.torso) : null,
      gloves: dbBuild.gloves ? ArmorItem.fromDBValue(dbBuild.gloves) : null,
      legs: dbBuild.legs ? ArmorItem.fromDBValue(dbBuild.legs) : null,
      relic: dbBuild.relic
        ? GenericItem.fromDBValueSingle(dbBuild.relic)
        : null,
      weapon: dbBuild.weapon ? WeaponItem.fromDBValue(dbBuild.weapon) : [],
      ring: dbBuild.ring ? GenericItem.fromDBValueArray(dbBuild.ring) : [],
      amulet: dbBuild.amulet
        ? GenericItem.fromDBValueSingle(dbBuild.amulet)
        : null,
      archtype: dbBuild.archtype
        ? GenericItem.fromDBValueArray(dbBuild.archtype)
        : [],
      skill: dbBuild.skill ? GenericItem.fromDBValueArray(dbBuild.skill) : [],
      concoction: dbBuild.concoction
        ? GenericItem.fromDBValueArray(dbBuild.concoction)
        : [],
      consumable: dbBuild.consumable
        ? GenericItem.fromDBValueArray(dbBuild.consumable)
        : [],
      mod: dbBuild.mod ? GenericItem.fromDBValueArray(dbBuild.mod) : [],
      mutator: dbBuild.mutator ? MutatorItem.fromDBValue(dbBuild.mutator) : [],
      relicfragment: dbBuild.relicfragment
        ? GenericItem.fromDBValueArray(dbBuild.relicfragment)
        : [],
      trait: dbBuild.trait ? TraitItem.fromDBValue(dbBuild.trait) : [],
    },
  }
}

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0

  // Add 3 concoctions if primary is alchemist
  // or if the primary skill is an alchemist skill
  const isPrimaryAlchemist =
    buildState.items.archtype[0]?.name?.toLowerCase() === 'alchemist'
  const isPrimarySkillAlchemist =
    buildState.items.skill[0]?.linkedItems?.archtype?.name === 'Alchemist'
  if (isPrimaryAlchemist || isPrimarySkillAlchemist) concoctionCount += 3

  // Add 1 concoction if they are wearing Feastmaster's Signet
  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring.name === "Feastmaster's Signet",
  )
  if (hasFeastmastersSignet) concoctionCount += 1

  // Add 2 concoctionc if they are wearing Brewmasters Cork
  const hasBrewmastersCork =
    buildState.items.amulet?.name === 'Brewmasters Cork'

  if (hasBrewmastersCork) concoctionCount += 2

  return concoctionCount
}

/**
 * Checks the build weapons and equips any mods
 * that are linked to them
 */
export function linkWeaponsToMods(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the weapons for linked mods
  // If any are found, add them to the build
  const weapons = newBuildState.items.weapon
  weapons.forEach((weapon, index) => {
    const linkedMod = weapon.linkedItems?.mod
    if (!linkedMod) return

    const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
    if (!modItem) return

    newBuildState.items.mod[index] = modItem
  })

  // Check the mods for linked weapons
  // If any are found, add them to the build
  const mods = newBuildState.items.mod
  mods.forEach((mod, index) => {
    const linkedWeapon = mod.linkedItems?.weapon
    if (!linkedWeapon) return

    const weaponItem = remnantItems.find(
      (weapon) => weapon.name === linkedWeapon.name,
    )
    if (!WeaponItem.isWeaponItem(weaponItem)) return

    newBuildState.items.weapon[index] = weaponItem
  })

  // Return the build with linked items
  return newBuildState
}

/**
 * Checks the build archtypes and equips any traints
 * that are linked to them
 */
export function linkArchtypesToTraits(buildState: BuildState) {
  const newBuildState = { ...buildState }

  // Check the archtypes for linked traits
  // If any are found, add them to the build
  const archtypes = newBuildState.items.archtype
  archtypes.forEach((archtype) => {
    const linkedTrait = archtype.linkedItems?.trait
    if (!linkedTrait) return

    const traitItem = remnantItems.find(
      (trait) => trait.name === linkedTrait.name,
    )
    if (!traitItem) return

    // If the trait is already in the build, set the amount to 10
    // Otherwise, add the trait to the build
    const existingTrait = newBuildState.items.trait.find(
      (trait) => trait.name === traitItem.name,
    )
    if (existingTrait) {
      existingTrait.amount = DEFAULT_TRAIT_AMOUNT
      newBuildState.items.trait = newBuildState.items.trait.map((trait) =>
        trait.name === traitItem.name ? existingTrait : trait,
      )
    } else {
      newBuildState.items.trait.push(
        new TraitItem({
          amount: DEFAULT_TRAIT_AMOUNT,
          id: traitItem.id,
          name: traitItem.name,
          category: traitItem.category,
          imagePath: traitItem.imagePath,
          description: traitItem.description ?? '',
          howToGet: traitItem.howToGet ?? '',
          wikiLinks: traitItem.wikiLinks ?? [],
          linkedItems: traitItem.linkedItems ?? {},
          saveFileSlug: traitItem.saveFileSlug,
        }),
      )
    }
  })

  // *We deliberately don't check the traits and link to archtypes,
  // *since traits can be used without the archtype equipped
  // Return the build with linked items
  return newBuildState
}
