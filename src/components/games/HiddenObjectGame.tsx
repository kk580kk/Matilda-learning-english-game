import { useState, useCallback, useEffect } from 'react'
import { useGameStore } from '../../stores/gameStore'
import './HiddenObjectGame.css'

export interface HiddenObject {
  id: string
  name: string
  description?: string
  found: boolean
  position: { x: number; y: number }
}

export interface GameScene {
  id: string
  name: string
  backgroundColor: string
  difficulty: 'easy' | 'medium' | 'hard'
  objects: HiddenObject[]
}

interface HiddenObjectGameProps {
  scene?: GameScene
  onComplete?: (success: boolean) => void
}

// Demo scenes
const demoScenes: GameScene[] = [
  {
    id: 'scene_1',
    name: 'Matilda\'s Classroom',
    difficulty: 'easy',
    backgroundColor: '#f5e6d3',
    objects: [
      { id: 'obj_1', name: 'Chalk', found: false, position: { x: 20, y: 60 } },
      { id: 'obj_2', name: 'Desk', found: false, position: { x: 50, y: 70 } },
      { id: 'obj_3', name: 'Book', found: false, position: { x: 75, y: 55 } },
      { id: 'obj_4', name: 'Apple', found: false, position: { x: 35, y: 45 } },
      { id: 'obj_5', name: 'Pencil', found: false, position: { x: 60, y: 80 } },
      { id: 'obj_6', name: 'Eraser', found: false, position: { x: 15, y: 75 } },
      { id: 'obj_7', name: 'Ruler', found: false, position: { x: 80, y: 65 } },
      { id: 'obj_8', name: 'Notebook', found: false, position: { x: 45, y: 50 } },
    ]
  },
  {
    id: 'scene_2',
    name: 'The Magic Forest',
    difficulty: 'medium',
    backgroundColor: '#2d5a27',
    objects: [
      { id: 'obj_1', name: 'Mushroom', found: false, position: { x: 10, y: 80 } },
      { id: 'obj_2', name: 'Butterfly', found: false, position: { x: 30, y: 20 } },
      { id: 'obj_3', name: 'Fairy', found: false, position: { x: 70, y: 30 } },
      { id: 'obj_4', name: 'Acorn', found: false, position: { x: 85, y: 75 } },
      { id: 'obj_5', name: 'Flower', found: false, position: { x: 50, y: 70 } },
      { id: 'obj_6', name: 'Bird', found: false, position: { x: 25, y: 15 } },
      { id: 'obj_7', name: 'Squirrel', found: false, position: { x: 90, y: 50 } },
      { id: 'obj_8', name: 'Feather', found: false, position: { x: 40, y: 85 } },
      { id: 'obj_9', name: 'Crystal', found: false, position: { x: 60, y: 45 } },
      { id: 'obj_10', name: 'Spider', found: false, position: { x: 15, y: 25 } },
    ]
  },
  {
    id: 'scene_3',
    name: 'Miss Honey\'s Cottage',
    difficulty: 'hard',
    backgroundColor: '#8b4513',
    objects: [
      { id: 'obj_1', name: 'Key', found: false, position: { x: 5, y: 90 } },
      { id: 'obj_2', name: 'Letter', found: false, position: { x: 50, y: 55 } },
      { id: 'obj_3', name: 'Candle', found: false, position: { x: 80, y: 35 } },
      { id: 'obj_4', name: 'Photo', found: false, position: { x: 30, y: 25 } },
      { id: 'obj_5', name: 'Vase', found: false, position: { x: 90, y: 60 } },
      { id: 'obj_6', name: 'Clock', found: false, position: { x: 60, y: 15 } },
      { id: 'obj_7', name: 'Plant', found: false, position: { x: 10, y: 70 } },
      { id: 'obj_8', name: 'Mirror', found: false, position: { x: 70, y: 40 } },
      { id: 'obj_9', name: 'Book of Spells', found: false, position: { x: 40, y: 80 } },
      { id: 'obj_10', name: 'Potion', found: false, position: { x: 25, y: 50 } },
      { id: 'obj_11', name: 'Star', found: false, position: { x: 55, y: 10 } },
      { id: 'obj_12', name: 'Ribbon', found: false, position: { x: 75, y: 75 } },
    ]
  }
]

// Decoy objects that are not in the target list
const generateDecoys = (scene: GameScene): string[] => {
  const allDecoys = {
    'scene_1': ['Chair', 'Blackboard', 'Clock', 'Map', 'Globe', 'Paper', 'Scissors', 'Glue'],
    'scene_2': ['Tree', 'Rock', 'Leaf', 'Rabbit', 'Fox', 'Wolf', 'Owl', 'Sun', 'Moon'],
    'scene_3': ['Table', 'Chair', 'Bed', 'Window', 'Door', 'Rug', 'Lamp', 'Cup', 'Spoon'],
  }
  return allDecoys[scene.id as keyof typeof allDecoys] || []
}

