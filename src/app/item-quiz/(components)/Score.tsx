import React from 'react'

interface Props {
  score: number
}

export const Score = React.memo(({ score }: Props) => (
  <div
    id="score-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary bg-secondary-container"
  >
    <div className="w-full bg-on-secondary-container text-center text-sm text-on-background font-bold">
      Score
    </div>
    <div className="flex h-full w-full items-center justify-center text-primary text-2xl font-bold">
      {score}
    </div>
  </div>
))

Score.displayName = 'Score'
