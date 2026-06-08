import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { db } from '../db/database'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  target: number
  unlockedAt?: Date
  category: AchievementCategory
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export type AchievementCategory = 
  | 'progress'    // 进度成就
  | 'collection'  // 收集成就
  | 'skill'       // 技能成就
  | 'special'     // 特殊成就
  | 'social'      // 社交成就

interface AchievementStore {
  achievements: Achievement[]
  recentlyUnlocked: Achievement | null
  showToast: boolean
  
  // Actions
  loadAchievements: () => Promise<void>
  updateProgress: (id: string, progress: number) => Promise<void>
  unlockAchievement: (id: string) => Promise<void>
  resetAchievements: () => Promise<void>
  dismissToast: () => void
}

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'progress' | 'unlockedAt'>[] = [
  // Progress achievements
  {
    id: 'first_level',
    name: '初次冒险',
    description: '完成第一个关卡',
    icon: '🎯',
    target: 1,
    category: 'progress',
    rarity: 'common'
  },
  {
    id: 'level_5',
    name: '小试牛刀',
    description: '完成5个关卡',
    icon: '⭐',
    target: 5,
    category: 'progress',
    rarity: 'common'
  },
  {
    id: 'level_10',
    name: '学有所成',
    description: '完成10个关卡',
    icon: '🌟',
    target: 10,
    category: 'progress',
    rarity: 'rare'
  },
  {
    id: 'level_50',
    name: '英语大师',
    description: '完成50个关卡',
    icon: '👑',
    target: 50,
    category: 'progress',
    rarity: 'legendary'
  },
  
  // Collection achievements
  {
    id: 'first_character',
    name: '新朋友',
    description: '解锁第一个角色',
    icon: '👋',
    target: 1,
    category: 'collection',
    rarity: 'common'
  },
  {
    id: 'collect_5_chars',
    name: '人气王',
    description: '解锁5个角色',
    icon: '🌈',
    target: 5,
    category: 'collection',
    rarity: 'rare'
  },
  {
    id: 'total_coins_100',
    name: '小富翁',
    description: '累计获得100金币',
    icon: '💰',
    target: 100,
    category: 'collection',
    rarity: 'common'
  },
  {
    id: 'total_coins_1000',
    name: '富甲一方',
    description: '累计获得1000金币',
    icon: '💎',
    target: 1000,
    category: 'collection',
    rarity: 'rare'
  },
  
  // Skill achievements
  {
    id: 'telepathy_novice',
    name: '意念初现',
    description: '完成超能力训练第一关',
    icon: '🔮',
    target: 1,
    category: 'skill',
    rarity: 'common'
  },
  {
    id: 'telepathy_master',
    name: '念力大师',
    description: '完成超能力训练所有关卡',
    icon: '✨',
    target: 5,
    category: 'skill',
    rarity: 'epic'
  },
  
  // Special achievements
  {
    id: 'perfect_clear',
    name: '完美通关',
    description: '一次错题都没有通过关卡',
    icon: '💯',
    target: 1,
    category: 'special',
    rarity: 'rare'
  },
  {
    id: 'speed_demon',
    name: '闪电侠',
    description: '在30秒内完成一个关卡',
    icon: '⚡',
    target: 1,
    category: 'special',
    rarity: 'epic'
  },
  
  // Social achievements
  {
    id: 'first_friend',
    name: '交到朋友',
    description: '添加第一个好友',
    icon: '🤝',
    target: 1,
    category: 'social',
    rarity: 'common'
  },
]

export const useAchievementStore = create<AchievementStore>()(
  persist(
    (set, get) => ({
      achievements: ACHIEVEMENT_DEFINITIONS.map(a => ({
        ...a,
        progress: 0,
        unlockedAt: undefined
      })),
      recentlyUnlocked: null,
      showToast: false,

      loadAchievements: async () => {
        try {
          const dbAchievements = await db.achievements.toArray()
          
          set(() => ({
            achievements: ACHIEVEMENT_DEFINITIONS.map(def => {
              const dbAch = dbAchievements.find(a => a.id === def.id)
              return {
                ...def,
                progress: dbAch?.progress ?? 0,
                unlockedAt: dbAch?.unlockedAt
              }
            })
          }))
        } catch (e) {
          console.error('Failed to load achievements:', e)
        }
      },

      updateProgress: async (id: string, progress: number) => {
        const { achievements } = get()
        const achievement = achievements.find(a => a.id === id)
        
        if (!achievement || achievement.unlockedAt) return
        
        const newProgress = Math.min(progress, achievement.target)
        
        set(state => ({
          achievements: state.achievements.map(a =>
            a.id === id ? { ...a, progress: newProgress } : a
          )
        }))
        
        // Save to DB
        try {
          const existing = await db.achievements.get(id)
          if (existing) {
            await db.achievements.update(id, { progress: newProgress })
          } else {
            await db.achievements.add({
              id,
              name: achievement.name,
              description: achievement.description,
              icon: achievement.icon,
              progress: newProgress,
              target: achievement.target,
              unlockedAt: undefined
            })
          }
        } catch (e) {
          console.error('Failed to save achievement progress:', e)
        }
        
        // Check if just unlocked
        if (newProgress >= achievement.target) {
          await get().unlockAchievement(id)
        }
      },

      unlockAchievement: async (id: string) => {
        const { achievements } = get()
        const achievement = achievements.find(a => a.id === id)
        
        if (!achievement || achievement.unlockedAt) return
        
        const unlockedAt = new Date()
        
        set(state => ({
          achievements: state.achievements.map(a =>
            a.id === id ? { ...a, progress: a.target, unlockedAt } : a
          ),
          recentlyUnlocked: { ...achievement, progress: achievement.target, unlockedAt },
          showToast: true
        }))
        
        // Save to DB
        try {
          await db.achievements.update(id, { unlockedAt })
        } catch (e) {
          console.error('Failed to save achievement unlock:', e)
        }
      },

      resetAchievements: async () => {
        await db.achievements.clear()
        
        set({
          achievements: ACHIEVEMENT_DEFINITIONS.map(a => ({
            ...a,
            progress: 0,
            unlockedAt: undefined
          })),
          recentlyUnlocked: null,
          showToast: false
        })
      },

      dismissToast: () => {
        set({ showToast: false, recentlyUnlocked: null })
      }
    }),
    {
      name: 'achievement-storage',
      partialize: (state) => ({
        achievements: state.achievements,
        showToast: false
      })
    }
  )
)

// Helper function to trigger achievements
export async function checkAchievement(
  achievementId: string, 
  currentValue: number
) {
  const { updateProgress, achievements } = useAchievementStore.getState()
  const achievement = achievements.find(a => a.id === achievementId)
  
  if (achievement && !achievement.unlockedAt) {
    await updateProgress(achievementId, currentValue)
  }
}
