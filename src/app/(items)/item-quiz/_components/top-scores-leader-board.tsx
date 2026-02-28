import { getLeaderBoard } from '@/app/(items)/item-quiz/_actions/get-leader-board';
import { LeaderBoard } from '@/ui/common/leader-board';

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
