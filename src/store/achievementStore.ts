import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, AchievementCondition, AchievementCategory, AchievementUnlockEvent, AchievementStats } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { useStoryStore } from './storyStore';
import { useLevelStore } from './levelStore';

// ============================================================
// AchievementManager - 成就检查核心类
// ============================================================

class AchievementManager {
  private stats: Record<string, any> = {};
  
  // 初始化统计数据
  initStats(completedLevels: string[], totalScore: number, questionAnswered: number, 
            streakDays: number, trustValue: number, perfectStreak: number, shareCount: number,
            playTimeSeconds: number) {
    this.stats = {
      completedLevels: completedLevels.length,
      completedLevelsList: completedLevels,
      totalScore,
      questionAnswered,
      streakDays,
      trustValue,
      perfectStreak,
      shareCount,
      playTimeSeconds
    };
  }
  
  // 更新统计
  updateStat(key: string, value: any) {
    this.stats[key] = value;
  }
  
  getStat(key: string): any {
    return this.stats[key] ?? 0;
  }
  
  // 检查单个成就条件
  checkCondition(condition: AchievementCondition): boolean {
    switch (condition.type) {
      case 'count':
        // 累计次数检查 - 根据 target 字符串确定要检查的统计
        const targetStr = String(condition.target);
        if (targetStr === 'completedLevels') {
          return (this.stats['completedLevelsList'] as string[] || []).length >= 1;
        }
        const countValue = this.stats[targetStr];
        return typeof countValue === 'number' ? countValue >= (condition.target as number) : false;
        
      case 'streak':
        // 连续天数检查
        return (this.stats['streakDays'] as number) >= (condition.target as number);
        
      case 'threshold':
        // 阈值检查
        if (condition.target === 100) {
          // 满分检查 - 需要完美通关
          return (this.stats['perfectStreak'] as number) > 0 || this.stats['lastScore'] === 100;
        }
        return (this.stats['trustValue'] as number) >= (condition.target as number);
        
      case 'time_range':
        // 时间段检查
        return this.checkTimeRange(condition.target as string);
        
      case 'level_complete':
        // 关卡完成检查
        const completedLevels = this.stats['completedLevelsList'] as string[] || [];
        return completedLevels.includes(String(condition.target));
        
      case 'score_reach':
        // 分数达到检查
        return (this.stats['lastScore'] || 0) >= (condition.target as number);
        
      case 'combo_reach':
        // 连击检查
        return (this.stats['maxCombo'] || 0) >= (condition.target as number);
        
      case 'composite':
        // 复合条件检查
        return this.checkComposite(condition);
        
      default:
        return false;
    }
  }
  
  // 检查时间段条件
  private checkTimeRange(range: string): boolean {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    switch (range) {
      case 'weekend':
        return day === 0 || day === 6;
      case 'night':
        return hour >= 22 || hour < 6;
      case 'morning':
        return hour >= 6 && hour < 12;
      case 'afternoon':
        return hour >= 12 && hour < 18;
      case 'evening':
        return hour >= 18 && hour < 22;
      default:
        return false;
    }
  }
  
  // 检查复合条件
  private checkComposite(condition: AchievementCondition): boolean {
    if (!condition.conditions || condition.conditions.length === 0) {
      return false;
    }
    
    const results = condition.conditions.map(c => this.checkCondition(c));
    const operator = condition.operator || 'and';
    
    if (operator === 'and') {
      return results.every(r => r);
    } else {
      return results.some(r => r);
    }
  }
}

// 全局管理器实例
const achievementManager = new AchievementManager();

// ============================================================
// Store 状态接口
// ============================================================

interface AchievementState {
  // 已解锁成就
  unlocked: string[];
  // 解锁时间记录
  unlockTimes: Record<string, number>;
  // 连续登录天数
  streakDays: number;
  // 最后登录日期
  lastLoginDate: string;
  // 分享次数
  shareCount: number;
  // 最后一次得分
  lastScore: number;
  // 满分连续次数
  perfectStreak: number;
  // 已完成的关卡列表
  completedLevelsList: string[];
  // 已答题数
  questionAnswered: number;
  // 累计学习时间(秒)
  playTimeSeconds: number;
  // 待显示的解锁弹窗
  pendingUnlock: Achievement | null;
  // 是否显示解锁弹窗
  showUnlockModal: boolean;
  
  // Actions
  checkAndUnlock: (condition: AchievementCondition) => void;
  unlockAchievement: (id: string) => boolean;
  isUnlocked: (id: string) => boolean;
  getUnlockedAchievements: () => Achievement[];
  getLockedAchievements: () => Achievement[];
  getAchievementsByCategory: (category: AchievementCategory) => Achievement[];
  getCategoryStats: () => Record<AchievementCategory, { unlocked: number; total: number }>;
  getOverallStats: () => AchievementStats;
  setPendingUnlock: (achievement: Achievement | null) => void;
  setShowUnlockModal: (show: boolean) => void;
  checkAllAchievements: () => void;
  incrementStat: (key: string, delta: number) => void;
  setStat: (key: string, value: any) => void;
  checkShareAchievements: () => void;
  recordShare: () => void;
  checkLoginStreak: () => void;
  resetAchievements: () => void;
}

