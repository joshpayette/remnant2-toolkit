import { type QuizItemCategory } from '@/app/(items)/item-quiz/_types/quiz-item-category';

export type QuizItem = {
  id: string;
  name: string;
  description: string;
  category: QuizItemCategory;
  imagePath: string;
  position: number;
};
