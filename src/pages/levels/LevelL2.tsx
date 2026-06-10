import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore } from '../../store';
import { LEVELS } from '../../data/levels';

const LEVEL_DATA = LEVELS[1]; // L2

interface HiddenItem {
  id: string;
  name: string;
  emoji: string;
  found: boolean;
  x: number;
  y: number;
}

const HIDDEN_ITEMS: HiddenItem[] = [
  { id: 'contract', name: '欺诈合同', emoji: '📄', found: false, x: 15, y: 20 },
  { id: 'money', name: '脏钱', emoji: '💰', found: false, x: 70, y: 30 },
  { id: 'ledger', name: '账本', emoji: '📒', found: false, x: 40, y: 60 },
  { id: 'phone', name: '可疑电话', emoji: '📞', found: false, x: 80, y: 70 },
  { id: 'photo', name: '证据照片', emoji: '📸', found: false, x: 25, y: 45 },
];

const LEVEL2_SCENE = `
  ┌─────────────────────────────────────────────────────────┐
  │  ╔═════════════╗                      ╔═════════════╗  │
  │  ║   书架       ║   ┌──────────┐      ║   保险箱    ║  │
  │  ╚═════════════╝   │   桌子   ║      ╚═════════════╝  │
  │                    └──────────┘                        │
  │   🖼️                      💼                          │
  │                                                         │
  │  ┌──────────┐     👤            ┌──────────┐         │
  │  │   椅子   ║   (父亲)          │   沙发   ║         │
  │  └──────────┘                   └──────────┘         │
  │                                                         │
  │   📺                                    🪴              │
  │                                                         │
  └─────────────────────────────────────────────────────────┘
`;

const HiddenObjectGame = () => {
  const { startLevel, completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'choice' | 'finished'>('intro');
  const [items, setItems] = useState<HiddenItem[]>(HIDDEN_ITEMS);
  const [foundCount, setFoundCount] = useState(0);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; isFound: boolean } | null>(null);

  const totalItems = items.length;

  const initGame = useCallback(() => {
    setItems(HIDDEN_ITEMS.map(item => ({ ...item, found: false })));
    setFoundCount(0);
  }, []);

  const startPlaying = () => {
    initGame();
    setGameState('playing');
    startLevel('L2');
  };

  const handleSceneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Check if click is near any hidden item
    const clickedItem = items.find(item => {
      const distance = Math.sqrt(
        Math.pow(x - item.x, 2) + Math.pow(y - item.y, 2)
      );
      return distance < 10 && !item.found;
    });

    if (clickedItem) {
      // Found item
      setItems(prev => prev.map(item => 
        item.id === clickedItem.id ? { ...item, found: true } : item
      ));
      setFoundCount(prev => {
        const newCount = prev + 1;
        
        // Check all found
        if (newCount === totalItems) {
          setTimeout(() => {
            setGameState('choice');
            completeLevel('L2', 100);
            unlockAchievement('first_book');
          }, 1000);
        }
        
        return newCount;
      });
      setClickEffect({ x: e.clientX, y: e.clientY, isFound: true });
    } else {
      setClickEffect({ x: e.clientX, y: e.clientY, isFound: false });
    }

    setTimeout(() => setClickEffect(null), 500);
  };

  // Render intro
  if (gameState === 'intro') {
    return (
      <div className="game-container">
        <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
          ← 返回关卡选择
        </Link>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔍🏠</div>
          <h1>{LEVEL_DATA.title}</h1>
          <p style={{ color: '#b8c1ec', marginTop: '8px' }}>{LEVEL_DATA.titleEn}</p>
          
          <div className="card mt-8" style={{ maxWidth: '600px', margin: '32px auto', textAlign: 'left' }}>
            <h3 className="mb-4">📖 故事背景</h3>
            <p style={{ lineHeight: '1.8' }}>{LEVEL_DATA.storyBackground}</p>
            
            <h3 className="mt-8 mb-4">🎯 游戏目标</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              {LEVEL_DATA.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
            
            <h3 className="mt-8 mb-4">🔍 寻找物品</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              {HIDDEN_ITEMS.map((item, i) => (
                <li key={i}>{item.emoji} {item.name}</li>
              ))}
            </ul>
          </div>
          
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            开始调查
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Render playing
  if (gameState === 'playing') {
    return (
      <div className="game-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
            ← 退出
          </Link>
          <div>
            <span style={{ color: '#2a9d8f' }}>
              已找到 {foundCount} / {totalItems}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(foundCount / totalItems) * 100}%` }}
          />
        </div>

        {/* Items to find */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {items.map(item => (
            <span 
              key={item.id}
              style={{ 
                padding: '4px 12px',
                background: item.found ? '#2a9d8f' : 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                opacity: item.found ? 0.6 : 1
              }}
            >
              {item.found ? '✅' : item.emoji} {item.name}
            </span>
          ))}
        </div>

        {/* Scene */}
        <div 
          className="card"
          style={{ 
            position: 'relative',
            minHeight: '400px',
            cursor: 'crosshair',
            background: 'linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%)'
          }}
          onClick={handleSceneClick}
        >
          {/* Simple room visualization */}
          <div style={{ 
            width: '100%', 
            height: '400px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#666',
            whiteSpace: 'pre'
          }}>
            {LEVEL2_SCENE}
          </div>

          {/* Click effects */}
          <AnimatePresence>
            {clickEffect && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  left: clickEffect.x,
                  top: clickEffect.y,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  fontSize: '2rem'
                }}
              >
                {clickEffect.isFound ? '✨' : '💨'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint */}
        <div className="text-center mt-4" style={{ color: '#888' }}>
          <p>点击场景中隐藏的物品位置 (约10%误差范围内)</p>
        </div>
      </div>
    );
  }

  // Render choice
  if (gameState === 'choice') {
    return (
      <div className="game-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔎✨</div>
          <h1>证据收集完成!</h1>
          
          <p style={{ color: '#b8c1ec', marginTop: '16px', marginBottom: '32px' }}>
            你找到了所有证据。现在，你该如何处理这个秘密?
          </p>

          <div className="flex flex-col gap-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameState('finished')}
              style={{ padding: '20px', textAlign: 'left' }}
            >
              <h3>告诉妈妈</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '4px' }}>
                坦诚面对家庭问题
              </p>
            </motion.button>

            <motion.button
              className="btn btn-accent"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameState('finished')}
              style={{ padding: '20px', textAlign: 'left', color: '#1a1a2e' }}
            >
              <h3>设计恶作剧</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '4px' }}>
                用智慧小小惩罚一下
              </p>
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGameState('finished')}
              style={{ padding: '20px', textAlign: 'left' }}
            >
              <h3>保持沉默</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '4px' }}>
                内心挣扎，先观察
              </p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render finished
  return (
    <div className="game-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>✅</div>
        <h1>关卡完成!</h1>
        
        <div className="card mt-8" style={{ maxWidth: '400px', margin: '24px auto' }}>
          <p>你做出了自己的选择。</p>
          <p style={{ marginTop: '8px', color: '#b8c1ec' }}>
            玛蒂尔达的冒险仍在继续...
          </p>
        </div>

        <Link to="/levels">
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            返回关卡选择
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default HiddenObjectGame;
