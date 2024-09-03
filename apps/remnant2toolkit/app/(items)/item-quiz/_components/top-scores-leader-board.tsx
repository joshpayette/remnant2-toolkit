import { LeaderBoard } from '@repo/ui';

import { getLeaderBoard } from '@/app/(items)/item-quiz/_actions/get-leader-board';

export function TopScoresLeaderBoard() {
  return (
    <LeaderBoard
      headerLink="/item-quiz"
      fetchAction={getLeaderBoard}
      itemCount={20}
      title="Leaderboard"
    />
  );
}
