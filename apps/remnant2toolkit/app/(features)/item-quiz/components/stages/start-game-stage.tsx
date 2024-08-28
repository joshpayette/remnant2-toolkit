import { BaseButton } from '@repo/ui';
import React from 'react';

import { Divider } from '@/app/(features)/item-quiz/components/divider';
import { Heading } from '@/app/(features)/item-quiz/components/heading';
import { MobileLayoutToggle } from '@/app/(features)/item-quiz/components/mobile-layout-toggle';
import { TopScoresLeaderBoard } from '@/app/(features)/item-quiz/components/top-scores-leader-board';
import type { LayoutPreference } from '@/app/(features)/item-quiz/types/layout-preference';

interface Props {
  topScore: number;
  showTopScore: boolean;
  layoutPreference: LayoutPreference;
  onToggleLayoutPreference: () => void;
  onStartGame: () => void;
}

export const StartGameStage = React.memo(
  ({
    layoutPreference,
    topScore,
    showTopScore,
    onStartGame,
    onToggleLayoutPreference,
  }: Props) => (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <Heading>Rules</Heading>
        <p className="text-md max-w-lg text-left text-gray-200">
          You will be shown four items and an item name. You must select the
          item that matches the name. The game ends when the timer runs out or
          you get a question wrong. You can use the arrow keys, WASD keys, or
          number keys.
        </p>
      </div>
      <Divider />
      <div className="flex w-full flex-col items-center justify-center bg-gray-900 p-4">
        {showTopScore ? (
          <div className="mb-8 flex flex-col items-center justify-center">
            <Heading>Your Top Score</Heading>
            <p className="text-left text-4xl text-gray-200">{topScore}</p>
          </div>
        ) : null}
        <MobileLayoutToggle
          layoutPreference={layoutPreference}
          onToggleLayoutPreference={onToggleLayoutPreference}
        />
        <BaseButton color="cyan" onClick={onStartGame}>
          Start Game
        </BaseButton>
        <p className="text-md text-accent1-400 mt-2 hidden sm:block">
          Press <span className="font-bold">Space</span> or{' '}
          <span className="font-bold">Enter</span> to start.
        </p>
      </div>
      <div className="mt-12 w-full">
        <Divider />
        <TopScoresLeaderBoard />
      </div>
    </div>
  ),
);

StartGameStage.displayName = 'StartGameStage';
