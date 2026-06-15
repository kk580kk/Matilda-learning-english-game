/**
 * 阅读理解题 - 索引文件（增强版）
 * 
 * 本文件汇总所有章节的阅读理解题
 * 增强功能:
 * - 长文章（1000+词）
 * - 题库系统（每篇文章多组题目，支持随机抽题）
 * - 难度分级（简单/中等/困难题目混合）
 * 
 * PRD v1.1 / SRS v1.1 规范
 */

import { Question } from '../../../types';
import CHAPTER1_QUESTIONS from './chapter1';
import CHAPTER2_QUESTIONS from './chapter2';
import CHAPTER3_QUESTIONS from './chapter3';
import CHAPTER4_QUESTIONS from './chapter4';
import CHAPTER5_QUESTIONS from './chapter5';

// 导入增强版 Chapter 1
import { 
  CHAPTER1_PASSAGES as CHAPTER1_ENHANCED_PASSAGES,
  selectQuestionsByDifficulty,
  selectRandomQuestions,
  getChapter1Stats,
  QuestionSelectionConfig
} from './chapter1-enhanced';

// ============================================
// 所有章节的题目汇总
// ============================================

export const ALL_READING_QUESTIONS: Question[] = [
  ...CHAPTER1_QUESTIONS,
  ...CHAPTER2_QUESTIONS,
  ...CHAPTER3_QUESTIONS,
  ...CHAPTER4_QUESTIONS,
  ...CHAPTER5_QUESTIONS
];

// ============================================
// 增强版题库导出
// ============================================

export type { 
  QuestionSelectionConfig
};

export { 
  CHAPTER1_ENHANCED_PASSAGES,
  selectQuestionsByDifficulty,
  selectRandomQuestions,
  getChapter1Stats
};

// ============================================
// 章节统计信息
// ============================================

export const CHAPTER_STATS = [
  {
    chapterNumber: 1,
    title: 'The Reader of Books',
    titleZh: '爱读书的女孩',
    totalQuestions: CHAPTER1_QUESTIONS.length,
    difficultyRange: 'Level 1-4',
    passages: 3
  },
  {
    chapterNumber: 2,
    title: 'Mr Wormwood, the Great Car Dealer',
    titleZh: '二手车经销商',
    totalQuestions: CHAPTER2_QUESTIONS.length,
    difficultyRange: 'Level 2-4',
    passages: 2
  },
  {
    chapterNumber: 3,
    title: 'The Hat and the Superglue',
    titleZh: '帽子与强力胶',
    totalQuestions: CHAPTER3_QUESTIONS.length,
    difficultyRange: 'Level 3-4',
    passages: 2
  },
  {
    chapterNumber: 4,
    title: 'The Ghost',
    titleZh: '幽灵',
    totalQuestions: CHAPTER4_QUESTIONS.length,
    difficultyRange: 'Level 2-4',
    passages: 3
  },
  {
    chapterNumber: 5,
    title: 'Arithmetic',
    titleZh: '算术',
    totalQuestions: CHAPTER5_QUESTIONS.length,
    difficultyRange: 'Level 2-4',
    passages: 3
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取所有阅读理解题
 */
export const getAllReadingQuestions = (): Question[] => {
  return ALL_READING_QUESTIONS;
};

/**
 * 根据章节获取题目
 */
export const getQuestionsByChapter = (chapterNumber: number): Question[] => {
  switch (chapterNumber) {
    case 1:
      return CHAPTER1_QUESTIONS;
    case 2:
      return CHAPTER2_QUESTIONS;
    case 3:
      return CHAPTER3_QUESTIONS;
    case 4:
      return CHAPTER4_QUESTIONS;
    case 5:
      return CHAPTER5_QUESTIONS;
    default:
      return [];
  }
};

/**
 * 根据难度获取题目
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return ALL_READING_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...ALL_READING_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取指定ID的题目
 */
export const getQuestionsByIds = (ids: string[]): Question[] => {
  return ALL_READING_QUESTIONS.filter(q => ids.includes(q.id));
};

/**
 * 获取统计信息
 */
export const getReadingStats = () => {
  return {
    totalChapters: CHAPTER_STATS.length,
    totalQuestions: ALL_READING_QUESTIONS.length,
    totalPassages: CHAPTER_STATS.reduce((sum, ch) => sum + ch.passages, 0),
    difficultyDistribution: {
      level1: ALL_READING_QUESTIONS.filter(q => q.difficulty === 1).length,
      level2: ALL_READING_QUESTIONS.filter(q => q.difficulty === 2).length,
      level3: ALL_READING_QUESTIONS.filter(q => q.difficulty === 3).length,
      level4: ALL_READING_QUESTIONS.filter(q => q.difficulty === 4).length
    },
    chapterStats: CHAPTER_STATS
  };
};

// 导出各章节题目
export { CHAPTER1_QUESTIONS, CHAPTER2_QUESTIONS, CHAPTER3_QUESTIONS, CHAPTER4_QUESTIONS, CHAPTER5_QUESTIONS };

export default ALL_READING_QUESTIONS;
