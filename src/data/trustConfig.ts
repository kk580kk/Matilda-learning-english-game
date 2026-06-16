// ============================================================
// 蜜糖老师好感度系统配置 (PRD v3.1)
// ============================================================

import { TrustLevel } from '../types/story';

/** 信任等级配置 */
export interface LevelConfig {
  minValue: number;
  maxValue: number;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  unlocks: string[];
}

/** 信任等级配置表 */
export const TRUST_LEVEL_CONFIG: Record<TrustLevel, LevelConfig> = {
  [TrustLevel.STRANGER]: {
    minValue: 0,
    maxValue: 24,
    name: '陌生人',
    nameEn: 'Stranger',
    icon: '🤝',
    color: '#9E9E9E',
    unlocks: ['basic_dialogue']
  },
  [TrustLevel.ACQUAINTANCE]: {
    minValue: 25,
    maxValue: 49,
    name: '熟人',
    nameEn: 'Acquaintance',
    icon: '🙂',
    color: '#FFC107',
    unlocks: ['basic_dialogue', 'encouragement_voice']
  },
  [TrustLevel.FRIEND]: {
    minValue: 50,
    maxValue: 74,
    name: '朋友',
    nameEn: 'Friend',
    icon: '💛',
    color: '#FF9800',
    unlocks: ['basic_dialogue', 'encouragement_voice', 'study_tips']
  },
  [TrustLevel.CONFIDANT]: {
    minValue: 75,
    maxValue: 99,
    name: '密友',
    nameEn: 'Close Friend',
    icon: '💝',
    color: '#F44336',
    unlocks: ['basic_dialogue', 'encouragement_voice', 'study_tips', 'hidden_story']
  },
  [TrustLevel.BEST_FRIEND]: {
    minValue: 100,
    maxValue: 100,
    name: '挚友',
    nameEn: 'Best Friend',
    icon: '💎',
    color: '#9C27B0',
    unlocks: ['basic_dialogue', 'encouragement_voice', 'study_tips', 'hidden_story', 'easter_egg']
  }
};

/** 信任计算配置 */
export const TRUST_CALCULATOR_CONFIG = {
  // 每次刷题获得好感度范围
  baseTrustPerPlay: { min: 20, max: 35 },
  
  // 正确率加成
  accuracyBonus: {
    complete: 0 as number,      // 完成即得
    pass60: 10 as number,       // ≥60%
    pass80: 15 as number,       // ≥80%
    perfect: 25 as number       // 100%
  },
  
  // 首次通关额外奖励
  firstCompleteBonus: 30,
  
  // 重复刷题衰减系数（第1,2,3,4+次）
  replayDecay: [1.0, 0.85, 0.75, 0.65] as const,
  
  // 每个等级所需刷题次数（固定）
  playsPerLevel: 4,
  
  // 每日任务奖励
  dailyTaskRewards: {
    login: 10,
    complete3Questions: 15,
    streak7Days: 50,
    share: 20,
    invite: 30
  }
} as const;

/** 信任来源类型 */
export type TrustSourceType = 
  | 'level_complete' 
  | 'daily_task' 
  | 'story_choice' 
  | 'daily_login';

/** 信任来源记录 */
export interface TrustSource {
  source: TrustSourceType;
  amount: number;
  timestamp: number;
  metadata?: {
    levelId?: string;
    taskType?: string;
    choiceId?: string;
    accuracy?: number;
    isFirstComplete?: boolean;
  };
}

/** 每日好感度统计 */
export interface DailyTrustStats {
  date: string;           // YYYY-MM-DD
  gained: number;         // 今日获得
  sources: TrustSource[]; // 来源明细
}

/** 关卡重复刷题统计 */
export interface LevelReplayStats {
  levelId: string;
  playCount: number;      // 总刷题次数
  firstCompleteAt: number; // 首次通关时间
  lastPlayAt: number;     // 上次刷题时间
  totalTrustGained: number; // 该关卡累计获得好感度
}

/** 等级提升记录 */
export interface LevelRecord {
  level: TrustLevel;
  reachedAt: number;      // 达到该等级的时间戳
  trustValueAtLevel: number; // 达到时的好感度值
  durationFromLast: number; // 距离上一等级的时长(秒)
}

/** 好感度计算结果 */
export interface TrustCalculationResult {
  totalTrust: number;
  sources: TrustSource[];
  decayApplied: boolean;
  decayFactor: number;
}

// ============================================================
// 信任计算工具类
// ============================================================

export class TrustCalculator {
  private config = TRUST_CALCULATOR_CONFIG;

