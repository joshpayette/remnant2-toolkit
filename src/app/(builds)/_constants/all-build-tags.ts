import { type BuildTag } from '@/app/(builds)/_types/build-tag';

export const ALL_BUILD_TAGS: BuildTag[] = [
  {
    label: 'Base Game',
    value: 'BaseGame',
    category: 'Type',
    // TODO
    colors: {
      bg: 'bg-blue-400/10',
      hover: 'hover:bg-blue-400/20',
      text: 'text-blue-600 dark:text-blue-500',
    },
  },
  {
    label: 'Beginner',
    value: 'Beginner',
    category: 'Type',
    // TODO
    colors: {
      bg: 'bg-accent2-400/10',
      hover: 'hover:bg-accent2-400/20',
      text: 'text-accent2-500',
    },
  },
  {
    label: 'Boss Rush',
    value: 'BossRush',
    category: 'Type',
    // TODO
    colors: {
      bg: 'bg-accent3-400/10',
      hover: 'hover:bg-accent3-400/20',
      text: 'text-accent3-500',
    },
  },
  {
    label: 'Gimmick',
    value: 'Gimmick',
    category: 'Type',
    // TODO
    colors: {
      bg: 'bg-yellow-400/10',
      hover: 'hover:bg-yellow-400/20',
      text: 'text-yellow-700 dark:text-yellow-500',
    },
  },
  {
    label: 'Easy to play',
    value: 'EasyToPlay',
    category: 'Tag',
    // TODO
    colors: {
      bg: 'bg-accent2-400/10',
      hover: 'hover:bg-accent2-400/20',
      text: 'text-accent2-500',
    },
  },
  {
    label: 'Melee',
    value: 'Melee',
    category: 'Tag',
    colors: {
      bg: 'bg-yellow-400/10',
      hover: 'hover:bg-yellow-400/20',
      text: 'text-yellow-700 dark:text-yellow-500',
    },
  },
  {
    label: 'Mods',
    value: 'Mods',
    category: 'Tag',
    colors: {
      bg: 'bg-blue-400/10',
      hover: 'hover:bg-blue-400/20',
      text: 'text-blue-600 dark:text-blue-500',
    },
  },
  {
    label: 'Ranged',
    value: 'Ranged',
    category: 'Tag',
    colors: {
      bg: 'bg-accent2-400/10',
      hover: 'hover:bg-accent2-400/20',
      text: 'text-accent2-500',
    },
  },
  {
    label: 'Skills',
    value: 'Skills',
    category: 'Tag',
    colors: {
      bg: 'bg-indigo-400/10',
      hover: 'hover:bg-indigo-400/20',
      text: 'text-indigo-600 dark:text-indigo-500',
    },
  },
  {
    label: 'Status Effects',
    value: 'StatusEffects',
    category: 'Tag',
    colors: {
      bg: 'bg-purple-400/10',
      hover: 'hover:bg-purple-400/20',
      text: 'text-purple-600 dark:text-purple-400',
    },
  },
  {
    label: 'Support',
    value: 'Support',
    category: 'Tag',
    colors: {
      bg: 'bg-pink-400/10',
      hover: 'hover:bg-pink-400/20',
      text: 'text-pink-700 dark:text-pink-500',
    },
  },
  {
    label: 'Tank',
    value: 'Tank',
    category: 'Tag',
    colors: {
      bg: 'bg-accent3-400/10',
      hover: 'hover:bg-accent3-400/20',
      text: 'text-accent3-500',
    },
  },
];
