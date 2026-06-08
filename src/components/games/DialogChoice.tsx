import { useState, useCallback } from 'react'
import { useGameStore } from '../../stores/gameStore'
import { useRelationStore } from '../../stores/relationStore'
import './DialogChoice.css'

export interface DialogOption {
  id: string
  text: string
  effect: DialogEffect
  requiredRelationship?: number
}

export interface DialogEffect {
  type: 'relationship' | 'coins' | 'experience' | 'unlock' | 'story'
  target?: string
  value: number | string | boolean
  message?: string
}

export interface DialogNode {
  id: string
  speaker: string
  text: string
  expression?: 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised'
  options: DialogOption[]
  nextNodeId?: string
  isEnding?: boolean
}

interface DialogChoiceProps {
  dialogNodes: DialogNode[]
  initialNodeId?: string
  characterId?: string
  onComplete?: (success: boolean) => void
}

// Demo dialog for Miss Honey
const honeyDialog: DialogNode[] = [
  {
    id: 'node_1',
    speaker: 'Miss Honey',
    text: 'Hello, Matilda! What a wonderful day for learning, isn\'t it?',
    expression: 'happy',
    options: [
      {
        id: 'opt_1a',
        text: 'Yes, Miss Honey! I love learning new things!',
        effect: { type: 'relationship', target: 'miss_honey', value: 5, message: 'Miss Honey smiles warmly at your enthusiasm!' }
      },
      {
        id: 'opt_1b',
        text: 'It\'s okay, I guess...',
        effect: { type: 'relationship', target: 'miss_honey', value: -2, message: 'Miss Honey looks a bit concerned.' }
      },
      {
        id: 'opt_1c',
        text: 'Can you teach me something new today?',
        effect: { type: 'relationship', target: 'miss_honey', value: 3, message: 'Miss Honey\'s eyes light up!' }
      }
    ],
    nextNodeId: 'node_2'
  },
  {
    id: 'node_2',
    speaker: 'Miss Honey',
    text: 'I\'ve been thinking about your progress. You\'re one of my brightest students!',
    expression: 'happy',
    options: [
      {
        id: 'opt_2a',
        text: 'Thank you! I try my best.',
        effect: { type: 'relationship', target: 'miss_honey', value: 3, message: 'You see a tear of joy in Miss Honey\'s eye.' }
      },
      {
        id: 'opt_2b',
        text: 'Is there something special you want to teach me?',
        effect: { type: 'story', value: 'unlock_spells', message: 'Miss Honey leans in closer...' }
      },
      {
        id: 'opt_2c',
        text: 'Can we practice more spelling?',
        effect: { type: 'experience', value: 10, message: 'Miss Honey is proud of your dedication!' }
      }
    ],
    nextNodeId: 'node_3'
  },
  {
    id: 'node_3',
    speaker: 'Miss Honey',
    text: 'Matilda, I want you to know that you\'re very special. Never forget that.',
    expression: 'neutral',
    options: [
      {
        id: 'opt_3a',
        text: 'You\'re special too, Miss Honey!',
        effect: { type: 'relationship', target: 'miss_honey', value: 10, message: 'Miss Honey hugs you warmly!' }
      },
      {
        id: 'opt_3b',
        text: 'I know. Thank you for believing in me.',
        effect: { type: 'relationship', target: 'miss_honey', value: 7, message: 'You share a moment of understanding.' }
      },
      {
        id: 'opt_3c',
        text: 'What do you mean by special?',
        effect: { type: 'story', value: 'reveal_origin', message: 'Miss Honey hesitates...' }
      }
    ],
    nextNodeId: 'node_4'
  },
  {
    id: 'node_4',
    speaker: 'Miss Honey',
    text: 'You have a gift, Matilda. A gift for learning and for kindness. Use it wisely.',
    expression: 'happy',
    options: [
      {
        id: 'opt_4a',
        text: 'I promise I will!',
        effect: { type: 'unlock', target: 'spell_gift', value: true, message: '🔮 You unlocked the Gift of Learning!' },
        requiredRelationship: 20
      },
      {
        id: 'opt_4b',
        text: 'Thank you for everything, Miss Honey.',
        effect: { type: 'relationship', target: 'miss_honey', value: 5, message: 'Miss Honey nods with a smile.' }
      }
    ],
    isEnding: true
  }
]

// Demo dialog for The Trunchbull
const trunchbullDialog: DialogNode[] = [
  {
    id: 'node_1',
    speaker: 'Miss Trunchbull',
    text: 'What are you doing here, you wretched child?',
    expression: 'angry',
    options: [
      {
        id: 'opt_1a',
        text: 'I... I was just passing by.',
        effect: { type: 'relationship', target: 'trunchbull', value: -5, message: 'The Trunchbull glares at you suspiciously.' }
      },
      {
        id: 'opt_1b',
        text: 'I wanted to ask you something.',
        effect: { type: 'relationship', target: 'trunchbull', value: 0, message: 'The Trunchbull narrows her eyes.' }
      },
      {
        id: 'opt_1c',
        text: 'Leave me alone!',
        effect: { type: 'relationship', target: 'trunchbull', value: -10, message: 'The Trunchbull raises her whip!' }
      }
    ],
    nextNodeId: 'node_2'
  },
  {
    id: 'node_2',
    speaker: 'Miss Trunchbull',
    text: 'Speak quickly, before I lose my patience!',
    expression: 'angry',
    options: [
      {
        id: 'opt_2a',
        text: 'Is it true you can spin a silver ball?',
        effect: { type: 'story', value: 'silver_ball', message: 'The Trunchbull freezes for a moment...' }
      },
      {
        id: 'opt_2b',
        text: 'Sorry, I\'ll leave now.',
        effect: { type: 'relationship', target: 'trunchbull', value: -2, message: 'The Trunchbull laughs mockingly.' }
      }
    ],
    isEnding: true
  }
]

