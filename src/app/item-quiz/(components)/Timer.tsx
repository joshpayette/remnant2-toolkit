import React from 'react'

interface Props {
  gameTimer: number
  isPlaying: boolean
}

export const Timer = React.memo(({ isPlaying, gameTimer }: Props) => (
  <div
    id="timer-container"
    className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-tertiary bg-tertiary-container"
  >
    <div className="w-full bg-on-tertiary-container text-center text-sm text-tertiary-container font-bold">
      Timer
    </div>
    <div className="flex h-full w-full items-center justify-center text-2xl font-bold">
      {isPlaying ? gameTimer : '-'}
    </div>
  </div>
))

Timer.displayName = 'Timer'
