import React from 'react'

interface Props {
  countdownTimer: number
  onSkipCountdown: () => void
}

export const StartingDisplay = React.memo(
  ({ countdownTimer, onSkipCountdown }: Props) => (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold text-primary-500">
        Game Starting
      </h2>
      <p className="text-lg text-gray-200">
        Get ready! The game will start in{' '}
        <span className="font-bold text-accent1-500">{countdownTimer + 1}</span>{' '}
        seconds
      </p>
      <button
        className="mt-4 rounded-md border-2 border-primary-500 bg-primary-700 p-2 text-white hover:bg-primary-500 sm:hidden"
        onClick={onSkipCountdown}
      >
        Skip countdown
      </button>
      <p className="mt-2 hidden text-lg italic text-gray-200 sm:block">
        Press <span className="font-bold">Space</span> or{' '}
        <span className="font-bold">Enter</span> to skip.
      </p>
    </div>
  ),
)

StartingDisplay.displayName = 'StartingDisplay'
