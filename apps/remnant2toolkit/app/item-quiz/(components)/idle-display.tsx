import { BaseButton } from '@repo/ui/base/button'
import React from 'react'

import { MobileLayoutToggle } from '@/app/item-quiz/(components)/mobile-layout-toggle'
import { LayoutPreference } from '@/app/item-quiz/types'

interface Props {
  topScore: number
  showTopScore: boolean
  layoutPreference: LayoutPreference
  onToggleLayoutPreference: () => void
  onStartGame: () => void
}

export const IdleDisplay = React.memo(
  ({
    layoutPreference,
    topScore,
    showTopScore,
    onStartGame,
    onToggleLayoutPreference,
  }: Props) => (
    <div className="flex flex-col items-center justify-center">
      {showTopScore ? (
        <div className="mb-4 flex flex-col items-center justify-center">
          <h2 className="text-accent1-500 text-xl font-bold">Top Score</h2>
          <p className="mb-2 text-left text-4xl text-gray-200">{topScore}</p>
        </div>
      ) : null}
      <div className="mb-12 text-center">
        <h2 className="text-primary-500 text-xl font-bold">Rules</h2>
        <p className="text-md mb-2 text-left text-gray-200">
          You will be shown four items and an item name. You must select the
          item that matches the name. The game ends when the timer runs out or
          you get a question wrong. You can use the arrow keys, WASD keys, or
          number keys.
        </p>
      </div>
      <MobileLayoutToggle
        layoutPreference={layoutPreference}
        onToggleLayoutPreference={onToggleLayoutPreference}
      />
      <BaseButton color="cyan" onClick={onStartGame}>
        Start Game
      </BaseButton>
      <p className="text-md mt-2 hidden italic text-gray-200 sm:block">
        Press <span className="font-bold">Space</span> or{' '}
        <span className="font-bold">Enter</span> to start.
      </p>
    </div>
  ),
)

IdleDisplay.displayName = 'IdleDisplay'
