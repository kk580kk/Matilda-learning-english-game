import { useState, useEffect, useCallback } from 'react'
import { useGameStore } from '../../stores/gameStore'
import { useRelationStore } from '../../stores/relationStore'
import './BossBattle.css'

export interface BossPhase {
  id: string
  name: string
  description: string
  suspicionLevel: number // 0-100
  requiredActions?: BossAction[]
  dialogNodeId?: string
}

export interface BossAction {
  id: string
  name: string
  type: 'attack' | 'defend' | 'special' | 'psychic'
  power: number
  suspicionCost: number
  description: string
}

export interface Boss {
  id: string
  name: string
  title: string
  health: number
  maxHealth: number
  suspicion: number // Boss's suspicion meter
  maxSuspicion: number
  phases: BossPhase[]
  currentPhaseId: string
  avatar: string
  dialog?: string[]
}

export interface PlayerState {
  health: number
  maxHealth: number
  psychicPower: number
  maxPsychicPower: number
  suspicion: number // Player's doubt/suspicion
  maxSuspicion: number
  defense: number
  isDefending: boolean
}

// Miss Trunchbull as Boss
const trunchbullBoss: Boss = {
  id: 'trunchbull',
  name: 'Miss Trunchbull',
  title: 'The Terrible Headmistress',
  health: 100,
  maxHealth: 100,
  suspicion: 0,
  maxSuspicion: 100,
  avatar: '👹',
  phases: [
    {
      id: 'phase_1',
      name: 'Intimidation',
      description: 'The Trunchbull towers over you with her riding crop...',
      suspicionLevel: 20,
      requiredActions: [
        { id: 'a1', name: 'Stand Firm', type: 'defend', power: 10, suspicionCost: 5, description: 'Refuse to be intimidated' },
        { id: 'a2', name: 'Confront', type: 'attack', power: 15, suspicionCost: 15, description: 'Challenge her authority' },
        { id: 'a3', name: 'Observe', type: 'special', power: 5, suspicionCost: 0, description: 'Look for weaknesses' }
      ]
    },
    {
      id: 'phase_2',
      name: 'The Silver Ball',
      description: 'She mentions her prized silver ball...',
      suspicionLevel: 40,
      requiredActions: [
        { id: 'a4', name: 'Ask About It', type: 'special', power: 10, suspicionCost: 10, description: 'Inquire about the ball' },
        { id: 'a5', name: 'Threaten', type: 'attack', power: 20, suspicionCost: 25, description: 'Mention you know her secret' },
        { id: 'a6', name: 'Mental Shield', type: 'defend', power: 15, suspicionCost: 5, description: 'Protect your mind' }
      ]
    },
    {
      id: 'phase_3',
      name: 'Psychic Battle',
      description: 'The Trunchbull feels your mental power!',
      suspicionLevel: 70,
      requiredActions: [
        { id: 'a7', name: 'Telekinesis', type: 'psychic', power: 25, suspicionCost: 20, description: 'Use your powers!' },
        { id: 'a8', name: 'Mental Attack', type: 'psychic', power: 30, suspicionCost: 30, description: 'Push her to the limit' },
        { id: 'a9', name: 'Hold Back', type: 'defend', power: 10, suspicionCost: 0, description: 'Save your power' }
      ]
    },
    {
      id: 'phase_4',
      name: 'Final Confrontation',
      description: 'The Trunchbull is weakening...',
      suspicionLevel: 90,
      requiredActions: [
        { id: 'a10', name: 'Ultimate Power', type: 'psychic', power: 40, suspicionCost: 40, description: 'Unleash everything!' },
        { id: 'a11', name: 'Negotiate', type: 'special', power: 15, suspicionCost: 10, description: 'Offer a deal' },
        { id: 'a12', name: 'Call Her Bluff', type: 'attack', power: 20, suspicionCost: 20, description: 'Face her directly' }
      ]
    }
  ],
  currentPhaseId: 'phase_1'
}

interface BossBattleProps {
  boss?: Boss
  onComplete?: (victory: boolean) => void
}

