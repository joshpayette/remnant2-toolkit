import { LeaderBoard } from '@repo/ui/leader-board/components'

import { getLeaderBoard } from '@/app/(features)/item-quiz/actions/get-leader-board'

export function TopScoresLeaderBoard() {
  return (
    <LeaderBoard
      fetchAction={getLeaderBoard}
      itemCount={20}
      title="Leaderboard"
    />
  )
}
