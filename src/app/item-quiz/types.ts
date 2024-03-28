export type QuizItemCategory =
  | 'Helm'
  | 'Torso'
  | 'Legs'
  | 'Gloves'
  | 'Archetype'
  | 'Skill'
  | 'Trait'
  | 'Perk'
  | 'Amulet'
  | 'Ring'
  | 'Relic'
  | 'Long Gun'
  | 'Hand Gun'
  | 'Melee'
  | 'Mod'
  | 'Mutator (Gun)'
  | 'Mutator (Melee)'
  | 'Concoction'
  | 'Consumable'

export type QuizItem = {
  id: string
  name: string
  category: QuizItemCategory
  imagePath: string
  position: number
}

export type QuizQuestion = {
  correctItem: QuizItem
  wrongItems: QuizItem[]
}

export type LayoutPreference = 'mobile' | 'desktop'
