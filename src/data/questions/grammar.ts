import { Question, QuestionType, ExamType } from '../../types';

/**
 * 语法填空题 - L1关卡用
 * 难度：1-3级（简单到中等）
 * 
 * PRD v3.1 规范：
 * - 改为语篇形式（非单句）
 * - 综合时态（一般现在时/进行时/完成时）
 * - 基于情境故事出题
 * - 10道题
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 语法填空题 - 玛蒂尔达的一天（语篇形式）
  // 综合时态：一般现在时、现在进行时、现在完成时
  // ============================================================
  {
    id: 'g1-001',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【1】',
    options: [
      'A. is',
      'B. are',
      'C. am',
      'D. be'
    ],
    correctAnswer: 'A',
    explanation: 'Matilda是第三人称单数，用is。',
    chineseExplanation: '第三人称单数用is',
    relatedWords: ['w001'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g1-002',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【2】',
    options: [
      'A. love',
      'B. loves',
      'C. loved',
      'D. loving'
    ],
    correctAnswer: 'B',
    explanation: 'She是第三人称单数，动词加-s。',
    chineseExplanation: '第三人称单数一般现在时动词加-s',
    relatedWords: ['w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g1-003',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【3】',
    options: [
      'A. sit',
      'B. sits',
      'C. sitting',
      'D. is sitting'
    ],
    correctAnswer: 'D',
    explanation: 'Look!提示动作正在进行，用现在进行时。',
    chineseExplanation: 'Look!提示用现在进行时',
    relatedWords: ['w033'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'g1-004',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【4】',
    options: [
      'A. read',
      'B. reads',
      'C. reading',
      'D. is reading'
    ],
    correctAnswer: 'D',
    explanation: '现在进行时结构：be + 动词-ing。',
    chineseExplanation: '现在进行时表示正在进行的动作',
    relatedWords: ['w121'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'g1-005',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【5】',
    options: [
      'A. read',
      'B. reads',
      'C. has read',
      'D. reading'
    ],
    correctAnswer: 'C',
    explanation: 'since last year提示现在完成时。',
    chineseExplanation: 'since + 时间点用现在完成时',
    relatedWords: ['w121'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g1-006',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，用括号中所给词的适当形式填空。\n\nMatilda __1__ (be) a smart girl. She __2__ (love) reading every day. Look! She __3__ (sit) by the window and __4__ (read) a book now. She __5__ (read) many books since last year. Her parents __6__ (be) proud of her.\n\n【6】',
    options: [
      'A. is',
      'B. are',
      'C. am',
      'D. be'
    ],
    correctAnswer: 'B',
    explanation: 'parents是复数，用are。',
    chineseExplanation: '复数名词用are',
    relatedWords: ['w002'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 语法填空题 - 综合时态练习
  // ============================================================
  {
    id: 'g1-007',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '用括号中所给词的适当形式填空。\n\nMatilda __1__ (study) English for three years. She __2__ (start) to learn it in 2023. She __3__ (read) English books every day. So far, she __4__ (finish) more than 50 books. She __5__ (be) happy with her progress.\n\n【7】- She __1__ (study) English for three years.',
    options: [
      'A. studies',
      'B. studied',
      'C. has studied',
      'D. study'
    ],
    correctAnswer: 'C',
    explanation: 'for three years表示一段时间，用现在完成时。',
    chineseExplanation: 'for + 时间段用现在完成时',
    relatedWords: ['w122'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g1-008',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '用括号中所给词的适当形式填空。\n\nMatilda __1__ (study) English for three years. She __2__ (start) to learn it in 2023. She __3__ (read) English books every day. So far, she __4__ (finish) more than 50 books. She __5__ (be) happy with her progress.\n\n【8】- She __2__ (start) to learn it in 2023.',
    options: [
      'A. starts',
      'B. started',
      'C. starting',
      'D. has started'
    ],
    correctAnswer: 'B',
    explanation: 'in 2023是过去的时间，用一般过去时。',
    chineseExplanation: 'in + 过去年份用一般过去时',
    relatedWords: ['w122'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'g1-009',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '用括号中所给词的适当形式填空。\n\nMatilda __1__ (study) English for three years. She __2__ (start) to learn it in 2023. She __3__ (read) English books every day. So far, she __4__ (finish) more than 50 books. She __5__ (be) happy with her progress.\n\n【9】- So far, she __4__ (finish) more than 50 books.',
    options: [
      'A. finishes',
      'B. finished',
      'C. has finished',
      'D. finish'
    ],
    correctAnswer: 'C',
    explanation: 'So far是现在完成时的标志。',
    chineseExplanation: 'So far/yet/already是现在完成时标志',
    relatedWords: ['w129'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g1-010',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '用括号中所给词的适当形式填空。\n\nMatilda __1__ (study) English for three years. She __2__ (start) to learn it in 2023. She __3__ (read) English books every day. So far, she __4__ (finish) more than 50 books. She __5__ (be) happy with her progress.\n\n【10】- She __5__ (be) happy with her progress.',
    options: [
      'A. is',
      'B. are',
      'C. was',
      'D. be'
    ],
    correctAnswer: 'A',
    explanation: 'She是第三人称单数，用is。',
    chineseExplanation: '第三人称单数用is',
    relatedWords: ['w001'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  }
];

export default QUESTIONS;
