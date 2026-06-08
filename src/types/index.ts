// Level types
export interface LevelData {
  levelId: string;
  chapter: number;
  title: string;
  titleEn: string;
  description: string;
  sceneComponent: string;
  objectives: string[];
  miniGames: string[];
  nextLevel: string | null;
  unlockCondition: {
    levelId?: string;
    condition: 'completed' | 'perfect' | 'any';
  } | null;
  difficulty: number; // 1-5 stars
  storyBackground: string;
}

export type LevelStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'perfect';

export interface LevelProgress {
  levelId: string;
  status: LevelStatus;
  score: number;
  playTime: number;
  completedAt?: string;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  requirement: {
    type: 'level_complete' | 'score_reach' | 'combo_reach' | 'secret';
    target: string | number;
  };
}

// Game state types
export interface GameState {
  isPlaying: boolean;
  totalPlayTime: number;
  currentLevelId: string | null;
}

// Save data
export interface SaveData {
  id?: number;
  playerName: string;
  currentLevel: string | null;
  levelProgress: Record<string, LevelProgress>;
  achievements: string[];
  playTime: number;
  saveTime: string;
}

// Telepathy game types
export interface TelepathyObject {
  id: string;
  name: string;
  emoji: string;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  mass: number;
  isPlaced: boolean;
}

// Speed reading game types
export interface SpeedWord {
  word: string;
  isCorrect: boolean;
}

// Boss battle types
export interface BossPhase {
  name: string;
  description: string;
}

export interface PlayerStats {
  health: number;
  maxHealth: number;
  telepathy: number;
  maxTelepathy: number;
}

export interface BossStats {
  health: number;
  maxHealth: number;
  suspicion: number;
  maxSuspicion: number;
}
