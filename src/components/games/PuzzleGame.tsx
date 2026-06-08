import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../../stores/gameStore'
import './PuzzleGame.css'

export interface Puzzle {
  id: string
  title: string
  description: string
  clues: PuzzleClue[]
  solution: string
  hint: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface PuzzleClue {
  id: string
  content: string
  isRevealed: boolean
  cost?: number
}

interface PuzzleGameProps {
  puzzle?: Puzzle
  onComplete?: (success: boolean) => void
}

// Demo puzzles
const demoPuzzles: Puzzle[] = [
  {
    id: 'puzzle_1',
    title: 'The Locked Door',
    description: 'You found a locked door with a mysterious combination lock. The door has symbols of the sun, moon, and stars.',
    difficulty: 'easy',
    solution: 'MOON',
    hint: 'Think about what rises in the night...',
    clues: [
      { id: 'clue_1', content: 'The first symbol glows brightest when the world is dark.', isRevealed: false },
      { id: 'clue_2', content: 'The second symbol changes shape throughout the month.', isRevealed: false },
      { id: 'clue_3', content: 'The answer is something we see in the night sky.', isRevealed: false }
    ]
  },
  {
    id: 'puzzle_2',
    title: 'Math Secret',
    description: 'A mysterious note says: "I am thinking of a number. Double it, add 5, and you get 21. What number am I thinking of?"',
    difficulty: 'medium',
    solution: '8',
    hint: 'Work backwards: 21 - 5 = ?',
    clues: [
      { id: 'clue_1', content: 'Start with the final number 21.', isRevealed: false },
      { id: 'clue_2', content: 'Subtract 5 first (since we added 5).', isRevealed: false },
      { id: 'clue_3', content: 'Now divide by 2 to find the original number.', isRevealed: false }
    ]
  },
  {
    id: 'puzzle_3',
    title: 'Word Riddle',
    description: 'A wizard asks: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?"',
    difficulty: 'hard',
    solution: 'MAP',
    hint: 'Think about something you can hold in your hands...',
    clues: [
      { id: 'clue_1', content: 'You use me to plan your travels.', isRevealed: false },
      { id: 'clue_2', content: 'I am flat and can be rolled up.', isRevealed: false },
      { id: 'clue_3', content: 'The answer is something made of paper.', isRevealed: false }
    ]
  }
]

export const PuzzleGame: React.FC<PuzzleGameProps> = ({
  puzzle: initialPuzzle,
  onComplete
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(initialPuzzle || demoPuzzles[0])
  const [userAnswer, setUserAnswer] = useState('')
  const [clues, setClues] = useState<PuzzleClue[]>(currentPuzzle?.clues || [])
  const [revealedCount, setRevealedCount] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' })

  const { addCoins, addExperience } = useGameStore()

  // Reset state when puzzle changes
  useEffect(() => {
    if (currentPuzzle) {
      setClues([...currentPuzzle.clues])
      setRevealedCount(0)
      setAttempts(0)
      setIsSolved(false)
      setShowHint(false)
      setUserAnswer('')
      setFeedback({ type: '', message: '' })
    }
  }, [currentPuzzle])

  // Reveal a clue
  const handleRevealClue = useCallback((index: number) => {
    if (clues[index].isRevealed) return
    
    const newClues = [...clues]
    newClues[index].isRevealed = true
    setClues(newClues)
    setRevealedCount(prev => prev + 1)
  }, [clues])

  // Submit answer
  const handleSubmit = useCallback(() => {
    if (!userAnswer.trim() || !currentPuzzle) return

    setAttempts(prev => prev + 1)
    
    if (userAnswer.trim().toUpperCase() === currentPuzzle.solution.toUpperCase()) {
      setIsSolved(true)
      setFeedback({ type: 'success', message: '🎉 Correct! You solved the puzzle!' })
      
      // Award coins and experience based on difficulty
      const coinRewards = { easy: 10, medium: 20, hard: 30 }
      const expRewards = { easy: 15, medium: 25, hard: 40 }
      
      const penalty = Math.max(0, (attempts - 1) * 2)
      const finalCoins = Math.max(1, coinRewards[currentPuzzle.difficulty] - penalty)
      const finalExp = Math.max(1, expRewards[currentPuzzle.difficulty] - penalty)
      
      addCoins(finalCoins)
      addExperience(finalExp)
      
      onComplete?.(true)
    } else {
      setFeedback({ type: 'error', message: '❌ Not quite right. Try again!' })
      // Clear feedback after 2 seconds
      setTimeout(() => setFeedback({ type: '', message: '' }), 2000)
    }
  }, [userAnswer, currentPuzzle, attempts, addCoins, addExperience, onComplete])

  // Select a different puzzle
  const handleSelectPuzzle = (puzzleId: string) => {
    const puzzle = demoPuzzles.find(p => p.id === puzzleId)
    if (puzzle) {
      setCurrentPuzzle(puzzle)
    }
  }

  // Handle keyboard submit
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (!currentPuzzle) {
    return (
      <div className="puzzle-game">
        <h2>🧩 Puzzle Game</h2>
        <p>No puzzle available.</p>
      </div>
    )
  }

  return (
    <div className="puzzle-game">
      <div className="puzzle-header">
        <h2>🧩 Puzzle Game</h2>
        <div className="puzzle-meta">
          <span className={`difficulty ${currentPuzzle.difficulty}`}>
            {currentPuzzle.difficulty}
          </span>
          <span className="attempts">Attempts: {attempts}</span>
        </div>
      </div>

      {/* Puzzle Selection */}
      {!isSolved && (
        <div className="puzzle-selector">
          <label>Select Puzzle:</label>
          <select
            value={currentPuzzle.id}
            onChange={(e) => handleSelectPuzzle(e.target.value)}
          >
            {demoPuzzles.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Puzzle Content */}
      <div className="puzzle-content">
        <h3>{currentPuzzle.title}</h3>
        <p className="puzzle-description">{currentPuzzle.description}</p>
      </div>

      {/* Clues Section */}
      <div className="clues-section">
        <h4>🔍 Clues</h4>
        <div className="clues-list">
          {clues.map((clue, index) => (
            <div
              key={clue.id}
              className={`clue-item ${clue.isRevealed ? 'revealed' : 'hidden'}`}
              onClick={() => !clue.isRevealed && handleRevealClue(index)}
            >
              {clue.isRevealed ? clue.content : `??? Clue ${index + 1}`}
            </div>
          ))}
        </div>
        <p className="clue-hint">
          Click on hidden clues to reveal them! (Revealed: {revealedCount}/{clues.length})
        </p>
      </div>

      {/* Hint Section */}
      <div className="hint-section">
        <button
          className="btn-hint"
          onClick={() => setShowHint(!showHint)}
          disabled={showHint}
        >
          {showHint ? '💡 Hint Shown' : '💡 Show Hint (-2 coins)'}
        </button>
        {showHint && <p className="hint-text">{currentPuzzle.hint}</p>}
      </div>

      {/* Answer Input */}
      {!isSolved && (
        <div className="answer-section">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your answer..."
            className="answer-input"
          />
          <button className="btn-submit" onClick={handleSubmit}>
            Submit Answer
          </button>
        </div>
      )}

      {/* Feedback */}
      {feedback.message && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      {/* Success State */}
      {isSolved && (
        <div className="success-section">
          <h4>🎊 Puzzle Solved!</h4>
          <div className="rewards">
            <span className="coin-reward">💰 +{Math.max(1, (currentPuzzle.difficulty === 'easy' ? 10 : currentPuzzle.difficulty === 'medium' ? 20 : 30) - Math.max(0, (attempts - 1) * 2))} Coins</span>
            <span className="exp-reward">✨ +{Math.max(1, (currentPuzzle.difficulty === 'easy' ? 15 : currentPuzzle.difficulty === 'medium' ? 25 : 40) - Math.max(0, (attempts - 1) * 2))} XP</span>
          </div>
          <button
            className="btn-next"
            onClick={() => {
              const currentIndex = demoPuzzles.findIndex(p => p.id === currentPuzzle.id)
              if (currentIndex < demoPuzzles.length - 1) {
                setCurrentPuzzle(demoPuzzles[currentIndex + 1])
              } else {
                setCurrentPuzzle(demoPuzzles[0])
              }
            }}
          >
            Next Puzzle →
          </button>
        </div>
      )}
    </div>
  )
}

export default PuzzleGame
