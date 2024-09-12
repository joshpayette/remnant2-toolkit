import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export interface LinkedBuild {
  id: string | null;
  name: string | null;
  description: string | null;
  isModeratorLocked: boolean;
  linkedBuilds: LinkedBuildItem[];
}
