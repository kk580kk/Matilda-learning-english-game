import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  StoryState, 
  StoryProgress, 
  DailyTask,
  TrustLevel,
  MoralChoice,
  ChoiceOption 
} from '../types/story';
import { calculateTrustLevel, getTrustLevelName } from '../data/storyConfig';

// ============================================================
// 初始状态
// ============================================================

const initialDailyTasks: DailyTask[] = [
  {
    id: 'daily-reading',
    type: 'reading',
    title: '每日阅读',
    description: '完成1个关卡的阅读环节',
    reward: { trustValue: 2, score: 10 },
    completed: false
  },
  {
    id: 'daily-vocab',
    type: 'vocabulary',
    title: '词汇挑战',
    description: '拼写5个单词',
    reward: { trustValue: 3, score: 0 },
    completed: false
  },
  {
    id: 'daily-login',
    type: 'login',
    title: '连续登录',
    description: '第N天登录奖励',
    reward: { trustValue: 1, score: 0 },
    completed: false
  }
];

const initialState: StoryState = {
  moralValue: 0,
  trustValue: 0,
  trustLevel: TrustLevel.STRANGER,
  levelProgress: {},
  dailyTasks: initialDailyTasks,
  lastTaskRefresh: new Date().toISOString(),
  unlockedScenes: [],
  unlockedBranches: [],
  unlockedEndings: []
};

// ============================================================
// Store 定义
// ============================================================

interface StoryStore extends StoryState {
  // 道德系统
  updateMoralValue: (delta: number) => void;
  addMoralChoice: (choice: MoralChoice) => void;
  getMoralChoices: () => MoralChoice[];
  
  // 信任系统
  updateTrustValue: (delta: number) => void;
  getTrustLevel: () => TrustLevel;
  getTrustLevelName: () => string;
  
  // 关卡进度
  initLevelProgress: (levelId: string) => void;
  updateLevelProgress: (levelId: string, progress: Partial<StoryProgress>) => void;
  getLevelProgress: (levelId: string) => StoryProgress | undefined;
  completeScene: (levelId: string, sceneId: string) => void;
  makeChoice: (levelId: string, sceneId: string, choice: ChoiceOption) => void;
  getCurrentScene: (levelId: string) => string | undefined;
  setCurrentScene: (levelId: string, sceneId: string) => void;
  unlockBranch: (levelId: string, branchId: string) => void;
  
  // 日常任务
  refreshDailyTasks: () => void;
  completeDailyTask: (taskId: string) => void;
  getCompletedTasksCount: () => number;
  
  // 解锁内容
  unlockScene: (sceneId: string) => void;
  unlockEnding: (endingId: string) => void;
  isSceneUnlocked: (sceneId: string) => boolean;
  isBranchUnlocked: (branchId: string) => boolean;
  isEndingUnlocked: (endingId: string) => boolean;
  
  // 重置
  resetStory: () => void;
  resetLevel: (levelId: string) => void;
}

