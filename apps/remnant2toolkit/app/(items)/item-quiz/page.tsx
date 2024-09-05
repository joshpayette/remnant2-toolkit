'use client';

import { createAction, createReducer } from '@reduxjs/toolkit';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { getTopScore } from '@/app/(items)/item-quiz/_actions/get-top-score';
import { updateTopScore } from '@/app/(items)/item-quiz/_actions/update-top-score';
import { QuizScore } from '@/app/(items)/item-quiz/_components/quiz-score';
import { QuizTimer } from '@/app/(items)/item-quiz/_components/quiz-timer';
import { CountdownStage } from '@/app/(items)/item-quiz/_components/stages/countdown-stage';
import { GameOverStage } from '@/app/(items)/item-quiz/_components/stages/game-over-stage';
import { GameplayStage } from '@/app/(items)/item-quiz/_components/stages/gameplay-stage';
import { StartGameStage } from '@/app/(items)/item-quiz/_components/stages/start-game-stage';
import { ARROW_TO_INDEX } from '@/app/(items)/item-quiz/_constants/arrow-to-index';
import { COUNTDOWN_DURATION } from '@/app/(items)/item-quiz/_constants/countdown-duration';
import { GAME_DURATION } from '@/app/(items)/item-quiz/_constants/game-duration';
import { KEY_TO_ARROW } from '@/app/(items)/item-quiz/_constants/key-to-arrow';
import { getNextQuestion } from '@/app/(items)/item-quiz/_lib/get-next-question';
import { type LayoutPreference } from '@/app/(items)/item-quiz/_types/layout-preference';
import { type QuizItem } from '@/app/(items)/item-quiz/_types/quiz-item';
import { type QuizQuestion } from '@/app/(items)/item-quiz/_types/quiz-question';

interface GameState {
  countdownTimer: number;
  currentQuestion: QuizQuestion | null;
  gameTimer: number;
  history: QuizQuestion[];
  score: number;
  status: 'idle' | 'starting' | 'playing' | 'finished';
}

const initializeGame = createAction('game/init');
const startGame = createAction('game/start');
const endGame = createAction('game/end');
const tickGameTimer = createAction('game/tickGameTimer');
const tickCountdownTimer = createAction('game/tickCountdownTimer');
const answerQuestion = createAction<QuizQuestion>('game/answer');
const newQuestion = createAction('game/newQuestion');

const initialState = {
  countdownTimer: COUNTDOWN_DURATION,
  currentQuestion: null,
  gameTimer: 0,
  history: [],
  score: 0,
  status: 'idle',
} satisfies GameState as GameState;

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initializeGame, (state) => {
      state.status = 'starting';
      state.countdownTimer = COUNTDOWN_DURATION;
      state.gameTimer = GAME_DURATION;
      state.score = 0;
      state.history = [];
      state.currentQuestion = getNextQuestion(state.history);
    })
    .addCase(startGame, (state) => {
      state.status = 'playing';
    })
    .addCase(endGame, (state) => {
      state.status = 'finished';
    })
    .addCase(tickCountdownTimer, (state) => {
      state.countdownTimer--;
    })
    .addCase(tickGameTimer, (state) => {
      state.gameTimer--;
    })
    .addCase(answerQuestion, (state, action) => {
      state.history.push({
        correctItem: action.payload.correctItem,
        wrongItems: action.payload.wrongItems,
      });
      state.score++;
    })
    .addCase(newQuestion, (state) => {
      state.currentQuestion = getNextQuestion(state.history);
    });
});

