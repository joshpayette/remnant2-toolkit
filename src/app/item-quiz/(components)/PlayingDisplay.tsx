import React from 'react'

import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { TOTAL_CHOICES } from '@/app/item-quiz/constants'
import { LayoutPreference, QuizItem } from '@/app/item-quiz/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { cn } from '@/lib/classnames'

interface Props {
  correctItemName: string
  layoutPreference: LayoutPreference
  questionsForUI: QuizItem[]
  onAnswerQuestion: (id: string) => void
}

export const PlayingDisplay = React.memo(
  ({
    correctItemName,
    layoutPreference,
    questionsForUI,
    onAnswerQuestion,
  }: Props) => (
    <>
      <div
        id="item-name-container"
        className="mb-8 flex flex-col items-center justify-center"
      >
        <h3 className="text-xl text-primary font-bold">Item to Find:</h3>
        <p className="text-lg text-on-background">{correctItemName}</p>
      </div>

      {/** Mobile Grid */}
      <div
        className={cn(
          'grid grid-cols-2 gap-4',
          layoutPreference === 'desktop' && 'sm:hidden',
        )}
      >
        {getArrayOfLength(TOTAL_CHOICES).map((_, index) => {
          let cssOrder: string | undefined = undefined
          if (layoutPreference === 'mobile') {
            switch (index) {
              case 0:
                cssOrder = 'order-1'
                break
              case 1:
                cssOrder = 'order-3'
                break
              case 2:
                cssOrder = 'order-4'
                break
              case 3:
                cssOrder = 'order-2'
                break
            }
          }

          return (
            <div key={questionsForUI[index].id} className={cn(cssOrder)}>
              <QuizItemButton
                item={questionsForUI[index]}
                itemIndex={index}
                onClick={() => onAnswerQuestion(questionsForUI[index].id)}
              />
            </div>
          )
        })}
      </div>

      {/** Desktop grid */}
      <div
        id="quiz-choice-grid"
        className={cn(
          'hidden sm:grid sm:grid-cols-3 sm:gap-4',
          layoutPreference === 'mobile' && 'sm:hidden',
        )}
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
