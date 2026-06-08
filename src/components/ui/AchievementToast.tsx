import { useEffect } from 'react'
import { useAchievementStore } from '../../stores/achievementStore'

interface AchievementToastProps {
  onDismiss?: () => void
}

export default function AchievementToast({ onDismiss }: AchievementToastProps) {
  const { recentlyUnlocked, showToast, dismissToast } = useAchievementStore()

  useEffect(() => {
    if (showToast && recentlyUnlocked) {
      const timer = setTimeout(() => {
        dismissToast()
        onDismiss?.()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showToast, recentlyUnlocked, dismissToast, onDismiss])

  if (!showToast || !recentlyUnlocked) return null

  const rarityColors = {
    common: 'from-gray-500 to-gray-600',
    rare: 'from-blue-500 to-blue-600',
    epic: 'from-purple-500 to-purple-600',
    legendary: 'from-yellow-500 via-orange-500 to-red-500'
  }

  const rarityGlow = {
    common: 'shadow-gray-500/50',
    rare: 'shadow-blue-500/50',
    epic: 'shadow-purple-500/50',
    legendary: 'shadow-yellow-500/50'
  }

  return (
    <div className="fixed top-4 right-4 z-[100] animate-slide-in">
      <div className={`
        bg-gradient-to-br ${rarityColors[recentlyUnlocked.rarity]}
        rounded-2xl p-4 pr-6 
        shadow-lg ${rarityGlow[recentlyUnlocked.rarity]} 
        text-white
        transform transition-all duration-300
        hover:scale-105
      `}>
        <div className="flex items-center gap-3">
          {/* Icon with glow */}
          <div className="relative">
            <div className={`
              w-12 h-12 rounded-full 
              bg-white/20 
              flex items-center justify-center
              text-2xl
              animate-bounce
            `}>
              {recentlyUnlocked.icon}
            </div>
            {/* Glow ring for rare+ */}
            {recentlyUnlocked.rarity !== 'common' && (
              <div className={`
                absolute inset-0 rounded-full 
                bg-white/30 animate-ping
              `} style={{ animationDuration: '2s' }} />
            )}
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                成就解锁
              </span>
              {recentlyUnlocked.rarity !== 'common' && (
                <span className={`
                  text-xs px-1.5 py-0.5 rounded
                  font-bold
                  ${recentlyUnlocked.rarity === 'rare' ? 'bg-blue-400' : ''}
                  ${recentlyUnlocked.rarity === 'epic' ? 'bg-purple-400' : ''}
                  ${recentlyUnlocked.rarity === 'legendary' ? 'bg-yellow-400 text-yellow-900' : ''}
                `}>
                  {recentlyUnlocked.rarity === 'rare' && '稀有'}
                  {recentlyUnlocked.rarity === 'epic' && '史诗'}
                  {recentlyUnlocked.rarity === 'legendary' && '传说'}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg leading-tight">
              {recentlyUnlocked.name}
            </h3>
            <p className="text-white/80 text-sm">
              {recentlyUnlocked.description}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              dismissToast()
              onDismiss?.()
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
