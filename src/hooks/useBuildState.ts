import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import type { LoadoutSlot, LoadoutItem } from '@/types'

type BuildState = {
  [key in LoadoutSlot]: LoadoutItem | null
}

const initialBuildState: BuildState = {
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
}

/**
 * Parses the build state from the encoded URL param, and provides
 * functions to update the build state in the URL
 */
export default function useBuildState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Parse the build param from the URL, validates it, and return the build state
   * @param encodedBuildParam The `build` param from the URL, encoded as a base64 string
   * @returns The build state
   */
  const parseBuildState = useCallback(
    (encodedBuildParam: string | null): BuildState => {
      let buildState = initialBuildState
      if (encodedBuildParam) {
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
          Object.keys(buildState).forEach((key) => {
            const slot = key as LoadoutSlot
            const itemForSlot = data[slot]
            if (itemForSlot) {
              buildState = { ...buildState, [slot]: itemForSlot }
            }
          })
        } else {
          console.error('Invalid build param', parsedParam.error)
        }
      }
      return buildState
    },
    [],
  )
  const buildState = parseBuildState(searchParams.get('build'))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const updateBuildState = useCallback(
    (slot: LoadoutSlot, item: LoadoutItem | null) => {
      const newBuildState = { ...buildState }
      newBuildState[slot] =
        item === null
          ? null
          : {
              slot,
              name: item.name,
              path: item.path,
            }
      // Encode the newBuildState as a URL safe base64 string
      const buildString = btoa(JSON.stringify(newBuildState))
      router.push(pathname + '?' + createQueryString('build', buildString))
    },
    [buildState, createQueryString, pathname, router],
  )

  /** Reset the build state by pushing a new route */
  const resetBuildState = useCallback(() => {
    router.push(pathname)
  }, [pathname, router])

  return {
    buildState,
    resetBuildState,
    updateBuildState,
  }
}
