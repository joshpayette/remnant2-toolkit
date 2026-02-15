import React from 'react'

interface Props {
  score: number
}

export const QuizScore = React.memo(({ score }: Props) => (
  <div
    id="score-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary-500 bg-secondary-900"
  >
    <div className="w-full bg-purple-700 text-center text-sm font-bold">
      Score
    </div>
    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-primary-400">
      {score}
    </div>
  </div>
))

QuizScore.displayName = 'QuizScore'
