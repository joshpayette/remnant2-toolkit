import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  HeartIcon,
  InformationCircleIcon,
  ListBulletIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = [
  {
    name: 'Community Builds',
    description: 'A collection of builds aggregated from various sources.',
    href: '/community-builds',
    icon: ListBulletIcon,
  },
  {
    name: 'Create a Build',
    description:
      'Create and share your favorite builds with your friends and the community.',
    href: '/builder/create',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Item Tracker',
    description:
      'Keep track of the items you have collected and the ones you still need.',
    href: '/tracker',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Item Lookup',
    description: 'Look up info on all the items in Remnant 2.',
    href: '/item-lookup',
    icon: InformationCircleIcon,
  },
  {
    name: 'Support the Tool!',
    description:
      'Help support the development of the Remnant 2 Toolkit, plus get some cool perks!',
    href: 'https://www.patreon.com/JoshPayette/membership',
    icon: HeartIcon,
  },
  {
    name: 'My Builds',
    description: 'View and manage your builds.',
    href: '/profile/created-builds',
    icon: UserIcon,
  },
  // {
  //   name: 'Change Log',
  //   description: 'See the latest changes to the site.',
  //   href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
  //   icon: DocumentTextIcon,
  // },
]

/**
 * The maximum characters allowed in a build description
 */
export const MAX_BUILD_DESCRIPTION_LENGTH = 1000

/**
 * The value of each new trait added
 * to the builder.
 */

export const DEFAULT_TRAIT_AMOUNT = 10
/**
 * The maximum amount of traits that can
 * be added to the builder.
 */
export const MAX_TRAIT_AMOUNT = 110

/**
 * The initial display name for a user if none is set
 */
export const DEFAULT_DISPLAY_NAME = 'Traveller'

/**
 * Number of votes for a build to be popular
 */
export const POPULAR_VOTE_THRESHOLD = 25

/**
 * The max size a profile.sav import can be (in kilobytes)
 */
export const MAX_PROFILE_SAV_SIZE = 250

export const ARCHTYPE_COLORS = {
  ALCHEMIST: {
    bg: 'bg-[#102a22]',
    text: 'text-[#10a880]',
  },
  ARCHON: {
    bg: 'bg-[#102730]',
    text: 'text-[#56a9c6]',
  },
  CHALLENGER: {
    bg: 'bg-[#373029]',
    text: 'text-[#af9c94]',
  },
  ENGINEER: {
    bg: 'bg-[#26315a]',
    text: 'text-[#b2bee9]',
  },
  EXPLORER: {
    bg: 'bg-[#2f3c1f]',
    text: 'text-[#67c47c]',
  },
  GUNSLINGER: {
    bg: 'bg-[#3f1818]',
    text: 'text-[#de6966]',
  },
  HANDLER: {
    bg: 'bg-[#545520]',
    text: 'text-[#c3c17a]',
  },
  HUNTER: {
    bg: 'bg-[#392217]',
    text: 'text-[#e17963]',
  },
  INVADER: {
    bg: 'bg-[#362136]',
    text: 'text-[#eaa8ee]',
  },
  MEDIC: {
    bg: 'bg-[#0f3021]',
    text: 'text-[#8bc0aa]',
  },
  SUMMONER: {
    bg: 'bg-[#2c221a]',
    text: 'text-[#ba9880]',
  },
  RITUALIST: {
    bg: 'bg-[#251133]',
    text: 'text-[#bb4fff]',
  },
}
