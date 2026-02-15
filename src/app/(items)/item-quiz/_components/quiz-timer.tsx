import React from 'react'

interface Props {
  gameTimer: number
  isPlaying: boolean
}

export const QuizTimer = React.memo(({ isPlaying, gameTimer }: Props) => (
  <div
    id="timer-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary-500 bg-secondary-900"
  >
    <div className="w-full bg-purple-700 text-center text-sm font-bold">
      Timer
    </div>
    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-accent1-400">
      {isPlaying ? gameTimer : '-'}
    </div>
  </div>
))

QuizTimer.displayName = 'QuizTimer'
