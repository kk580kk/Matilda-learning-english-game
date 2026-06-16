import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryScene, ChoiceOption } from '../types/story';
import { getStoryConfig } from '../data/storyConfig';
import { useStoryStore } from '../store/storyStore';

interface StoryViewerProps {
  levelId: string;
  onSceneComplete?: (sceneId: string) => void;
  onChoiceMade?: (choice: ChoiceOption) => void;
  onMinigameStart?: () => void;
  onLevelComplete?: () => void;
}

// 角色头像映射
const CHARACTER_AVATARS: Record<string, string> = {
  '玛蒂尔达': '👧',
  '爸爸': '👨',
  '妈妈': '👩',
  '小弟弟': '👶',
  'Miss Honey': '👩‍🏫',
  'Mrs. Phelps': '👵',
  '川奇布校长': '👩‍💼',
  '同学': '🧒',
  '老师': '👨‍🏫'
};

// 情绪表情映射
const EMOTION_EMOJIS: Record<string, string> = {
  'neutral': '😐',
  'happy': '😊',
  'sad': '😢',
  'angry': '😠',
  'surprised': '😲',
  'worried': '😟'
};

export const StoryViewer: React.FC<StoryViewerProps> = ({
  levelId,
  onSceneComplete,
  onChoiceMade,
  onMinigameStart,
  onLevelComplete
}) => {
  const storyConfig = getStoryConfig(levelId);
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null);
  const [showChoices, setShowChoices] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  
  const {
    initLevelProgress,
    getLevelProgressForLevel,
    setCurrentScene: setStoreScene,
    makeChoice,
    completeScene,
    moralValue,
    trustValue,
    getTrustLevelName
  } = useStoryStore();

  // 初始化关卡进度
  useEffect(() => {
    if (storyConfig) {
      initLevelProgress(levelId);
      const progress = getLevelProgressForLevel(levelId);
      const scene = storyConfig.scenes.find(s => s.id === progress?.currentSceneId) 
        || storyConfig.scenes[0];
      setCurrentScene(scene);
      setDialogueIndex(0);
    }
  }, [levelId, storyConfig]);

  // 自动播放场景
  useEffect(() => {
    if (!currentScene || isAutoPlaying) return;
    
    if (currentScene.sceneType === 'narrative' && currentScene.autoNext) {
      setIsAutoPlaying(true);
      const timer = setTimeout(() => {
        handleSceneTransition(currentScene.autoNext!.nextSceneId);
      }, currentScene.autoNext.delay * 1000);
      return () => clearTimeout(timer);
    }
    
    if (currentScene.sceneType === 'dialogue' && currentScene.autoNext) {
      setIsAutoPlaying(true);
      const timer = setTimeout(() => {
        handleSceneTransition(currentScene.autoNext!.nextSceneId);
      }, currentScene.autoNext.delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentScene, isAutoPlaying]);

  // 处理场景切换
  const handleSceneTransition = useCallback((nextSceneId: string) => {
    if (!storyConfig) return;
    
    const nextScene = storyConfig.scenes.find(s => s.id === nextSceneId);
    if (nextScene) {
      setCurrentScene(nextScene);
      setStoreScene(levelId, nextScene.id);
      setDialogueIndex(0);
      setIsAutoPlaying(false);
      
      // 标记场景完成
      completeScene(levelId, nextScene.id);
      onSceneComplete?.(nextScene.id);
      
      // 处理特殊场景类型
      if (nextScene.sceneType === 'choice') {
        setShowChoices(true);
      } else if (nextScene.sceneType === 'minigame') {
        onMinigameStart?.();
      } else if (nextScene.sceneType === 'ending') {
        onLevelComplete?.();
      }
    }
  }, [storyConfig, levelId, setStoreScene, completeScene, onSceneComplete, onMinigameStart, onLevelComplete]);

  // 处理选择
  const handleChoice = useCallback((choice: ChoiceOption) => {
    setShowChoices(false);
    makeChoice(levelId, currentScene!.id, choice);
    onChoiceMade?.(choice);
    handleSceneTransition(choice.nextSceneId);
  }, [currentScene, levelId, makeChoice, onChoiceMade, handleSceneTransition]);

  // 手动进入下一场景
  const handleNextScene = useCallback(() => {
    if (!currentScene || !storyConfig) return;
    
    // 如果是对话场景，先显示完所有对话
    if (currentScene.sceneType === 'dialogue' && currentScene.dialogue) {
      if (dialogueIndex < currentScene.dialogue.length - 1) {
        setDialogueIndex(prev => prev + 1);
        return;
      }
    }
    
    // 自动跳转或进入下一场景
    if (currentScene.autoNext) {
      handleSceneTransition(currentScene.autoNext.nextSceneId);
    } else {
      const nextScene = storyConfig.scenes.find(s => s.sequence === currentScene.sequence + 1);
      if (nextScene) {
        handleSceneTransition(nextScene.id);
      }
    }
  }, [currentScene, storyConfig, dialogueIndex, handleSceneTransition]);

  // 跳过场景
  const handleSkip = useCallback(() => {
    if (!currentScene || !storyConfig) return;
    
    if (currentScene.sceneType === 'minigame') {
      onMinigameStart?.();
    } else if (currentScene.sceneType === 'ending') {
      onLevelComplete?.();
    } else {
      handleNextScene();
    }
  }, [currentScene, storyConfig, handleNextScene, onMinigameStart, onLevelComplete]);

  if (!storyConfig || !currentScene) {
    return (
      <div className="story-viewer-loading">
        <div className="loading-spinner">📚</div>
        <p>加载剧情中...</p>
      </div>
    );
  }

  return (
    <div className="story-viewer" style={styles.container}>
      {/* 顶部状态栏 */}
      <div style={styles.statusBar}>
        <div style={styles.statusItem}>
          <span>🎭 道德值: {moralValue > 0 ? '+' : ''}{moralValue}</span>
        </div>
        <div style={styles.statusItem}>
          <span>💝 信任度: {trustValue} ({getTrustLevelName()})</span>
        </div>
        <div style={styles.statusItem}>
          <span>📖 场景: {currentScene.sequence}/{storyConfig.scenes.length}</span>
        </div>
      </div>

      {/* 主内容区 */}
      <div style={styles.content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* 场景标题 */}
            {currentScene.title && (
              <h2 style={styles.sceneTitle}>{currentScene.title}</h2>
            )}

            {/* 叙述文本 */}
            {currentScene.narrative && (
              <div style={styles.narrative}>
                <p>{currentScene.narrative}</p>
                {currentScene.narrativeEn && (
                  <p style={styles.narrativeEn}>{currentScene.narrativeEn}</p>
                )}
              </div>
            )}

            {/* 对话 */}
            {currentScene.sceneType === 'dialogue' && currentScene.dialogue && (
              <div style={styles.dialogueContainer}>
                {currentScene.dialogue.slice(0, dialogueIndex + 1).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    style={styles.dialogueLine}
                  >
                    <div style={styles.speakerInfo}>
                      <span style={styles.avatar}>
                        {CHARACTER_AVATARS[line.speaker] || '👤'}
                        {line.emotion && EMOTION_EMOJIS[line.emotion]}
                      </span>
                      <span style={styles.speakerName}>{line.speaker}</span>
                    </div>
                    <div style={styles.dialogueText}>
                      <p>{line.text}</p>
                      {line.textEn && <p style={styles.dialogueTextEn}>{line.textEn}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* 选择 */}
            {showChoices && currentScene.choices && (
              <div style={styles.choicesContainer}>
                <h3 style={styles.choicesTitle}>💭 你会如何选择？</h3>
                {currentScene.choices.map((choice, idx) => (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChoice(choice)}
                    style={styles.choiceButton}
                  >
                    <div style={styles.choiceText}>
                      <span style={styles.choiceLabel}>
                        {choice.type === 'moral' ? '⚖️' : 
                         choice.type === 'strategy' ? '🧠' : '📚'}
                      </span>
                      <div>
                        <p>{choice.text}</p>
                        {choice.textEn && <p style={styles.choiceTextEn}>{choice.textEn}</p>}
                      </div>
                    </div>
                    <div style={styles.choiceEffects}>
                      {choice.effects.moralValue && (
                        <span style={choice.effects.moralValue > 0 ? styles.effectPositive : styles.effectNegative}>
                          道德 {choice.effects.moralValue > 0 ? '+' : ''}{choice.effects.moralValue}
                        </span>
                      )}
                      {choice.effects.trustValue && (
                        <span style={choice.effects.trustValue > 0 ? styles.effectPositive : styles.effectNegative}>
                          信任 {choice.effects.trustValue > 0 ? '+' : ''}{choice.effects.trustValue}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 小游戏提示 */}
            {currentScene.sceneType === 'minigame' && (
              <div style={styles.minigamePrompt}>
                <div style={styles.minigameIcon}>🎮</div>
                <h3>学习挑战即将开始！</h3>
                <p>通过英语学习来增强玛蒂尔达的能力</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onMinigameStart}
                  style={styles.startButton}
                >
                  开始学习挑战 →
                </motion.button>
              </div>
            )}

            {/* 结局 */}
            {currentScene.sceneType === 'ending' && (
              <div style={styles.endingContainer}>
                <div style={styles.endingIcon}>🎉</div>
                <h3>关卡完成！</h3>
                <p>玛蒂尔达的成长之旅继续...</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLevelComplete}
                  style={styles.completeButton}
                >
                  继续旅程 →
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部控制栏 */}
      <div style={styles.controlBar}>
        {!showChoices && 
         currentScene.sceneType !== 'minigame' && 
         currentScene.sceneType !== 'ending' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextScene}
            style={styles.nextButton}
          >
            {currentScene.sceneType === 'dialogue' && 
             currentScene.dialogue && 
             dialogueIndex < currentScene.dialogue.length - 1 
              ? '继续对话 →' 
              : '继续 →'}
          </motion.button>
        )}
        <button onClick={handleSkip} style={styles.skipButton}>
          跳过剧情
        </button>
      </div>
    </div>
  );
};

// 样式
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  statusItem: {
    fontSize: '14px',
    color: '#b8c1ec',
  },
  content: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  },
  sceneTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#f4a261',
  },
  narrative: {
    background: 'rgba(255,255,255,0.05)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    lineHeight: '1.8',
    fontSize: '16px',
  },
  narrativeEn: {
    marginTop: '12px',
    color: '#888',
    fontStyle: 'italic',
    fontSize: '14px',
  },
  dialogueContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  dialogueLine: {
    background: 'rgba(255,255,255,0.05)',
    padding: '16px',
    borderRadius: '12px',
    borderLeft: '4px solid #9b7fc9',
  },
  speakerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  avatar: {
    fontSize: '24px',
  },
  speakerName: {
    fontWeight: 'bold',
    color: '#9b7fc9',
  },
  dialogueText: {
    paddingLeft: '32px',
  },
  dialogueTextEn: {
    marginTop: '8px',
    color: '#888',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  choicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
  },
  choicesTitle: {
    textAlign: 'center',
    marginBottom: '16px',
    color: '#f4a261',
  },
  choiceButton: {
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#fff',
    fontSize: '15px',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  choiceText: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  choiceLabel: {
    fontSize: '20px',
    flexShrink: 0,
  },
  choiceTextEn: {
    color: '#888',
    fontSize: '13px',
    marginTop: '4px',
    fontStyle: 'italic',
  },
  choiceEffects: {
    display: 'flex',
    gap: '12px',
    fontSize: '12px',
    marginTop: '8px',
  },
  effectPositive: {
    color: '#2a9d8f',
    background: 'rgba(42, 157, 143, 0.2)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  effectNegative: {
    color: '#e76f51',
    background: 'rgba(231, 111, 81, 0.2)',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  minigamePrompt: {
    textAlign: 'center',
    padding: '40px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    marginTop: '24px',
  },
  minigameIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  startButton: {
    marginTop: '20px',
    padding: '12px 32px',
    background: '#2a9d8f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  endingContainer: {
    textAlign: 'center',
    padding: '40px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    marginTop: '24px',
  },
  endingIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  completeButton: {
    marginTop: '20px',
    padding: '12px 32px',
    background: '#9b7fc9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  controlBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  nextButton: {
    padding: '12px 24px',
    background: '#9b7fc9',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  skipButton: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#888',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default StoryViewer;
