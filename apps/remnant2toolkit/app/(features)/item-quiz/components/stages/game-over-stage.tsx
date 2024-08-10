import { BaseButton } from '@repo/ui/base/button'
import React from 'react'

import { Divider } from '@/app/(features)/item-quiz/components/divider'
import { Heading } from '@/app/(features)/item-quiz/components/heading'
import { MobileLayoutToggle } from '@/app/(features)/item-quiz/components/mobile-layout-toggle'
import { QuizItemButton } from '@/app/(features)/item-quiz/components/quiz-item-button'
import { TopScoresLeaderBoard } from '@/app/(features)/item-quiz/components/top-scores-leader-board'
import type { LayoutPreference } from '@/app/(features)/item-quiz/types/layout-preference'
import type { QuizItem } from '@/app/(features)/item-quiz/types/quiz-item'
import type { QuizQuestion } from '@/app/(features)/item-quiz/types/quiz-question'

interface Props {
  correctItem: QuizItem | undefined
  gameTimer: number
  history: QuizQuestion[]
  layoutPreference: LayoutPreference
  score: number
  onStartGame: () => void
  onToggleLayoutPreference: () => void
}

export const GameOverStage = React.memo(
  ({
    correctItem,
    gameTimer,
    history,
    layoutPreference,
    score,
    onToggleLayoutPreference,
    onStartGame,
  }: Props) => (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold text-red-500">
        {gameTimer <= 0 ? "Time's Up!" : 'Game Over!'}
      </h2>
      <div className="mb-8 flex flex-col items-center justify-center">
        <p className="mb-2 text-lg text-gray-200">
          Your final score is{' '}
          <span className="text-accent1-500 font-bold">{score}</span>
        </p>
        {gameTimer >= 0 ? (
          <p className="text-lg text-gray-200">
            The time remaining was{' '}
            <span className="text-accent1-500 font-bold">{gameTimer}</span>{' '}
            seconds
          </p>
        ) : null}
      </div>
      {gameTimer >= 0 ? (
        <>
          <Divider />
          <Heading>The correct answer was:</Heading>
          <p className="mb-2 text-lg font-bold text-gray-200">
            {correctItem?.name}
          </p>
          {correctItem ? (
            <div className="mb-8 flex flex-col items-center justify-center">
              <QuizItemButton item={correctItem} itemIndex={0} />
              <p className="text-md mt-2 max-w-md text-gray-200">
                {correctItem.description}
              </p>
            </div>
          ) : null}
        </>
      ) : null}

      {/** List the history of correct answers */}
      {history.length > 0 ? (
        <>
          <Divider />
          <div className="mb-8 flex w-full flex-col items-center justify-center">
            <Heading>Correct Answers</Heading>
            <ol className="text-md grid w-full list-decimal grid-cols-2 text-gray-200">
              {history.map((question, index) => (
                <li key={index} className="mb-2 ml-6">
                  {question.correctItem.name}
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : null}

      <Divider />
      <div className="flex w-full flex-col items-center justify-center bg-gray-900 p-4">
        <MobileLayoutToggle
          layoutPreference={layoutPreference}
          onToggleLayoutPreference={onToggleLayoutPreference}
        />
        <BaseButton color="cyan" onClick={onStartGame}>
          Play Again
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
)

GameOverStage.displayName = 'GameOverStage'
