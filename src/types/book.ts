export interface BookChapter {
  id: string
  chapterNumber: number
  title: string
  content: string
  wordCount: number
  difficulty: number
}

export interface Book {
  id: string
  title: string
  description: string
  coverImage: string
  author: string
  difficulty: number
  totalChapters: number
  chapters: BookChapter[]
  isUnlocked: boolean
  isOwned: boolean
  lastReadChapter?: string
  isCompleted: boolean
  progress: number // 0-100
}

export interface ReadingProgress {
  bookId: string
  chapterId: string
  wordsRead: number
  readingTime: number // seconds
  completedAt?: Date
  wpm: number // words per minute
}

export interface SpeedReadingSession {
  id: string
  bookId: string
  chapterId: string
  words: string[]
  currentIndex: number
  startTime: number
  wpm: number
  isActive: boolean
  isCompleted: boolean
  correctWords: number
  totalWords: number
}

export interface BookState {
  books: Book[]
  currentBook: Book | null
  currentChapter: BookChapter | null
  readingProgress: ReadingProgress[]
  speedReadingSession: SpeedReadingSession | null
  
  // Actions
  loadBooks: () => Promise<void>
  selectBook: (bookId: string) => void
  selectChapter: (chapterId: string) => void
  updateProgress: (progress: ReadingProgress) => void
  startSpeedReading: (bookId: string, chapterId: string, words: string[]) => void
  updateSpeedReading: (session: Partial<SpeedReadingSession>) => void
  completeSpeedReading: () => void
  resetSpeedReading: () => void
}
