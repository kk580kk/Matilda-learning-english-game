export interface Player {
  id: number
  name: string
  level: number
  experience: number
  totalCoins: number
  unlockedCharacters: string[]
}

export interface Character {
  id: string
  name: string
  description: string
  image: string
  voice: string
}

export interface QuestionOption {
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening'
  question: string
  options?: QuestionOption[] | string[]
  correctAnswer?: string | string[]
  audioUrl?: string
  explanation: string
  difficulty: number
}

export interface Level {
  id: number
  chapterId: number
  title: string
  description?: string
  questions: Question[]
  requiredStars: number
  rewards: {
    coins: number
    experience: number
  }
}

export interface Chapter {
  id: number
  title: string
  description: string
  coverImage: string
  levels?: Level[]
  isUnlocked: boolean
  levelIds?: number[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  target: number
  unlockedAt?: Date
}

export interface GameSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  difficulty: 'easy' | 'normal' | 'hard'
  language: 'zh-CN' | 'en-US'
}

export interface LevelProgress {
  levelId: number
  chapterId: number
  isCompleted: boolean
  bestScore: number
  stars: number
  completedAt?: Date
}

// Re-export from sub-types
export * from './story'
export * from './book'
export * from './relation'
export * from './telepathy'