// ============================================================
// 数据埋点函数
// ============================================================

const trackAchievementUnlock = (achievement: Achievement) => {
  const event: AchievementUnlockEvent = {
    achievementId: achievement.id,
    achievementName: achievement.name,
    category: achievement.category,
    timestamp: Date.now(),
    trustGained: achievement.reward?.type === 'trust' ? achievement.reward.value as number : 0
  };
  
  // 存储事件用于分析
  const key = 'matilda_achievement_events';
  const events = JSON.parse(localStorage.getItem(key) || '[]');
  events.push(event);
  localStorage.setItem(key, JSON.stringify(events));
  
  console.log('[Achievement] Unlocked:', event);
};

// 记录成就解锁事件
export const trackAchievementUnlockEvent = trackAchievementUnlock;

// ============================================================
// Store 实现
// ============================================================

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlocked: [],
      unlockTimes: {},
      streakDays: 0,
      lastLoginDate: '',
      shareCount: 0,
      lastScore: 0,
      perfectStreak: 0,
      completedLevelsList: [],
      questionAnswered: 0,
      playTimeSeconds: 0,
      pendingUnlock: null,
      showUnlockModal: false,
      
      // 检查并解锁成就
      checkAndUnlock: (_condition) => {
        const { unlocked } = get();
        
        // 获取当前统计数据
        const storyStore = useStoryStore.getState();
        const levelStore = useLevelStore.getState();
        
        // 统计已完成的关卡
        const completedLevelsList = Object.entries(levelStore.levelProgress)
          .filter(([_, progress]) => progress.status === 'completed' || progress.status === 'perfect')
          .map(([levelId]) => levelId);
        
        const state = get();
        
        // 初始化管理器
        achievementManager.initStats(
          completedLevelsList,
          state.playTimeSeconds * 10,
          state.questionAnswered,
          state.streakDays,
          storyStore.trustValue,
          state.perfectStreak,
          state.shareCount,
          state.playTimeSeconds
        );
        
        // 添加最新数据
        achievementManager.updateStat('completedLevelsList', completedLevelsList);
        achievementManager.updateStat('lastScore', state.lastScore);
        
        // 遍历所有未解锁的成就
        const achievements = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id));
        
        for (const achievement of achievements) {
          // 跳过隐藏成就的条件检查
          if (achievement.hidden && achievement.category === 'special') {
            continue;
          }
          
          if (achievementManager.checkCondition(achievement.condition)) {
            // 解锁成就
            const unlocked = get().unlockAchievement(achievement.id);
            if (unlocked) {
              // 设置待显示的解锁成就
              get().setPendingUnlock(achievement);
              get().setShowUnlockModal(true);
              
              // 记录数据埋点
              trackAchievementUnlock(achievement);
            }
            break; // 每次只解锁一个
          }
        }
      },
      
      // 解锁成就
      unlockAchievement: (id: string) => {
        const { unlocked, unlockTimes } = get();
        
        if (unlocked.includes(id)) {
          return false;
        }
        
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (!achievement) {
          return false;
        }
        
        const now = Date.now();
        
        // 添加到已解锁列表
        set({
          unlocked: [...unlocked, id],
          unlockTimes: { ...unlockTimes, [id]: now }
        });
        
        // 发放奖励
        if (achievement.reward) {
          if (achievement.reward.type === 'trust') {
            const trustAmount = achievement.reward.value as number;
            // 增加好感度
            useStoryStore.getState().updateTrustValue(
              trustAmount,
              {
                source: 'level_complete',
                amount: trustAmount,
                timestamp: Date.now(),
                metadata: { levelId: id }
              }
            );
          }
        }
        
        return true;
      },
      
      // 检查是否已解锁
      isUnlocked: (id: string) => {
        return get().unlocked.includes(id);
      },
      
      // 获取已解锁的成就
      getUnlockedAchievements: () => {
        const { unlocked } = get();
        return ACHIEVEMENTS.filter(a => unlocked.includes(a.id));
      },
      
      // 获取未解锁的成就
      getLockedAchievements: () => {
        const { unlocked } = get();
        return ACHIEVEMENTS.filter(a => !unlocked.includes(a.id));
      },
      
      // 按分类获取成就
      getAchievementsByCategory: (category: AchievementCategory) => {
        return ACHIEVEMENTS.filter(a => a.category === category);
      },
      
      // 获取分类统计
      getCategoryStats: () => {
        const { unlocked } = get();
        const categories: AchievementCategory[] = ['learning', 'story', 'social', 'special'];
        
        const stats = {} as Record<AchievementCategory, { unlocked: number; total: number }>;
        
        categories.forEach(cat => {
          const categoryAchievements = ACHIEVEMENTS.filter(a => a.category === cat);
          const unlockedInCategory = categoryAchievements.filter(a => unlocked.includes(a.id));
          
          stats[cat] = {
            unlocked: unlockedInCategory.length,
            total: categoryAchievements.length
          };
        });
        
        return stats;
      },
      
      // 获取整体统计
      getOverallStats: () => {
        const { unlocked, unlockTimes } = get();
        const categoryStats = get().getCategoryStats();
        
        let totalUnlocked = 0;
        let totalCount = 0;
        
        Object.values(categoryStats).forEach(stats => {
          totalUnlocked += stats.unlocked;
          totalCount += stats.total;
        });
        
        return {
          totalUnlocked,
          totalCount,
          categoryStats,
          lastUnlockTime: unlocked.length > 0 ? unlockTimes[unlocked[unlocked.length - 1]] : undefined
        };
      },
      
      // 设置待解锁弹窗
      setPendingUnlock: (achievement: Achievement | null) => {
        set({ pendingUnlock: achievement });
      },
      
      // 设置是否显示解锁弹窗
      setShowUnlockModal: (show: boolean) => {
        set({ showUnlockModal: show });
      },
      
      // 检查所有成就
      checkAllAchievements: () => {
        const state = get();
        
        // 获取当前统计数据
        const storyStore = useStoryStore.getState();
        const levelStore = useLevelStore.getState();
        
        // 统计已完成的关卡
        const completedLevelsList = Object.entries(levelStore.levelProgress)
          .filter(([_, progress]) => progress.status === 'completed' || progress.status === 'perfect')
          .map(([levelId]) => levelId);
        
        // 初始化管理器
        achievementManager.initStats(
          completedLevelsList,
          state.playTimeSeconds * 10,
          state.questionAnswered,
          state.streakDays,
          storyStore.trustValue,
          state.perfectStreak,
          state.shareCount,
          state.playTimeSeconds
        );
        
        // 添加额外统计
        achievementManager.updateStat('completedLevelsList', completedLevelsList);
        achievementManager.updateStat('lastScore', state.lastScore);
        
        // 检查所有未解锁成就
        get().checkAndUnlock({ type: 'count', target: 1 });
      },
      
      // 增加统计值
      incrementStat: (key: string, delta: number) => {
        set((state) => ({
          [key]: ((state as any)[key] || 0) + delta
        }));
        
        // 触发成就检查
        get().checkAllAchievements();
      },
      
      // 设置统计值
      setStat: (key: string, value: any) => {
        set({ [key]: value } as any);
      },
      
      // 检查分享成就
      checkShareAchievements: () => {
        const { shareCount } = get();
        const shareCondition: AchievementCondition = { type: 'count', target: shareCount + 1 };
        achievementManager.updateStat('shareCount', shareCount);
        get().checkAndUnlock(shareCondition);
      },
      
      // 记录分享
      recordShare: () => {
        set((state) => ({
          shareCount: state.shareCount + 1
        }));
        
        // 检查分享成就
        get().checkShareAchievements();
      },
      
      // 检查登录连续
      checkLoginStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastLoginDate, streakDays } = get();
        
        if (lastLoginDate === today) {
          // 今天已经登录过
          return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let newStreak = 1;
        if (lastLoginDate === yesterdayStr) {
          // 昨天登录了，连续
          newStreak = streakDays + 1;
        }
        
        set({
          streakDays: newStreak,
          lastLoginDate: today
        });
        
        // 检查连续登录成就
        achievementManager.updateStat('streakDays', newStreak);
        const streakCondition: AchievementCondition = { type: 'streak', target: newStreak };
        get().checkAndUnlock(streakCondition);
      },
      
      // 重置成就
      resetAchievements: () => {
        set({
          unlocked: [],
          unlockTimes: {},
          streakDays: 0,
          lastLoginDate: '',
          shareCount: 0,
          lastScore: 0,
          perfectStreak: 0,
          completedLevelsList: [],
          questionAnswered: 0,
          playTimeSeconds: 0,
          pendingUnlock: null,
          showUnlockModal: false
        });
      }
    }),
    {
      name: 'matilda-achievement-storage',
      partialize: (state) => ({
        unlocked: state.unlocked,
        unlockTimes: state.unlockTimes,
        streakDays: state.streakDays,
        lastLoginDate: state.lastLoginDate,
        shareCount: state.shareCount,
        lastScore: state.lastScore,
        perfectStreak: state.perfectStreak,
        completedLevelsList: state.completedLevelsList,
        questionAnswered: state.questionAnswered,
        playTimeSeconds: state.playTimeSeconds
      })
    }
  )
);

// ============================================================
// 数据埋点 - 页面访问
// ============================================================

// 记录成就页面访问
export const trackAchievementView = () => {
  console.log('[Achievement] Viewed');
};

// 记录成就分享
export const trackAchievementShare = (achievementId: string) => {
  console.log('[Achievement] Shared:', achievementId);
  useAchievementStore.getState().recordShare();
};

// 导出 AchievementManager 供外部使用
export { achievementManager };
