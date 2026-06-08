import Dexie, { type Table } from 'dexie'

export interface Save {
  id?: number
  name: string
  currentLevel: number
  currentChapter: number
  totalCoins: number
  experience: number
  unlockedCharacters: string[]
  settings: {
    soundEnabled: boolean
    musicEnabled: boolean
    difficulty: 'easy' | 'normal' | 'hard'
  }
  createdAt: Date
  updatedAt: Date
}

export interface StoryNode {
  id: string
  chapterId: number
  title: string
  content: string
  choices: {
    text: string
    nextNodeId: string
    requiredCoins?: number
  }[]
  questions: {
    id: string
    type: 'choice' | 'input' | 'speak'
    question: string
    options?: string[]
    correctAnswer: string | string[]
    points: number
  }[]
  rewards: {
    coins: number
    experience: number
  }
}

export interface Book {
  id: string
  title: string
  description: string
  coverImage: string
  difficulty: number
  totalChapters: number
  isUnlocked: boolean
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  target: number
}

export interface Question {
  id: string
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: number
}

class MatildaDatabase extends Dexie {
  saves!: Table<Save>
  storyNodes!: Table<StoryNode>
  books!: Table<Book>
  achievements!: Table<Achievement>
  questionBank!: Table<Question>

  constructor() {
    super('MatildaDB')
    this.version(1).stores({
      saves: '++id, name, currentLevel, createdAt',
      storyNodes: 'id, chapterId',
      books: 'id, difficulty, isUnlocked',
      achievements: 'id',
      questionBank: 'id, type, difficulty'
    })
  }
}

export const db = new MatildaDatabase()

// Initialize default data
export async function initializeDatabase() {
  const saveCount = await db.saves.count()
  if (saveCount === 0) {
    await db.saves.add({
      name: '新存档',
      currentLevel: 1,
      currentChapter: 1,
      totalCoins: 0,
      experience: 0,
      unlockedCharacters: ['matilda'],
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        difficulty: 'normal'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
}
