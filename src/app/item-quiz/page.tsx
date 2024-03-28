'use client'

import { createAction, createReducer } from '@reduxjs/toolkit'
import Image from 'next/image'
import { useEffect, useReducer, useRef } from 'react'

import { getQuestion } from '@/app/item-quiz/(lib)/getQuestion'
import { GAME_DURATION, TOTAL_CHOICES } from '@/app/item-quiz/constants'
import { QuizQuestion } from '@/app/item-quiz/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

interface GameState {
  score: number
  currentQuestion: QuizQuestion | null
  history: QuizQuestion[]
  timer: number
  status: 'idle' | 'playing' | 'finished'
}

const startGame = createAction('game/start')
const endGame = createAction('game/end')
const tick = createAction('game/tick')
const answerQuestion = createAction<QuizQuestion>('game/answer')
const newQuestion = createAction('game/newQuestion')

const initialState = {
  score: 0,
  currentQuestion: null,
  history: [],
  timer: 0,
  status: 'idle',
} satisfies GameState as GameState

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(startGame, (state) => {
      state.currentQuestion = getQuestion(state.history)
      state.status = 'playing'
      state.timer = GAME_DURATION
      state.score = 0
      state.history = []
    })
    .addCase(endGame, (state) => {
      state.status = 'finished'
    })
    .addCase(tick, (state) => {
      state.timer--
    })
    .addCase(answerQuestion, (state, action) => {
      state.history.push({
        correctItem: action.payload.correctItem,
        wrongItems: action.payload.wrongItems,
      })
      state.score++
    })
    .addCase(newQuestion, (state) => {
      state.currentQuestion = getQuestion(state.history)
    })
})

export default function Page() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const containerRef = useRef<HTMLDivElement>(null)

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (state.status !== 'playing') return
      if (state.timer === 0) {
        dispatch(endGame())
      } else {
        dispatch(tick())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [state.status, state.timer])

  return (
    <div
      className="flex w-full max-w-lg flex-col items-center justify-center"
      ref={containerRef}
    >
      {state.status === 'idle' ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-primary-500">Rules</h2>
            <p className="mb-2 text-lg text-gray-200">
              You will be shown four items and an item name. You must select the
              item that matches the name. The game ends when the timer runs out
              or you get a question wrong.
            </p>
            <hr className="mb-4 mt-4 w-full border border-primary-500" />
            <p className="text-lg italic text-gray-200">
              Note: I threw this together in a few hours for fun and as a
              learning excercise! I may add more features or allow you to save
              results to your profile in the future. Enjoy!
            </p>
          </div>
          <button
            className="rounded-md border-2 border-primary-500 bg-primary-700 p-2 text-lg hover:bg-primary-500"
            onClick={() => dispatch(startGame())}
          >
            Start Game
          </button>
        </div>
      ) : null}

      {state.status === 'playing' ? (
        <div
          id="playing-container"
          className="flex flex-col items-center justify-center"
        >
          <div id="top-container" className="flex items-center justify-between">
            <div
              id="timer-container"
              className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary-500 bg-secondary-900"
            >
              <div className="w-full bg-purple-700 text-center text-sm font-bold">
                Timer
              </div>
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-accent1-400">
                {state.status === 'playing' ? state.timer : '-'}
              </div>
            </div>
            <div
              id="score-container"
              className="mb-8 flex h-[75px] w-[75px] flex-col items-center justify-start border border-secondary-500 bg-secondary-900"
            >
              <div className="w-full bg-purple-700 text-center text-sm font-bold">
                Score
              </div>
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-cyan-400">
                {state.score}
              </div>
            </div>
          </div>
          <div
            id="item-name-container"
            className="mb-8 flex flex-col items-center justify-center"
          >
            <h3 className="text-xl font-bold text-primary-500">
              Item to Find:
            </h3>
            <p className="text-lg text-gray-200">
              {state.currentQuestion?.correctItem.name}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {getArrayOfLength(TOTAL_CHOICES).map((_, index) => {
              if (!state.currentQuestion) {
                throw new Error('No current question found!')
              }

              const item =
                index === state.currentQuestion?.correctItem.position - 1
                  ? state.currentQuestion?.correctItem
                  : state.currentQuestion?.wrongItems[index]

              return (
                <button
                  key={item.id}
                  className="flex h-[150px] max-h-[150px] w-[150px] max-w-[150px] flex-col items-center justify-center overflow-hidden border border-secondary-500 bg-secondary-900 p-2 text-lg hover:bg-secondary-700"
                  onClick={() => {
                    // If this is the current question's correct item, answer the question
                    // and get a new question
                    if (item.id === state.currentQuestion?.correctItem.id) {
                      dispatch(answerQuestion(state.currentQuestion!))
                      dispatch(newQuestion())
                      return
                    }
                    // Otherwise, end the game
                    dispatch(endGame())
                  }}
                >
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
                    width={150}
                    height={150}
                    alt={`Item Selection #${index + 1}`}
                  />
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {state.status === 'finished' ? (
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            {state.timer <= 0 ? "Time's Up!" : 'Game Over!'}
          </h2>
          <div className="mb-8 flex flex-col items-center justify-center">
            <p className="mb-2 text-lg text-gray-200">
              Your final score is{' '}
              <span className="font-bold text-accent1-500">{state.score}</span>
            </p>
            {state.timer >= 0 ? (
              <p className="text-lg text-gray-200">
                The time remaining was{' '}
                <span className="font-bold text-accent1-500">
                  {state.timer}
                </span>{' '}
                seconds
              </p>
            ) : null}
          </div>
          {state.timer >= 0 ? (
            <>
              <hr className="mb-8 w-full border border-primary-500" />
              <h3 className="mb-2 text-xl font-bold text-primary-500">
                The correct answer was:
              </h3>
              <p className="mb-2 text-lg text-gray-200">
                {state.currentQuestion?.correctItem.name}
              </p>
              <div className="mb-8 flex h-[150px] max-h-[150px] w-[150px] max-w-[150px] flex-col items-center justify-center overflow-hidden border border-secondary-500 bg-secondary-900 p-2 text-lg hover:bg-secondary-700">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${state.currentQuestion?.correctItem.imagePath}`}
                  width={150}
                  height={150}
                  alt={`Image of the correct item, ${state.currentQuestion?.correctItem.name}`}
                />
              </div>
            </>
          ) : null}

          {/** List the history of correct answers */}
          {state.history.length > 0 ? (
            <>
              <hr className="mb-8 w-full border border-primary-500" />
              <div className="mb-8 flex w-full flex-col items-center justify-center">
                <h3 className="mb-2 text-xl font-bold text-primary-500">
                  Correct Answers
                </h3>
                <ol className="text-md grid w-full list-decimal grid-cols-2 text-gray-200">
                  {state.history.map((question, index) => (
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
            onClick={() => {
              // Scroll to the containerRef
              containerRef.current?.scrollIntoView({ behavior: 'instant' })
              dispatch(startGame())
            }}
          >
            Play Again
          </button>
        </div>
      ) : null}
    </div>
  )
}
