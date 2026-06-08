import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  TelepathyState, 
  TelepathyPower, 
  TELEPATHY_CONFIG,
  type TelepathyLevel 
} from '../types/telepathy'

interface TelepathyStore extends TelepathyState {
  // Actions
  activateTelepathy: () => void
  deactivateTelepathy: () => void
  consumeEnergy: (amount: number) => boolean
  recoverEnergy: () => void
  unlockPower: (power: TelepathyPower) => void
  upgradePower: (power: TelepathyPower) => void
  setTarget: (target: TelepathyState['currentTarget']) => void
  clearTarget: () => void
  resetEnergy: () => void
}

const defaultState: TelepathyState = {
  psychicEnergy: TELEPATHY_CONFIG.MAX_ENERGY,
  isTelepathyActive: false,
  currentTarget: null,
  unlockedPowers: ['levitation'],
  powerLevels: {
    levitation: 1,
    telekinesis: 0,
    mindShield: 0,
    objectScan: 0,
    energyTransfer: 0,
  },
}

export const useTelepathyStore = create<TelepathyStore>()(
  persist(
    (set, get) => ({
      ...defaultState,

      activateTelepathy: () => {
        const { psychicEnergy } = get()
        if (psychicEnergy >= TELEPATHY_CONFIG.MIN_ENERGY_THRESHOLD) {
          set({ isTelepathyActive: true })
        }
      },

      deactivateTelepathy: () => {
        set({ isTelepathyActive: false, currentTarget: null })
      },

      consumeEnergy: (amount: number) => {
        const { psychicEnergy } = get()
        if (psychicEnergy >= amount) {
          set({ psychicEnergy: psychicEnergy - amount })
          return true
        }
        // 能量不足，自动关闭意念
        if (psychicEnergy < TELEPATHY_CONFIG.MIN_ENERGY_THRESHOLD) {
          set({ isTelepathyActive: false, currentTarget: null })
        }
        return false
      },

      recoverEnergy: () => {
        const { psychicEnergy, isTelepathyActive } = get()
        if (!isTelepathyActive && psychicEnergy < TELEPATHY_CONFIG.MAX_ENERGY) {
          const newEnergy = Math.min(
            psychicEnergy + TELEPATHY_CONFIG.ENERGY_RECOVERY_RATE,
            TELEPATHY_CONFIG.MAX_ENERGY
          )
          set({ psychicEnergy: newEnergy })
        }
      },

      unlockPower: (power: TelepathyPower) => {
        const { unlockedPowers } = get()
        if (!unlockedPowers.includes(power)) {
          set({ unlockedPowers: [...unlockedPowers, power] })
        }
      },

      upgradePower: (power: TelepathyPower) => {
        const { powerLevels, unlockedPowers } = get()
        if (unlockedPowers.includes(power)) {
          set({
            powerLevels: {
              ...powerLevels,
              [power]: powerLevels[power] + 1,
            },
          })
        }
      },

      setTarget: (target) => {
        set({ currentTarget: target })
      },

      clearTarget: () => {
        set({ currentTarget: null })
      },

      resetEnergy: () => {
        set({ psychicEnergy: TELEPATHY_CONFIG.MAX_ENERGY })
      },
    }),
    {
      name: 'telepathy-storage',
    }
  )
)

// Predefined telepathy levels
export const TELEPATHY_LEVELS: TelepathyLevel[] = [
  {
    id: 1,
    title: '初学者试炼',
    description: '集中精神，移动轻量物体',
    targets: [
      { id: 't1', name: '羽毛', type: 'object', position: { x: 50, y: 200 }, weight: 1, isMovable: true },
    ],
    obstacles: [],
    goalPosition: { x: 250, y: 100 },
    timeLimit: 30,
    energyCost: 20,
    rewards: { coins: 10, experience: 15 },
  },
  {
    id: 2,
    title: '念力提升',
    description: '移动稍重的物体',
    targets: [
      { id: 't2', name: '书本', type: 'object', position: { x: 50, y: 250 }, weight: 5, isMovable: true },
    ],
    obstacles: [],
    goalPosition: { x: 280, y: 150 },
    timeLimit: 25,
    energyCost: 25,
    rewards: { coins: 15, experience: 20 },
  },
  {
    id: 3,
    title: '障碍突破',
    description: '穿越障碍物移动目标',
    targets: [
      { id: 't3', name: '水晶球', type: 'object', position: { x: 30, y: 300 }, weight: 3, isMovable: true },
    ],
    obstacles: [
      { id: 'o1', name: '石墙', type: 'barrier', position: { x: 150, y: 200 }, weight: 100, isMovable: false },
    ],
    goalPosition: { x: 300, y: 300 },
    timeLimit: 35,
    energyCost: 30,
    rewards: { coins: 20, experience: 25, powerUnlock: 'telekinesis' },
  },
  {
    id: 4,
    title: '多重目标',
    description: '同时控制多个物体',
    targets: [
      { id: 't4a', name: '钥匙', type: 'object', position: { x: 30, y: 150 }, weight: 2, isMovable: true },
      { id: 't4b', name: '金币', type: 'object', position: { x: 30, y: 300 }, weight: 2, isMovable: true },
    ],
    obstacles: [],
    goalPosition: { x: 280, y: 225 },
    timeLimit: 40,
    energyCost: 40,
    rewards: { coins: 30, experience: 35 },
  },
  {
    id: 5,
    title: '大师试炼',
    description: '在限定时间内移动重物',
    targets: [
      { id: 't5', name: '雕像', type: 'object', position: { x: 50, y: 350 }, weight: 15, isMovable: true },
    ],
    obstacles: [
      { id: 'o2', name: '屏障', type: 'barrier', position: { x: 180, y: 250 }, weight: 100, isMovable: false },
    ],
    goalPosition: { x: 300, y: 100 },
    timeLimit: 30,
    energyCost: 50,
    rewards: { coins: 50, experience: 50, powerUnlock: 'mindShield' },
  },
]
