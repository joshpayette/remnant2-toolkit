import React from 'react'

import { BaseButton } from '@/app/(components)/_base/button'

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
      <BaseButton
        color="cyan"
        className="mt-4 sm:hidden"
        onClick={onSkipCountdown}
      >
        Skip countdown
      </BaseButton>
      <p className="mt-2 hidden text-lg italic text-gray-200 sm:block">
        Press <span className="font-bold">Space</span> or{' '}
        <span className="font-bold">Enter</span> to skip.
      </p>
    </div>
  ),
)

StartingDisplay.displayName = 'StartingDisplay'
