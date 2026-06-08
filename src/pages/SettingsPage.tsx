import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { currentSave, updateSave } = useGameStore()
  
  const [soundEnabled, setSoundEnabled] = useState(
    currentSave?.settings.soundEnabled ?? true
  )
  const [musicEnabled, setMusicEnabled] = useState(
    currentSave?.settings.musicEnabled ?? true
  )
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>(
    currentSave?.settings.difficulty ?? 'normal'
  )

  const handleSave = async () => {
    if (currentSave?.id) {
      await updateSave(currentSave.id, {
        settings: {
          soundEnabled,
          musicEnabled,
          difficulty
        }
      })
    }
    navigate('/')
  }

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
          <h1 className="text-2xl font-bold text-primary">设置</h1>
          <div className="w-12" />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* 声音设置 */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700">声音设置</h2>
            
            <label className="flex items-center justify-between">
              <span className="text-gray-600">音效</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${soundEnabled ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${soundEnabled ? 'left-7' : 'left-1'}
                  `}
                />
              </button>
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-600">音乐</span>
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${musicEnabled ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                <span
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${musicEnabled ? 'left-7' : 'left-1'}
                  `}
                />
              </button>
            </label>
          </div>

          {/* 难度设置 */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-700">游戏难度</h2>
            
            <div className="flex gap-2">
              {(['easy', 'normal', 'hard'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`
                    flex-1 py-2 rounded-lg font-medium transition-colors
                    ${difficulty === level
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  {level === 'easy' ? '简单' : level === 'normal' ? '普通' : '困难'}
                </button>
              ))}
            </div>
          </div>

          {/* 保存按钮 */}
          <button
            onClick={handleSave}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium
              hover:bg-blue-600 transition-colors"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  )
}
