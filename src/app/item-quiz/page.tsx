'use client'

import { createAction, createReducer } from '@reduxjs/toolkit'
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { getQuestion } from '@/app/item-quiz/(lib)/getQuestion'
import {
  ARROW_TO_INDEX,
  COUNTDOWN_DURATION,
  GAME_DURATION,
  KEY_TO_ARROW,
  TOTAL_CHOICES,
} from '@/app/item-quiz/constants'
import { QuizItem, QuizQuestion } from '@/app/item-quiz/types'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'

interface GameState {
  countdownTimer: number
  currentQuestion: QuizQuestion | null
  gameTimer: number
  history: QuizQuestion[]
  score: number
  status: 'idle' | 'starting' | 'playing' | 'finished'
}

const initializeGame = createAction('game/init')
const startGame = createAction('game/start')
const endGame = createAction('game/end')
const tickGameTimer = createAction('game/tickGameTimer')
const tickCountdownTimer = createAction('game/tickCountdownTimer')
const answerQuestion = createAction<QuizQuestion>('game/answer')
const newQuestion = createAction('game/newQuestion')

const initialState = {
  countdownTimer: COUNTDOWN_DURATION,
  currentQuestion: null,
  gameTimer: 0,
  history: [],
  score: 0,
  status: 'idle',
} satisfies GameState as GameState

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initializeGame, (state) => {
      state.currentQuestion = getQuestion(state.history)
      state.countdownTimer = COUNTDOWN_DURATION
      state.gameTimer = GAME_DURATION
      state.score = 0
      state.history = []
      state.status = 'starting'
    })
    .addCase(startGame, (state) => {
      state.status = 'playing'
    })
    .addCase(endGame, (state) => {
      state.status = 'finished'
    })
    .addCase(tickCountdownTimer, (state) => {
      state.countdownTimer--
    })
    .addCase(tickGameTimer, (state) => {
      state.gameTimer--
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

  /** An array of the questions to be rendered to the choices in the UI */
  const questionsForUI = useMemo(() => {
    if (!state.currentQuestion) return []
    if (!state.currentQuestion.correctItem.position) return []

    let questions: QuizItem[] = [...state.currentQuestion.wrongItems]
    // Insert the correct question at the specified position
    questions.splice(
      state.currentQuestion.correctItem.position - 1,
      0,
      state.currentQuestion.correctItem,
    )

    return questions
  }, [state.currentQuestion])

  const containerRef = useRef<HTMLDivElement>(null)

  // Countdown timer
  useEffect(() => {
    if (state.status !== 'starting') return

    const timer = setInterval(() => {
      if (state.countdownTimer === 0) {
        dispatch(startGame())
      } else {
        dispatch(tickCountdownTimer())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [state.status, state.countdownTimer])

  // Game Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (state.status !== 'playing') return
      if (state.gameTimer === 0) {
        dispatch(endGame())
      } else {
        dispatch(tickGameTimer())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [state.status, state.gameTimer])

  const handleAnswerQuestion = useCallback(
    (selectedItemId: string) => {
      // If this is the current question's correct item, answer the question
      // and get a new question
      if (selectedItemId === state.currentQuestion?.correctItem.id) {
        dispatch(answerQuestion(state.currentQuestion!))
        dispatch(newQuestion())
        return
      }
      // Otherwise, end the game
      dispatch(endGame())
    },
    [state.currentQuestion],
  )

  // Handle key presses
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (state.status === 'starting') {
        switch (event.key) {
          case ' ':
            dispatch(startGame())
            event.preventDefault()
            break
          case 'Enter':
            dispatch(startGame())
            event.preventDefault()
            break
          default:
            break
        }
      }

      if (state.status === 'idle' || state.status === 'finished') {
        switch (event.key) {
          case ' ':
            handleStartGame()
            event.preventDefault()
            break
          case 'Enter':
            handleStartGame()
            event.preventDefault()
            break
          default:
            break
        }
      }

      if (state.status === 'playing') {
        switch (event.key) {
          case 'ArrowUp':
            handleAnswerQuestion(questionsForUI[ARROW_TO_INDEX.ArrowUp - 1].id)
            // Prevent the page scroll of the arrow key
            event.preventDefault()
            break
          case 'ArrowRight':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX.ArrowRight - 1].id,
            )
            event.preventDefault()
            break
          case 'ArrowDown':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX.ArrowDown - 1].id,
            )
            event.preventDefault()
            break
          case 'ArrowLeft':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX.ArrowLeft - 1].id,
            )
            event.preventDefault()
            break
          // Map the number keys to the choices
          case '1':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['1']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the number keys to the choices
          case '2':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['2']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the number keys to the choices
          case '3':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['3']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the number keys to the choices
          case '4':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['4']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the WASD keys to the choices
          case 'W':
          case 'w':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['W']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the WASD keys to the choices
          case 'A':
          case 'a':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['A']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the WASD keys to the choices
          case 'S':
          case 's':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['S']] - 1].id,
            )
            event.preventDefault()
            break
          // Map the WASD keys to the choices
          case 'D':
          case 'd':
            handleAnswerQuestion(
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['D']] - 1].id,
            )
            event.preventDefault()
            break
          default:
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [state.status, questionsForUI, handleAnswerQuestion])

  function handleStartGame() {
    containerRef.current?.scrollIntoView({ behavior: 'instant' })
    dispatch(initializeGame())
  }

  return (
    <div
      className="flex w-full max-w-lg flex-col items-center justify-center pt-8"
      ref={containerRef}
    >
      {state.status === 'idle' ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-primary-500">Rules</h2>
            <p className="mb-2 text-lg text-gray-200">
              You will be shown four items and an item name. You must select the
              item that matches the name. The game ends when the timer runs out
              or you get a question wrong. You can use the arrow keys, WASD
              keys, or number keys.
            </p>
            <hr className="mb-4 mt-4 w-full border border-primary-500" />
            <p className="text-md  text-gray-300">
              Note: I threw this together in a few hours for fun and as a
              learning excercise! I may add more features or allow you to save
              results to your profile in the future. Enjoy!
            </p>
          </div>
          <button
            className="rounded-md border-2 border-primary-500 bg-primary-700 p-2 text-lg hover:bg-primary-500"
            onClick={handleStartGame}
          >
            Start Game
          </button>
          <p className="text-md mt-2 hidden italic text-gray-200 sm:block">
            Press <span className="font-bold">Space</span> or{' '}
            <span className="font-bold">Enter</span> to start.
          </p>
        </div>
      ) : null}

      {state.status === 'starting' ? (
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="mb-2 text-2xl font-bold text-primary-500">
            Game Starting
          </h2>
          <p className="text-lg text-gray-200">
            Get ready! The game will start in{' '}
            <span className="font-bold text-accent1-500">
              {state.countdownTimer + 1}
            </span>{' '}
            seconds
          </p>
          <button
            className="mt-4 rounded-md border-2 border-primary-500 bg-primary-700 p-2 text-white hover:bg-primary-500 sm:hidden"
            onClick={() => dispatch(startGame())}
          >
            Skip countdown
          </button>
          <p className="mt-2 hidden text-lg italic text-gray-200 sm:block">
            Press <span className="font-bold">Space</span> or{' '}
            <span className="font-bold">Enter</span> to skip.
          </p>
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
                {state.status === 'playing' ? state.gameTimer : '-'}
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

          {/** Mobile Grid */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            {getArrayOfLength(TOTAL_CHOICES).map((_, index) => {
              return (
                <QuizItemButton
                  key={uuidv4()}
                  item={questionsForUI[index]}
                  itemIndex={index}
                  onClick={() => handleAnswerQuestion(questionsForUI[index].id)}
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
                onClick={() => handleAnswerQuestion(questionsForUI[3].id)}
              />
            </div>
            {/** Up arrow or 1 key */}
            <div className="col-span-1 flex flex-col items-center justify-center gap-y-4">
              <QuizItemButton
                item={questionsForUI[0]}
                itemIndex={0}
                onClick={() => handleAnswerQuestion(questionsForUI[0].id)}
              />
              {/** Down arrow or 3 key */}
              <QuizItemButton
                item={questionsForUI[2]}
                itemIndex={2}
                onClick={() => handleAnswerQuestion(questionsForUI[2].id)}
              />
            </div>
            {/** Right arrow or 2 key */}

            <div className="col-span-1 flex w-full items-center justify-center">
              <QuizItemButton
                item={questionsForUI[1]}
                itemIndex={1}
                onClick={() => handleAnswerQuestion(questionsForUI[1].id)}
              />
            </div>
          </div>
        </div>
      ) : null}

      {state.status === 'finished' ? (
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            {state.gameTimer <= 0 ? "Time's Up!" : 'Game Over!'}
          </h2>
          <div className="mb-8 flex flex-col items-center justify-center">
            <p className="mb-2 text-lg text-gray-200">
              Your final score is{' '}
              <span className="font-bold text-accent1-500">{state.score}</span>
            </p>
            {state.gameTimer >= 0 ? (
              <p className="text-lg text-gray-200">
                The time remaining was{' '}
                <span className="font-bold text-accent1-500">
                  {state.gameTimer}
                </span>{' '}
                seconds
              </p>
            ) : null}
          </div>
          {state.gameTimer >= 0 ? (
            <>
              <hr className="mb-8 w-full border border-primary-500" />
              <h3 className="mb-2 text-xl font-bold text-primary-500">
                The correct answer was:
              </h3>
              <p className="mb-2 text-lg text-gray-200">
                {state.currentQuestion?.correctItem.name}
              </p>
              {state.currentQuestion?.correctItem ? (
                <div className="mb-8">
                  <QuizItemButton
                    item={state.currentQuestion?.correctItem}
                    itemIndex={0}
                  />
                </div>
              ) : null}
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
            onClick={handleStartGame}
          >
            Play Again
          </button>
          <p className="text-md mt-2 hidden italic text-gray-200 sm:block">
            Press <span className="font-bold">Space</span> or{' '}
            <span className="font-bold">Enter</span> to start.
          </p>
        </div>
      ) : null}
    </div>
  )
}