export const useStoryStore = create<StoryStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // ========== 道德系统 ==========
      updateMoralValue: (delta: number) => {
        set((state) => ({
          moralValue: Math.max(-100, Math.min(100, state.moralValue + delta))
        }));
      },
      
      addMoralChoice: (choice: MoralChoice) => {
        // 道德选择记录存储在 localStorage 中
        const key = 'matilda-moral-choices';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push(choice);
        localStorage.setItem(key, JSON.stringify(existing));
      },
      
      getMoralChoices: () => {
        const key = 'matilda-moral-choices';
        return JSON.parse(localStorage.getItem(key) || '[]');
      },
      
      // ========== 信任系统 ==========
      updateTrustValue: (delta: number) => {
        set((state) => {
          const newTrustValue = Math.max(0, Math.min(100, state.trustValue + delta));
          return {
            trustValue: newTrustValue,
            trustLevel: calculateTrustLevel(newTrustValue)
          };
        });
      },
      
      getTrustLevel: () => {
        return calculateTrustLevel(get().trustValue);
      },
      
      getTrustLevelName: () => {
        return getTrustLevelName(get().trustLevel);
      },
      
      // ========== 关卡进度 ==========
      initLevelProgress: (levelId: string) => {
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              levelId,
              currentSceneId: `${levelId}-001`,
              completedScenes: [],
              moralValue: state.moralValue,
              trustValue: state.trustValue,
              choices: [],
              unlockedBranches: []
            }
          }
        }));
      },
      
      updateLevelProgress: (levelId: string, progress: Partial<StoryProgress>) => {
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              ...state.levelProgress[levelId],
              ...progress,
              levelId
            }
          }
        }));
      },
      
      getLevelProgress: (levelId: string) => {
        return get().levelProgress[levelId];
      },
      
      completeScene: (levelId: string, sceneId: string) => {
        set((state) => {
          const progress = state.levelProgress[levelId];
          if (!progress) return state;
          
          const completedScenes = [...progress.completedScenes];
          if (!completedScenes.includes(sceneId)) {
            completedScenes.push(sceneId);
          }
          
          return {
            levelProgress: {
              ...state.levelProgress,
              [levelId]: {
                ...progress,
                completedScenes
              }
            }
          };
        });
      },
      
      makeChoice: (levelId: string, sceneId: string, choice: ChoiceOption) => {
        const { effects, nextSceneId, branchId } = choice;
        
        // 更新道德值和信任度
        if (effects.moralValue) {
          get().updateMoralValue(effects.moralValue);
        }
        if (effects.trustValue) {
          get().updateTrustValue(effects.trustValue);
        }
        
        // 记录选择
        set((state) => {
          const progress = state.levelProgress[levelId];
          if (!progress) return state;
          
          const choices = [...progress.choices, choice.id];
          const completedScenes = [...progress.completedScenes];
          if (!completedScenes.includes(sceneId)) {
            completedScenes.push(sceneId);
          }
          
          // 解锁分支
          const unlockedBranches = [...progress.unlockedBranches];
          if (branchId && !unlockedBranches.includes(branchId)) {
            unlockedBranches.push(branchId);
          }
          
          return {
            levelProgress: {
              ...state.levelProgress,
              [levelId]: {
                ...progress,
                currentSceneId: nextSceneId,
                completedScenes,
                choices,
                unlockedBranches,
                moralValue: state.moralValue + (effects.moralValue || 0),
                trustValue: state.trustValue + (effects.trustValue || 0)
              }
            }
          };
        });
        
        // 记录道德选择
        get().addMoralChoice({
          sceneId,
          choiceId: choice.id,
          choiceText: choice.text,
          moralChange: effects.moralValue || 0,
          timestamp: new Date().toISOString()
        });
      },
      
      getCurrentScene: (levelId: string) => {
        return get().levelProgress[levelId]?.currentSceneId;
      },
      
      setCurrentScene: (levelId: string, sceneId: string) => {
        set((state) => {
          const progress = state.levelProgress[levelId];
          if (!progress) return state;
          
          return {
            levelProgress: {
              ...state.levelProgress,
              [levelId]: {
                ...progress,
                currentSceneId: sceneId
              }
            }
          };
        });
      },
      
      unlockBranch: (levelId: string, branchId: string) => {
        set((state) => {
          const progress = state.levelProgress[levelId];
          if (!progress) return state;
          
          const unlockedBranches = [...progress.unlockedBranches];
          if (!unlockedBranches.includes(branchId)) {
            unlockedBranches.push(branchId);
          }
          
          return {
            levelProgress: {
              ...state.levelProgress,
              [levelId]: {
                ...progress,
                unlockedBranches
              }
            },
            unlockedBranches: [...state.unlockedBranches, branchId]
          };
        });
      },
      
      // ========== 日常任务 ==========
      refreshDailyTasks: () => {
        const now = new Date();
        const lastRefresh = new Date(get().lastTaskRefresh);
        
        // 检查是否是新的一天
        if (now.toDateString() !== lastRefresh.toDateString()) {
          set({
            dailyTasks: initialDailyTasks.map(task => ({
              ...task,
              completed: false,
              completedAt: undefined
            })),
            lastTaskRefresh: now.toISOString()
          });
        }
      },
      
      completeDailyTask: (taskId: string) => {
        set((state) => {
          const task = state.dailyTasks.find(t => t.id === taskId);
          if (!task || task.completed) return state;
          
          // 发放奖励
          if (task.reward.trustValue) {
            get().updateTrustValue(task.reward.trustValue);
          }
          
          return {
            dailyTasks: state.dailyTasks.map(t =>
              t.id === taskId
                ? { ...t, completed: true, completedAt: new Date().toISOString() }
                : t
            )
          };
        });
      },
      
      getCompletedTasksCount: () => {
        return get().dailyTasks.filter(t => t.completed).length;
      },
      
      // ========== 解锁内容 ==========
      unlockScene: (sceneId: string) => {
        set((state) => ({
          unlockedScenes: [...state.unlockedScenes, sceneId]
        }));
      },
      
      unlockEnding: (endingId: string) => {
        set((state) => ({
          unlockedEndings: [...state.unlockedEndings, endingId]
        }));
      },
      
      isSceneUnlocked: (sceneId: string) => {
        return get().unlockedScenes.includes(sceneId);
      },
      
      isBranchUnlocked: (branchId: string) => {
        return get().unlockedBranches.includes(branchId);
      },
      
      isEndingUnlocked: (endingId: string) => {
        return get().unlockedEndings.includes(endingId);
      },
      
      // ========== 重置 ==========
      resetStory: () => {
        set(initialState);
        localStorage.removeItem('matilda-moral-choices');
      },
      
      resetLevel: (levelId: string) => {
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              levelId,
              currentSceneId: `${levelId}-001`,
              completedScenes: [],
              moralValue: state.moralValue,
              trustValue: state.trustValue,
              choices: [],
              unlockedBranches: []
            }
          }
        }));
      }
    }),
    {
      name: 'matilda-story-storage',
      partialize: (state) => ({
        moralValue: state.moralValue,
        trustValue: state.trustValue,
        trustLevel: state.trustLevel,
        levelProgress: state.levelProgress,
        dailyTasks: state.dailyTasks,
        lastTaskRefresh: state.lastTaskRefresh,
        unlockedScenes: state.unlockedScenes,
        unlockedBranches: state.unlockedBranches,
        unlockedEndings: state.unlockedEndings
      })
    }
  )
);
