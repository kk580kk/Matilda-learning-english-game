import { create } from 'zustand'
import type { Book, BookState, ReadingProgress, SpeedReadingSession } from '../types/book'

// Demo books data
const demoBooks: Book[] = [
  {
    id: 'book_1',
    title: 'Little Red Riding Hood',
    description: 'A classic fairy tale with simple English vocabulary.',
    coverImage: '/images/books/red_riding_hood.jpg',
    author: 'Traditional',
    difficulty: 1,
    totalChapters: 3,
    chapters: [
      {
        id: 'book_1_ch1',
        chapterNumber: 1,
        title: 'The Little Girl',
        content: `Once upon a time there was a little girl. She lived with her mother. The little girl wore a red hood. That is why people called her Little Red Riding Hood.

One day, her mother said, "Little Red, please take this basket to your grandmother. She is sick and needs this food."`,
        wordCount: 52,
        difficulty: 1
      },
      {
        id: 'book_1_ch2',
        chapterNumber: 2,
        title: 'The Wolf',
        content: `On her way through the forest, Little Red Riding Hood met a wolf. The wolf asked, "Where are you going?"

"I am going to my grandmother's house," she answered.

The wolf had a plan. He ran to grandmother's house first.`,
        wordCount: 48,
        difficulty: 1
      },
      {
        id: 'book_1_ch3',
        chapterNumber: 3,
        title: 'The Happy Ending',
        content: `A hunter came and saved them. Little Red and her grandmother were safe. They were very happy. From that day on, Little Red was always careful in the forest.

The End.`,
        wordCount: 42,
        difficulty: 1
      }
    ],
    isUnlocked: true,
    isOwned: true,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'book_2',
    title: 'The Ugly Duckling',
    description: 'A story about being different and finding your true self.',
    coverImage: '/images/books/ugly_duckling.jpg',
    author: 'Hans Christian Andersen',
    difficulty: 2,
    totalChapters: 4,
    chapters: [
      {
        id: 'book_2_ch1',
        chapterNumber: 1,
        title: 'A Different Duck',
        content: `It was summer. The countryside was beautiful. A mother duck was sitting on her eggs. Finally, the eggs began to crack. One by one, the baby ducks came out.

But one egg was different. It was bigger than the others.`,
        wordCount: 47,
        difficulty: 2
      },
      {
        id: 'book_2_ch2',
        chapterNumber: 2,
        title: 'The Big Bird',
        content: `The last egg cracked open. Out came a big, grey duckling. "How strange!" said the mother duck. The other ducks laughed at him. "He is so ugly!" they said.

The poor duckling was very sad.`,
        wordCount: 46,
        difficulty: 2
      },
      {
        id: 'book_2_ch3',
        chapterNumber: 3,
        title: 'The Journey',
        content: `The ugly duckling left home. He traveled through fields and lakes. He met many animals. They were not kind to him. It was a hard life.

Winter came. The water froze.`,
        wordCount: 45,
        difficulty: 2
      },
      {
        id: 'book_2_ch4',
        chapterNumber: 4,
        title: 'The Beautiful Swan',
        content: `Spring arrived. The ugly duckling saw beautiful white swans. They were so graceful! He felt small and ugly.

But when he looked in the water, he saw a beautiful swan! He was not ugly at all. He was a swan!

The End.`,
        wordCount: 52,
        difficulty: 2
      }
    ],
    isUnlocked: true,
    isOwned: true,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'book_3',
    title: 'Alice in Wonderland',
    description: 'An adventurous story about a girl who falls down a rabbit hole.',
    coverImage: '/images/books/alice.jpg',
    author: 'Lewis Carroll',
    difficulty: 3,
    totalChapters: 2,
    chapters: [
      {
        id: 'book_3_ch1',
        chapterNumber: 1,
        title: 'Down the Rabbit Hole',
        content: `Alice was sitting by the river with her sister. She was very bored. Suddenly, a white rabbit ran by. It had pink eyes and was wearing a waistcoat.

"What a curious rabbit!" thought Alice. She followed it down a large hole.

The fall seemed to last forever.`,
        wordCount: 55,
        difficulty: 3
      },
      {
        id: 'book_3_ch2',
        chapterNumber: 2,
        title: 'The Mad Tea Party',
        content: `Alice found a strange garden. She saw a caterpillar sitting on a mushroom. The caterpillar was smoking a hookah.

"Who are you?" asked the caterpillar.

"I don't know," said Alice. "I knew who I was this morning, but I have changed several times since then."

To be continued...`,
        wordCount: 59,
        difficulty: 3
      }
    ],
    isUnlocked: false,
    isOwned: false,
    isCompleted: false,
    progress: 0
  }
]

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  currentBook: null,
  currentChapter: null,
  readingProgress: [],
  speedReadingSession: null,

  loadBooks: async () => {
    set({ books: demoBooks })
  },

  selectBook: (bookId: string) => {
    const { books } = get()
    const book = books.find(b => b.id === bookId) || null
    set({ 
      currentBook: book,
      currentChapter: book?.chapters[0] || null
    })
  },

  selectChapter: (chapterId: string) => {
    const { currentBook } = get()
    if (currentBook) {
      const chapter = currentBook.chapters.find(c => c.id === chapterId) || null
      set({ currentChapter: chapter })
    }
  },

  updateProgress: (progress: ReadingProgress) => {
    const { readingProgress, currentBook, books } = get()
    
    // Update reading progress
    const existingIndex = readingProgress.findIndex(p => 
      p.bookId === progress.bookId && p.chapterId === progress.chapterId
    )
    
    let newProgress: ReadingProgress[]
    if (existingIndex >= 0) {
      newProgress = [...readingProgress]
      newProgress[existingIndex] = progress
    } else {
      newProgress = [...readingProgress, progress]
    }
    
    // Update book progress
    const updatedBooks = books.map(b => {
      if (b.id === progress.bookId) {
        const totalWords = b.chapters.reduce((sum, ch) => sum + ch.wordCount, 0)
        const readWords = newProgress
          .filter(p => p.bookId === b.id)
          .reduce((sum, p) => sum + p.wordsRead, 0)
        
        return {
          ...b,
          progress: Math.min(100, Math.round((readWords / totalWords) * 100)),
          lastReadChapter: progress.chapterId,
          isCompleted: readWords >= totalWords
        }
      }
      return b
    })
    
    set({ 
      readingProgress: newProgress,
      books: updatedBooks,
      currentBook: currentBook?.id === progress.bookId 
        ? updatedBooks.find(b => b.id === progress.bookId) || null 
        : currentBook
    })
  },

  startSpeedReading: (bookId: string, chapterId: string, words: string[]) => {
    const session: SpeedReadingSession = {
      id: `session_${Date.now()}`,
      bookId,
      chapterId,
      words,
      currentIndex: 0,
      startTime: Date.now(),
      wpm: 200,
      isActive: true,
      isCompleted: false,
      correctWords: 0,
      totalWords: words.length
    }
    set({ speedReadingSession: session })
  },

  updateSpeedReading: (sessionUpdate: Partial<SpeedReadingSession>) => {
    const { speedReadingSession } = get()
    if (speedReadingSession) {
      set({
        speedReadingSession: { ...speedReadingSession, ...sessionUpdate }
      })
    }
  },

  completeSpeedReading: () => {
    const { speedReadingSession } = get()
    if (speedReadingSession) {
      const elapsed = (Date.now() - speedReadingSession.startTime) / 1000 / 60 // minutes
      const actualWpm = elapsed > 0 ? Math.round(speedReadingSession.totalWords / elapsed) : 0
      
      set({
        speedReadingSession: {
          ...speedReadingSession,
          isActive: false,
          isCompleted: true,
          wpm: actualWpm
        }
      })
    }
  },

  resetSpeedReading: () => {
    set({ speedReadingSession: null })
  }
}))

export { demoBooks }
