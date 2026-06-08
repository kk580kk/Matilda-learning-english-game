export interface CharacterRelation {
  characterId: string
  characterName: string
  trustLevel: number // 0-100
  intimacy: number // 0-100
  isUnlocked: boolean
  unlockedAt?: Date
  lastInteraction?: Date
  giftHistory: {
    giftId: string
    timestamp: Date
    trustBonus: number
  }[]
  dialogueHistory: string[] // node IDs
}

export interface RelationshipEvent {
  id: string
  characterId: string
  type: 'gift' | 'dialogue' | 'help' | 'story_choice'
  description: string
  trustChange: number
  intimacyChange: number
  timestamp: Date
}

export interface RelationState {
  relations: CharacterRelation[]
  relationshipEvents: RelationshipEvent[]
  
  // Actions
  initializeRelations: (characters: { id: string; name: string }[]) => void
  modifyTrust: (characterId: string, amount: number) => void
  modifyIntimacy: (characterId: string, amount: number) => void
  unlockCharacter: (characterId: string) => void
  recordInteraction: (characterId: string, type: RelationshipEvent['type'], description: string) => void
  getCharacterRelation: (characterId: string) => CharacterRelation | undefined
  updateRelationship: (characterId: string, trustChange: number, intimacyChange?: number) => void
  calculateTrustLevel: (characterId: string) => number
}
