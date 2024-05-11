import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  BookOpenIcon,
  CalculatorIcon,
  CircleStackIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  HeartIcon,
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

export const DISCORD_INVITE_URL = 'https://discord.gg/kgVaU3zAQ7'

/**
 * The base pages for the site
 */
export const NAV_ITEMS = {
  beginnerBuilds: {
    label: 'Beginner Builds',
    description:
      'A curated list of builds, intended as an item checklist for farming in the earlier hours of gameplay.',
    href: '/beginner-builds',
    icon: SparklesIcon,
  },
  bossTracker: {
    label: 'Boss Tracker',
    description:
      'Helps you keep track of the bosses you have defeated and the ones you still need to defeat.',
    href: '/boss-tracker',
    icon: ShieldCheckIcon,
  },
  changeLog: {
    label: 'Change Log',
    description:
      'A running log of all additions, changes, and fixes to the toolkit.',
    href: 'https://github.com/joshpayette/remnant2-toolkit/blob/main/CHANGELOG.md',
    icon: BookOpenIcon,
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
      'Search a collection of builds submitted and ranked by the community.',
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
    description:
      'A curated list of unique and high-quality community submitted builds.',
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
    description: 'Get detailed information and interactions for items.',
    href: '/item-lookup',
    icon: MagnifyingGlassIcon,
  },
  itemQuiz: {
    label: 'Item Quiz',
    description:
      'Test your ability to recognize items by only their icons! How many can you get in 60 seconds?',
    href: '/item-quiz',
    icon: PuzzlePieceIcon,
  },
  itemTracker: {
    label: 'Item Tracker',
    description:
      'Track your discovered and undiscovered items. Supports save file importing!',
    href: '/tracker',
    icon: DocumentCheckIcon,
  },
  loadouts: {
    label: 'Loadouts',
    description:
      'Keep your in-game loadouts and their toolkit build counterparts in sync.',
    href: '/profile/loadout-builds',
    icon: ArchiveBoxIcon,
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
    icon: '/toolkit/vash-icon.png',
  },
  wiki: {
    label: 'Wiki',
    description:
      'Definitive wiki for Remnant 2. Community driven, no ads or stream embeds.',
    href: 'https://remnant.wiki/',
    icon: '/wiki-icon.png',
  },
  worldSaveArchive: {
    label: 'World Save Archive',
    description: `A collection of curated world saves for apocalypse bosses with specific affixes.`,
    href: '/world-save-archive',
    icon: ArchiveBoxArrowDownIcon,
  },
}
