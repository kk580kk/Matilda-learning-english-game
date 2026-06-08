import type { Question } from '../db/database'

export interface QuestionBankExport {
  version: string
  exportDate: string
  questions: Question[]
}

const EXPORT_VERSION = '1.0'

export function exportQuestionBank(questions: Question[]): string {
  const exportData: QuestionBankExport = {
    version: EXPORT_VERSION,
    exportDate: new Date().toISOString(),
    questions
  }
  return JSON.stringify(exportData, null, 2)
}

export function importQuestionBank(jsonString: string): { 
  success: boolean 
  questions?: Question[] 
  error?: string 
} {
  try {
    const data = JSON.parse(jsonString) as QuestionBankExport
    
    // Validate version
    if (!data.version || !data.questions) {
      return { 
        success: false, 
        error: 'Invalid file format: missing version or questions' 
      }
    }
    
    // Validate questions
    const questions: Question[] = data.questions.map((q, index) => {
      if (!q.question || !q.type || !q.correctAnswer) {
        throw new Error(`Invalid question at index ${index}`)
      }
      return {
        ...q,
        id: q.id || `imported_${Date.now()}_${index}`
      }
    })
    
    return { success: true, questions }
  } catch (e) {
    return { 
      success: false, 
      error: e instanceof Error ? e.message : 'Unknown error parsing file' 
    }
  }
}

export function downloadQuestionBank(questions: Question[], filename = 'question-bank.json') {
  const json = exportQuestionBank(questions)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function generateSampleQuestions(): Question[] {
  const sampleQuestions: Question[] = [
    {
      id: `sample_${Date.now()}_1`,
      type: 'vocabulary',
      question: 'What is the opposite of "fast"?',
      options: ['Quick', 'Slow', 'Rapid', 'Swift'],
      correctAnswer: 'Slow',
      explanation: 'Slow is the opposite of fast.',
      difficulty: 1
    },
    {
      id: `sample_${Date.now()}_2`,
      type: 'vocabulary',
      question: 'What does "enormous" mean?',
      options: ['Tiny', 'Huge', 'Small', 'Little'],
      correctAnswer: 'Huge',
      explanation: 'Enormous means very large or huge.',
      difficulty: 2
    },
    {
      id: `sample_${Date.now()}_3`,
      type: 'grammar',
      question: 'Select the correct form: She ___ to the store yesterday.',
      options: ['go', 'goes', 'went', 'going'],
      correctAnswer: 'went',
      explanation: 'Past tense of "go" is "went".',
      difficulty: 1
    },
    {
      id: `sample_${Date.now()}_4`,
      type: 'grammar',
      question: 'Choose the correct plural: "child"',
      options: ['Childs', 'Childrens', 'Children', 'Childes'],
      correctAnswer: 'Children',
      explanation: 'Children is the irregular plural of child.',
      difficulty: 2
    },
    {
      id: `sample_${Date.now()}_5`,
      type: 'reading',
      question: 'What is the main idea of the story?',
      options: [
        'A girl finds a magical book',
        'A boy goes to school',
        'A cat catches a mouse',
        'A dog plays in the park'
      ],
      correctAnswer: 'A girl finds a magical book',
      explanation: 'The story is about Matilda discovering a magical book in the library.',
      difficulty: 2
    },
    {
      id: `sample_${Date.now()}_6`,
      type: 'listening',
      question: 'What did the speaker say about the weather?',
      options: [
        'It will rain today',
        'It will be sunny',
        'It will snow',
        'It will be cloudy'
      ],
      correctAnswer: 'It will be sunny',
      explanation: 'The audio mentioned sunny weather.',
      difficulty: 2
    }
  ]
  
  return sampleQuestions
}

export function validateQuestion(question: Partial<Question>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (!question.question?.trim()) {
    errors.push('Question text is required')
  }
  
  if (!question.type) {
    errors.push('Question type is required')
  }
  
  if (!question.correctAnswer) {
    errors.push('Correct answer is required')
  }
  
  if (!question.explanation?.trim()) {
    errors.push('Explanation is required')
  }
  
  if (question.type !== 'reading' && question.type !== 'listening') {
    if (!question.options || question.options.length < 2) {
      errors.push('At least 2 options are required for choice questions')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