export const BossBattle: React.FC<BossBattleProps> = ({
  boss: initialBoss,
  onComplete
}) => {
  const [boss, setBoss] = useState<Boss>(initialBoss || trunchbullBoss)
  const [player, setPlayer] = useState<PlayerState>({
    health: 100,
    maxHealth: 100,
    psychicPower: 100,
    maxPsychicPower: 100,
    suspicion: 20, // Player starts with some doubt
    maxSuspicion: 100,
    defense: 0,
    isDefending: false
  })
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isVictory, setIsVictory] = useState(false)
  const [isDefeat, setIsDefeat] = useState(false)
  const [turn, setTurn] = useState<'player' | 'boss'>('player')
  const [bossAttack, setBossAttack] = useState<string | null>(null)
  const [playerAttack, setPlayerAttack] = useState<string | null>(null)

  const { addCoins, addExperience } = useGameStore()
  const { updateRelationship } = useRelationStore()

  // Get current phase
  const currentPhase = boss.phases[currentPhaseIndex]

  // Add log entry
  const addLog = useCallback((message: string) => {
    setBattleLog(prev => [...prev.slice(-4), message])
  }, [])

  // Handle player action
  const handleAction = useCallback((action: BossAction) => {
    if (turn !== 'player' || isVictory || isDefeat) return

    // Show player attack animation
    setPlayerAttack(action.name)
    setTimeout(() => setPlayerAttack(null), 500)

    // Apply action effects
    let damage = action.power
    let suspicionChange = -action.suspicionCost

    // Check defense status
    if (player.isDefending) {
      damage = Math.max(1, damage - player.defense)
    }

    // Update boss health
    const newBossHealth = Math.max(0, boss.health - damage)
    const newBossSuspicion = Math.min(boss.maxSuspicion, boss.suspicion + suspicionChange)

    setBoss(prev => ({
      ...prev,
      health: newBossHealth,
      suspicion: newBossSuspicion
    }))

    // Update player suspicion
    const newPlayerSuspicion = Math.max(0, player.suspicion + action.suspicionCost)
    setPlayer(prev => ({
      ...prev,
      suspicion: newPlayerSuspicion,
      isDefending: false
    }))

    // Add log
    addLog(`You used ${action.name}! ${action.description}`)

    // Check phase transition based on boss suspicion
    if (newBossSuspicion >= currentPhase.suspicionLevel && currentPhaseIndex < boss.phases.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1)
      addLog(`⚠️ Phase Change: ${boss.phases[currentPhaseIndex + 1].name}!`)
    }

    // Check victory/defeat
    if (newBossHealth <= 0) {
      setIsVictory(true)
      addLog('🎉 VICTORY! The Trunchbull has been defeated!')
      
      // Rewards
      addCoins(100)
      addExperience(150)
      updateRelationship('miss_honey', 20)
      onComplete?.(true)
    } else {
      // Boss turn
      setTurn('boss')
    }
  }, [turn, isVictory, isDefeat, boss, player, currentPhaseIndex, currentPhase, addLog, addCoins, addExperience, updateRelationship, onComplete])

  // Boss turn AI
  useEffect(() => {
    if (turn === 'boss' && !isVictory && !isDefeat) {
      // Delay for effect
      const timer = setTimeout(() => {
        // Boss attacks
        const attackDamage = Math.floor(Math.random() * 15) + 10
        const actualDamage = player.isDefending 
          ? Math.max(1, attackDamage - player.defense - 10) 
          : attackDamage

        // Show boss attack
        setBossAttack(`attacks for ${actualDamage} damage!`)
        setTimeout(() => setBossAttack(null), 500)

        const newPlayerHealth = Math.max(0, player.health - actualDamage)
        
        // Increase player suspicion when taking damage
        const newPlayerSuspicion = Math.min(player.maxSuspicion, player.suspicion + 10)

        setPlayer(prev => ({
          ...prev,
          health: newPlayerHealth,
          suspicion: newPlayerSuspicion
        }))

        addLog(`The Trunchbull ${actualDamage > 15 ? 'SMASHES' : 'attacks'} for ${actualDamage} damage!`)

        // Check defeat
        if (newPlayerHealth <= 0) {
          setIsDefeat(true)
          addLog('💀 DEFEAT! The Trunchbull is too powerful...')
          addExperience(30)
          onComplete?.(false)
        } else {
          setTurn('player')
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [turn, isVictory, isDefeat, player.health, player.isDefending, player.defense, player.suspicion, player.maxSuspicion, addLog, addExperience, onComplete])

  // Handle defend
  const handleDefend = useCallback(() => {
    if (turn !== 'player' || isVictory || isDefeat) return

    setPlayer(prev => ({
      ...prev,
      isDefending: true,
      defense: 20,
      psychicPower: Math.max(0, prev.psychicPower - 5)
    }))

    addLog('You raise your mental defenses!')
    setTurn('boss')
  }, [turn, isVictory, isDefeat, addLog])

  // Reset game
  const handleRestart = useCallback(() => {
    setBoss({ ...trunchbullBoss })
    setPlayer({
      health: 100,
      maxHealth: 100,
      psychicPower: 100,
      maxPsychicPower: 100,
      suspicion: 20,
      maxSuspicion: 100,
      defense: 0,
      isDefending: false
    })
    setCurrentPhaseIndex(0)
    setBattleLog([])
    setIsVictory(false)
    setIsDefeat(false)
    setTurn('player')
  }, [])

  // Progress calculations
  const bossHealthPercent = (boss.health / boss.maxHealth) * 100
  const playerHealthPercent = (player.health / player.maxHealth) * 100
  const playerPowerPercent = (player.psychicPower / player.maxPsychicPower) * 100
  const bossSuspicionPercent = (boss.suspicion / boss.maxSuspicion) * 100

  return (
    <div className="boss-battle">
      <div className="battle-header">
        <h2>⚔️ Boss Battle</h2>
        <span className="phase-indicator">
          Phase {currentPhaseIndex + 1}/{boss.phases.length}: {currentPhase?.name}
        </span>
      </div>

      {/* Boss Area */}
      <div className="boss-area">
        <div className="boss-info">
          <div className="boss-avatar">
            {boss.avatar}
            {bossAttack && <div className="attack-effect">💥</div>}
            {isVictory && <div className="victory-effect">🏆</div>}
          </div>
          <div className="boss-name">{boss.name}</div>
          <div className="boss-title">{boss.title}</div>
        </div>

        {/* Boss Health Bar */}
        <div className="health-bar-container">
          <div className="health-bar-label">
            <span>HP</span>
            <span>{boss.health}/{boss.maxHealth}</span>
          </div>
          <div className="health-bar boss-health">
            <div className="health-fill" style={{ width: `${bossHealthPercent}%` }} />
          </div>
        </div>

        {/* Boss Suspicion Bar */}
        <div className="suspicion-bar-container">
          <div className="suspicion-bar-label">
            <span>⚠️ Suspicion</span>
            <span>{boss.suspicion}/{boss.maxSuspicion}</span>
          </div>
          <div className="suspicion-bar">
            <div className="suspicion-fill" style={{ width: `${bossSuspicionPercent}%` }} />
          </div>
        </div>

        {/* Phase Description */}
        <div className="phase-description">
          {currentPhase?.description}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="battle-arena">
        {playerAttack && (
          <div className="player-attack-effect">
            ✨ {playerAttack} ✨
          </div>
        )}
        {bossAttack && (
          <div className="boss-attack-effect">
            💥 {bossAttack}
          </div>
        )}
      </div>

      {/* Player Area */}
      <div className="player-area">
        <div className="player-info">
          <div className="player-avatar">📚</div>
          <div className="player-name">Matilda</div>
        </div>

        {/* Player Stats */}
        <div className="player-stats">
          {/* Health */}
          <div className="stat-bar">
            <span>❤️ HP</span>
            <div className="mini-bar">
              <div className="mini-fill health" style={{ width: `${playerHealthPercent}%` }} />
            </div>
            <span>{player.health}/{player.maxHealth}</span>
          </div>

          {/* Psychic Power */}
          <div className="stat-bar">
            <span>🔮 Power</span>
            <div className="mini-bar">
              <div className="mini-fill psychic" style={{ width: `${playerPowerPercent}%` }} />
            </div>
            <span>{player.psychicPower}/{player.maxPsychicPower}</span>
          </div>

          {/* Player Suspicion */}
          <div className="stat-bar">
            <span>💭 Doubt</span>
            <div className="mini-bar">
              <div className="mini-fill doubt" style={{ width: `${(player.suspicion / player.maxSuspicion) * 100}%` }} />
            </div>
            <span>{player.suspicion}/{player.maxSuspicion}</span>
          </div>
        </div>

        {/* Defend indicator */}
        {player.isDefending && (
          <div className="defend-indicator">
            🛡️ Defending
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {turn === 'player' && !isVictory && !isDefeat && (
        <div className="actions-section">
          <h4>Your Actions:</h4>
          <div className="action-buttons">
            {currentPhase?.requiredActions?.map(action => (
              <button
                key={action.id}
                className={`action-btn ${action.type}`}
                onClick={() => handleAction(action)}
                disabled={player.psychicPower < 5}
              >
                <span className="action-name">{action.name}</span>
                <span className="action-desc">{action.description}</span>
                <span className="action-cost">
                  {action.suspicionCost > 0 ? `-${action.suspicionCost} suspicion` : 'Free'}
                </span>
              </button>
            ))}
            <button
              className="action-btn defend"
              onClick={handleDefend}
            >
              <span className="action-name">🛡️ Defend</span>
              <span className="action-desc">Reduce incoming damage</span>
              <span className="action-cost">-5 power</span>
            </button>
          </div>
        </div>
      )}

      {/* Turn Indicator */}
      <div className="turn-indicator">
        {turn === 'player' ? '🎯 Your Turn' : '⏳ Trunchbull\'s Turn...'}
      </div>

      {/* Battle Log */}
      <div className="battle-log">
        <h4>Battle Log:</h4>
        <div className="log-entries">
          {battleLog.map((entry, i) => (
            <div key={i} className="log-entry">{entry}</div>
          ))}
        </div>
      </div>

      {/* Game Over Screens */}
      {isVictory && (
        <div className="victory-screen">
          <h2>🎉 VICTORY!</h2>
          <p>You defeated the Trunchbull!</p>
          <div className="rewards">
            <span>💰 +100 Coins</span>
            <span>✨ +150 XP</span>
            <span>❤️ Miss Honey +20</span>
          </div>
          <button onClick={handleRestart}>Battle Again</button>
        </div>
      )}

      {isDefeat && (
        <div className="defeat-screen">
          <h2>💀 DEFEAT</h2>
          <p>The Trunchbull was too powerful...</p>
          <div className="rewards">
            <span>✨ +30 XP</span>
          </div>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      )}
    </div>
  )
}

export default BossBattle
