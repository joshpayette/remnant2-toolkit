import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  CalculatorIcon,
  CircleStackIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HeartIcon,
  LinkIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PuzzlePieceIcon,
  QueueListIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  TableCellsIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import { CHANGELOG_URL, DISCORD_INVITE_URL } from '@repo/constants'
import ChangeLogIcon from '@repo/ui/icons/changelog'
import DiscordIcon from '@repo/ui/icons/discord'
import { RiOpenbaseLine as BaseGameBuildsIcon } from 'react-icons/ri'

import VashIcon from '../(components)/images/vash-icon'
import WikiIcon from '../(components)/images/wiki-icon'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = {
  baseGameBuilds: {
    label: 'Base Game Builds',
    description: `A curated list of Remnant 2 builds for players who don't own any DLCs.`,
    href: '/base-game-builds',
    icon: BaseGameBuildsIcon,
  },
  beginnerBuilds: {
    label: 'Beginner Builds',
    description:
      'A curated list of Remnant 2 builds intended to be usable or targetable in the earlier hours of gameplay.',
    href: '/beginner-builds',
    icon: SparklesIcon,
  },
  bossTracker: {
    label: 'Boss Tracker',
    description:
      'A Remnant 2 boss tracker to keep tabs on which bosses you have defeated, and the bosses that are still escaping your grasp.',
    href: '/boss-tracker',
    icon: ShieldCheckIcon,
  },
  changeLog: {
    label: 'Change Log',
    description:
      'A running log of all additions, changes, and fixes to the Remnant 2 Toolkit.',
    href: CHANGELOG_URL,
    icon: ChangeLogIcon,
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
      'Search a collection of Remnant 2 builds submitted and ranked by the community.',
    href: '/community-builds',
    icon: ListBulletIcon,
  },
  createBuild: {
    label: 'Create a Build',
    description:
      'Create and share your favorite Remnant 2 builds with your friends and the community.',
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
    description: 'View and manage your favorited Remnant 2 builds.',
    href: '/profile/favorited-builds',
    icon: StarIcon,
  },
  featuredBuilds: {
    label: 'Featured Builds',
    description:
      'A curated list of unique and high-quality community submitted Remnant 2 builds.',
    href: '/featured-builds',
    icon: StarIcon,
  },
  hardcoreVeteran: {
    label: 'Hardcore Veteran Guide',
    description:
      'A guide on getting started with, and completing, your first hardcore veteran run.',
    href: '/guides/hardcore-veteran',
    icon: TableCellsIcon,
  },
  itemLookup: {
    label: 'Item Lookup',
    description:
      'A Remnant 2 item lookup tool to search for detailed item information, tags, and locations.',
    href: '/item-lookup',
    icon: MagnifyingGlassIcon,
  },
  itemQuiz: {
    label: 'Item Quiz',
    description:
      'Test your ability to recognize Remnant 2 items by only their icons! How many can you get in 60 seconds?',
    href: '/item-quiz',
    icon: PuzzlePieceIcon,
  },
  itemTracker: {
    label: 'Item Tracker',
    description:
      'A Remnant 2 item tracker to track which items you have collected, and the ones you still need to find.',
    href: '/tracker',
    icon: DocumentCheckIcon,
  },
  linkedBuilds: {
    label: 'Linked Builds',
    description:
      'Link multiple Remnant 2 builds together to share them as a single link. Great for alternate versions of the same build, coop builds meant to be played together, or budget alternatives!',
    href: '/profile/linked-builds',
    icon: LinkIcon,
  },
  loadouts: {
    label: 'Loadouts',
    description:
      'Keep your Remnant 2 in-game loadouts and their toolkit build counterparts in sync.',
    href: '/profile/loadout-builds',
    icon: ArchiveBoxIcon,
  },
  myBuilds: {
    label: 'My Builds',
    description: 'View and manage Remnant 2 builds you created.',
    href: '/profile/created-builds',
    icon: DocumentTextIcon,
  },
  profile: {
    label: 'Profile',
    description: 'View and manage your Remnant 2 Toolkit profile.',
    href: '/profile',
    icon: UserIcon,
  },
  resources: {
    label: 'Resources',
    description:
      'A collection of helpful tools, detailed guides, and third-party projects for Remnant 2.',
    href: '/resources',
    icon: QueueListIcon,
  },
  r2ag: {
    label: 'Remnant 2 Armor Generator',
    description:
      'Find the perfect armor set for your build with the Remnant 2 Armor Generator.',
    href: 'https://scouthunter.github.io/R2AG/',
    icon: CalculatorIcon,
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
  supportR2TK: {
    label: 'Support R2TK!',
    description:
      'Help with the costs of running the Toolkit and keeping it ad-free, plus get some small perks!',
    href: '/support-r2tk',
    icon: HeartIcon,
  },
  vashCalculator: {
    label: `Vash Cowaii's Loadout Calculator`,
    description:
      'An incredible tool for advanced build stats and calculations.',
    href: 'https://cowaii.io/index.html?s=s',
    icon: VashIcon,
  },
  wiki: {
    label: 'Wiki',
    description:
      'Definitive wiki for Remnant 2. Community driven, no ads or stream embeds.',
    href: 'https://remnant.wiki/',
    icon: WikiIcon,
  },
  worldSaveArchive: {
    label: 'World Save Archive',
    description: `A collection of curated Remnant 2 world saves for apocalypse bosses with specific affixes.`,
    href: '/world-save-archive',
    icon: ArchiveBoxArrowDownIcon,
  },
}
