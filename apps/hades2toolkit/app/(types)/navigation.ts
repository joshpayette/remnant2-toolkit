import {
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  HeartIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PuzzlePieceIcon,
  QueueListIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { DISCORD_INVITE_URL } from '@repo/constants'
import ChangeLogIcon from '@repo/ui/icons/changelog'
import DiscordIcon from '@repo/ui/icons/discord'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = {
  changeLog: {
    label: 'Change Log',
    description:
      'A running log of all additions, changes, and fixes to the toolkit.',
    href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
    icon: ChangeLogIcon,
  },
  communityBuilds: {
    label: 'Community Builds',
    description:
      'Search a collection of Hades 2 builds, submitted and ranked by the community.',
    href: '/community-builds',
    icon: ListBulletIcon,
  },
  createBuild: {
    label: 'Create a Build',
    description:
      'Create and share your favorite Hades 2 builds with your friends and the community.',
    href: '/builder/create',
    icon: PlusIcon,
  },
  discordInvite: {
    label: 'Join the Toolkit Discord!',
    description:
      'Weigh in on new features, get help with builds, report bugs, or just hang out!',
    href: DISCORD_INVITE_URL,
    icon: DiscordIcon,
  },
  favoritedBuilds: {
    label: 'Favorited Builds',
    description: 'View and manage your favorited builds.',
    href: '/profile/favorited-builds',
    icon: StarIcon,
  },
  featuredBuilds: {
    label: 'Featured Builds',
    description:
      'A curated list of unique and high-quality community submitted builds for Hades 2.',
    href: '/featured-builds',
    icon: StarIcon,
  },
  itemLookup: {
    label: 'Item Lookup',
    description:
      'A Hades 2 item lookup tool to search for detailed item information, tags, and locations.',
    href: '/item-lookup',
    icon: MagnifyingGlassIcon,
  },
  itemQuiz: {
    label: 'Item Quiz',
    description:
      'Test your ability to recognize items from Hades 2 by only their icons! How many can you get in 60 seconds?',
    href: '/item-quiz',
    icon: PuzzlePieceIcon,
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
  resources: {
    label: 'Resources',
    description:
      'A collection of helpful tools, detailed guides, and third-party projects for Hades 2.',
    href: '/resources',
    icon: QueueListIcon,
  },
  signin: {
    label: 'Sign In',
    description:
      'Sign into your Discord or Reddit account to access more features.',
    href: '/api/auth/signin',
    icon: UsersIcon,
  },
  signout: {
    label: 'Sign Out',
    description: 'Sign out of your account.',
    href: '/api/auth/signout',
    icon: ArrowLeftOnRectangleIcon,
  },
  supportHades2TK: {
    label: 'Support Hades2TK!',
    description:
      'Help with the costs of running the Toolkit and keeping it ad-free, plus get some small perks!',
    href: '/support-hades2tk',
    icon: HeartIcon,
  },
}
