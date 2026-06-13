import { type QuizItem } from '@/app/(items)/item-quiz/_types/quiz-item';

export type QuizQuestion = {
  correctItem: QuizItem;
  wrongItems: QuizItem[];
};
