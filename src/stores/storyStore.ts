import { create } from 'zustand'
import type { StoryState, StoryNode } from '../types/story'

// Demo story data for Level 1
const demoStoryNodes: StoryNode[] = [
  {
    id: 'story_1_start',
    levelId: 1,
    chapterId: 1,
    title: 'Meet Matilda',
    characterId: 'matilda',
    content: 'Hello! I\'m Matilda. Welcome to the magical world of English learning! Today we\'ll start with some basic greetings.',
    backgroundImage: '/images/story/bg_garden.jpg',
    choices: [
      {
        text: 'Hello! Nice to meet you!',
        nextNodeId: 'story_1_greeting',
        unlocksRelationship: { characterId: 'matilda', value: 5 }
      },
      {
        text: 'Hi! What will we learn today?',
        nextNodeId: 'story_1_learn'
      }
    ],
    questions: [],
    rewards: {
      coins: 10,
      experience: 5,
      relationship: { matilda: 3 }
    },
    isCompleted: false
  },
  {
    id: 'story_1_greeting',
    levelId: 1,
    chapterId: 1,
    title: 'A Friendly Hello',
    characterId: 'matilda',
    content: 'Nice to meet you too! When we meet someone new, we can say "Nice to meet you!" Let\'s practice together!',
    backgroundImage: '/images/story/bg_garden.jpg',
    choices: [
      {
        text: 'Let me try! Nice to meet you!',
        nextNodeId: 'story_1_quiz'
      }
    ],
    questions: [],
    rewards: {
      coins: 5,
      experience: 5
    },
    isCompleted: false
  },
  {
    id: 'story_1_learn',
    levelId: 1,
    chapterId: 1,
    title: 'Learning Journey',
    characterId: 'matilda',
    content: 'Great question! We\'ll learn new words, grammar, and even read fun stories! But first, let\'s start with something simple.',
    backgroundImage: '/images/story/bg_garden.jpg',
    choices: [
      {
        text: 'I\'m ready! Let\'s go!',
        nextNodeId: 'story_1_quiz'
      }
    ],
    questions: [],
    rewards: {
      coins: 5,
      experience: 5
    },
    isCompleted: false
  },
  {
    id: 'story_1_quiz',
    levelId: 1,
    chapterId: 1,
    title: 'First Challenge',
    characterId: 'matilda',
    content: 'Now it\'s time for a quick quiz! Can you answer this question?',
    backgroundImage: '/images/story/bg_garden.jpg',
    choices: [],
    questions: [
      {
        id: 'q1',
        type: 'choice',
        question: 'How do you say "你好" in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'],
        correctAnswer: 'Hello',
        points: 10
      }
    ],
    rewards: {
      coins: 20,
      experience: 15
    },
    isCompleted: false
  },
  {
    id: 'story_1_complete',
    levelId: 1,
    chapterId: 1,
    title: 'Great Job!',
    characterId: 'matilda',
    content: 'Excellent work! You\'ve completed your first lesson. Keep up the great learning!',
    backgroundImage: '/images/story/bg_garden.jpg',
    choices: [],
    questions: [],
    rewards: {
      coins: 30,
      experience: 20
    },
    isCompleted: false
  }
]

export const useStoryStore = create<StoryState>((set, get) => ({
  currentNodeId: null,
  visitedNodes: [],
  storyHistory: [],

  startStory: (levelId: number) => {
    // Find the starting node for this level
    const startNode = demoStoryNodes.find(node => 
      node.levelId === levelId && 
      node.choices.some(c => c.nextNodeId)
    )
    
    if (startNode) {
      set({
        currentNodeId: startNode.id,
        visitedNodes: [startNode.id],
        storyHistory: []
      })
    }
  },

  navigateToNode: (nodeId: string) => {
    const { visitedNodes } = get()
    set({
      currentNodeId: nodeId,
      visitedNodes: visitedNodes.includes(nodeId) 
        ? visitedNodes 
        : [...visitedNodes, nodeId]
    })
  },

  makeChoice: (choiceIndex: number) => {
    const { currentNodeId, storyHistory } = get()
    const currentNode = demoStoryNodes.find(n => n.id === currentNodeId)
    
    if (currentNode && currentNode.choices[choiceIndex]) {
      const nextNodeId = currentNode.choices[choiceIndex].nextNodeId
      
      set({
        currentNodeId: nextNodeId,
        visitedNodes: [...get().visitedNodes, nextNodeId],
        storyHistory: [
          ...storyHistory,
          {
            nodeId: currentNodeId!,
            choiceIndex,
            timestamp: new Date()
          }
        ]
      })
    }
  },

  resetStory: () => {
    set({
      currentNodeId: null,
      visitedNodes: [],
      storyHistory: []
    })
  }
}))

// Helper function to get current story node
export const getCurrentStoryNode = (): StoryNode | null => {
  const state = useStoryStore.getState()
  if (!state.currentNodeId) return null
  return demoStoryNodes.find(n => n.id === state.currentNodeId) || null
}

// Export story data for external use
export { demoStoryNodes }
