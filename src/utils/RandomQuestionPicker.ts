/**
 * RandomQuestionPicker v3.0
 * 随机抽题系统 - 基于 Fisher-Yates 洗牌算法
 * 
 * PRD v3.0 / SRS v3.0 规范实现
 */

import { QuestionV3, DifficultyDistribution, PickerOptions, QuestionCacheData } from '../types/v3';

export class RandomQuestionPicker {
  private questionPool: QuestionV3[];
  private options: PickerOptions;
  private usedQuestionIds: Set<string> = new Set();
  private currentSessionQuestions: QuestionV3[] = [];

  constructor(questionPool: QuestionV3[], options: PickerOptions = {}) {
    this.questionPool = [...questionPool];
    this.options = {
      cacheEnabled: true,
      shuffleAlgorithm: 'fisher-yates',
      ...options
    };
  }

  /**
   * Fisher-Yates 洗牌算法（确保真随机）
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Sattolo 洗牌算法（生成单一循环排列）
   * 用于需要保证每个元素都出现在不同位置的特定场景
   */
  private sattoloShuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i); // 注意这里是 i 不是 i+1
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 生成关卡题目集
   * @param count 题目数量（默认10）
   * @returns 随机抽取的题目数组
   */
  generateLevel(count: number = 10): QuestionV3[] {
    // 默认难度分布：简单20%，中等60%，困难20%
    const distribution: DifficultyDistribution = {
      easy: Math.floor(count * 0.2),
      medium: Math.floor(count * 0.6),
      hard: count - Math.floor(count * 0.2) - Math.floor(count * 0.6)
    };
    
    return this.generateLevelWithDifficulty(count, distribution);
  }

  /**
   * 按难度分布抽题
   * @param count 题目总数
   * @param distribution 难度分布配置
   */
  generateLevelWithDifficulty(
    count: number,
    distribution: DifficultyDistribution
  ): QuestionV3[] {
    const result: QuestionV3[] = [];

    // 按难度分组
    const byDifficulty = {
      easy: this.questionPool.filter(q => q.difficulty === 1),
      medium: this.questionPool.filter(q => q.difficulty === 2 || q.difficulty === 3),
      hard: this.questionPool.filter(q => q.difficulty === 4 || q.difficulty === 5)
    };

    // 按分布抽取
    const easyCount = Math.min(distribution.easy, byDifficulty.easy.length);
    const mediumCount = Math.min(distribution.medium, byDifficulty.medium.length);
    const hardCount = Math.min(distribution.hard, byDifficulty.hard.length);

    // 使用指定的洗牌算法
    const shuffle = this.options.shuffleAlgorithm === 'sattolo' 
      ? this.sattoloShuffle 
      : this.shuffleArray;

    result.push(...shuffle(byDifficulty.easy).slice(0, easyCount));
    result.push(...shuffle(byDifficulty.medium).slice(0, mediumCount));
    result.push(...shuffle(byDifficulty.hard).slice(0, hardCount));

    // 如果不足，从剩余题目中补足
    const remaining = count - result.length;
    if (remaining > 0) {
      const usedIds = new Set(result.map(q => q.id));
      const pool = this.questionPool.filter(q => !usedIds.has(q.id));
      result.push(...shuffle(pool).slice(0, remaining));
    }

    // 最后洗牌打乱顺序
    this.currentSessionQuestions = shuffle(result);
    
    // 记录已使用的题目
    this.currentSessionQuestions.forEach(q => this.usedQuestionIds.add(q.id));

    return this.currentSessionQuestions;
  }

  /**
   * 从指定文章题库中随机抽题
   * @param articleId 文章ID
   * @param count 抽取数量
   */
  generateFromArticle(articleId: string, count: number = 10): QuestionV3[] {
    const articleQuestions = this.questionPool.filter(q => q.articleId === articleId);
    
    if (articleQuestions.length === 0) {
      console.warn(`No questions found for article: ${articleId}`);
      return [];
    }

    const shuffled = this.shuffleArray(articleQuestions);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  /**
   * 获取剩余可用题目数量
   */
  getRemainingCount(): number {
    return this.questionPool.filter(q => !this.usedQuestionIds.has(q.id)).length;
  }

  /**
   * 获取题库总量
   */
  getTotalCount(): number {
    return this.questionPool.length;
  }

  /**
   * 重置当前会话（清空已使用题目记录）
   */
  reset(): void {
    this.usedQuestionIds.clear();
    this.currentSessionQuestions = [];
  }

  /**
   * 获取当前会话的题目
   */
  getCurrentSessionQuestions(): QuestionV3[] {
    return [...this.currentSessionQuestions];
  }

  /**
   * 缓存抽题结果
   * @param sessionId 会话ID
   */
  cacheResult(sessionId: string): void {
    if (!this.options.cacheEnabled) return;

    const cacheData: QuestionCacheData = {
      questions: this.currentSessionQuestions,
      timestamp: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000  // 24小时过期
    };

    try {
      localStorage.setItem(`matilda_questions_${sessionId}`, JSON.stringify(cacheData));
    } catch (e) {
      console.warn('Failed to cache questions:', e);
    }
  }

  /**
   * 从缓存恢复抽题结果
   * @param sessionId 会话ID
   * @returns 缓存的题目数组，如果不存在或已过期则返回 null
   */
  restoreFromCache(sessionId: string): QuestionV3[] | null {
    if (!this.options.cacheEnabled) return null;

    try {
      const data = localStorage.getItem(`matilda_questions_${sessionId}`);
      if (!data) return null;

      const parsed: QuestionCacheData = JSON.parse(data);
      
      // 检查是否过期
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem(`matilda_questions_${sessionId}`);
        return null;
      }

      this.currentSessionQuestions = parsed.questions;
      return parsed.questions;
    } catch (e) {
      console.warn('Failed to restore questions from cache:', e);
      return null;
    }
  }

  /**
   * 清除指定会话的缓存
   * @param sessionId 会话ID
   */
  clearCache(sessionId: string): void {
    try {
      localStorage.removeItem(`matilda_questions_${sessionId}`);
    } catch (e) {
      console.warn('Failed to clear cache:', e);
    }
  }

  /**
   * 清除所有过期的缓存
   */
  static clearExpiredCache(): void {
    const now = Date.now();
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('matilda_questions_')) {
        try {
          const data: QuestionCacheData = JSON.parse(localStorage.getItem(key)!);
          if (now > data.expiresAt) {
            keysToRemove.push(key);
          }
        } catch (e) {
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

/**
 * 创建抽题器的工厂函数
 */
export function createQuestionPicker(
  questionPool: QuestionV3[],
  options?: PickerOptions
): RandomQuestionPicker {
  return new RandomQuestionPicker(questionPool, options);
}

/**
 * 快速抽题函数
 */
export function pickRandomQuestions(
  questions: QuestionV3[],
  count: number = 10
): QuestionV3[] {
  const picker = new RandomQuestionPicker(questions);
  return picker.generateLevel(count);
}
