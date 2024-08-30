import { type QuizItem } from '@/app/(features)/item-quiz/types/quiz-item';

export type QuizQuestion = {
  correctItem: QuizItem;
  wrongItems: QuizItem[];
};