export const HiddenObjectGame: React.FC<HiddenObjectGameProps> = ({
  scene: initialScene,
  onComplete
}) => {
  const [currentScene, setCurrentScene] = useState<GameScene | null>(
    initialScene || demoScenes[0]
  )
  const [objects, setObjects] = useState<HiddenObject[]>(currentScene?.objects || [])
  const [foundCount, setFoundCount] = useState(0)
  const [totalObjects, setTotalObjects] = useState(currentScene?.objects.length || 0)
  const [isComplete, setIsComplete] = useState(false)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [decoys] = useState<string[]>(generateDecoys(demoScenes[0]))

  const { addCoins, addExperience } = useGameStore()

  // Reset state when scene changes
  useEffect(() => {
    if (currentScene) {
      setObjects(currentScene.objects.map(o => ({ ...o, found: false })))
      setFoundCount(0)
      setTotalObjects(currentScene.objects.length)
      setIsComplete(false)
    }
  }, [currentScene])

  // Handle object click
  const handleObjectClick = useCallback((objectId: string, x: number, y: number) => {
    const objectIndex = objects.findIndex(o => o.id === objectId)
    if (objectIndex === -1 || objects[objectIndex].found) return

    // Update object as found
    const newObjects = [...objects]
    newObjects[objectIndex] = { ...newObjects[objectIndex], found: true }
    setObjects(newObjects)

    const newFoundCount = foundCount + 1
    setFoundCount(newFoundCount)

    // Show click animation
    setClickPosition({ x, y })
    setTimeout(() => setClickPosition(null), 500)

    // Check completion
    if (newFoundCount >= totalObjects) {
      setIsComplete(true)
      
      // Award coins and experience
      const coinRewards: Record<string, number> = { easy: 15, medium: 25, hard: 40 }
      const expRewards: Record<string, number> = { easy: 20, medium: 35, hard: 50 }
      
      const coins = coinRewards[currentScene!.difficulty] || 25
      const exp = expRewards[currentScene!.difficulty] || 35
      
      addCoins(coins)
      addExperience(exp)
      onComplete?.(true)
    }
  }, [objects, foundCount, totalObjects, currentScene, addCoins, addExperience, onComplete])

  // Handle scene selection
  const handleSceneChange = (sceneId: string) => {
    const scene = demoScenes.find(s => s.id === sceneId)
    if (scene) {
      setCurrentScene(scene)
    }
  }

  // Progress percentage
  const progress = totalObjects > 0 ? Math.round((foundCount / totalObjects) * 100) : 0

  if (!currentScene) {
    return (
      <div className="hidden-object-game">
        <h2>🔍 Hidden Object Game</h2>
        <p>No scene available.</p>
      </div>
    )
  }

  return (
    <div className="hidden-object-game">
      <div className="game-header">
        <h2>🔍 Hidden Object Game</h2>
        <div className="game-meta">
          <span className={`difficulty ${currentScene.difficulty}`}>
            {currentScene.difficulty}
          </span>
          <span className="scene-name">{currentScene.name}</span>
        </div>
      </div>

      {/* Scene Selection */}
      {!isComplete && (
        <div className="scene-selector">
          <label>Select Scene:</label>
          <select
            value={currentScene.id}
            onChange={(e) => handleSceneChange(e.target.value)}
          >
            {demoScenes.map(scene => (
              <option key={scene.id} value={scene.id}>
                {scene.name} ({scene.difficulty})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          {foundCount} / {totalObjects} objects found ({progress}%)
        </span>
      </div>

      {/* Game Area */}
      <div
        className="game-scene"
        style={{ backgroundColor: currentScene.backgroundColor }}
      >
        {/* Hidden Objects */}
        {objects.map((obj) => (
          <button
            key={obj.id}
            className={`hidden-object ${obj.found ? 'found' : ''}`}
            style={{
              left: `${obj.position.x}%`,
              top: `${obj.position.y}%`
            }}
            onClick={() => handleObjectClick(obj.id, obj.position.x, obj.position.y)}
            disabled={obj.found}
          >
            {obj.found ? '✓' : '?'}
          </button>
        ))}

        {/* Click Animation */}
        {clickPosition && (
          <div
            className="click-effect"
            style={{
              left: `${clickPosition.x}%`,
              top: `${clickPosition.y}%`
            }}
          >
            ★
          </div>
        )}

        {/* Decoys (visual distractions) */}
        {!isComplete && decoys.slice(0, 5).map((decoy, index) => (
          <div
            key={`decoy-${index}`}
            className="decoy-object"
            style={{
              left: `${(index * 15 + 5) % 90}%`,
              top: `${(index * 10 + 10) % 80}%`,
              opacity: 0.3
            }}
          >
            {decoy[0]}
          </div>
        ))}
      </div>

      {/* Object List */}
      <div className="object-list">
        <h4>Objects to Find:</h4>
        <div className="objects-grid">
          {objects.map(obj => (
            <span
              key={obj.id}
              className={`object-item ${obj.found ? 'found' : ''}`}
            >
              {obj.found ? '✓ ' : '○ '}{obj.name}
            </span>
          ))}
        </div>
      </div>

      {/* Decoy List */}
      <div className="decoy-list">
        <small>Decoys: {decoys.slice(0, 5).join(', ')}...</small>
      </div>

      {/* Completion State */}
      {isComplete && (
        <div className="completion-section">
          <h3>🎉 All Objects Found!</h3>
          <div className="rewards">
            <span className="coin-reward">
              💰 +{currentScene.difficulty === 'easy' ? 15 : currentScene.difficulty === 'medium' ? 25 : 40} Coins
            </span>
            <span className="exp-reward">
              ✨ +{currentScene.difficulty === 'easy' ? 20 : currentScene.difficulty === 'medium' ? 35 : 50} XP
            </span>
          </div>
          <button
            className="btn-next"
            onClick={() => {
              const currentIndex = demoScenes.findIndex(s => s.id === currentScene.id)
              if (currentIndex < demoScenes.length - 1) {
                setCurrentScene(demoScenes[currentIndex + 1])
              } else {
                setCurrentScene(demoScenes[0])
              }
            }}
          >
            Next Scene →
          </button>
        </div>
      )}
    </div>
  )
}

export default HiddenObjectGame
