import { create } from 'zustand'
import { db, type Question } from '../db/database'

interface QuestionStoreState {
  questions: Question[]
  isLoading: boolean
  filter: {
    type?: 'vocabulary' | 'grammar' | 'reading' | 'listening'
    difficulty?: number
  }
  
  // Actions
  loadQuestions: () => Promise<void>
  addQuestion: (question: Omit<Question, 'id'>) => Promise<void>
  updateQuestion: (id: string, data: Partial<Question>) => Promise<void>
  deleteQuestion: (id: string) => Promise<void>
  setFilter: (filter: QuestionStoreState['filter']) => void
  importQuestions: (questions: Question[]) => Promise<void>
  exportQuestions: () => Question[]
  getFilteredQuestions: () => Question[]
}

export const useQuestionStore = create<QuestionStoreState>((set, get) => ({
  questions: [],
  isLoading: false,
  filter: {},

  loadQuestions: async () => {
    set({ isLoading: true })
    const questions = await db.questionBank.toArray()
    set({ questions, isLoading: false })
  },

  addQuestion: async (question) => {
    const id = `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newQuestion: Question = { ...question, id }
    await db.questionBank.add(newQuestion)
    set(state => ({ questions: [...state.questions, newQuestion] }))
  },

  updateQuestion: async (id, data) => {
    await db.questionBank.update(id, data)
    set(state => ({
      questions: state.questions.map(q => 
        q.id === id ? { ...q, ...data } : q
      )
    }))
  },

  deleteQuestion: async (id) => {
    await db.questionBank.delete(id)
    set(state => ({
      questions: state.questions.filter(q => q.id !== id)
    }))
  },

  setFilter: (filter) => {
    set({ filter })
  },

  importQuestions: async (questions) => {
    set({ isLoading: true })
    // Clear existing and add new
    await db.questionBank.clear()
    const questionsWithIds = questions.map((q, index) => ({
      ...q,
      id: q.id || `q_${Date.now()}_${index}`
    }))
    await db.questionBank.bulkAdd(questionsWithIds)
    set({ questions: questionsWithIds, isLoading: false })
  },

  exportQuestions: () => {
    return get().questions
  },

  getFilteredQuestions: () => {
    const { questions, filter } = get()
    return questions.filter(q => {
      if (filter.type && q.type !== filter.type) return false
      if (filter.difficulty && q.difficulty > filter.difficulty) return false
      return true
    })
  }
}))

// Sample questions for initial data
export const SAMPLE_QUESTIONS: Omit<Question, 'id'>[] = [
  {
    type: 'vocabulary',
    question: 'What is the meaning of "beautiful"?',
    options: ['美丽的', '丑陋的', '普通的', '有趣的'],
    correctAnswer: '美丽的',
    explanation: 'Beautiful means pleasing to the senses, aesthetically pleasing.',
    difficulty: 1
  },
  {
    type: 'vocabulary',
    question: 'What is the meaning of "adventure"?',
    options: ['冒险', '平静', ' routine', '休息'],
    correctAnswer: '冒险',
    explanation: 'An adventure is an exciting or unusual experience.',
    difficulty: 2
  },
  {
    type: 'grammar',
    question: 'Choose the correct sentence:',
    options: [
      'She go to school every day.',
      'She goes to school every day.',
      'She going to school every day.',
      'She to go school every day.'
    ],
    correctAnswer: 'She goes to school every day.',
    explanation: 'Third person singular verbs add -s in present simple.',
    difficulty: 1
  },
  {
    type: 'grammar',
    question: 'Complete: If I ___ rich, I would buy a boat.',
    options: ['was', 'am', 'were', 'be'],
    correctAnswer: 'were',
    explanation: 'Subjunctive mood uses "were" for unreal conditions.',
    difficulty: 3
  },
  {
    type: 'reading',
    question: 'Read the passage and answer: What did Matilda find in the attic?',
    options: ['A magical wand', 'A dusty box of old books', 'A treasure map', 'A sleeping cat'],
    correctAnswer: 'A dusty box of old books',
    explanation: 'The passage describes Matilda finding a dusty box.',
    difficulty: 2
  },
  {
    type: 'listening',
    question: 'What time did the train leave?',
    options: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
    correctAnswer: '9:30 AM',
    explanation: 'The audio states the train left at 9:30 AM.',
    difficulty: 2
  },
]
