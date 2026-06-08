// Games Index - Export all game components
export { default as TelepathyGame } from './TelepathyGame'

export { PuzzleGame } from './PuzzleGame'
export type { Puzzle, PuzzleClue } from './PuzzleGame'

export { HiddenObjectGame } from './HiddenObjectGame'
export type { HiddenObject, GameScene } from './HiddenObjectGame'

export { DialogChoice, getHoneyDialog, getTrunchbullDialog } from './DialogChoice'
export type { DialogOption, DialogEffect, DialogNode } from './DialogChoice'

export { RhythmGame } from './RhythmGame'
export type { RhythmNote, RhythmPattern } from './RhythmGame'

export { BossBattle } from './BossBattle'
export type { BossPhase, BossAction, Boss, PlayerState } from './BossBattle'
