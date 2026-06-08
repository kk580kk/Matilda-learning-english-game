import { create } from 'zustand'
import type { RelationState, CharacterRelation, RelationshipEvent } from '../types/relation'

// Demo characters data
const defaultCharacters = [
  { id: 'matilda', name: 'Matilda' },
  { id: 'lily', name: 'Lily' },
  { id: 'tom', name: 'Tom' },
  { id: 'grandma', name: 'Grandma' },
  { id: 'owl', name: 'Professor Owl' }
]

export const useRelationStore = create<RelationState>((set, get) => ({
  relations: [],
  relationshipEvents: [],

  initializeRelations: (characters = defaultCharacters) => {
    const relations: CharacterRelation[] = characters.map(char => ({
      characterId: char.id,
      characterName: char.name,
      trustLevel: char.id === 'matilda' ? 50 : 0,
      intimacy: char.id === 'matilda' ? 30 : 0,
      isUnlocked: char.id === 'matilda',
      unlockedAt: char.id === 'matilda' ? new Date() : undefined,
      giftHistory: [],
      dialogueHistory: []
    }))
    set({ relations })
  },

  modifyTrust: (characterId: string, amount: number) => {
    const { relations } = get()
    set({
      relations: relations.map(rel => {
        if (rel.characterId === characterId) {
          const newTrust = Math.max(0, Math.min(100, rel.trustLevel + amount))
          return {
            ...rel,
            trustLevel: newTrust,
            lastInteraction: new Date()
          }
        }
        return rel
      })
    })
  },

  modifyIntimacy: (characterId: string, amount: number) => {
    const { relations } = get()
    set({
      relations: relations.map(rel => {
        if (rel.characterId === characterId) {
          const newIntimacy = Math.max(0, Math.min(100, rel.intimacy + amount))
          return {
            ...rel,
            intimacy: newIntimacy,
            lastInteraction: new Date()
          }
        }
        return rel
      })
    })
  },

  unlockCharacter: (characterId: string) => {
    const { relations } = get()
    const existing = relations.find(r => r.characterId === characterId)
    
    if (existing && !existing.isUnlocked) {
      set({
        relations: relations.map(rel => 
          rel.characterId === characterId 
            ? { ...rel, isUnlocked: true, unlockedAt: new Date() }
            : rel
        )
      })
    }
  },

  recordInteraction: (characterId: string, type: RelationshipEvent['type'], description: string) => {
    const { relationshipEvents } = get()
    
    const event: RelationshipEvent = {
      id: `event_${Date.now()}`,
      characterId,
      type,
      description,
      trustChange: type === 'gift' ? 10 : type === 'dialogue' ? 5 : type === 'story_choice' ? 8 : 3,
      intimacyChange: type === 'gift' ? 15 : type === 'dialogue' ? 8 : type === 'story_choice' ? 5 : 2,
      timestamp: new Date()
    }
    
    // Update relationship values
    get().modifyTrust(characterId, event.trustChange)
    get().modifyIntimacy(characterId, event.intimacyChange)
    
    // Record dialogue history
    const updatedRelations = get().relations.map(rel => {
      if (rel.characterId === characterId && type === 'dialogue') {
        return {
          ...rel,
          dialogueHistory: [...rel.dialogueHistory, event.id]
        }
      }
      return rel
    })
    
    set({
      relationshipEvents: [...relationshipEvents, event],
      relations: updatedRelations
    })
  },

  getCharacterRelation: (characterId: string) => {
    return get().relations.find(r => r.characterId === characterId)
  },

  updateRelationship: (characterId: string, trustChange: number, intimacyChange: number = 0) => {
    get().modifyTrust(characterId, trustChange)
    if (intimacyChange !== 0) {
      get().modifyIntimacy(characterId, intimacyChange)
    }
  },

  calculateTrustLevel: (characterId: string) => {
    const relation = get().getCharacterRelation(characterId)
    if (!relation) return 0
    
    // Calculate based on trust and intimacy
    const baseTrust = relation.trustLevel
    const intimacyBonus = Math.floor(relation.intimacy / 4)
    const totalTrust = Math.min(100, baseTrust + intimacyBonus)
    
    return totalTrust
  }
}))

// Helper function to get trust level badge
export const getTrustBadge = (trustLevel: number): string => {
  if (trustLevel >= 90) return '❤️ Soulmate'
  if (trustLevel >= 70) return '💖 Best Friend'
  if (trustLevel >= 50) return '😊 Friend'
  if (trustLevel >= 30) return '😐 Acquaintance'
  if (trustLevel >= 10) return '😶 Stranger'
  return '🔒 Locked'
}

// Helper function to get intimacy label
export const getIntimacyLabel = (intimacy: number): string => {
  if (intimacy >= 80) return 'Very Close'
  if (intimacy >= 60) return 'Close'
  if (intimacy >= 40) return 'Friendly'
  if (intimacy >= 20) return 'Casual'
  return 'Just Met'
}
