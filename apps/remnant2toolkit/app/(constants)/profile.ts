import { remnantEnemies } from '@/app/(data)/enemies/remnant-enemies'
import { amuletItems } from '@/app/(data)/items/amulet-items'
import { armorItems } from '@/app/(data)/items/armor-items'

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

export const ADDITIONAL_AVATARS = [
  {
    id: 'AD7cnH',
    name: 'Dran Nurse',
    imagePath: '/remnant2/avatars/dran_nurse.jpg',
  },
  {
    id: '4a5EAU',
    name: 'Bridgekeeper Facepalm',
    imagePath: '/remnant2/avatars/bridgekeeper_facepalm.jpg',
  },
  {
    id: '7dG8vW',
    name: 'Nimue Sleeping',
    imagePath: '/remnant2/avatars/nimue_sleeping.jpg',
  },
  {
    id: 'yi3JVd',
    name: 'Reggie',
    imagePath: '/remnant2/avatars/reggie.jpg',
  },
  {
    id: 'cU86w5',
    name: 'Andrew Ford',
    imagePath: '/remnant2/avatars/andrew_ford.jpg',
  },
  {
    id: 'aPqs77',
    name: 'Ava McCabe',
    imagePath: '/remnant2/avatars/ava_mccabe.jpg',
  },
  {
    id: 'DmWRA8',
    name: 'Bedel of the Vaunnt',
    imagePath: '/remnant2/avatars/bedel_of_the_vaunnt.jpg',
  },
  {
    id: 'mjtk8P',
    name: 'Bloodmoon Altar',
    imagePath: '/remnant2/avatars/bloodmoon_altar.jpg',
  },
  {
    id: 'sox94R',
    name: 'Bo',
    imagePath: '/remnant2/avatars/bo.jpg',
  },
  {
    id: 'V8Gi2g',
    name: 'Brabus',
    imagePath: '/remnant2/avatars/brabus.jpg',
  },
  {
    id: 'frboD3',
    name: 'Bridge Warden',
    imagePath: '/remnant2/avatars/bridge_warden.jpg',
  },
  {
    id: 'i78SMB',
    name: 'Cass',
    imagePath: '/remnant2/avatars/cass.jpg',
  },
  {
    id: '6UuaBk',
    name: 'Clementine',
    imagePath: '/remnant2/avatars/clementine.jpg',
  },
  {
    id: 'DX77uX',
    name: 'Don "Rigs" Rigler',
    imagePath: '/remnant2/avatars/don_rigs_rigler.jpg',
  },
  {
    id: '2dR2wb',
    name: 'Dr. Norah',
    imagePath: '/remnant2/avatars/dr_norah.jpg',
  },
  {
    id: '4KtJsH',
    name: 'Dran in the Sewer',
    imagePath: '/remnant2/avatars/dran_in_the_sewer.jpg',
  },
  {
    id: 'agQS6g',
    name: 'Dran Oracle',
    imagePath: '/remnant2/avatars/dran_oracle.jpg',
  },
  {
    id: 'w8m6tA',
    name: 'Dran Preacher',
    imagePath: '/remnant2/avatars/dran_preacher.jpg',
  },
  {
    id: 'P9ufkJ',
    name: 'Drzyr Replicator',
    imagePath: '/remnant2/avatars/drzyr_replicator.jpg',
  },
  {
    id: 'PSya6k',
    name: 'Duane',
    imagePath: '/remnant2/avatars/duane.jpg',
  },
  {
    id: 'dLMc7Z',
    name: 'Dwell',
    imagePath: '/remnant2/avatars/dwell.jpg',
  },
  {
    id: 'AXavV7',
    name: 'Earl',
    imagePath: '/remnant2/avatars/earl.jpg',
  },
  {
    id: 'x2nDCa',
    name: 'Elowen',
    imagePath: '/remnant2/avatars/elowen.jpg',
  },
  {
    id: 'EuqP9e',
    name: 'Feast Master',
    imagePath: '/remnant2/avatars/feast_master.jpg',
  },
  {
    id: 'CLni6o',
    name: 'Jester',
    imagePath: '/remnant2/avatars/jester.jpg',
  },
  {
    id: '8Un35y',
    name: 'Leywise',
    imagePath: '/remnant2/avatars/leywise.jpg',
  },
  {
    id: 'R48rwY',
    name: 'Likh',
    imagePath: '/remnant2/avatars/likh.jpg',
  },
  {
    id: 'm7pkVp',
    name: 'Meidra',
    imagePath: '/remnant2/avatars/meidra.jpg',
  },
  {
    id: 'zSPk65',
    name: 'Mudtooth',
    imagePath: '/remnant2/avatars/mudtooth.jpg',
  },
  {
    id: 'DWx5eX',
    name: 'Nimue',
    imagePath: '/remnant2/avatars/nimue.jpg',
  },
  {
    id: '5NEkfE',
    name: 'Riewen',
    imagePath: '/remnant2/avatars/riewen.jpg',
  },
  {
    id: 'UZq9G2',
    name: 'The Custodian',
    imagePath: '/remnant2/avatars/the_custodian.jpg',
  },
  {
    id: 'QnngE4',
    name: 'The Empress',
    imagePath: '/remnant2/avatars/the_empress.jpg',
  },
  {
    id: 'VKhAk3',
    name: 'The Flautist',
    imagePath: '/remnant2/avatars/the_flautist.jpg',
  },
  {
    id: 'ECi3DP',
    name: 'The Keeper',
    imagePath: '/remnant2/avatars/the_keeper.jpg',
  },
  {
    id: 'YLnz3c',
    name: 'Wallace',
    imagePath: '/remnant2/avatars/wallace.jpg',
  },
  {
    id: 'T4xD6v',
    name: 'Whispers',
    imagePath: '/remnant2/avatars/whispers.jpg',
  },
]

/**
 * The list of avatars that a user can choose from
 */
export const AVATARS = [
  ...enemyImages,
  ...helmImages,
  ...amuletImages,
  ...ADDITIONAL_AVATARS,
].sort((a, b) => a.name.localeCompare(b.name)) satisfies Array<{
  id: string
  name: string
  imagePath: string
}>

export const DEFAULT_AVATAR_ID = '2zr34P' // Gorge

/**
 * The initial display name for a user if none is set
 */
export const DEFAULT_DISPLAY_NAME = 'Traveler'
