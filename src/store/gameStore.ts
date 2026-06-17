import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getStorage } from '../utils/storage';

interface GameState {
  isPlaying: boolean;
  totalPlayTime: number;
  gameStartedAt: number | null;
  
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updatePlayTime: (seconds: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      totalPlayTime: 0,
      gameStartedAt: null,
      
      startGame: () => {
        set({
          isPlaying: true,
          gameStartedAt: Date.now()
        });
      },
      
      pauseGame: () => {
        const elapsed = get().gameStartedAt 
          ? Math.floor((Date.now() - get().gameStartedAt!) / 1000)
          : 0;
        set((state) => ({
          isPlaying: false,
          totalPlayTime: state.totalPlayTime + elapsed,
          gameStartedAt: null
        }));
      },
      
      resumeGame: () => {
        set({ isPlaying: true, gameStartedAt: Date.now() });
      },
      
      endGame: () => {
        const elapsed = get().gameStartedAt 
          ? Math.floor((Date.now() - get().gameStartedAt!) / 1000)
          : 0;
        set((state) => ({
          isPlaying: false,
          totalPlayTime: state.totalPlayTime + elapsed,
          gameStartedAt: null
        }));
      },
      
      updatePlayTime: (seconds: number) => {
        set((state) => ({
          totalPlayTime: state.totalPlayTime + seconds
        }));
      }
    }),
    {
      name: 'matilda-game-storage',
      storage: getStorage() as any
    }
  )
);
