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
