import React from 'react'

import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { QuizItem, QuizQuestion } from '@/app/item-quiz/types'

interface Props {
  correctItem: QuizItem | undefined
  gameTimer: number
  history: QuizQuestion[]
  score: number
  onStartGame: () => void
}

export const FinishedDisplay = React.memo(
  ({ correctItem, gameTimer, onStartGame, history, score }: Props) => (
    <div className="flex w-full flex-col items-center justify-center">
      <h2 className="mb-2 text-2xl font-bold text-red-500">
        {gameTimer <= 0 ? "Time's Up!" : 'Game Over!'}
      </h2>
      <div className="mb-8 flex flex-col items-center justify-center">
        <p className="mb-2 text-lg text-gray-200">
          Your final score is{' '}
          <span className="font-bold text-accent1-500">{score}</span>
        </p>
        {gameTimer >= 0 ? (
          <p className="text-lg text-gray-200">
            The time remaining was{' '}
            <span className="font-bold text-accent1-500">{gameTimer}</span>{' '}
            seconds
          </p>
        ) : null}
      </div>
      {gameTimer >= 0 ? (
        <>
          <hr className="mb-8 w-full border border-primary-500" />
          <h3 className="mb-2 text-xl font-bold text-primary-500">
            The correct answer was:
          </h3>
          <p className="mb-2 text-lg text-gray-200">{correctItem?.name}</p>
          {correctItem ? (
            <div className="mb-8">
              <QuizItemButton item={correctItem} itemIndex={0} />
            </div>
          ) : null}
        </>
      ) : null}

      {/** List the history of correct answers */}
      {history.length > 0 ? (
        <>
          <hr className="mb-8 w-full border border-primary-500" />
          <div className="mb-8 flex w-full flex-col items-center justify-center">
            <h3 className="mb-2 text-xl font-bold text-primary-500">
              Correct Answers
            </h3>
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
      <hr className="mb-8 w-full border border-primary-500" />
      <button
        className="rounded-md border-2 border-primary-500 bg-primary-700 p-2 text-lg hover:bg-primary-500"
        onClick={onStartGame}
      >
        Play Again
      </button>
      <p className="text-md mt-2 hidden italic text-gray-200 sm:block">
        Press <span className="font-bold">Space</span> or{' '}
        <span className="font-bold">Enter</span> to start.
      </p>
    </div>
  ),
)

FinishedDisplay.displayName = 'FinishedDisplay'
