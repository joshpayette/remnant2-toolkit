import { LeaderBoard } from '@repo/ui';

import { getLeaderBoard } from '@/app/(features)/item-quiz/actions/get-leader-board';

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
