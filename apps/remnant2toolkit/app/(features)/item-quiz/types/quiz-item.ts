import type { QuizItemCategory } from '@/app/(features)/item-quiz/types/quiz-item-category'

export type QuizItem = {
  id: string
  name: string
  description: string
  category: QuizItemCategory
  imagePath: string
  position: number
}
