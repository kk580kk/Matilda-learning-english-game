/**
 * SRS 间隔重复系统 (SM-2 算法引擎)
 * 
 * 核心公式:
 * - EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
 * - I(1) = 1
 * - I(2) = 6
 * - I(n) = I(n-1) * EF
 */

import { 
  ReviewCard, 
  CardStatus, 
  VocabularyProgress,
  Word
} from '../types';

export interface ReviewResponse {
  quality: 0 | 1 | 2 | 3 | 4 | 5;  // 0-完全忘记 5-完美记住
  timeSpent: number;                 // 答题耗时(秒)
}

export interface ReviewStats {
  total: number;
  new: number;
  learning: number;
  review: number;
  dueToday: number;
}

class SRSEngine {
  // 最小难度因子
  private readonly MIN_EASE_FACTOR = 1.3;
  
  // 初始间隔 (天)
  private readonly INITIAL_INTERVALS = {
    [CardStatus.NEW]: 1,
    [CardStatus.LEARNING]: 1,
    [CardStatus.REVIEW]: 1,
    [CardStatus.RELARNING]: 1,
  };
  
  // 初始难度因子
  private readonly DEFAULT_EASE_FACTOR = 2.5;

  /**
   * 创建新卡片
   */
  createCard(
    type: 'word' | 'grammar' | 'question',
    itemId: string,
    sourceLevel?: string,
    sourceType: 'learning' | 'review' | 'wrong_book' = 'learning'
  ): ReviewCard {
    return {
      cardId: `${type}-${itemId}-${Date.now()}`,
      type,
      itemId,
      easeFactor: this.DEFAULT_EASE_FACTOR,
      interval: 0,
      repetitions: 0,
      nextReviewDate: new Date().toISOString(),
      sourceLevel,
      sourceType,
    };
  }

  /**
   * 从词汇创建复习卡片
   */
  createWordCard(word: Word, sourceLevel?: string): ReviewCard {
    return this.createCard('word', word.id, sourceLevel, 'learning');
  }

  /**
   * 处理复习响应
   * @param card 复习卡片
   * @param response 用户响应
   * @returns 更新后的卡片
   */
  processReview(card: ReviewCard, response: ReviewResponse): ReviewCard {
    const { quality } = response;
    
    // 如果是完全忘记，重新开始
    if (quality < 3) {
      return this.handleIncorrect(card);
    }
    
    return this.handleCorrect(card, quality);
  }

  /**
   * 处理正确回答
   */
  private handleCorrect(card: ReviewCard, quality: number): ReviewCard {
    const newCard = { ...card };
    newCard.repetitions += 1;
    
    // 计算新难度因子
    newCard.easeFactor = this.calculateNewEaseFactor(
      card.easeFactor, 
      quality
    );
    
    // 计算新间隔
    if (newCard.repetitions === 1) {
      newCard.interval = 1;
    } else if (newCard.repetitions === 2) {
      newCard.interval = 6;
    } else {
      newCard.interval = Math.round(card.interval * newCard.easeFactor);
    }
    
    // 更新状态
    if (card.status === CardStatus.LEARNING) {
      newCard.status = CardStatus.REVIEW;
    } else if (!card.status || card.status === CardStatus.NEW) {
      newCard.status = CardStatus.LEARNING;
    }
    
    // 更新下次复习日期
    newCard.nextReviewDate = this.calculateNextReviewDate(newCard.interval);
    newCard.lastReviewDate = new Date().toISOString();
    
    return newCard;
  }

  /**
   * 处理错误回答
   */
  private handleIncorrect(card: ReviewCard): ReviewCard {
    const newCard = { ...card };
    
    newCard.repetitions = 0;
    newCard.status = CardStatus.RELARNING;
    newCard.interval = this.INITIAL_INTERVALS[CardStatus.RELARNING];
    newCard.nextReviewDate = this.calculateNextReviewDate(newCard.interval);
    newCard.lastReviewDate = new Date().toISOString();
    
    return newCard;
  }

  /**
   * 计算新的难度因子
   * EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
   */
  private calculateNewEaseFactor(currentEF: number, quality: number): number {
    const newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    
    // 确保不低于最小值
    return Math.max(this.MIN_EASE_FACTOR, newEF);
  }

  /**
   * 计算下次复习日期
   */
  private calculateNextReviewDate(intervalDays: number): string {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    return nextDate.toISOString();
  }

  /**
   * 获取今日待复习卡片
   */
  getTodayReviewCards(allCards: ReviewCard[]): ReviewCard[] {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return allCards.filter(card => {
      const reviewDate = new Date(card.nextReviewDate);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate <= today;
    });
  }

  /**
   * 生成新卡片学习队列
   */
  generateLearningQueue(
    vocabulary: Record<string, VocabularyProgress>,
    maxNewPerDay: number = 20
  ): string[] {
    // 筛选新卡片
    const newWords = Object.entries(vocabulary)
      .filter(([_, progress]) => progress.status === CardStatus.NEW)
      .slice(0, maxNewPerDay)
      .map(([wordId]) => wordId);
    
    return newWords;
  }

  /**
   * 计算复习统计
   */
  calculateReviewStats(cards: ReviewCard[]): ReviewStats {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return {
      total: cards.length,
      new: cards.filter(c => !c.status || c.status === CardStatus.NEW).length,
      learning: cards.filter(c => c.status === CardStatus.LEARNING).length,
      review: cards.filter(c => c.status === CardStatus.REVIEW).length,
      dueToday: cards.filter(c => new Date(c.nextReviewDate) <= today).length,
    };
  }

  /**
   * 批量处理复习
   */
  batchProcessReview(
    cards: ReviewCard[],
    responses: Map<string, ReviewResponse>
  ): ReviewCard[] {
    return cards.map(card => {
      const response = responses.get(card.cardId);
      if (!response) return card;
      return this.processReview(card, response);
    });
  }

  /**
   * 预估下次复习时间（用于显示）
   */
  getNextReviewText(card: ReviewCard, quality: number): string {
    if (quality < 3) {
      return '稍后重试';
    }
    
    const tempCard = this.processReview(card, { quality: quality as 0|1|2|3|4|5, timeSpent: 0 });
    const days = tempCard.interval;
    
    if (days === 0) return '立即';
    if (days === 1) return '1天后';
    if (days < 7) return `${days}天后`;
    if (days < 30) return `${Math.round(days / 7)}周后`;
    return `${Math.round(days / 30)}个月后`;
  }
}

export const srsEngine = new SRSEngine();
