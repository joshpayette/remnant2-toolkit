import { image } from 'html2canvas/dist/types/css/types/image'

import { remnantEnemies } from '@/app/(data)/enemies/remnant-enemies'
import { amuletItems } from '@/app/(data)/items/amulet-items'
import { armorItems } from '@/app/(data)/items/armor-items'
import { additionalAvatars } from '@/app/profile/[userId]/(lib)/additionalAvatars'

const enemyImages = remnantEnemies
  .sort((a, b) => a.name.localeCompare(b.name))
  .filter((enemy) => enemy.imagePath)
  .map((enemy) => ({
    id: enemy.id,
    name: enemy.name,
    imagePath: enemy.imagePath as string,
  }))

const helmImages = armorItems
  .filter((item) => item.category === 'helm' && item.imagePath)
  .map((item) => ({
    id: item.id,
    name: item.name,
    imagePath: item.imagePath as string,
  }))

const amuletImages = amuletItems
  .filter((item) => item.imagePath)
  .map((item) => ({
    id: item.id,
    name: item.name,
    imagePath: item.imagePath as string,
  }))

/**
 * The list of avatars that a user can choose from
 */
export const AVATARS = [
  ...enemyImages,
  ...helmImages,
  ...amuletImages,
  ...additionalAvatars,
].sort((a, b) => a.name.localeCompare(b.name)) satisfies Array<{
  id: string
  name: string
  imagePath: string
}>

export const DEFAULT_AVATAR_ID = '2zr34P' // Gorge

/**
 * The maximum characters allowed in a profile bio
 */
export const MAX_PROFILE_BIO_LENGTH = 1000

/**
 * The initial display name for a user if none is set
 */
export const DEFAULT_DISPLAY_NAME = 'Traveler'

/**
 * The default bio for a user if none is set
 */
export const DEFAULT_BIO = 'No bio is set yet.'
