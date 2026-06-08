import { create } from 'zustand'
import { db, type Save } from '../db/database'

interface GameState {
  currentSave: Save | null
  isLoading: boolean
  
  // Actions
  loadSave: (id: number) => Promise<void>
  createSave: (name: string) => Promise<Save>
  updateSave: (id: number, data: Partial<Save>) => Promise<void>
  addCoins: (amount: number) => Promise<void>
  addExperience: (amount: number) => Promise<void>
  unlockCharacter: (characterId: string) => Promise<void>
}

export const useGameStore = create<GameState>((set, get) => ({
  currentSave: null,
  isLoading: false,

  loadSave: async (id: number) => {
    set({ isLoading: true })
    const save = await db.saves.get(id)
    set({ currentSave: save || null, isLoading: false })
  },

  createSave: async (name: string) => {
    const newSave: Save = {
      name,
      currentLevel: 1,
      currentChapter: 1,
      totalCoins: 0,
      experience: 0,
      unlockedCharacters: ['matilda'],
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        difficulty: 'normal'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const id = await db.saves.add(newSave)
    const saved = await db.saves.get(id as number)
    set({ currentSave: saved || null })
    return saved!
  },

  updateSave: async (id: number, data: Partial<Save>) => {
    await db.saves.update(id, { ...data, updatedAt: new Date() })
    const updated = await db.saves.get(id)
    set({ currentSave: updated || null })
  },

  addCoins: async (amount: number) => {
    const { currentSave } = get()
    if (currentSave?.id) {
      await get().updateSave(currentSave.id, {
        totalCoins: currentSave.totalCoins + amount
      })
    }
  },

  addExperience: async (amount: number) => {
    const { currentSave } = get()
    if (currentSave?.id) {
      await get().updateSave(currentSave.id, {
        experience: currentSave.experience + amount
      })
    }
  },

  unlockCharacter: async (characterId: string) => {
    const { currentSave } = get()
    if (currentSave?.id && !currentSave.unlockedCharacters.includes(characterId)) {
      await get().updateSave(currentSave.id, {
        unlockedCharacters: [...currentSave.unlockedCharacters, characterId]
      })
    }
  }
}))
