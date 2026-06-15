/**
 * v3.0 工具函数
 * 用于兼容 v2.5 数据和 v3.0 功能
 */

import { Question } from '../types';
import { QuestionV3, OptionV3, ReadingProgress } from '../types/v3';

/**
 * 将 v2.5 题目转换为 v3.0 格式
 * 自动分析选项难度
 */
export function convertToV3(question: Question, articleId: string = ''): QuestionV3 {
  // 解析选项
  const optionsV3: OptionV3[] = question.options?.map((opt, index) => {
    const optionId = String.fromCharCode(65 + index); // A, B, C, D
    const isCorrect = optionId === question.correctAnswer;
    
    // 根据选项位置和正确性推断难度
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    let distractorType: 'irrelevant' | 'partial' | 'plausible' | 'tricky' | undefined;
    
    if (isCorrect) {
      difficulty = 'medium'; // 正确答案为中等难度
    } else {
      // 根据位置推断干扰项难度
      if (index === 0) {
        difficulty = 'easy';
        distractorType = 'irrelevant';
      } else if (index === 3) {
        difficulty = 'hard';
        distractorType = 'plausible';
      } else {
        difficulty = 'medium';
        distractorType = 'partial';
      }
    }

    return {
      id: optionId,
      text: opt,
      difficulty,
      isCorrect,
      distractorType
    };
  }) || [];

  // 推断题目类型
  const questionSubtype = inferQuestionType(question.stem);

  // 提取关键词（简化处理）
  const keyword = extractKeyword(question.stem);

  return {
    ...question,
    articleId,
    optionsV3,
    questionSubtype,
    location: {
      paragraphIndex: 0,
      keyword
    },
    explanationV3: {
      chinese: question.chineseExplanation || question.explanation || '',
      english: question.explanation
    }
  };
}

/**
 * 根据题干推断题目类型
 */
function inferQuestionType(stem: string): 'detail' | 'inference' | 'vocabulary' | 'main_idea' {
  const lowerStem = stem.toLowerCase();
  
  // 词汇理解题特征
  if (lowerStem.includes('mean') || lowerStem.includes('"') || lowerStem.includes("'")) {
    return 'vocabulary';
  }
  
  // 主旨大意题特征
  if (lowerStem.includes('main idea') || lowerStem.includes('mainly about') || 
      lowerStem.includes('best title') || lowerStem.includes('purpose')) {
    return 'main_idea';
  }
  
  // 推理判断题特征
  if (lowerStem.includes('infer') || lowerStem.includes('imply') || 
      lowerStem.includes('suggest') || lowerStem.includes('conclude') ||
      lowerStem.includes('why') || lowerStem.includes('what can we learn')) {
    return 'inference';
  }
  
  // 默认为细节理解题
  return 'detail';
}

/**
 * 从题干提取关键词
 */
function extractKeyword(stem: string): string {
  // 移除常见疑问词
  const cleaned = stem
    .replace(/^(What|Why|How|When|Where|Who|Which)\s+/i, '')
    .replace(/\?.*$/, '');
  
  // 提取前两个重要单词
  const words = cleaned.split(/\s+/).filter(w => w.length > 3);
  return words.slice(0, 2).join(' ') || 'Matilda';
}

/**
 * 批量转换题目
 */
export function convertQuestionsToV3(
  questions: Question[],
  articleId: string = ''
): QuestionV3[] {
  return questions.map(q => convertToV3(q, articleId));
}

/**
 * 计算阅读进度
 */
export function calculateReadingProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  if (scrollHeight <= clientHeight) return 100;
  const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
}

/**
 * 保存阅读进度到 localStorage
 */
export function saveReadingProgress(progress: ReadingProgress): void {
  try {
    const key = `matilda_reading_progress_${progress.articleId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (e) {
    console.warn('Failed to save reading progress:', e);
  }
}

/**
 * 从 localStorage 读取阅读进度
 */
export function loadReadingProgress(articleId: string): ReadingProgress | null {
  try {
    const key = `matilda_reading_progress_${articleId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.warn('Failed to load reading progress:', e);
    return null;
  }
}

/**
 * 清除阅读进度
 */
export function clearReadingProgress(articleId: string): void {
  try {
    const key = `matilda_reading_progress_${articleId}`;
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Failed to clear reading progress:', e);
  }
}

/**
 * 计算加权得分（基于选项难度）
 */
export function calculateWeightedScore(
  isCorrect: boolean,
  selectedOptionDifficulty: 'easy' | 'medium' | 'hard',
  questionDifficulty: number
): number {
  if (!isCorrect) return 0;
  
  const baseScore = 10;
  
  // 选项难度系数
  const difficultyMultiplier = {
    easy: 1.0,
    medium: 1.2,
    hard: 1.5
  };
  
  // 题目难度系数
  const questionMultiplier = {
    1: 1.0,
    2: 1.1,
    3: 1.3,
    4: 1.5,
    5: 2.0
  };
  
  return Math.round(
    baseScore * 
    difficultyMultiplier[selectedOptionDifficulty] * 
    (questionMultiplier[questionDifficulty as keyof typeof questionMultiplier] || 1.0)
  );
}

/**
 * 生成会话ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 格式化时间（秒 -> mm:ss）
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
