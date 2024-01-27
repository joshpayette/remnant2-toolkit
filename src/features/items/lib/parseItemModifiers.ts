import { MODIFIERS } from '../constants'
import { Modifier } from '../types'

export const parseItemModifiers = (
  description: string | undefined,
): Modifier[] => {
  if (!description) return [] as Modifier[]

  const modifiersFound: Modifier[] = []
  MODIFIERS.forEach((modifier) => {
    if (description.includes(modifier.token)) {
      modifiersFound.push(modifier)
    }
  })
  return modifiersFound
}
