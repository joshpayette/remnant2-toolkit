import {
  ArrowLeftOnRectangleIcon,
  CircleStackIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  HeartIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShieldCheckIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = {
  bossTracker: {
    label: 'Boss Tracker',
    description:
      'Keep track of the bosses you have defeated and the ones you still need.',
    href: '/boss-tracker',
    icon: ShieldCheckIcon,
  },
  changeLog: {
    label: 'Change Log',
    description: 'See the latest changes to the site.',
    href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
    icon: DocumentPlusIcon,
  },
  collectionBuilds: {
    label: 'Builds by Collection',
    description:
      'View builds that you can create based on the Item Tracker data.',
    href: '/community-builds/by-collection',
    icon: CircleStackIcon,
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
    icon: PlusIcon,
  },
  favoritedBuilds: {
    label: 'Favorited Builds',
    description: 'View and manage your favorited builds.',
    href: '/profile/favorited-builds',
    icon: StarIcon,
  },
  featuredBuilds: {
    label: 'Featured Builds',
    description: 'A collection of featured creator builds.',
    href: '/creator-builds',
    icon: StarIcon,
  },
  itemLookup: {
    label: 'Item Lookup',
    description: 'Look up info on all the items in Remnant 2.',
    href: '/item-lookup',
    icon: MagnifyingGlassIcon,
  },
  itemTracker: {
    label: 'Item Tracker',
    description:
      'Keep track of the items you have collected and the ones you still need.',
    href: '/tracker',
    icon: DocumentCheckIcon,
  },
  myBuilds: {
    label: 'My Builds',
    description: 'View and manage builds you created.',
    href: '/profile/created-builds',
    icon: DocumentTextIcon,
  },
  profile: {
    label: 'Profile',
    description: 'View and manage your profile.',
    href: '/profile',
    icon: UserIcon,
  },
  signout: {
    label: 'Sign Out',
    description: 'Sign out of your account.',
    href: '/api/auth/signout',
    icon: ArrowLeftOnRectangleIcon,
  },
  supportR2TK: {
    label: 'Support R2TK!',
    description:
      'Help support the development of the Remnant 2 Toolkit, plus get some cool perks!',
    href: 'https://www.patreon.com/JoshPayette/membership',
    icon: HeartIcon,
  },
}
