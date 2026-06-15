/**
 * 题库数据导出索引
 * 
 * PRD v3.2 更新：使用原著阅读理解题
 * - 所有阅读题必须引用玛蒂尔达原著原文
 * - 禁止自创作内容
 */

// 原著阅读理解题（Chapter 1-5）
export { 
  ALL_READING_QUESTIONS as READING_QUESTIONS,
  getQuestionsByChapter,
  getQuestionsByDifficulty,
  getRandomQuestions,
  getReadingStats
} from './reading/index';

// 获取阅读短文（从原著题目中提取）
export const getReadingPassage = (): string => {
  // 返回 Chapter 1 第一段作为 L1 阅读短文
  return "Nearly every weekday afternoon Matilda was left alone in the house. Her brother (five years older than her) went to school. Her father went to work and her mother went out playing bingo in a town eight miles away. Mrs Wormwood was hooked on bingo and played it five afternoons a week.";
};

export { getQuestionsByIds } from './reading/index';

export { QUESTIONS as CLOZE_QUESTIONS } from './cloze';
export { QUESTIONS as GRAMMAR_QUESTIONS } from './grammar';