  /**
   * 计算关卡完成获得的好感度
   */
  calculateLevelTrust(
    levelId: string,
    accuracy: number,           // 正确率 0-1
    isFirstComplete: boolean,   // 是否首次通关
    replayCount: number         // 该关卡已刷次数（含本次）
  ): TrustCalculationResult {
    let trust = 0;
    const sources: TrustSource[] = [];

    // 1. 基础完成奖励（随机 20-35）
    const baseReward = this.getRandomInRange(
      this.config.baseTrustPerPlay.min,
      this.config.baseTrustPerPlay.max
    );
    trust += baseReward;
    sources.push({
      source: 'level_complete',
      amount: baseReward,
      timestamp: Date.now(),
      metadata: { levelId }
    });

    // 2. 正确率加成
    let accuracyBonus = this.config.accuracyBonus.complete;
    if (accuracy >= 1.0) {
      accuracyBonus = this.config.accuracyBonus.perfect;
    } else if (accuracy >= 0.8) {
      accuracyBonus = this.config.accuracyBonus.pass80;
    } else if (accuracy >= 0.6) {
      accuracyBonus = this.config.accuracyBonus.pass60;
    }
    
    if (accuracyBonus > 0) {
      trust += accuracyBonus;
      sources.push({
        source: 'level_complete',
        amount: accuracyBonus,
        timestamp: Date.now(),
        metadata: { levelId, accuracy }
      });
    }

    // 3. 首次通关奖励
    if (isFirstComplete) {
      trust += this.config.firstCompleteBonus;
      sources.push({
        source: 'level_complete',
        amount: this.config.firstCompleteBonus,
        timestamp: Date.now(),
        metadata: { levelId, isFirstComplete: true }
      });
    }

    // 4. 重复刷题递减
    const decayIndex = Math.min(replayCount - 1, 3);
    const decayFactor = this.config.replayDecay[decayIndex];
    const finalTrust = Math.round(trust * decayFactor);

    return {
      totalTrust: finalTrust,
      sources,
      decayApplied: decayFactor < 1.0,
      decayFactor
    };
  }

  /**
   * 计算每日任务奖励
   */
  calculateDailyTaskTrust(taskType: keyof typeof this.config.dailyTaskRewards): number {
    return this.config.dailyTaskRewards[taskType] || 0;
  }

  /**
   * 计算剧情选择好感度变化
   */
  calculateStoryChoiceTrust(choiceType: 'positive' | 'neutral' | 'negative'): number {
    const changes = { positive: 7, neutral: 0, negative: -5 };
    return changes[choiceType];
  }

  /**
   * 计算下一等级所需刷题次数（固定值）
   */
  calculatePlaysForNextLevel(): number {
    return this.config.playsPerLevel;
  }

  /**
   * 根据好感度计算当前等级
   */
  calculateLevel(trustValue: number): TrustLevel {
    if (trustValue >= 100) return TrustLevel.BEST_FRIEND;
    if (trustValue >= 75) return TrustLevel.CONFIDANT;
    if (trustValue >= 50) return TrustLevel.FRIEND;
    if (trustValue >= 25) return TrustLevel.ACQUAINTANCE;
    return TrustLevel.STRANGER;
  }

  /**
   * 计算距离下一等级还需多少好感度
   */
  calculateTrustToNextLevel(trustValue: number): number {
    const currentLevel = this.calculateLevel(trustValue);
    const levelKeys = Object.values(TrustLevel);
    const currentIndex = levelKeys.indexOf(currentLevel);
    const nextLevel = levelKeys[currentIndex + 1];
    
    if (!nextLevel) return 0; // 已满级
    return TRUST_LEVEL_CONFIG[nextLevel].minValue - trustValue;
  }

  /**
   * 计算当前等级内的进度百分比
   */
  calculateLevelProgress(trustValue: number): number {
    const level = this.calculateLevel(trustValue);
    const config = TRUST_LEVEL_CONFIG[level];
    const range = config.maxValue - config.minValue;
    const current = trustValue - config.minValue;
    return Math.min(100, Math.max(0, (current / range) * 100));
  }

  /**
   * 获取该关卡可获得的好感度范围
   */
  getLevelRewardRange(playCount: number): { min: number; max: number } {
    const decayIndex = Math.min(playCount, 3);
    const decayFactor = this.config.replayDecay[decayIndex];
    
    // 首次：基础(20-35) + 首次(30) + 正确率加成(0-25) = 50-90
    // 后续：基础 * 衰减
    if (playCount === 0) {
      return {
        min: Math.round((this.config.baseTrustPerPlay.min + this.config.firstCompleteBonus) * decayFactor),
        max: Math.round((this.config.baseTrustPerPlay.max + this.config.firstCompleteBonus + this.config.accuracyBonus.perfect) * decayFactor)
      };
    }
    return {
      min: Math.round(this.config.baseTrustPerPlay.min * decayFactor),
      max: Math.round((this.config.baseTrustPerPlay.max + this.config.accuracyBonus.perfect) * decayFactor)
    };
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// 导出单例
export const trustCalculator = new TrustCalculator();
