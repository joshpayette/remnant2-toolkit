import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { TOTAL_CHOICES } from '@/app/item-quiz/constants'
import { QuizItem } from '@/app/item-quiz/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

interface Props {
  questionsForUI: QuizItem[]
  correctItemName: string
  onAnswerQuestion: (id: string) => void
}

export const PlayingDisplay = React.memo(
  ({ correctItemName, questionsForUI, onAnswerQuestion }: Props) => (
    <>
      <div
        id="item-name-container"
        className="mb-8 flex flex-col items-center justify-center"
      >
        <h3 className="text-xl font-bold text-primary-500">Item to Find:</h3>
        <p className="text-lg text-gray-200">{correctItemName}</p>
      </div>

      {/** Mobile Grid */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {getArrayOfLength(TOTAL_CHOICES).map((_, index) => {
          return (
            <QuizItemButton
              key={uuidv4()}
              item={questionsForUI[index]}
              itemIndex={index}
              onClick={() => onAnswerQuestion(questionsForUI[index].id)}
            />
          )
        })}
      </div>

      {/** Desktop grid */}
      <div
        id="quiz-choice-grid"
        className="hidden sm:grid sm:grid-cols-3 sm:gap-4"
      >
        {/** Left arrow or 3 Key */}
        <div className="col-span-1 flex w-full items-center justify-center">
          <QuizItemButton
            item={questionsForUI[3]}
            itemIndex={3}
            onClick={() => onAnswerQuestion(questionsForUI[3].id)}
          />
        </div>
        {/** Up arrow or 1 key */}
        <div className="col-span-1 flex flex-col items-center justify-center gap-y-4">
          <QuizItemButton
            item={questionsForUI[0]}
            itemIndex={0}
            onClick={() => onAnswerQuestion(questionsForUI[0].id)}
          />
          {/** Down arrow or 3 key */}
          <QuizItemButton
            item={questionsForUI[2]}
            itemIndex={2}
            onClick={() => onAnswerQuestion(questionsForUI[2].id)}
          />
        </div>
        {/** Right arrow or 2 key */}

        <div className="col-span-1 flex w-full items-center justify-center">
          <QuizItemButton
            item={questionsForUI[1]}
            itemIndex={1}
            onClick={() => onAnswerQuestion(questionsForUI[1].id)}
          />
        </div>
      </div>
    </>
  ),
)

PlayingDisplay.displayName = 'PlayingDisplay'
