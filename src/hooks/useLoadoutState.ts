import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import type { LoadoutItemType, LoadoutItem, Loadout } from '@/types'

const initialLoadout: Loadout = {
  name: 'My Loadout',
  items: {
    helm: null,
    torso: null,
    legs: null,
    gloves: null,
    relic: null,
    amulet: null,
    ring1: null,
    ring2: null,
    ring3: null,
    ring4: null,
    mainhand: null,
    offhand: null,
    melee: null,
    mod: null,
    archtype1: null,
    archtype2: null,
    concoction: null,
    traits: null,
  },
}

/**
 * Parses the build state from the encoded URL param, and provides
 * functions to update the build state in the URL
 */
export default function useLoadoutState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Parse the build param from the URL, validates it, and return the build state
   * @param encodedBuildParam The `build` param from the URL, encoded as a base64 string
   */
  const parseLoadoutState = useCallback(
    (encodedBuildParam: string | null): Loadout => {
      let loadoutState = initialLoadout
      if (encodedBuildParam) {
        // TODO Remove this, no need to encode the build state
        const decodedParam = JSON.parse(
          Buffer.from(encodedBuildParam, 'base64').toString('utf-8'),
        )

        const itemSchema = z
          .object({
            name: z.string(),
            slot: z.string(),
            path: z.string(),
          })
          .nullable()

        // Validate the decodedParam against the itemSchema
        const parsedParam = z
          .object({
            helm: itemSchema,
            torso: itemSchema,
            legs: itemSchema,
            gloves: itemSchema,
            relic: itemSchema,
            amulet: itemSchema,
            ring1: itemSchema,
            ring2: itemSchema,
            ring3: itemSchema,
            ring4: itemSchema,
            mainhand: itemSchema,
            offhand: itemSchema,
            melee: itemSchema,
            mod: itemSchema,
            concoction: itemSchema,
            archtype1: itemSchema,
            archtype2: itemSchema,
            traits: itemSchema,
          })
          .safeParse(decodedParam)

        // If the param is valid, update the build state
        if (parsedParam.success) {
          const { data } = parsedParam
          Object.keys(loadoutState).forEach((key) => {
            const slot = key as LoadoutItemType
            const itemForSlot = data[slot]
            if (itemForSlot) {
              loadoutState = { ...loadoutState, [slot]: itemForSlot }
            }
          })
        } else {
          console.error('Invalid build param', parsedParam.error)
        }
      }
      return loadoutState
    },
    [],
  )
  const loadoutState = parseLoadoutState(searchParams.get('build'))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const updateLoadoutState = useCallback(
    (type: LoadoutItemType, item: LoadoutItem | null) => {
      const newLoadoutState = { ...loadoutState }
      newLoadoutState.items[type] =
        item === null
          ? null
          : {
              type,
              name: item.name,
              path: item.path,
            }

      // TODO Remove this, no need to encode the build state
      // Encode the newLoadoutState as a URL safe base64 string
      const buildString = btoa(JSON.stringify(newLoadoutState))
      router.push(pathname + '?' + createQueryString('build', buildString))
    },
    [loadoutState, createQueryString, pathname, router],
  )

  /** Reset the build state by pushing a new route */
  const resetLoadoutState = useCallback(() => {
    router.push(pathname)
  }, [pathname, router])

  return {
    loadoutState,
    resetLoadoutState,
    updateLoadoutState,
  }
}
