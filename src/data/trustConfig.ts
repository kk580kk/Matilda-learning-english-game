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

/** 蜜糖老师反馈配置 */
export const MISS_HONEY_FEEDBACK = {
  // 完美表现
  perfect: {
    trustChange: 30,
    message: "太棒了！你真是天才！",
    emoji: "🥰",
    color: "#4CAF50"
  },
  // 良好 (80-99%)
  good: {
    trustChange: 15,
    message: "做得不错，继续保持！",
    emoji: "😊",
    color: "#8BC34A"
  },
  // 一般 (60-79%)
  okay: {
    trustChange: 5,
    message: "还可以，再努力一点~",
    emoji: "🙂",
    color: "#FFC107"
  },
  // 及格边缘 (40-59%)
  poor: {
    trustChange: 0,
    message: "要认真思考哦...",
    emoji: "😐",
    color: "#FF9800"
  },
  // 不及格 (<40%)
  fail: {
    trustChange: -10,
    message: "你在敷衍我吗？",
    emoji: "😟",
    color: "#F44336"
  },
  // 连续低分惩罚阈值
  consecutiveLowThreshold: 3,
  consecutiveLowPenalty: -5
} as const;

/** 信任计算配置 */
export const TRUST_CALCULATOR_CONFIG = {
  // 正确率对应好感度（匹配天才人设）
  accuracyTrust: {
    perfect: 30,    // 100%
    good: 15,       // 80-99%
    okay: 5,        // 60-79%
    poor: 0,        // 40-59%
    fail: -10       // <40%
  },
  
  // 首次通关额外奖励（仅正奖励生效）
  firstCompleteBonus: 20,
  
  // 重复刷题衰减系数（第1,2,3,4+次）- 更平缓
  replayDecay: [1.0, 0.9, 0.8, 0.7] as const,
  
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
    feedbackType?: string;
    decayFactor?: number;
    isDecay?: boolean;
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

/** 蜜糖老师反馈 */
export interface HoneyFeedback {
  trustChange: number;
  message: string;
  emoji: string;
  color: string;
}

/** 好感度计算结果 */
export interface TrustCalculationResult {
  totalTrust: number;
  sources: TrustSource[];
  decayApplied: boolean;
  decayFactor: number;
  feedback?: HoneyFeedback;  // 蜜糖老师反馈
}

// ============================================================
// 信任计算工具类
// ============================================================

export class TrustCalculator {
  private config = TRUST_CALCULATOR_CONFIG;

  /**
   * 计算关卡完成获得的好感度（匹配天才人设）
   */
  calculateLevelTrust(
    levelId: string,
    accuracy: number,           // 正确率 0-1
    isFirstComplete: boolean,   // 是否首次通关
    replayCount: number         // 该关卡已刷次数（含本次）
  ): TrustCalculationResult {
    const sources: TrustSource[] = [];
    
    // 1. 根据正确率计算基础好感度
    let trustChange = 0;
    let feedbackType: keyof typeof MISS_HONEY_FEEDBACK = 'poor';
    
    if (accuracy >= 1.0) {
      trustChange = this.config.accuracyTrust.perfect;
      feedbackType = 'perfect';
    } else if (accuracy >= 0.8) {
      trustChange = this.config.accuracyTrust.good;
      feedbackType = 'good';
    } else if (accuracy >= 0.6) {
      trustChange = this.config.accuracyTrust.okay;
      feedbackType = 'okay';
    } else if (accuracy >= 0.4) {
      trustChange = this.config.accuracyTrust.poor;
      feedbackType = 'poor';
    } else {
      trustChange = this.config.accuracyTrust.fail;
      feedbackType = 'fail';
    }
    
    // 记录基础好感度变化
    sources.push({
      source: 'level_complete',
      amount: trustChange,
      timestamp: Date.now(),
      metadata: { levelId, accuracy, feedbackType }
    });

    // 2. 首次通关额外奖励（仅正奖励生效）
    if (isFirstComplete && trustChange > 0) {
      trustChange += this.config.firstCompleteBonus;
      sources.push({
        source: 'level_complete',
        amount: this.config.firstCompleteBonus,
        timestamp: Date.now(),
        metadata: { levelId, isFirstComplete: true }
      });
    }

    // 3. 重复刷题递减（负奖励不衰减）
    let finalTrust = trustChange;
    let decayFactor = 1.0;
    let decayApplied = false;
    
    if (trustChange > 0 && replayCount > 1) {
      const decayIndex = Math.min(replayCount - 1, 3);
      decayFactor = this.config.replayDecay[decayIndex];
      finalTrust = Math.round(trustChange * decayFactor);
      decayApplied = true;
      
      sources.push({
        source: 'level_complete',
        amount: finalTrust - trustChange,
        timestamp: Date.now(),
        metadata: { levelId, decayFactor, isDecay: true }
      });
    }

    // 获取蜜糖老师反馈
    const feedback = MISS_HONEY_FEEDBACK[feedbackType];

    return {
      totalTrust: finalTrust,
      sources,
      decayApplied,
      decayFactor,
      feedback  // 新增：蜜糖老师反馈
    };
  }

  /**
   * 获取蜜糖老师反馈
   */
  getFeedback(accuracy: number) {
    if (accuracy >= 1.0) return MISS_HONEY_FEEDBACK.perfect;
    if (accuracy >= 0.8) return MISS_HONEY_FEEDBACK.good;
    if (accuracy >= 0.6) return MISS_HONEY_FEEDBACK.okay;
    if (accuracy >= 0.4) return MISS_HONEY_FEEDBACK.poor;
    return MISS_HONEY_FEEDBACK.fail;
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
   * 获取该关卡可获得的好感度范围（匹配天才人设）
   */
  getLevelRewardRange(playCount: number): { min: number; max: number } {
    const decayIndex = Math.min(playCount, 3);
    const decayFactor = this.config.replayDecay[decayIndex];
    
    // 首次：30(100%) + 20(首次) = 50
    // 80-99%: 15 + 20(首次) = 35
    // 60-79%: 5 + 20(首次) = 25
    // 40-59%: 0 + 20(首次) = 20
    // <40%: -10 (不享受首次奖励)
    // 后续：衰减后
    if (playCount === 0) {
      return {
        min: this.config.accuracyTrust.fail,  // -10
        max: this.config.accuracyTrust.perfect + this.config.firstCompleteBonus  // 30 + 20 = 50
      };
    }
    return {
      min: Math.round(this.config.accuracyTrust.fail * 1),  // -10 (不衰减)
      max: Math.round((this.config.accuracyTrust.perfect + this.config.firstCompleteBonus) * decayFactor)
    };
  }
}

// 导出单例
export const trustCalculator = new TrustCalculator();
