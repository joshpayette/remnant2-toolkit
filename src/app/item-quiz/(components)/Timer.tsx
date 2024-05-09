import React from 'react'

interface Props {
  gameTimer: number
  isPlaying: boolean
}

export const Timer = React.memo(({ isPlaying, gameTimer }: Props) => (
  <div
    id="timer-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary bg-secondary-container"
  >
    <div className="w-full bg-secondary text-center text-sm text-on-background font-bold">
      Timer
    </div>
    <div className="flex h-full w-full items-center justify-center text-highlight text-2xl font-bold">
      {isPlaying ? gameTimer : '-'}
    </div>
  </div>
))

Timer.displayName = 'Timer'
