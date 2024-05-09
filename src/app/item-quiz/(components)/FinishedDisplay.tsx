import React from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { MobileLayoutToggle } from '@/app/item-quiz/(components)/MobileLayoutToggle'
import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { LayoutPreference, QuizItem, QuizQuestion } from '@/app/item-quiz/types'

interface Props {
  correctItem: QuizItem | undefined
  gameTimer: number
  history: QuizQuestion[]
  layoutPreference: LayoutPreference
  score: number
  onStartGame: () => void
  onToggleLayoutPreference: () => void
}

export const FinishedDisplay = React.memo(
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
        <p className="mb-2 text-lg text-on-background">
          Your final score is{' '}
          <span className="font-bold text-highlight">{score}</span>
        </p>
        {gameTimer >= 0 ? (
          <p className="text-lg text-on-background">
            The time remaining was{' '}
            <span className="font-bold text-highlight">{gameTimer}</span>{' '}
            seconds
          </p>
        ) : null}
      </div>
      {gameTimer >= 0 ? (
        <>
          <hr className="mb-8 w-full border border-secondary" />
          <h3 className="mb-2 text-xl text-primary font-bold">
            The correct answer was:
          </h3>
          <p className="mb-2 text-lg font-bold text-on-background">
            {correctItem?.name}
          </p>
          {correctItem ? (
            <div className="mb-8 flex flex-col items-center justify-center">
              <QuizItemButton item={correctItem} itemIndex={0} />
              <p className="text-md mt-2 max-w-md text-on-background">
                {correctItem.description}
              </p>
            </div>
          ) : null}
        </>
      ) : null}

      {/** List the history of correct answers */}
      {history.length > 0 ? (
        <>
          <hr className="mb-8 w-full border border-primary" />
          <div className="mb-8 flex w-full flex-col items-center justify-center">
            <h3 className="mb-2 text-xl font-bold">
              Correct Answers
            </h3>
            <ol className="text-md grid w-full list-decimal grid-cols-2 text-on-background">
              {history.map((question, index) => (
                <li key={index} className="mb-2 ml-6">
                  {question.correctItem.name}
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : null}

      <hr className="mb-8 w-full border border-primary" />
      <div className="flex w-full flex-col items-center justify-center bg-background-blend p-4">
        <MobileLayoutToggle
          layoutPreference={layoutPreference}
          onToggleLayoutPreference={onToggleLayoutPreference}
        />
        <BaseButton color="cyan" onClick={onStartGame}>
          Play Again
        </BaseButton>
        <p className="text-md mt-2 hidden italic text-on-background sm:block">
          Press <span className="font-bold">Space</span> or{' '}
          <span className="font-bold">Enter</span> to start.
        </p>
      </div>
    </div>
  ),
)

FinishedDisplay.displayName = 'FinishedDisplay'
