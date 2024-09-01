import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export interface LinkedBuildState {
  id: string;
  createdById: string;
  createdByDisplayName: string;
  createdAt: Date;
  name: string;
  description: string | null;
  isModeratorLocked: boolean;
  linkedBuildItems: LinkedBuildItem[];
}