export default function Page() {
  const { data: session, status } = useSession();
  const [topScore, setTopScore] = useState<number>(0);

  useEffect(() => {
    if (status !== 'authenticated') return;
    getTopScore({ userId: session?.user?.id as string }).then(setTopScore);
  }, [session, status]);

  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [layoutPreference, setLayoutPreference] =
    useState<LayoutPreference>('desktop');

  function handleToggleLayoutPreference() {
    setLayoutPreference((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'));
  }

  /** An array of the questions to be rendered to the choices in the UI */
  const questionsForUI = useMemo(() => {
    if (!state.currentQuestion) return [];
    if (!state.currentQuestion.correctItem.position) return [];

    const questions: QuizItem[] = [...state.currentQuestion.wrongItems];
    // Insert the correct question at the specified position
    questions.splice(
      state.currentQuestion.correctItem.position - 1,
      0,
      state.currentQuestion.correctItem,
    );

    return questions;
  }, [state.currentQuestion]);

  // Countdown timer
  useEffect(() => {
    if (state.status !== 'starting') return;

    const timer = setInterval(() => {
      if (state.countdownTimer === 0) {
        dispatch(startGame());
      } else {
        dispatch(tickCountdownTimer());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status, state.countdownTimer]);

  // Game Timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (state.status !== 'playing') return;
      if (state.gameTimer === 0) {
        dispatch(endGame());
      } else {
        dispatch(tickGameTimer());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.status, state.gameTimer]);

  const handleAnswerQuestion = useCallback(
    (selectedItemId: string) => {
      // If this is the current question's correct item, answer the question
      // and get a new question
      if (selectedItemId === state.currentQuestion?.correctItem.id) {
        dispatch(answerQuestion(state.currentQuestion!));
        dispatch(newQuestion());
        return;
      }
      // Otherwise, end the game
      dispatch(endGame());
    },
    [state.currentQuestion],
  );

  // Handle key presses
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (state.status === 'starting') {
        switch (event.key) {
          case ' ':
            dispatch(startGame());
            event.preventDefault();
            break;
          case 'Enter':
            dispatch(startGame());
            event.preventDefault();
            break;
          default:
            break;
        }
      }

      if (state.status === 'idle' || state.status === 'finished') {
        switch (event.key) {
          case ' ':
            handleStartGame();
            event.preventDefault();
            break;
          case 'Enter':
            handleStartGame();
            event.preventDefault();
            break;
          default:
            break;
        }
      }

      if (state.status === 'playing') {
        switch (event.key) {
          case 'ArrowUp': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowUp - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            // Prevent the page scroll of the arrow key
            event.preventDefault();
            break;
          }
          case 'ArrowRight': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowRight - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          case 'ArrowDown': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowDown - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          case 'ArrowLeft': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowLeft - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the number keys to the choices
          case '1': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowUp - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the number keys to the choices
          case '2': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowLeft - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the number keys to the choices
          case '3': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowRight - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the number keys to the choices
          case '4': {
            const question = questionsForUI[ARROW_TO_INDEX.ArrowDown - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the WASD keys to the choices
          case 'W':
          case 'w': {
            const question =
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['W']] - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the WASD keys to the choices
          case 'A':
          case 'a': {
            const question =
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['A']] - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the WASD keys to the choices
          case 'S':
          case 's': {
            const question =
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['S']] - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          // Map the WASD keys to the choices
          case 'D':
          case 'd': {
            const question =
              questionsForUI[ARROW_TO_INDEX[KEY_TO_ARROW['D']] - 1];
            if (!question) return;
            handleAnswerQuestion(question.id);
            event.preventDefault();
            break;
          }
          default:
            break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.status, questionsForUI, handleAnswerQuestion]);

  // Save the top score when the game ends
  useEffect(() => {
    if (state.status !== 'finished') return;
    if (!session?.user?.id) return;
    if (state.score <= topScore) return;
    updateTopScore({ userId: session.user.id, topScore: state.score });
    toast.success(
      `New top score: ${state.score}. Your previous top score was ${topScore}`,
    );
    setTopScore(state.score);
  }, [state.status, state.score, session?.user?.id, topScore]);

  function handleStartGame() {
    // Scroll to top of the page
    window.scrollTo(0, 0);

    dispatch(initializeGame());
  }

  function handleSkipCountdown() {
    dispatch(startGame());
  }

  // #region Render

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center pt-2">
      {state.status === 'idle' ? (
        <StartGameStage
          showTopScore={Boolean(session?.user?.id)}
          topScore={topScore}
          layoutPreference={layoutPreference}
          onToggleLayoutPreference={handleToggleLayoutPreference}
          onStartGame={handleStartGame}
        />
      ) : null}

      {state.status === 'starting' ? (
        <CountdownStage
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
            <QuizTimer
              isPlaying={state.status === 'playing'}
              gameTimer={state.gameTimer}
            />
            <QuizScore score={state.score} />
          </div>
          <GameplayStage
            correctItemName={state.currentQuestion?.correctItem.name || ''}
            layoutPreference={layoutPreference}
            questionsForUI={questionsForUI}
            onAnswerQuestion={handleAnswerQuestion}
          />
        </div>
      ) : null}

      {state.status === 'finished' ? (
        <GameOverStage
          correctItem={state.currentQuestion?.correctItem}
          gameTimer={state.gameTimer}
          history={state.history}
          layoutPreference={layoutPreference}
          score={state.score}
          onStartGame={handleStartGame}
          onToggleLayoutPreference={handleToggleLayoutPreference}
        />
      ) : null}
    </div>
  );
}
