import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 7: [章节英文名] - 阅读理解题
 * 来源: Matilda.md 第X-XX行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 * 
 * PRD v1.0 / SRS v1.0 规范
 */

// ============================================
// 段落 1: [段落标题]
// 词数: XXX 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_7_1 = "";

// ============================================
// 段落 2: [段落标题]
// 词数: XXX 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_7_2 = "";

// ============================================
// 段落 3: [段落标题]（可选）
// 词数: XXX 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_7_3 = "";

// ============================================
// 段落定义（用于关卡渲染）
// ============================================
export interface Passage {
  id: string;
  title: string;
  titleZh: string;
  text: string;
  wordCount: number;
  difficulty: number;
  chapterNumber: number;
  chapterTitle: string;
}

export const CHAPTER7_PASSAGES: Passage[] = [
  {
    id: 'c7-p1',
    title: '[段落1英文标题]',
    titleZh: '[段落1中文标题]',
    text: PASSAGE_7_1,
    wordCount: 0, // 产品规划部填写实际词数
    difficulty: 2,
    chapterNumber: 6,
    chapterTitle: '[章节英文名]'
  },
  {
    id: 'c7-p2',
    title: '[段落2英文标题]',
    titleZh: '[段落2中文标题]',
    text: PASSAGE_7_2,
    wordCount: 0, // 产品规划部填写实际词数
    difficulty: 3,
    chapterNumber: 6,
    chapterTitle: '[章节英文名]'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER7_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c7-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_1 + "\n\n【细节理解】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'A',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  },
  {
    id: 'c7-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_1 + "\n\n【推理判断】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'B',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  },
  {
    id: 'c7-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_1 + "\n\n【推理判断/词汇理解】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'C',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c7-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_2 + "\n\n【细节理解】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'A',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  },
  {
    id: 'c7-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_2 + "\n\n【细节理解/推理判断】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'B',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  },
  {
    id: 'c7-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: [章节英文名]】\n" + PASSAGE_7_2 + "\n\n【推理判断/词汇理解】[问题]",
    options: [
      'A. [选项A]',
      'B. [选项B]',
      'C. [选项C]',
      'D. [选项D]'
    ],
    correctAnswer: 'C',
    explanation: '[英文解析]',
    chineseExplanation: '[中文解析]',
    relatedWords: ['[关键词1]', '[关键词2]'],
    relatedGrammar: ['[语法点]'],
    usageCount: 0
  }
];

// ============================================
// 工具函数
// ============================================

/**
 * 根据段落ID获取对应的题目
 */
export function getQuestionsByPassageId(passageId: string): Question[] {
  const passage = CHAPTER7_PASSAGES.find(p => p.id === passageId);
  if (!passage) return [];
  
  return CHAPTER7_QUESTIONS.filter(q => q.id.startsWith(passageId));
}

/**
 * 获取指定难度的题目
 */
export function getQuestionsByDifficulty(difficulty: number): Question[] {
  return CHAPTER7_QUESTIONS.filter(q => q.difficulty === difficulty);
}

/**
 * 获取所有段落
 */
export function getAllPassages(): Passage[] {
  return CHAPTER7_PASSAGES;
}
