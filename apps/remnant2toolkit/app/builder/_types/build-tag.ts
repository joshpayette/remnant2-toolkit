import { type BUILD_TAG } from '@repo/db';

export type BuildTag = {
  label: string;
  value: BUILD_TAG;
  colors: {
    bg: string;
    hover: string;
    text: string;
  };
};
