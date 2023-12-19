import {
  BookmarkSquareIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'

export const navItems = [
  {
    name: 'Builder',
    description:
      'Create and share your favorite builds with your friends and the community.',
    href: '/builder',
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
    name: 'Change Log',
    description: 'See the latest changes to the site.',
    href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
    icon: DocumentTextIcon,
  },
]
