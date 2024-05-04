import React from 'react'

interface Props {
  score: number
}

export const Score = React.memo(({ score }: Props) => (
  <div
    id="score-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-primary bg-primary-container"
  >
    <div className="w-full bg-on-primary-container text-center text-sm text-primary-container font-bold">
      Score
    </div>
    <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
      {score}
    </div>
  </div>
))

Score.displayName = 'Score'
