import { type TraitItem, type Build, type WeaponItem } from '@/types'
import { remnantItemCategories, remnantItems } from '@/data'
import { type Item } from '@/types'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Modifies the URL query string by adding or updating a parameter.
 *
 * @example Adds a `name` parameter to the query string
 * router.push(`${pathname}?${createQueryString('name', name)}`)
 */
export default function useQueryString() {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  /**
   * Adds a value to the query string then navigates to it
   */
  function updateQueryString(
    name: string,
    value: string | string[],
    scroll = false,
  ): void {
    if (Array.isArray(value)) {
      value = value.join(',')
    }

    router.push(`${pathname}?${createQueryString(name, value)}`, {
      scroll,
    })
  }

  /**
   * Parses the build values from the query string
   */
  function parseQueryString(searchParams: URLSearchParams): Build {
    const build: Build = {
      name: 'My Build',
      items: {
        helm: null,
        torso: null,
        legs: null,
        gloves: null,
        relic: null,
        amulet: null,
        weapon: [],
        ring: [],
        archtype: [],
        skill: [],
        concoction: [],
        consumable: [],
        mod: [],
        mutator: [],
        relicfragment: [],
        trait: [],
      },
    }

    // Build name
    const name = searchParams.get('name')
    build.name = name ?? build.name

    // Loop through each category and check the query params
    // for that category's item IDs
    remnantItemCategories.forEach((itemCategory) => {
      const itemIds = searchParams.get(itemCategory)?.split(',')

      if (!itemIds) return

      itemIds.forEach((itemId, itemIndex) => {
        // We need to split the the trait id at the ; to get the amount
        if (itemCategory === 'trait') {
          const [traitId, amount] = itemId.split(';')

          const item = remnantItems.find((i) => i.id === traitId)
          if (!item) return

          const buildItem = (build.items[itemCategory] as TraitItem[])[
            itemIndex
          ]

          let validAmount = amount ? parseInt(amount) : 1
          if (isNaN(validAmount)) validAmount = 1
          if (validAmount < 1) validAmount = 1
          if (validAmount > 10) validAmount = 10

          if (!buildItem) {
            return ((build.items[itemCategory] as TraitItem[])[itemIndex] = {
              ...item,
              category: itemCategory,
              amount: validAmount,
            })
          }

          return ((build.items[itemCategory] as TraitItem[])[itemIndex] = {
            ...buildItem,
            category: itemCategory,
            amount: validAmount,
          })
        }

        const item = remnantItems.find((i) => i.id === itemId)
        if (!item) return

        if (Array.isArray(build.items[itemCategory])) {
          return ((build.items[itemCategory] as Item[])[itemIndex] = {
            ...item,
            category: itemCategory,
          })
        }

        return ((build.items[itemCategory] as Item) = {
          ...item,
          category: itemCategory,
        })
      })
    })

    return build
  }

  /**
   * Checks the build weapons and equips any mods
   * that are linked to them
   */
  function linkWeaponsToMods(currentBuild: Build) {
    const newBuild = { ...currentBuild }

    // Check the weapons for linked mods
    // If any are found, add them to the build
    const weapons = newBuild.items.weapon
    weapons.forEach((weapon, index) => {
      const linkedMod = weapon.linkedItems?.mod
      if (!linkedMod) return

      const modItem = remnantItems.find((mod) => mod.name === linkedMod.name)
      if (!modItem) return

      newBuild.items.mod[index] = modItem
    })

    // Check the mods for linked weapons
    // If any are found, add them to the build
    const mods = newBuild.items.mod
    mods.forEach((mod, index) => {
      const linkedWeapon = mod.linkedItems?.weapon
      if (!linkedWeapon) return

      const weaponItem = remnantItems.find(
        (weapon) => weapon.name === linkedWeapon.name,
      )
      if (!weaponItem) return

      newBuild.items.weapon[index] = weaponItem as WeaponItem
    })

    // Return the build with linked items
    return newBuild
  }

  const build = linkWeaponsToMods(parseQueryString(searchParams))

  return { updateQueryString, currentBuild: build }
}
