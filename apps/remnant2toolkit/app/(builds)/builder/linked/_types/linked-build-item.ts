import { type BuildState } from '@/app/(builds)/_types/build-state';

export type LinkedBuildItem = {
  label: string;
  build: BuildState;
};
