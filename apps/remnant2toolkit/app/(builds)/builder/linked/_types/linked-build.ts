import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export interface LinkedBuild {
  id: string;
  createdById: string;
  createdByDisplayName: string;
  createdAt: Date;
  name: string;
  description: string | null;
  isModeratorLocked: boolean;
  linkedBuilds: LinkedBuildItem[];
}
