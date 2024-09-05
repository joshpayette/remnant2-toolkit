import { remnantEnemies } from '@/app/(enemies)/_constants/remnant-enemies';
import { amuletItems } from '@/app/(items)/_constants/amulet-items';
import { armorItems } from '@/app/(items)/_constants/armor-items';

const enemyImages = remnantEnemies
  .sort((a, b) => a.name.localeCompare(b.name))
  .filter((enemy) => enemy.imagePath)
  .map((enemy) => ({
    id: enemy.id,
    name: enemy.name,
    imagePath: enemy.imagePath as string,
  }));

const helmImages = armorItems
  .filter((item) => item.category === 'helm' && item.imagePath)
  .map((item) => ({
    id: item.id,
    name: item.name,
    imagePath: item.imagePath as string,
  }));

const amuletImages = amuletItems
  .filter((item) => item.imagePath)
  .map((item) => ({
    id: item.id,
    name: item.name,
    imagePath: item.imagePath as string,
  }));

export const ADDITIONAL_AVATARS = [
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
  {
    id: 'CLni6o',
    name: 'Jester',
    imagePath: '/avatars/jester.jpg',
  },
  {
    id: '8Un35y',
    name: 'Leywise',
    imagePath: '/avatars/leywise.jpg',
  },
  {
    id: 'R48rwY',
    name: 'Likh',
    imagePath: '/avatars/likh.jpg',
  },
  {
    id: 'm7pkVp',
    name: 'Meidra',
    imagePath: '/avatars/meidra.jpg',
  },
  {
    id: 'zSPk65',
    name: 'Mudtooth',
    imagePath: '/avatars/mudtooth.jpg',
  },
  {
    id: 'DWx5eX',
    name: 'Nimue',
    imagePath: '/avatars/nimue.jpg',
  },
  {
    id: '5NEkfE',
    name: 'Riewen',
    imagePath: '/avatars/riewen.jpg',
  },
  {
    id: 'UZq9G2',
    name: 'The Custodian',
    imagePath: '/avatars/the_custodian.jpg',
  },
  {
    id: 'QnngE4',
    name: 'The Empress',
    imagePath: '/avatars/the_empress.jpg',
  },
  {
    id: 'VKhAk3',
    name: 'The Flautist',
    imagePath: '/avatars/the_flautist.jpg',
  },
  {
    id: 'ECi3DP',
    name: 'The Keeper',
    imagePath: '/avatars/the_keeper.jpg',
  },
  {
    id: 'YLnz3c',
    name: 'Wallace',
    imagePath: '/avatars/wallace.jpg',
  },
  {
    id: 'T4xD6v',
    name: 'Whispers',
    imagePath: '/avatars/whispers.jpg',
  },
];

/**
 * The list of avatars that a user can choose from
 */
export const AVATARS = [
  ...enemyImages,
  ...helmImages,
  ...amuletImages,
  ...ADDITIONAL_AVATARS,
].sort((a, b) => a.name.localeCompare(b.name)) satisfies Array<{
  id: string;
  name: string;
  imagePath: string;
}>;
