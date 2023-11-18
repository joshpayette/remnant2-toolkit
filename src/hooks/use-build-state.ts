import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import type { ArmorSlot, Armor } from '@/data/armor'

type BuildState = {
  [key in ArmorSlot]: Armor | null
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
}

/**
 * Parse the build param from the URL, validates it, and return the build state
 * @param encodedBuildParam The `build` param from the URL, encoded as a base64 string
 * @returns The build state
 */
function parseBuildState(encodedBuildParam: string | null): BuildState {
  let buildState = initialBuildState
  if (encodedBuildParam) {
    const decodedParam = JSON.parse(
      Buffer.from(encodedBuildParam, 'base64').toString('utf-8'),
    )

    const armorSchema = z
      .object({
        name: z.string(),
        slot: z.string(),
        path: z.string(),
      })
      .nullable()

    // Validate the decodedParam against the armorSchema
    const parsedParam = z
      .object({
        helm: armorSchema,
        torso: armorSchema,
        legs: armorSchema,
        gloves: armorSchema,
        relic: armorSchema,
        amulet: armorSchema,
        ring1: armorSchema,
        ring2: armorSchema,
        ring3: armorSchema,
        ring4: armorSchema,
      })
      .safeParse(decodedParam)

    // If the build param is valid, set the build state
    if (parsedParam.success) {
      const { data } = parsedParam
      Object.keys(buildState).forEach((key) => {
        const slot = key as ArmorSlot
        const armorForSlot = data[slot]
        if (armorForSlot) {
          buildState = { ...buildState, [slot]: armorForSlot }
        }
      })
    } else {
      console.error('Invalid build param', parsedParam.error)
    }
  }
  return buildState
}

/**
 * Parses the build state from the encoded URL param, and provides
 * functions to update the build state in the URL
 */
export default function useBuildState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildState = parseBuildState(searchParams.get('build'))

  /**
   * Get a new searchParams string by merging the current
   * searchParams with a provided key/value pair
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  /** Update the build state by pushing a new route */
  const updateBuildState = useCallback(
    (slot: ArmorSlot, armor: Armor | null) => {
      const newBuildState = { ...buildState }
      newBuildState[slot] = armor
      // Encode the newBuildState as a URL safe base64 string
      const buildString = Buffer.from(
        JSON.stringify(newBuildState),
        'utf-8',
      ).toString('base64')
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
