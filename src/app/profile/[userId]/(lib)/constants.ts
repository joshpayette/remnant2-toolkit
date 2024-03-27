import { image } from 'html2canvas/dist/types/css/types/image'

import { remnantEnemies } from '@/features/enemies/remnantEnemies'
import { amuletItems } from '@/features/items/data/amuletItems'
import { armorItems } from '@/features/items/data/armorItems'

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

const additionalImages = [
  {
    id: 'AD7cnH',
    name: 'Dran Nurse',
    imagePath: '/avatars/dran_nurse.jpg',
  },
  {
    id: '4a5EAU',
    name: 'Bridgekeeper Facepalm',
    imagePath: '/avatars/bridgekeeper_facepalm.jpg',
  },
  {
    id: '7dG8vW',
    name: 'Nimue Sleeping',
    imagePath: '/avatars/nimue_sleeping.jpg',
  },
  {
    id: 'yi3JVd',
    name: 'Reggie',
    imagePath: '/avatars/reggie.jpg',
  },
  {
    id: 'cU86w5',
    name: 'Andrew Ford',
    imagePath: '/avatars/andrew_ford.jpg',
  },
  {
    id: 'aPqs77',
    name: 'Ava McCabe',
    imagePath: '/avatars/ava_mccabe.jpg',
  },
  {
    id: 'DmWRA8',
    name: 'Bedel of the Vaunnt',
    imagePath: '/avatars/bedel_of_the_vaunnt.jpg',
  },
  {
    id: 'mjtk8P',
    name: 'Bloodmoon Altar',
    imagePath: '/avatars/bloodmoon_altar.jpg',
  },
  {
    id: 'sox94R',
    name: 'Bo',
    imagePath: '/avatars/bo.jpg',
  },
  {
    id: 'V8Gi2g',
    name: 'Brabus',
    imagePath: '/avatars/brabus.jpg',
  },
  {
    id: 'frboD3',
    name: 'Bridge Warden',
    imagePath: '/avatars/bridge_warden.jpg',
  },
  {
    id: 'i78SMB',
    name: 'Cass',
    imagePath: '/avatars/cass.jpg',
  },
  {
    id: '6UuaBk',
    name: 'Clementine',
    imagePath: '/avatars/clementine.jpg',
  },
  {
    id: 'DX77uX',
    name: 'Don "Rigs" Rigler',
    imagePath: '/avatars/don_rigs_rigler.jpg',
  },
  {
    id: '2dR2wb',
    name: 'Dr. Norah',
    imagePath: '/avatars/dr_norah.jpg',
  },
  {
    id: '4KtJsH',
    name: 'Dran in the Sewer',
    imagePath: '/avatars/dran_in_the_sewer.jpg',
  },
  {
    id: 'agQS6g',
    name: 'Dran Oracle',
    imagePath: '/avatars/dran_oracle.jpg',
  },
  {
    id: 'w8m6tA',
    name: 'Dran Preacher',
    imagePath: '/avatars/dran_preacher.jpg',
  },
  {
    id: 'P9ufkJ',
    name: 'Drzyr Replicator',
    imagePath: '/avatars/drzyr_replicator.jpg',
  },
  {
    id: 'PSya6k',
    name: 'Duane',
    imagePath: '/avatars/duane.jpg',
  },
  {
    id: 'dLMc7Z',
    name: 'Dwell',
    imagePath: '/avatars/dwell.jpg',
  },
  {
    id: 'AXavV7',
    name: 'Earl',
    imagePath: '/avatars/earl.jpg',
  },
  {
    id: 'x2nDCa',
    name: 'Elowen',
    imagePath: '/avatars/elowen.jpg',
  },
  {
    id: 'EuqP9e',
    name: 'Feast Master',
    imagePath: '/avatars/feast_master.jpg',
  },
]

/**
 * The list of avatars that a user can choose from
 */
export const AVATARS = [
  ...enemyImages,
  ...helmImages,
  ...amuletImages,
  ...additionalImages,
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
