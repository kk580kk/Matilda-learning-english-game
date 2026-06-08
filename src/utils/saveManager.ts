import { db, type Save } from '../db/database'
import { useLevelStore } from '../stores/levelStore'

export interface SaveManager {
  // Save operations
  createSave: (name: string) => Promise<Save>
  loadSave: (id: number) => Promise<Save | undefined>
  saveGame: (id: number, data: Partial<Save>) => Promise<void>
  deleteSave: (id: number) => Promise<void>
  listSaves: () => Promise<Save[]>
  
  // Auto-save
  autoSave: (saveId: number) => Promise<void>
  
  // Export/Import
  exportSave: (id: number) => Promise<string>
  importSave: (jsonString: string) => Promise<Save | undefined>
  
  // Quick save/load (uses special slot)
  quickSave: () => Promise<void>
  quickLoad: () => Promise<Save | undefined>
}

const QUICK_SAVE_ID = -1

export const saveManager: SaveManager = {
  async createSave(name: string) {
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
    return saved!
  },

  async loadSave(id: number) {
    return await db.saves.get(id)
  },

  async saveGame(id: number, data: Partial<Save>) {
    const existing = await db.saves.get(id)
    if (!existing) throw new Error(`Save ${id} not found`)
    
    await db.saves.update(id, {
      ...data,
      updatedAt: new Date()
    })
  },

  async deleteSave(id: number) {
    await db.saves.delete(id)
  },

  async listSaves() {
    return await db.saves.orderBy('updatedAt').reverse().toArray()
  },

  async autoSave(saveId: number) {
    const { currentLevel, currentChapter } = useLevelStore.getState()
    const save = await db.saves.get(saveId)
    if (save) {
      await db.saves.update(saveId, {
        currentLevel,
        currentChapter,
        updatedAt: new Date()
      })
    }
  },

  async exportSave(id: number) {
    const save = await db.saves.get(id)
    if (!save) throw new Error(`Save ${id} not found`)
    
    // Remove internal ID for export
    const { id: _, ...exportData } = save
    return JSON.stringify(exportData, null, 2)
  },

  async importSave(jsonString: string) {
    const data = JSON.parse(jsonString) as Save
    // Reset timestamps
    data.createdAt = new Date()
    data.updatedAt = new Date()
    // Add to database
    const newId = await db.saves.add(data)
    return await db.saves.get(newId as number)!
  },

  async quickSave() {
    const saves = await db.saves.toArray()
    if (saves.length === 0) return
    
    // Use the most recent save for quick save
    const latestSave = saves.reduce((latest, save) => 
      (save.updatedAt || new Date(0)) > (latest.updatedAt || new Date(0)) ? save : latest
    )
    
    if (latestSave.id) {
      await this.saveGame(QUICK_SAVE_ID, latestSave)
    }
  },

  async quickLoad() {
    return await db.saves.get(QUICK_SAVE_ID)
  }
}

// Auto-save interval (every 30 seconds)
let autoSaveInterval: ReturnType<typeof setInterval> | null = null

export function startAutoSave(saveId: number, intervalMs = 30000) {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
  autoSaveInterval = setInterval(() => {
    saveManager.autoSave(saveId).catch(console.error)
  }, intervalMs)
}

export function stopAutoSave() {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
    autoSaveInterval = null
  }
}
