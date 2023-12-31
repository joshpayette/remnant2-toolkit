import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = [
  {
    name: 'Builds',
    description: 'A collection of builds submitted by the community.',
    href: '/community-builds',
    icon: ListBulletIcon,
  },
  {
    name: 'Builder',
    description:
      'Create and share your favorite builds with your friends and the community.',
    href: '/builder',
    icon: BookmarkSquareIcon,
  },
  // {
  //   name: 'Featured Builds',
  //   description: 'A collection of builds aggregated from various sources.',
  //   href: '/featured-builds',
  //   icon: ListBulletIcon,
  // },
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
export const MAX_BUILD_DESCRIPTION_LENGTH = 170

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
