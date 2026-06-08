import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { initializeDatabase } from '../db/database'

export default function HomePage() {
  const navigate = useNavigate()
  const { currentSave, loadSave } = useGameStore()

  useEffect(() => {
    const init = async () => {
      await initializeDatabase()
      const saves = await window.indexedDB.databases()
      if (saves.length > 0) {
        await loadSave(1)
      }
    }
    init()
  }, [loadSave])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">玛蒂尔达</h1>
        <p className="text-gray-600 mb-8">让英语学习像游戏一样有趣</p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/game')}
            className="px-8 py-3 bg-primary text-white rounded-lg text-lg font-medium
              hover:bg-blue-600 transition-colors shadow-lg"
          >
            开始游戏
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="block w-full px-8 py-3 bg-white text-gray-700 rounded-lg text-lg font-medium
              hover:bg-gray-50 transition-colors shadow"
          >
            设置
          </button>
        </div>

        {currentSave && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">当前存档: {currentSave.name}</p>
            <p className="text-2xl font-bold text-accent">🪙 {currentSave.totalCoins}</p>
            <p className="text-sm text-gray-500">等级 {Math.floor(currentSave.experience / 100) + 1}</p>
          </div>
        )}
      </div>
    </div>
  )
}
