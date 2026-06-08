import { useState, useEffect, useCallback, useRef } from 'react'
import { useGameStore } from '../../stores/gameStore'
import './RhythmGame.css'

export interface RhythmNote {
  id: string
  lane: number
  time: number // milliseconds from start
  hit?: boolean
  missed?: boolean
}

export interface RhythmPattern {
  id: string
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
  bpm: number
  duration: number // ms
  notes: RhythmNote[]
}

interface RhythmGameProps {
  pattern?: RhythmPattern
  onComplete?: (score: number) => void
}

// Generate a rhythm pattern
const generatePattern = (difficulty: 'easy' | 'medium' | 'hard'): RhythmPattern => {
  const bpm = difficulty === 'easy' ? 80 : difficulty === 'medium' ? 100 : 120
  const beatInterval = 60000 / bpm
  const duration = difficulty === 'easy' ? 20000 : difficulty === 'medium' ? 30000 : 45000
  
  const noteCount = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 20 : 30
  const notes: RhythmNote[] = []
  
  // Generate notes on 4 lanes
  for (let i = 0; i < noteCount; i++) {
    const time = (i * beatInterval) + (Math.random() * beatInterval * 0.5)
    if (time < duration) {
      notes.push({
        id: `note_${i}`,
        lane: Math.floor(Math.random() * 4),
        time: Math.round(time)
      })
    }
  }
  
  // Add bonus cake eating moments (every 4 beats)
  const cakeTimes: number[] = []
  for (let t = beatInterval * 4; t < duration; t += beatInterval * 4) {
    cakeTimes.push(t)
  }
  
  return {
    id: `pattern_${difficulty}`,
    name: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Pattern`,
    difficulty,
    bpm,
    duration,
    notes
  }
}

// Demo pattern
const demoPattern: RhythmPattern = {
  id: 'demo_1',
  name: 'Cake Time!',
  difficulty: 'easy',
  bpm: 80,
  duration: 20000,
  notes: [
    { id: 'n1', lane: 0, time: 500 },
    { id: 'n2', lane: 1, time: 1000 },
    { id: 'n3', lane: 2, time: 1500 },
    { id: 'n4', lane: 3, time: 2000 },
    { id: 'n5', lane: 0, time: 2500 },
    { id: 'n6', lane: 1, time: 3000 },
    { id: 'n7', lane: 2, time: 3500 },
    { id: 'n8', lane: 3, time: 4000 },
    { id: 'n9', lane: 1, time: 5000 },
    { id: 'n10', lane: 2, time: 6000 },
    { id: 'n11', lane: 0, time: 7000 },
    { id: 'n12', lane: 3, time: 8000 },
  ]
}

interface MoraleState {
  value: number
  maxValue: number
  isBoosted: boolean
}

export const RhythmGame: React.FC<RhythmGameProps> = ({
  pattern: initialPattern,
  onComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [notes, setNotes] = useState<RhythmNote[]>([])
  const [pattern, setPattern] = useState<RhythmPattern>(initialPattern || demoPattern)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [cakesEaten, setCakesEaten] = useState(0)
  const [morale, setMorale] = useState<MoraleState>({ value: 50, maxValue: 100, isBoosted: false })
  const [gameTime, setGameTime] = useState(0)
  const [hitEffects, setHitEffects] = useState<{ lane: number; time: number }[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const gameLoopRef = useRef<number | null>(null)
  const { addCoins, addExperience } = useGameStore()

  // Generate pattern based on difficulty
  const generateNewPattern = useCallback((diff: 'easy' | 'medium' | 'hard') => {
    const newPattern = generatePattern(diff)
    setPattern(newPattern)
    setNotes(newPattern.notes.map(n => ({ ...n, hit: false, missed: false })))
  }, [])

  // Initialize pattern
  useEffect(() => {
    if (initialPattern) {
      setPattern(initialPattern)
      setNotes(initialPattern.notes.map(n => ({ ...n, hit: false, missed: false })))
    } else {
      generateNewPattern(difficulty)
    }
  }, [initialPattern, difficulty, generateNewPattern])

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isComplete) return

      const laneMap: Record<string, number> = {
        'a': 0, 's': 1, 'd': 2, 'f': 3,
        'ArrowLeft': 0, 'ArrowDown': 1, 'ArrowUp': 2, 'ArrowRight': 3
      }

      const lane = laneMap[e.key.toLowerCase()]
      if (lane !== undefined) {
        handleHit(lane)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isComplete, gameTime, notes])

  // Game loop
  useEffect(() => {
    if (isPlaying && !isComplete) {
      const updateGame = () => {
        const currentTime = Date.now() - (startTime || 0)
        setGameTime(currentTime)

        // Check for missed notes
        setNotes(prev => prev.map(note => {
          if (!note.hit && !note.missed && currentTime > note.time + 300) {
            setCombo(0)
            setMorale(prev => ({
              ...prev,
              value: Math.max(0, prev.value - 5)
            }))
            return { ...note, missed: true }
          }
          return note
        }))

        // Check game end
        if (currentTime >= pattern.duration) {
          endGame()
          return
        }

        gameLoopRef.current = requestAnimationFrame(updateGame)
      }

      gameLoopRef.current = requestAnimationFrame(updateGame)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [isPlaying, isComplete, startTime, pattern.duration])

  // Handle hit
  const handleHit = useCallback((lane: number) => {
    const currentTime = gameTime
    
    // Find closest note in this lane
    const hitWindow = 300 // ms
    const hitNote = notes.find(n => 
      n.lane === lane && 
      !n.hit && 
      !n.missed && 
      Math.abs(currentTime - n.time) < hitWindow
    )

    if (hitNote) {
      // Calculate accuracy
      const accuracy = 1 - Math.abs(currentTime - hitNote.time) / hitWindow
      const points = Math.round(100 * accuracy)
      
      // Update note as hit
      setNotes(prev => prev.map(n => 
        n.id === hitNote.id ? { ...n, hit: true } : n
      ))

      // Update score and combo
      setScore(prev => prev + points * (1 + combo * 0.1))
      const newCombo = combo + 1
      setCombo(newCombo)
      setMaxCombo(prev => Math.max(prev, newCombo))

      // Add hit effect
      setHitEffects(prev => [...prev, { lane, time: Date.now() }])
      setTimeout(() => {
        setHitEffects(prev => prev.slice(1))
      }, 200)

      // Chance to eat cake (every 5 hits)
      if (newCombo > 0 && newCombo % 5 === 0) {
        handleEatCake()
      }

      // Boost morale on perfect hits
      if (accuracy > 0.8) {
        setMorale(prev => ({
          ...prev,
          value: Math.min(prev.maxValue, prev.value + 2)
        }))
      }
    } else {
      // Miss (clicked wrong lane)
      setCombo(0)
      setMorale(prev => ({
        ...prev,
        value: Math.max(0, prev.value - 3)
      }))
    }
  }, [gameTime, notes, combo])

  // Handle eating cake
  const handleEatCake = useCallback(() => {
    setCakesEaten(prev => prev + 1)
    
    // Morale boost
    setMorale(prev => ({
      ...prev,
      value: Math.min(prev.maxValue, prev.value + 15),
      isBoosted: true
    }))

    setTimeout(() => {
      setMorale(prev => ({ ...prev, isBoosted: false }))
    }, 1000)
  }, [])

  // Start game
  const startGame = useCallback(() => {
    setNotes(pattern.notes.map(n => ({ ...n, hit: false, missed: false })))
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setCakesEaten(0)
    setMorale({ value: 50, maxValue: 100, isBoosted: false })
    setGameTime(0)
    setStartTime(Date.now())
    setIsPlaying(true)
    setIsComplete(false)
  }, [pattern.notes])

  // End game
  const endGame = useCallback(() => {
    setIsPlaying(false)
    setIsComplete(true)

    // Award rewards
    const coinRewards = { easy: 20, medium: 35, hard: 50 }
    const expRewards = { easy: 25, medium: 40, hard: 60 }

    const coins = coinRewards[pattern.difficulty]
    const exp = expRewards[pattern.difficulty]

    addCoins(coins)
    addExperience(exp)

    onComplete?.(score)
  }, [notes, pattern.difficulty, score, addCoins, addExperience, onComplete])

  // Handle lane button click
  const handleLaneClick = (lane: number) => {
    if (isPlaying && !isComplete) {
      handleHit(lane)
    }
  }

  // Calculate progress
  const progress = pattern.duration > 0 ? (gameTime / pattern.duration) * 100 : 0

  // Lane colors
  const laneColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']

  return (
    <div className="rhythm-game">
      <div className="game-header">
        <h2>🎵 Rhythm Game - Cake Time!</h2>
        <div className="game-stats">
          <span className={`difficulty ${pattern.difficulty}`}>{pattern.difficulty}</span>
          <span className="bpm">{pattern.bpm} BPM</span>
        </div>
      </div>

      {/* Controls */}
      {!isPlaying && !isComplete && (
        <div className="controls-section">
          <div className="difficulty-selector">
            <label>Difficulty:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className="btn-start" onClick={() => generateNewPattern(difficulty)}>
            Generate Pattern
          </button>
          <button className="btn-start" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {/* Score Display */}
      <div className="score-section">
        <div className="score-display">
          <span className="label">Score</span>
          <span className="value">{score}</span>
        </div>
        <div className="combo-display">
          <span className="label">Combo</span>
          <span className="value">{combo}</span>
        </div>
        <div className=" cakes-display">
          <span className="label">🎂 Cakes</span>
          <span className="value">{cakesEaten}</span>
        </div>
      </div>

      {/* Morale Bar */}
      <div className="morale-section">
        <div className="morale-label">
          <span>💓 Team Morale</span>
          <span>{morale.value}/{morale.maxValue}</span>
        </div>
        <div className="morale-bar">
          <div
            className={`morale-fill ${morale.isBoosted ? 'boosted' : ''}`}
            style={{ width: `${(morale.value / morale.maxValue) * 100}%` }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          {Math.round(gameTime / 1000)}s / {Math.round(pattern.duration / 1000)}s
        </span>
      </div>

      {/* Game Lane Area */}
      <div className="game-lane-area">
        <div className="lanes-container">
          {[0, 1, 2, 3].map(lane => (
            <div
              key={lane}
              className={`lane ${hitEffects.some(e => e.lane === lane) ? 'hit' : ''}`}
              style={{ backgroundColor: laneColors[lane] + '33' }}
              onClick={() => handleLaneClick(lane)}
            >
              {/* Target line */}
              <div className="target-line" />

              {/* Notes */}
              {notes.map(note => {
                if (note.lane !== lane) return null
                const noteProgress = ((note.time - gameTime) / 2000) * 100
                const isVisible = noteProgress >= -20 && noteProgress <= 120

                if (!isVisible) return null

                return (
                  <div
                    key={note.id}
                    className={`note ${note.hit ? 'hit' : ''} ${note.missed ? 'missed' : ''}`}
                    style={{
                      top: `${100 - noteProgress}%`,
                      backgroundColor: laneColors[lane]
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {/* Key hints */}
        <div className="key-hints">
          <span>A</span>
          <span>S</span>
          <span>D</span>
          <span>F</span>
        </div>
      </div>

      {/* Hit Effects */}
      {hitEffects.map((_, i) => (
        <div key={i} className="hit-effect-text">
          PERFECT!
        </div>
      ))}

      {/* Completion State */}
      {isComplete && (
        <div className="completion-section">
          <h3>🎉 Rhythm Complete!</h3>
          <div className="results-grid">
            <div className="result-card">
              <span className="label">Final Score</span>
              <span className="value">{score}</span>
            </div>
            <div className="result-card">
              <span className="label">Max Combo</span>
              <span className="value">{maxCombo}x</span>
            </div>
            <div className="result-card">
              <span className="label">Cakes Eaten</span>
              <span className="value">{cakesEaten} 🎂</span>
            </div>
            <div className="result-card">
              <span className="label">Accuracy</span>
              <span className="value">
                {notes.length > 0 ? Math.round((notes.filter(n => n.hit).length / notes.length) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="rewards">
            <span className="coin-reward">
              💰 +{pattern.difficulty === 'easy' ? 20 : pattern.difficulty === 'medium' ? 35 : 50} Coins
            </span>
            <span className="exp-reward">
              ✨ +{pattern.difficulty === 'easy' ? 25 : pattern.difficulty === 'medium' ? 40 : 60} XP
            </span>
          </div>
          <button className="btn-restart" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default RhythmGame