export const DialogChoice: React.FC<DialogChoiceProps> = ({
  dialogNodes,
  initialNodeId,
  characterId,
  onComplete
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId || dialogNodes[0]?.id || '')
  const [dialogHistory, setDialogHistory] = useState<DialogNode[]>([])
  const [showEffect, setShowEffect] = useState<{ type: string; message: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const { addCoins, addExperience, unlockCharacter } = useGameStore()
  const { updateRelationship } = useRelationStore()

  // Get current node
  const currentNode = dialogNodes.find(n => n.id === currentNodeId)

  // Apply effect
  const applyEffect = useCallback((effect: DialogEffect) => {
    if (effect.message) {
      setShowEffect({ type: effect.type, message: effect.message })
      setTimeout(() => setShowEffect(null), 3000)
    }

    switch (effect.type) {
      case 'relationship':
        if (effect.target) {
          updateRelationship(effect.target, effect.value as number)
        }
        break
      case 'coins':
        addCoins(effect.value as number)
        break
      case 'experience':
        addExperience(effect.value as number)
        break
      case 'unlock':
        if (effect.target) {
          unlockCharacter(effect.target)
        }
        break
      case 'story':
        // Story effects handled by parent
        break
    }
  }, [updateRelationship, addCoins, addExperience, unlockCharacter])

  // Handle option selection
  const handleOptionSelect = (option: DialogOption) => {
    // Apply effect
    applyEffect(option.effect)

    // Add to history
    if (currentNode) {
      setDialogHistory(prev => [...prev, currentNode])
    }

    // Move to next node or end
    if (currentNode?.isEnding || !option.effect) {
      setIsComplete(true)
      onComplete?.(true)
    } else if (currentNode?.nextNodeId) {
      setCurrentNodeId(currentNode.nextNodeId)
    }
  }

  // Get expression emoji
  const getExpressionEmoji = (expression?: string) => {
    switch (expression) {
      case 'happy': return '😊'
      case 'sad': return '😢'
      case 'angry': return '😠'
      case 'surprised': return '😲'
      default: return '😐'
    }
  }

  // Get speaker avatar based on character
  const getSpeakerAvatar = (speaker: string) => {
    const avatars: Record<string, string> = {
      'Miss Honey': '🍯',
      'Miss Trunchbull': '👹',
      'Matilda': '📚',
      'Lavender': '💜',
      'Agatha': '👧'
    }
    return avatars[speaker] || '👤'
  }

  if (!currentNode) {
    return (
      <div className="dialog-choice">
        <h2>💬 Dialog Choice</h2>
        <p>No dialog available.</p>
      </div>
    )
  }

  return (
    <div className="dialog-choice">
      <div className="dialog-header">
        <h2>💬 Dialog Choice</h2>
        {characterId && <span className="character-tag">{characterId}</span>}
      </div>

      {/* Dialog History */}
      {dialogHistory.length > 0 && (
        <div className="dialog-history">
          <button
            className="btn-toggle-history"
            onClick={() => {
              const lastHistory = dialogHistory[dialogHistory.length - 1]
              if (lastHistory) {
                setCurrentNodeId(lastHistory.id)
                setDialogHistory(prev => prev.slice(0, -1))
              }
            }}
          >
            ↩ Back
          </button>
        </div>
      )}

      {/* Current Dialog */}
      <div className="dialog-content">
        <div className="speaker-info">
          <span className="speaker-avatar">
            {getSpeakerAvatar(currentNode.speaker)}
          </span>
          <span className="speaker-name">{currentNode.speaker}</span>
          <span className="speaker-expression">
            {getExpressionEmoji(currentNode.expression)}
          </span>
        </div>

        <div className="dialog-text">
          {currentNode.text}
        </div>
      </div>

      {/* Options */}
      {!isComplete && (
        <div className="options-list">
          {currentNode.options.map(option => {
            const isDisabled = option.requiredRelationship ? false : false
            
            return (
              <button
                key={option.id}
                className="option-button"
                onClick={() => handleOptionSelect(option)}
                disabled={isDisabled}
              >
                {option.text}
                {option.requiredRelationship && (
                  <span className="requirement">
                    (Need {option.requiredRelationship} relationship)
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Effect Display */}
      {showEffect && (
        <div className="effect-display">
          <span className="effect-type">[{showEffect.type}]</span>
          <span className="effect-message">{showEffect.message}</span>
        </div>
      )}

      {/* Completion State */}
      {isComplete && (
        <div className="completion-section">
          <h3>📝 Dialog Complete!</h3>
          <div className="rewards">
            <span className="exp-reward">✨ +15 XP</span>
          </div>
          <button
            className="btn-restart"
            onClick={() => {
              setCurrentNodeId(dialogNodes[0]?.id || '')
              setDialogHistory([])
              setIsComplete(false)
            }}
          >
            Talk Again
          </button>
        </div>
      )}

      {/* Preset Dialog Buttons */}
      <div className="preset-dialogs">
        <span>Quick Select:</span>
        <button onClick={() => {
          setCurrentNodeId(honeyDialog[0]?.id || '')
          setDialogHistory([])
          setIsComplete(false)
        }}>
          🍯 Miss Honey
        </button>
        <button onClick={() => {
          setCurrentNodeId(trunchbullDialog[0]?.id || '')
          setDialogHistory([])
          setIsComplete(false)
        }}>
          👹 Trunchbull
        </button>
      </div>
    </div>
  )
}

// Export preset dialogs for external use
export const getHoneyDialog = () => honeyDialog
export const getTrunchbullDialog = () => trunchbullDialog

export default DialogChoice
