import { useState, useEffect, useCallback, useRef } from 'react'
import { useTelepathyStore, TELEPATHY_LEVELS } from '../../stores/telepathyStore'
import { TELEPATHY_CONFIG, type TelepathyGameState, type TelepathyTarget } from '../../types/telepathy'
import { useGameStore } from '../../stores/gameStore'

interface Props {
  onComplete?: (score: number, rewards: { coins: number; experience: number }) => void
  onClose?: () => void
}

export default function TelepathyGame({ onComplete, onClose }: Props) {
  const { 
    psychicEnergy, 
    isTelepathyActive, 
    currentTarget,
    activateTelepathy, 
    deactivateTelepathy,
    consumeEnergy,
    recoverEnergy,
    setTarget,
    clearTarget,
  } = useTelepathyStore()
  
  const { addCoins, addExperience } = useGameStore()

  const [gameState, setGameState] = useState<TelepathyGameState>({
    isPlaying: false,
    currentLevel: 1,
    score: 0,
    energyUsed: 0,
    targetsMoved: 0,
    startTime: 0,
    isCompleted: false,
    isPaused: false,
  })

  const [targets, setTargets] = useState<TelepathyTarget[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Load level targets
  const loadLevel = useCallback((levelNum: number) => {
    const level = TELEPATHY_LEVELS.find(l => l.id === levelNum)
    if (level) {
      setTargets(level.targets.map(t => ({ ...t, position: { ...t.position } })))
    }
  }, [])

  // Start game
  const startGame = useCallback(() => {
    loadLevel(gameState.currentLevel)
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      score: 0,
      energyUsed: 0,
      targetsMoved: 0,
      startTime: Date.now(),
      isCompleted: false,
      isPaused: false,
    }))
  }, [gameState.currentLevel, loadLevel])

  // Energy recovery loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState.isPlaying || gameState.isPaused) return
      recoverEnergy()
    }, 1000)
    return () => clearInterval(interval)
  }, [gameState.isPlaying, gameState.isPaused, recoverEnergy])

  // Time limit check
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) return
    
    const level = TELEPATHY_LEVELS.find(l => l.id === gameState.currentLevel)
    if (!level) return

    const checkTime = setInterval(() => {
      const elapsed = (Date.now() - gameState.startTime) / 1000
      if (elapsed >= level.timeLimit) {
        handleTimeout()
      }
    }, 1000)

    return () => clearInterval(checkTime)
  }, [gameState.isPlaying, gameState.isPaused, gameState.startTime, gameState.currentLevel])

  // Game loop for target movement
  useEffect(() => {
    if (!isTelepathyActive || !currentTarget || !gameState.isPlaying || gameState.isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const moveTarget = () => {
      setTargets(prev => prev.map(t => {
        if (t.id !== currentTarget.id) return t
        
        const dx = mousePos.x - t.position.x
        const dy = mousePos.y - t.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 5) {
          const speed = TELEPATHY_CONFIG.MOVEMENT_SPEED / t.weight
          const moveX = t.position.x + (dx / distance) * speed
          const moveY = t.position.y + (dy / distance) * speed
          
          // Consume energy based on movement
          consumeEnergy(TELEPATHY_CONFIG.ENERGY_COST_MOVING / 60)
          
          return { ...t, position: { x: moveX, y: moveY } }
        }
        return t
      }))

      animationRef.current = requestAnimationFrame(moveTarget)
    }

    animationRef.current = requestAnimationFrame(moveTarget)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isTelepathyActive, currentTarget, mousePos, gameState.isPlaying, gameState.isPaused, consumeEnergy])

  // Check win condition
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) return

    const level = TELEPATHY_LEVELS.find(l => l.id === gameState.currentLevel)
    if (!level) return

    const allTargetsInGoal = targets.every(t => {
      const dx = t.position.x - level.goalPosition.x
      const dy = t.position.y - level.goalPosition.y
      return Math.sqrt(dx * dx + dy * dy) < 30
    })

    if (allTargetsInGoal && targets.length > 0) {
      handleWin()
    }
  }, [targets, gameState.isPlaying, gameState.isPaused, gameState.currentLevel])

  const handleWin = async () => {
    const level = TELEPATHY_LEVELS.find(l => l.id === gameState.currentLevel)
    if (!level) return

    setGameState(prev => ({ ...prev, isCompleted: true, isPlaying: false }))
    
    await addCoins(level.rewards.coins)
    await addExperience(level.rewards.experience)
    
    if (level.rewards.powerUnlock) {
      useTelepathyStore.getState().unlockPower(level.rewards.powerUnlock)
    }

    onComplete?.(gameState.score + level.rewards.coins * 10, {
      coins: level.rewards.coins,
      experience: level.rewards.experience,
    })
  }

  const handleTimeout = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
    alert('时间到！挑战失败。')
    onClose?.()
  }

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseDown = (target: TelepathyTarget) => {
    if (!gameState.isPlaying || gameState.isPaused) return
    if (!isTelepathyActive) {
      activateTelepathy()
    }
    if (target.isMovable) {
      setTarget(target)
    }
  }

  const handleMouseUp = () => {
    clearTarget()
  }

  const currentLevelData = TELEPATHY_LEVELS.find(l => l.id === gameState.currentLevel)

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-purple-800/50">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            ✕ 关闭
          </button>
          <h2 className="text-white font-bold text-lg">
            超能力训练 - 第 {gameState.currentLevel} 关
          </h2>
          <div className="text-white/80 text-sm">
            {currentLevelData?.title}
          </div>
        </div>

        {/* Energy Bar */}
        <div className="px-4 py-2 bg-purple-950/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple-200 text-sm">精神力</span>
            <span className="text-purple-200 text-sm">{Math.round(psychicEnergy)}</span>
          </div>
          <div className="h-3 bg-purple-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
              style={{ width: `${(psychicEnergy / TELEPATHY_CONFIG.MAX_ENERGY) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="relative h-80 bg-gradient-to-b from-indigo-900/50 to-purple-900/50 m-4 rounded-xl overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Goal Area */}
          {currentLevelData && (
            <div 
              className="absolute w-16 h-16 border-2 border-dashed border-yellow-400/50 rounded-lg flex items-center justify-center"
              style={{ 
                left: currentLevelData.goalPosition.x - 30, 
                top: currentLevelData.goalPosition.y - 30 
              }}
            >
              <span className="text-yellow-400/50 text-xs">目标</span>
            </div>
          )}

          {/* Targets */}
          {targets.map(target => (
            <div
              key={target.id}
              className={`
                absolute w-12 h-12 rounded-lg flex items-center justify-center cursor-grab
                transition-all duration-75
                ${currentTarget?.id === target.id 
                  ? 'bg-cyan-500/80 shadow-lg shadow-cyan-400/50 scale-110' 
                  : 'bg-purple-500/70 hover:bg-purple-400/80'}
                ${!target.isMovable ? 'bg-red-500/50 cursor-not-allowed' : ''}
              `}
              style={{ 
                left: target.position.x - 24, 
                top: target.position.y - 24,
                fontSize: '24px'
              }}
              onMouseDown={() => handleMouseDown(target)}
            >
              {target.type === 'object' && target.name.includes('羽毛') && '🪶'}
              {target.type === 'object' && target.name.includes('书本') && '📚'}
              {target.type === 'object' && target.name.includes('水晶') && '🔮'}
              {target.type === 'object' && target.name.includes('钥匙') && '🔑'}
              {target.type === 'object' && target.name.includes('金币') && '🪙'}
              {target.type === 'object' && target.name.includes('雕像') && '🗿'}
              {target.type === 'barrier' && '🧱'}
            </div>
          ))}

          {/* Active indicator */}
          {isTelepathyActive && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">意念激活中</span>
            </div>
          )}

          {/* Mouse pointer indicator when targeting */}
          {currentTarget && (
            <div 
              className="absolute w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none"
              style={{ 
                left: mousePos.x - 12, 
                top: mousePos.y - 12,
                transform: 'scale(1.5)'
              }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="p-4 bg-purple-800/30">
          {!gameState.isPlaying ? (
            <button
              onClick={startGame}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-bold hover:from-cyan-400 hover:to-purple-400 transition-all"
            >
              {gameState.isCompleted ? '下一关' : gameState.currentLevel > 1 ? '重新开始' : '开始训练'}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (isTelepathyActive) {
                    deactivateTelepathy()
                  } else {
                    activateTelepathy()
                  }
                }}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  isTelepathyActive 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-purple-600 text-white/80 hover:bg-purple-500'
                }`}
              >
                {isTelepathyActive ? '意念已激活' : '激活意念'}
              </button>
              <button
                onClick={() => setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-500"
              >
                {gameState.isPaused ? '继续' : '暂停'}
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-4 text-center text-purple-200/70 text-sm">
            {gameState.isPlaying 
              ? '按住物体并移动鼠标来移动它。将所有目标移到黄色虚线框内！'
              : '点击"开始训练"进入超能力试炼'}
          </div>
        </div>
      </div>
    </div>
  )
}
