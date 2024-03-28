'use client'

import { createAction, createReducer } from '@reduxjs/toolkit'
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { FinishedDisplay } from '@/app/item-quiz/(components)/FinishedDisplay'
import { IdleDisplay } from '@/app/item-quiz/(components)/IdleDisplay'
import { PlayingDisplay } from '@/app/item-quiz/(components)/PlayingDisplay'
import { QuizItemButton } from '@/app/item-quiz/(components)/QuizItemButton'
import { Score } from '@/app/item-quiz/(components)/Score'
import { StartingDisplay } from '@/app/item-quiz/(components)/StartingDisplay'
import { Timer } from '@/app/item-quiz/(components)/Timer'
import { getQuestion } from '@/app/item-quiz/(lib)/getQuestion'
import {
  ARROW_TO_INDEX,
  COUNTDOWN_DURATION,
  GAME_DURATION,
  KEY_TO_ARROW,
} from '@/app/item-quiz/constants'
import { QuizItem, QuizQuestion } from '@/app/item-quiz/types'

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
      state.status = 'starting'
      state.countdownTimer = COUNTDOWN_DURATION
      state.gameTimer = GAME_DURATION
      state.score = 0
      state.history = []
      state.currentQuestion = getQuestion(state.history)
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

  function handleSkipCountdown() {
    dispatch(startGame())
  }

  return (
    <div
      className="flex w-full max-w-lg flex-col items-center justify-center pt-8"
      ref={containerRef}
    >
      {state.status === 'idle' ? (
        <IdleDisplay onStartGame={handleStartGame} />
      ) : null}

      {state.status === 'starting' ? (
        <StartingDisplay
          countdownTimer={state.countdownTimer}
          onSkipCountdown={handleSkipCountdown}
        />
      ) : null}

      {state.status === 'playing' ? (
        <div
          id="playing-container"
          className="flex flex-col items-center justify-center"
        >
          <div id="top-container" className="flex items-center justify-between">
            <Timer
              isPlaying={state.status === 'playing'}
              gameTimer={state.gameTimer}
            />
            <Score score={state.score} />
          </div>
          <PlayingDisplay
            correctItemName={state.currentQuestion?.correctItem.name || ''}
            questionsForUI={questionsForUI}
            onAnswerQuestion={handleAnswerQuestion}
          />
        </div>
      ) : null}

      {state.status === 'finished' ? (
        <FinishedDisplay
          correctItem={state.currentQuestion?.correctItem}
          gameTimer={state.gameTimer}
          history={state.history}
          score={state.score}
          onStartGame={handleStartGame}
        />
      ) : null}
    </div>
  )
}
