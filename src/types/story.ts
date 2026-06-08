export interface StoryChoice {
  text: string
  nextNodeId: string
  requiredRelationship?: Record<string, number>
  requiredCoins?: number
  unlocksRelationship?: { characterId: string; value: number }
}

export interface StoryQuestion {
  id: string
  type: 'choice' | 'input' | 'speak'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  points: number
}

export interface StoryNode {
  id: string
  levelId: number
  chapterId: number
  title: string
  characterId: string
  content: string
  backgroundImage?: string
  choices: StoryChoice[]
  questions: StoryQuestion[]
  rewards: {
    coins: number
    experience: number
    relationship?: Record<string, number>
  }
  isCompleted: boolean
}

export interface StoryState {
  currentNodeId: string | null
  visitedNodes: string[]
  storyHistory: {
    nodeId: string
    choiceIndex: number
    timestamp: Date
  }[]
  
  // Actions
  startStory: (levelId: number) => void
  navigateToNode: (nodeId: string) => void
  makeChoice: (choiceIndex: number) => void
  resetStory: () => void
}
