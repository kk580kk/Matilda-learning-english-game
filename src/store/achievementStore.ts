import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AchievementState {
  unlocked: string[];
  unlockAchievement: (id: string) => boolean;
  isUnlocked: (id: string) => boolean;
  resetAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlocked: [],
      
      unlockAchievement: (id: string) => {
        if (get().unlocked.includes(id)) {
          return false;
        }
        set((state) => ({
          unlocked: [...state.unlocked, id]
        }));
        return true;
      },
      
      isUnlocked: (id: string) => {
        return get().unlocked.includes(id);
      },
      
      resetAchievements: () => {
        set({ unlocked: [] });
      }
    }),
    {
      name: 'matilda-achievement-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
