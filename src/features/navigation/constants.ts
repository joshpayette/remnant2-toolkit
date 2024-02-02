import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HeartIcon,
  InformationCircleIcon,
  ListBulletIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = {
  featuredBuilds: {
    label: 'Featured Builds',
    description: 'A collection of featured creator builds',
    href: '/creator-builds',
    icon: StarIcon,
  },
  communityBuilds: {
    label: 'Community Builds',
    description:
      'A collection of builds submitted and ranked by the community.',
    href: '/community-builds',
    icon: ListBulletIcon,
  },
  createBuild: {
    label: 'Create a Build',
    description:
      'Create and share your favorite builds with your friends and the community.',
    href: '/builder/create',
    icon: BookmarkSquareIcon,
  },
  itemTracker: {
    label: 'Item Tracker',
    description:
      'Keep track of the items you have collected and the ones you still need.',
    href: '/tracker',
    icon: DocumentCheckIcon,
  },
  itemLookup: {
    label: 'Item Lookup',
    description: 'Look up info on all the items in Remnant 2.',
    href: '/item-lookup',
    icon: InformationCircleIcon,
  },
  supportR2TK: {
    label: 'Support R2TK!',
    description:
      'Help support the development of the Remnant 2 Toolkit, plus get some cool perks!',
    href: 'https://www.patreon.com/JoshPayette/membership',
    icon: HeartIcon,
  },
  myBuilds: {
    label: 'My Builds',
    description: 'View and manage your builds.',
    href: '/profile/created-builds',
    icon: UserIcon,
  },
  changeLog: {
    label: 'Change Log',
    description: 'See the latest changes to the site.',
    href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
    icon: DocumentTextIcon,
  },
}
