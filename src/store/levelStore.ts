import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorage } from '../utils/storage';
import { LevelProgress, LevelStatus, LevelConfig } from '../types';
import { LEVEL_CONFIGS, getNextLevelId } from '../data/levels/config';

interface LevelState {
  levels: Record<string, LevelConfig>;
  currentLevelId: string | null;
  levelProgress: Record<string, LevelProgress>;
  
  // Actions
  startLevel: (levelId: string) => void;
  completeLevel: (levelId: string, score: number) => void;
  updateProgress: (levelId: string, progress: Partial<LevelProgress>) => void;
  getLevelStatus: (levelId: string) => LevelStatus;
  resetProgress: () => void;
}

const getInitialProgress = (): Record<string, LevelProgress> => {
  const progress: Record<string, LevelProgress> = {};
  LEVEL_CONFIGS.forEach(level => {
    progress[level.levelId] = {
      levelId: level.levelId,
      status: level.levelId === 'L1' ? 'available' : 'locked',
      score: 0,
      playTime: 0
    };
  });
  return progress;
};

export const useLevelStore = create<LevelState>()(
  persist(
    (set, get) => ({
      levels: LEVEL_CONFIGS.reduce((acc, level) => {
        acc[level.levelId] = level;
        return acc;
      }, {} as Record<string, LevelConfig>),
      currentLevelId: null,
      levelProgress: getInitialProgress(),
      
      startLevel: (levelId: string) => {
        set({ currentLevelId: levelId });
        get().updateProgress(levelId, { status: 'in_progress' });
      },
      
      completeLevel: (levelId: string, score: number) => {
        const progress = get().levelProgress[levelId];
        const newStatus: LevelStatus = score >= 100 ? 'perfect' : 'completed';
        
        get().updateProgress(levelId, {
          status: newStatus,
          score: Math.max(progress?.score || 0, score),
          completedAt: new Date().toISOString()
        });
        
        // Unlock next level
        const nextLevelId = getNextLevelId(levelId);
        if (nextLevelId) {
          get().updateProgress(nextLevelId, { status: 'available' });
        }
      },
      
      updateProgress: (levelId: string, progress: Partial<LevelProgress>) => {
        set((state) => ({
          levelProgress: {
            ...state.levelProgress,
            [levelId]: {
              ...state.levelProgress[levelId],
              ...progress
            }
          }
        }));
      },
      
      getLevelStatus: (levelId: string) => {
        return get().levelProgress[levelId]?.status || 'locked';
      },
      
      resetProgress: () => {
        set({ levelProgress: getInitialProgress(), currentLevelId: null });
      }
    }),
    {
      name: 'matilda-level-storage',
      storage: getStorage() as any
    }
  )
);
