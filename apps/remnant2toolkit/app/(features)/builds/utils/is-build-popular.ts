import {
  POPULAR_VOTE_THRESHOLD1,
  POPULAR_VOTE_THRESHOLD2,
} from '@/app/(features)/builds/constants/popular-vote-thresholds'

export function isBuildPopular(totalUpvotes: number): {
  isPopular: boolean
  popularLevel: 1 | 2
} {
  const isPopular = totalUpvotes >= POPULAR_VOTE_THRESHOLD1

  let popularLevel: 1 | 2 = 1
  if (totalUpvotes >= POPULAR_VOTE_THRESHOLD2) {
    popularLevel = 2
  }

  return { isPopular, popularLevel }
}
