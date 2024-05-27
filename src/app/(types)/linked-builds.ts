import type { DBBuild } from '@/app/(types)/builds'

export interface LinkedBuildState {
  id: string
  createdById: string
  createdByDisplayName: string
  createdAt: Date
  name: string
  description: string | null
  linkedBuildItems: Array<{
    id: string
    label: string
    build: DBBuild
  }>
}
