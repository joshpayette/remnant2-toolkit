import { DBBuild } from '@/app/(features)/builds/types/db-build'

export type CommunityBuildQueryResponse = Array<
  DBBuild & {
    createdByDisplayName: string
    createdByName: string
    displayName: string
    name: string
    isMember: boolean
    reported: boolean
    totalUpvotes: number
    totalReports: number
    upvoted: boolean
    validatedViews: number
  }
>
