import { useState } from 'react'

import { DEFAULT_ITEMS_PER_PAGE } from '@/features/pagination/constants'

import { getArrayOfLength } from '../lib/getArrayOfLength'
import { DBBuild } from '../types'

interface State {
  builds: DBBuild[]
  totalBuildCount: number
  isLoading: boolean
}

const DEFAULT_STATE: State = {
  builds: getArrayOfLength(DEFAULT_ITEMS_PER_PAGE).map((item) => ({
    id: `placeholder-${item}`,
    name: '',
    description: '',
    imageUrl: '',
    buildUrl: '',
    isFeaturedBuild: false,
    dateFeatured: new Date(),
    isPatchAffected: false,
    isPublic: true,
    isMember: false,
    thumbnailUrl: '',
    buildTags: [],
    videoUrl: '',
    buildLink: '',
    createdById: '',
    createdByName: '',
    createdByDisplayName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    reported: false,
    upvoted: false,
    totalUpvotes: 0,
    buildItems: [],
  })),
  totalBuildCount: 0,
  isLoading: true,
}

export function useBuildListState() {
  const [buildListState, setBuildListState] = useState<State>(DEFAULT_STATE)
  return { buildListState, setBuildListState }
}
