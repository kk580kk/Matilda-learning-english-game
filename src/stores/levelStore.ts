import { create } from 'zustand'
import { levels, chapters } from '../data/levels/levelData'
import type { Level, Chapter } from '../types/index'
import type { LevelProgress } from '../types/index'

export type LevelStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'perfect'

interface LevelWithStatus extends Level {
  status: LevelStatus
  stars: number
  bestScore: number
  isCompleted: boolean
}

interface LevelState {
  // Data
  levels: Level[]
  chapters: Chapter[]
  currentLevel: number
  currentChapter: number
  levelProgress: LevelProgress[]
  
  // Computed getters
  getLevelById: (id: number) => Level | undefined
  getChapterById: (id: number) => Chapter | undefined
  getLevelStatus: (levelId: number) => LevelStatus
  getLevelsByChapter: (chapterId: number) => LevelWithStatus[]
  getTotalStars: () => number
  getChapterStars: (chapterId: number) => number
  isChapterUnlocked: (chapterId: number) => boolean
  
  // Actions
  setCurrentLevel: (level: number, chapter: number) => void
  completeLevel: (levelId: number, score: number, stars: number) => void
  getProgress: (levelId: number) => LevelProgress | undefined
  resetProgress: () => void
}

const calculateStatus = (
  levelId: number,
  levelProgress: LevelProgress[],
  allLevels: Level[]
): LevelStatus => {
  const level = allLevels.find(l => l.id === levelId)
  if (!level) return 'locked'
  
  const progress = levelProgress.find(p => p.levelId === levelId)
  const previousProgress = levelProgress.find(p => p.levelId === levelId - 1)
  
  // First level is always available
  if (levelId === 1) {
    if (progress?.isCompleted) {
      return progress.stars === 3 ? 'perfect' : 'completed'
    }
    return progress ? 'in_progress' : 'available'
  }
  
  // Check if previous level is completed
  if (!previousProgress?.isCompleted) {
    return 'locked'
  }
  
  // Level is available if previous is completed
  if (progress?.isCompleted) {
    return progress.stars === 3 ? 'perfect' : 'completed'
  }
  
  return progress ? 'in_progress' : 'available'
}

export const useLevelStore = create<LevelState>((set, get) => ({
  levels,
  chapters,
  currentLevel: 1,
  currentChapter: 1,
  levelProgress: [],

  getLevelById: (id: number) => {
    return get().levels.find(l => l.id === id)
  },

  getChapterById: (id: number) => {
    return get().chapters.find(c => c.id === id)
  },

  getLevelStatus: (levelId: number) => {
    return calculateStatus(levelId, get().levelProgress, get().levels)
  },

  getLevelsByChapter: (chapterId: number) => {
    const { levels, levelProgress } = get()
    return levels
      .filter(l => l.chapterId === chapterId)
      .map(level => {
        const progress = levelProgress.find(p => p.levelId === level.id)
        const status = calculateStatus(level.id, levelProgress, levels)
        return {
          ...level,
          status,
          stars: progress?.stars || 0,
          bestScore: progress?.bestScore || 0,
          isCompleted: progress?.isCompleted || false
        }
      })
  },

  getTotalStars: () => {
    return get().levelProgress.reduce((sum, p) => sum + p.stars, 0)
  },

  getChapterStars: (_chapterId: number) => {
    const chapterLevels = get().levels.filter(l => l.chapterId === _chapterId)
    return chapterLevels.reduce((sum, level) => {
      const progress = get().levelProgress.find(p => p.levelId === level.id)
      return sum + (progress?.stars || 0)
    }, 0)
  },

  isChapterUnlocked: (chapterId: number) => {
    const { chapters } = get()
    const chapter = chapters.find(c => c.id === chapterId)
    if (!chapter) return false
    
    // First chapter is always unlocked
    if (chapterId === 1) return true
    
    // Check if previous chapter is completed
    const previousChapter = chapters.find(c => c.id === chapterId - 1)
    if (!previousChapter) return true
    
    // Check if all levels in previous chapter are completed
    const previousLevelIds = get().levels
      .filter(l => l.chapterId === chapterId - 1)
      .map(l => l.id)
    
    const allCompleted = previousLevelIds.every(levelId => {
      const progress = get().levelProgress.find(p => p.levelId === levelId)
      return progress?.isCompleted || false
    })
    
    return allCompleted
  },

  setCurrentLevel: (level: number, chapter: number) => {
    set({ currentLevel: level, currentChapter: chapter })
  },

  completeLevel: (levelId: number, score: number, stars: number) => {
    const { levelProgress, levels } = get()
    const level = levels.find(l => l.id === levelId)
    
    if (!level) return
    
    const existing = levelProgress.find(p => p.levelId === levelId)
    
    // Only update if new score is better
    const existingStars = existing?.stars || 0
    if (stars <= existingStars && existing?.isCompleted) {
      return // Don't update if existing completion is same or better
    }
    
    if (existing) {
      set({
        levelProgress: levelProgress.map(p =>
          p.levelId === levelId
            ? {
                ...p,
                isCompleted: true,
                bestScore: Math.max(p.bestScore, score),
                stars: Math.max(p.stars, stars),
                completedAt: new Date()
              }
            : p
        )
      })
    } else {
      set({
        levelProgress: [
          ...levelProgress,
          {
            levelId,
            chapterId: level.chapterId,
            isCompleted: true,
            bestScore: score,
            stars,
            completedAt: new Date()
          }
        ]
      })
    }
  },

  getProgress: (levelId: number) => {
    return get().levelProgress.find(p => p.levelId === levelId)
  },

  resetProgress: () => {
    set({ levelProgress: [], currentLevel: 1, currentChapter: 1 })
  }
}))

export default useLevelStore
