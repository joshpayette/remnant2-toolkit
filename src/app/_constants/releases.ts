export const RELEASE_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
  dlc2: 'The Forgotten Kingdom',
  dlc3: 'The Dark Horizon',
} as const;

/** To quickly reference for the AFTER_DATE */
export const DLC3_RELEASE_DATE = new Date('2024-09-24');

export const ALL_RELEASE_KEYS = Object.keys(
  RELEASE_TO_NAME,
) as (keyof typeof RELEASE_TO_NAME)[];
