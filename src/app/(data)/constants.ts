import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  HeartIcon,
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/solid'
import { BuildState } from '../(types)/build'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = [
  {
    name: 'Builder',
    description:
      'Create and share your favorite builds with your friends and the community.',
    href: '/builder/create',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Featured Builds',
    description: 'A collection of builds aggregated from various sources.',
    href: '/featured-builds',
    icon: ListBulletIcon,
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
export const DEFAULT_DISPLAY_NAME = 'Travaller'

/**
 * The max size a profile.sav import can be (in kilobytes)
 */
export const MAX_PROFILE_SAV_SIZE = 250
