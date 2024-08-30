import { type DBBuild } from '@/app/(builds)/_types/db-build';

export interface LinkedBuildItem {
  id: string;
  label: string;
  build: DBBuild;
}

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
