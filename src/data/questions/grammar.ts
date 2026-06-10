import { Question, QuestionType, ExamType } from '../../types';

/**
 * 语法选择题 - L1-L2关卡用
 * 难度：1-3级（简单到中等）
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 一般现在时选择题
  // ============================================================
  {
    id: 'g1-001',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'She ___ English every day.',
    options: [
      'A. study',
      'B. studies',
      'C. studying',
      'D. studied'
    ],
    correctAnswer: 'B',
    explanation: '第三人称单数She后面，动词加-s。study→studies。',
    chineseExplanation: '一般现在时中，第三人称单数（he/she/it）谓语动词加-s或-es',
    relatedWords: ['w122', 'w055'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g1-002',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'My mother ___ breakfast at 7:00 every morning.',
    options: [
      'A. have',
      'B. has',
      'C. having',
      'D. to have'
    ],
    correctAnswer: 'B',
    explanation: '第三人称单数My mother，动词用has。',
    chineseExplanation: 'have的第三人称单数形式是has',
    relatedWords: ['w002', 'w131'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g1-003',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'He ___ like coffee.',
    options: [
      'A. don\'t',
      'B. doesn\'t',
      'C. not',
      'D. no'
    ],
    correctAnswer: 'B',
    explanation: '第三人称单数否定用doesn\'t，后接动词原形。',
    chineseExplanation: '否定句：第三人称单数用doesn\'t + 动词原形',
    relatedWords: ['w127'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 现在进行时选择题
  // ============================================================
  {
    id: 'g1-004',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'Look! The children ___ in the park.',
    options: [
      'A. play',
      'B. plays',
      'C. playing',
      'D. are playing'
    ],
    correctAnswer: 'D',
    explanation: 'Look提示动作正在进行，用现在进行时are playing。',
    chineseExplanation: '现在进行时构成：be(am/is/are) + 动词-ing',
    relatedWords: ['w033', 'w043'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'g1-005',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'She ___ a letter now.',
    options: [
      'A. write',
      'B. writes',
      'C. writing',
      'D. is writing'
    ],
    correctAnswer: 'D',
    explanation: 'now提示动作正在进行，用现在进行时is writing。',
    chineseExplanation: 'now是现在进行时的标志性时间状语',
    relatedWords: ['w040'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'g1-006',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'What ___ he ___? He is reading a book.',
    options: [
      'A. is, doing',
      'B. are, doing',
      'C. do, do',
      'D. does, do'
    ],
    correctAnswer: 'A',
    explanation: '回答是He is reading，用What is he doing?',
    chineseExplanation: '现在进行时提问用What is + 主语 + doing?',
    relatedWords: ['w040'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  // ============================================================
  // 现在完成时选择题
  // ============================================================
  {
    id: 'g1-007',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'I ___ my homework already.',
    options: [
      'A. finish',
      'B. finishes',
      'C. finished',
      'D. have finished'
    ],
    correctAnswer: 'D',
    explanation: 'already用于现在完成时，表示已经完成。',
    chineseExplanation: '现在完成时：have/has + 过去分词',
    relatedWords: ['w129'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g1-008',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'She ___ in this school for five years.',
    options: [
      'A. teaches',
      'B. taught',
      'C. is teaching',
      'D. has taught'
    ],
    correctAnswer: 'D',
    explanation: 'for five years表示一段时间，用现在完成时has taught。',
    chineseExplanation: '现在完成时可以表示过去开始的动作持续到现在',
    relatedWords: ['w055'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g1-009',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'Have you ___ to Beijing?',
    options: [
      'A. be',
      'B. been',
      'C. being',
      'D. was'
    ],
    correctAnswer: 'B',
    explanation: '现在完成时中been是go的过去分词。Have you been to表示"去过某地"。',
    chineseExplanation: 'have been to 表示曾经去过某地（已回来）',
    relatedWords: ['w007'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  // ============================================================
  // 时态综合选择题
  // ============================================================
  {
    id: 'g1-010',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'I ___ a movie yesterday.',
    options: [
      'A. watch',
      'B. watches',
      'C. watched',
      'D. am watching'
    ],
    correctAnswer: 'C',
    explanation: 'yesterday是过去式的时间标志，用watched。',
    chineseExplanation: '一般过去时表示过去发生的动作，yesterday是标志词',
    relatedWords: ['w033'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 定语从句选择题 - L2
  // ============================================================
  {
    id: 'g2-001',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'The girl ___ is singing is my sister.',
    options: [
      'A. who',
      'B. which',
      'C. that',
      'D. A and C'
    ],
    correctAnswer: 'D',
    explanation: '指人，用who或that。',
    chineseExplanation: '定语从句中who和that都可以指人',
    relatedWords: ['w118', 'w119'],
    relatedGrammar: ['attributive-clause-basic'],
    usageCount: 0
  },
  {
    id: 'g2-002',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'I like the book ___ you gave me.',
    options: [
      'A. who',
      'B. which',
      'C. whose',
      'D. where'
    ],
    correctAnswer: 'B',
    explanation: '指物，用which。you gave me是定语从句，修饰the book。',
    chineseExplanation: '定语从句中which指物，在从句中作gave的宾语',
    relatedWords: ['w120', 'w016'],
    relatedGrammar: ['attributive-clause-basic'],
    usageCount: 0
  },
  {
    id: 'g2-003',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'This is the reason ___ he was late.',
    options: [
      'A. why',
      'B. because',
      'C. when',
      'D. where'
    ],
    correctAnswer: 'A',
    explanation: 'the reason后用why引导定语从句。',
    chineseExplanation: 'reason后用why引导定语从句，这是固定搭配',
    relatedWords: ['w101'],
    relatedGrammar: ['attributive-clause-basic'],
    usageCount: 0
  },
  {
    id: 'g2-004',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'The school ___ I studied is very famous.',
    options: [
      'A. who',
      'B. which',
      'C. that',
      'D. where'
    ],
    correctAnswer: 'D',
    explanation: '在从句中作地点状语，用where。',
    chineseExplanation: 'where在定语从句中作地点状语',
    relatedWords: ['w051'],
    relatedGrammar: ['attributive-clause-basic'],
    usageCount: 0
  },
  {
    id: 'g2-005',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'The student ___ name is Tom is very clever.',
    options: [
      'A. who',
      'B. which',
      'C. whose',
      'D. that'
    ],
    correctAnswer: 'C',
    explanation: 'whose表示所有格，表示"那个学生的名字"。',
    chineseExplanation: 'whose表示所有关系，相当于of whom',
    relatedWords: ['w118'],
    relatedGrammar: ['attributive-clause-basic'],
    usageCount: 0
  },
  // ============================================================
  // 更多时态选择题
  // ============================================================
  {
    id: 'g3-001',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '___ you like apples?',
    options: [
      'A. Do',
      'B. Does',
      'C. Are',
      'D. Is'
    ],
    correctAnswer: 'A',
    explanation: '一般疑问句中，you用Do。',
    chineseExplanation: '一般现在时疑问句：第一人称用Do you...',
    relatedWords: ['w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g3-002',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'He usually ___ to school on foot.',
    options: [
      'A. go',
      'B. goes',
      'C. going',
      'D. to go'
    ],
    correctAnswer: 'B',
    explanation: 'usually是一般现在时的标志词，主语是第三人称单数，用goes。',
    chineseExplanation: 'usually/always/often等频率副词与一般现在时连用',
    relatedWords: ['w007', 'w051'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'g3-003',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'I ___ English since 2020.',
    options: [
      'A. learn',
      'B. learns',
      'C. learned',
      'D. have learned'
    ],
    correctAnswer: 'D',
    explanation: 'since表示"自从"，用于现在完成时。',
    chineseExplanation: 'since + 时间点，用于现在完成时',
    relatedWords: ['w122'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'g3-004',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'Listen! Someone ___ in the next room.',
    options: [
      'A. sing',
      'B. sings',
      'C. singing',
      'D. is singing'
    ],
    correctAnswer: 'D',
    explanation: 'Listen是现在进行时的标志词，表示正在发生。',
    chineseExplanation: 'Listen!/Look!等提示词提示现在进行时',
    relatedWords: ['w032'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'g3-005',
    type: QuestionType.GRAMMAR_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: 'My mother ___ for three hours.',
    options: [
      'A. cooks',
      'B. cooked',
      'C. is cooking',
      'D. has cooked'
    ],
    correctAnswer: 'D',
    explanation: 'for three hours表示一段时间，用现在完成时has cooked。',
    chineseExplanation: 'for + 时间段用于现在完成时',
    relatedWords: ['w132'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  }
];

export default QUESTIONS;
