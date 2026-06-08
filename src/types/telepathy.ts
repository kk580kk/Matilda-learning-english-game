// Telepathy System Types

export interface TelepathyState {
  // 精神力能量 (0-100)
  psychicEnergy: number
  // 是否激活意念能力
  isTelepathyActive: boolean
  // 当前意念控制的目标
  currentTarget: TelepathyTarget | null
  // 已解锁的超能力列表
  unlockedPowers: TelepathyPower[]
  // 超能力等级
  powerLevels: Record<TelepathyPower, number>
}

export interface TelepathyTarget {
  id: string
  name: string
  type: 'object' | 'character' | 'barrier'
  position: { x: number; y: number }
  weight: number // 重量，越重越难移动
  isMovable: boolean
}

export type TelepathyPower = 
  | 'levitation'      // 悬浮
  | 'telekinesis'     // 念力移动
  | 'mindShield'      // 心灵护盾
  | 'objectScan'      // 物体扫描
  | 'energyTransfer'  // 能量转移

export interface TelepathyLevel {
  id: number
  title: string
  description: string
  targets: TelepathyTarget[]
  obstacles: TelepathyTarget[]
  goalPosition: { x: number; y: number }
  timeLimit: number // 秒
  energyCost: number
  rewards: {
    coins: number
    experience: number
    powerUnlock?: TelepathyPower
  }
}

export interface TelepathyGameState {
  isPlaying: boolean
  currentLevel: number
  score: number
  energyUsed: number
  targetsMoved: number
  startTime: number
  isCompleted: boolean
  isPaused: boolean
}

// Energy consumption and recovery rates
export const TELEPATHY_CONFIG = {
  MAX_ENERGY: 100,
  ENERGY_RECOVERY_RATE: 2, // 每秒恢复几点
  ENERGY_COST_MOVING: 0.5, // 移动物体每秒消耗
  ENERGY_COST_LEVITATION: 1, // 悬浮每秒消耗
  MIN_ENERGY_THRESHOLD: 10, // 最低能量阈值
  MOVEMENT_SPEED: 3, // 移动速度
}
