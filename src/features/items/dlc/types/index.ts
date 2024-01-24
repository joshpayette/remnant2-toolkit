export const DLC_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
} as const

export type DLCKey = keyof typeof DLC_TO_NAME
export type DLCName = (typeof DLC_TO_NAME)[DLCKey]
