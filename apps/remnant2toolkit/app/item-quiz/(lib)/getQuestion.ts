import { getItemsInCategory } from '@/app/item-quiz/(lib)/getItemsInCategory'
import { GAME_ITEM_CATEGORIES, TOTAL_CHOICES } from '@/app/item-quiz/constants'
import { QuizQuestion } from '@/app/item-quiz/types'

export function getQuestion(history: QuizQuestion[]): QuizQuestion {
  const question: QuizQuestion = {
    correctItem: {
      id: '',
      name: '',
      description: '',
      category: 'Amulet',
      imagePath: '',
      position: 0,
    },
    wrongItems: [],
  }

  while (question.wrongItems.length < TOTAL_CHOICES - 1) {
    if (!question.correctItem || question.correctItem.id === '') {
      // Pick a random category
      const category =
        GAME_ITEM_CATEGORIES[
          Math.floor(Math.random() * GAME_ITEM_CATEGORIES.length)
        ]

      if (!category) continue

      const itemsInCategory = getItemsInCategory(category)

      const item =
        itemsInCategory[Math.floor(Math.random() * itemsInCategory.length)]
      if (!item) continue

      const itemInHistory = history.find((q) => q.correctItem.id === item.id)
      if (itemInHistory) continue

      // Pick a random position from 1 - TOTAL_CHOICES
      const position = Math.floor(Math.random() * TOTAL_CHOICES) + 1

      question.correctItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        category,
        imagePath: item.imagePath,
        position,
      }
    }

    const itemsInCategory = getItemsInCategory(question.correctItem.category)

    const wrongItem =
      itemsInCategory[Math.floor(Math.random() * itemsInCategory.length)]

    if (!wrongItem) continue

    const itemNotTheAnswer = wrongItem.id !== question.correctItem.id
    const itemNotInQuestion = !question.wrongItems.some(
      (item) => item.id === wrongItem.id,
    )

    if (itemNotTheAnswer && itemNotInQuestion) {
      question.wrongItems.push({
        id: wrongItem.id,
        name: wrongItem.name,
        description: wrongItem.description,
        category: wrongItem.category,
        imagePath: wrongItem.imagePath,
        position: -1,
      })
    }
  }

  return question
}
