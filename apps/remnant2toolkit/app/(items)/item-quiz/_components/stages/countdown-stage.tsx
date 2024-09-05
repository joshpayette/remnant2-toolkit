import { BaseButton } from '@repo/ui';
import React from 'react';

interface Props {
  countdownTimer: number;
  onSkipCountdown: () => void;
}

export const CountdownStage = React.memo(
  ({ countdownTimer, onSkipCountdown }: Props) => (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="text-primary-500 mb-2 text-2xl font-bold">
        Game Starting
      </h2>
      <p className="text-lg text-gray-200">
        Get ready! The game will start in{' '}
        <span className="text-accent1-500 font-bold">{countdownTimer + 1}</span>{' '}
        seconds
      </p>
      <BaseButton
        color="cyan"
        className="mt-4 sm:hidden"
        onClick={onSkipCountdown}
      >
        Skip countdown
      </BaseButton>
      <p className="text-md text-accent1-400 mt-2 hidden sm:block">
        Press <span className="font-bold">Space</span> or{' '}
        <span className="font-bold">Enter</span> to skip.
      </p>
    </div>
  ),
);

CountdownStage.displayName = 'CountdownStage';
