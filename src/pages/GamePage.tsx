import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { useLevelStore } from '../stores/levelStore'
import { TelepathyGame } from '../components/games'

export default function GamePage() {
  const navigate = useNavigate()
  const { currentSave, addCoins, addExperience } = useGameStore()
  const { currentLevel, currentChapter, setCurrentLevel } = useLevelStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTelepathy, setShowTelepathy] = useState(false)

  const handleLevelSelect = (level: number, chapter: number) => {
    setCurrentLevel(level, chapter)
    setIsPlaying(true)
  }

  const handleComplete = async () => {
    await addCoins(10)
    await addExperience(20)
    setIsPlaying(false)
  }

  const levels = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    chapter: Math.ceil((i + 1) / 5),
    // Default all levels unlocked for demo/testing
    isUnlocked: currentSave ? currentSave.currentLevel >= i + 1 : true
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← 返回
          </button>
          <h1 className="text-2xl font-bold text-primary">选择关卡</h1>
          <div className="text-accent font-bold">🪙 {currentSave?.totalCoins || 0}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <p className="text-gray-600 mb-2">第 {currentChapter} 章</p>
          <div className="grid grid-cols-5 gap-2">
            {levels.map(level => (
              <button
                key={level.id}
                onClick={() => level.isUnlocked && handleLevelSelect(level.id, level.chapter)}
                disabled={!level.isUnlocked}
                className={`
                  aspect-square rounded-lg font-bold text-lg transition-all
                  ${level.isUnlocked 
                    ? 'bg-primary text-white hover:scale-105 shadow-md' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                {level.id}
              </button>
            ))}
          </div>
        </div>

        {/* 超能力训练入口 */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">🔮 超能力训练</h2>
              <p className="text-purple-200 text-sm">意念控制 · 精神力修炼</p>
            </div>
            <button
              onClick={() => setShowTelepathy(true)}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium
                hover:bg-purple-50 transition-colors"
            >
              进入
            </button>
          </div>
        </div>

        {isPlaying && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <h2 className="text-2xl font-bold text-center mb-4">
                第 {currentLevel} 关
              </h2>
              <p className="text-gray-600 text-center mb-6">
                准备好开始了吗？
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleComplete}
                  className="w-full py-3 bg-success text-white rounded-lg font-medium
                    hover:bg-green-600 transition-colors"
                >
                  开始闯关
                </button>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium
                    hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 超能力游戏弹窗 */}
        {showTelepathy && (
          <TelepathyGame
            onClose={() => setShowTelepathy(false)}
            onComplete={(score: number, rewards: { coins: number; experience: number }) => {
              console.log('Telepathy completed:', score, rewards)
            }}
          />
        )}
      </div>
    </div>
  )
}
