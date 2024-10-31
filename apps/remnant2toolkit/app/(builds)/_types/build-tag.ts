import { type BUILD_TAG } from '@repo/db';

export type BuildTag = {
  label: string;
  value: BUILD_TAG;
  category: 'Type' | 'Tag';
  colors: {
    bg: string;
    hover: string;
    text: string;
  };
};
