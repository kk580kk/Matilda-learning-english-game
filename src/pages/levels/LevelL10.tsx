import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase } from '../../types';

// Get L10 config - fallback to tenth level if not found
const LEVEL_CONFIG = getLevelConfig('L10') || LEVEL_CONFIGS[9];

// Generate objectives from learning flow
const getObjectives = () => {
  const phases = LEVEL_CONFIG.learningFlow;
  const objectives: string[] = [];
  
  phases.forEach(phase => {
    switch (phase.phase) {
      case LearningPhase.STORY_INTRO:
        objectives.push('了解故事背景');
        break;
      case LearningPhase.SITUATION_INPUT:
        objectives.push('学习重点词汇和语法');
        break;
      case LearningPhase.FEYNMAN_OUTPUT:
        objectives.push('通过费曼学习法输出知识');
        break;
      case LearningPhase.STORY_PROGRESS:
        objectives.push('推进剧情发展');
        break;
      case LearningPhase.ASSESSMENT:
        objectives.push('完成测评挑战');
        break;
    }
  });
  
  return objectives;
};

type BossPhase = 'intro' | 'observe' | 'ghost' | 'evidence' | 'telepathy' | 'victory' | 'defeat';

interface PlayerStats {
  health: number;
  telepathy: number;
}

interface BossStats {
  health: number;
  suspicion: number;
}

const BossBattle = () => {
  const { startLevel, completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();

  const [phase, setPhase] = useState<BossPhase>('intro');
  const [player, setPlayer] = useState<PlayerStats>({ health: 100, telepathy: 100 });
  const [boss, setBoss] = useState<BossStats>({ health: 100, suspicion: 0 });
  const [score, setScore] = useState(0);
  const [actionLog, setActionLog] = useState<string[]>(['战斗开始!']);
  
  const [ghostText, setGhostText] = useState('');
  const [showGhostText, setShowGhostText] = useState(false);
  const [evidenceIndex, setEvidenceIndex] = useState(0);
  const [telepathyTarget, setTelepathyTarget] = useState({ x: 50, y: 50 });
  const [isHoldingTelepathy, setIsHoldingTelepathy] = useState(false);
  const [bossAttack, setBossAttack] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const GHOST_MESSAGES = [
    '我是Magnus...我知道你对我女儿做的一切...',
    '归还属于她的财产...否则...',
    '我知道你害怕什么...',
    '你的罪行不会被遗忘...',
  ];

  const EVIDENCE = [
    { title: '遗嘱文件', content: 'Miss Honey有权继承她父亲Magnus的全部财产', icon: '📜' },
    { title: '财产证明', content: '川奇布校长非法侵吞了Honey家的庄园', icon: '🏰' },
    { title: '姨甥关系', content: '川奇布校长是Miss Honey的亲生姨妈', icon: '👵' },
    { title: '虐待证据', content: '多名学生和家长指控校长虐待和恐吓', icon: '📢' },
  ];

  const addLog = (message: string) => {
    setActionLog(prev => [...prev.slice(-4), message]);
  };

  // Intro phase
  const startBattle = () => {
    setPhase('observe');
    startLevel('L10');
    addLog('最终对决开始!');
  };

  // Observe phase - gather evidence
  const handleEvidenceClick = (index: number) => {
    if (index !== evidenceIndex) return;
    
    setScore(s => s + 25);
    addLog(`找到证据: ${EVIDENCE[index].title}`);
    setBoss(s => ({ ...s, suspicion: Math.min(100, s.suspicion + 25) }));
    
    setTimeout(() => {
      if (evidenceIndex < EVIDENCE.length - 1) {
        setEvidenceIndex(i => i + 1);
      } else {
        setPhase('ghost');
        addLog('所有证据收集完毕!');
      }
    }, 500);
  };

  // Ghost phase - type ghost message
  useEffect(() => {
    if (phase === 'ghost' && !showGhostText) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < GHOST_MESSAGES.length) {
          setShowGhostText(true);
          setGhostText(GHOST_MESSAGES[index]);
          setTimeout(() => {
            setShowGhostText(false);
            index++;
            if (index >= GHOST_MESSAGES.length) {
              setPhase('evidence');
            }
          }, 2000);
        }
        clearInterval(interval);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Evidence phase - select evidence to present
  const presentEvidence = (index: number) => {
    setScore(s => s + 20);
    addLog(`展示证据: ${EVIDENCE[index].title}`);
    setBoss(s => ({ ...s, suspicion: Math.min(100, s.suspicion + 30) }));
    
    setTimeout(() => {
      if (boss.suspicion + 30 >= 100) {
        setPhase('telepathy');
        addLog('校长发现真相，试图攻击!');
      }
    }, 500);
  };

  // Telepathy phase - keep focus to charge attack
  useEffect(() => {
    if (phase === 'telepathy') {
      const interval = setInterval(() => {
        setBoss(b => {
          const newHealth = b.health - 2;
          if (newHealth <= 0) {
            setPhase('victory');
            completeLevel('L10', 100);
            unlockAchievement('hero_of_hall');
            return { ...b, health: 0 };
          }
          return { ...b, health: newHealth };
        });
        
        // Random boss attack
        if (Math.random() < 0.2) {
          setBossAttack(true);
          setPlayer(p => ({ ...p, health: Math.max(0, p.health - 10), telepathy: Math.max(0, p.telepathy - 10) }));
          setTimeout(() => setBossAttack(false), 500);
        }
      }, 200);
      
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleTelepathyStart = () => {
    if (phase !== 'telepathy') return;
    setIsHoldingTelepathy(true);
  };

  const handleTelepathyEnd = () => {
    setIsHoldingTelepathy(false);
  };

  const handleTelepathyMove = (e: React.MouseEvent) => {
    if (!isHoldingTelepathy || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setTelepathyTarget({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  // Render intro
  if (phase === 'intro') {
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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏰⚔️👑</div>
          <h1>{LEVEL_CONFIG.title}</h1>
          <p style={{ color: '#b8c1ec', marginTop: '8px' }}>{LEVEL_CONFIG.titleEn}</p>
          
          <div className="card mt-8" style={{ maxWidth: '600px', margin: '32px auto', textAlign: 'left' }}>
            <h3 className="mb-4">📖 故事背景</h3>
            <p style={{ lineHeight: '1.8' }}>{LEVEL_CONFIG.storyBackground}</p>
            
            <h3 className="mt-8 mb-4">🎯 五步学习循环</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              {getObjectives().map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
            
            <h3 className="mt-8 mb-4">📚 中考目标</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>目标考试: 中考 (Zhōngkǎo)</li>
              <li>CEFR等级: {LEVEL_CONFIG.cefrLevel}</li>
              <li>难度: {'★'.repeat(LEVEL_CONFIG.difficulty)}{'☆'.repeat(5 - LEVEL_CONFIG.difficulty)}</li>
            </ul>
          </div>
          
          <motion.button
            className="btn btn-danger"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startBattle}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            ⚔️ 开始最终对决
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Observe phase - collect evidence
  if (phase === 'observe') {
    return (
      <div className="game-container">
        {/* Stats */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span>🏆 分数: {score}</span>
          </div>
          <div>
            <span style={{ marginRight: '16px' }}>👤 怀疑度: {boss.suspicion}%</span>
          </div>
        </div>
        
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${boss.suspicion}%`,
              background: 'linear-gradient(90deg, #e76f51 0%, #f4a261 100%)'
            }}
          />
        </div>

        {/* Action log */}
        <div className="card mb-4" style={{ padding: '12px', fontSize: '0.9rem' }}>
          {actionLog.map((log, i) => (
            <div key={i} style={{ color: i === actionLog.length - 1 ? '#fff' : '#888' }}>
              {i === 0 ? '> ' : ''}{log}
            </div>
          ))}
        </div>

        {/* Evidence collection */}
        <div className="card">
          <h3 className="text-center mb-4">🔍 寻找证据</h3>
          <p className="text-center mb-4" style={{ color: '#888' }}>
            点击正确的证据来收集
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {EVIDENCE.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleEvidenceClick(index)}
                disabled={index !== evidenceIndex}
                className="card"
                style={{ 
                  cursor: index === evidenceIndex ? 'pointer' : 'default',
                  opacity: index === evidenceIndex ? 1 : 0.4,
                  border: index === evidenceIndex ? '2px solid #9b7fc9' : 'none',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 'bold', marginTop: '8px' }}>{item.title}</div>
                {index !== evidenceIndex && (
                  <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                    {index < evidenceIndex ? '✓ 已收集' : '???'}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Ghost phase
  if (phase === 'ghost') {
    return (
      <div className="game-container">
        <div 
          className="card"
          style={{ 
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #000 100%)'
          }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ fontSize: '6rem', marginBottom: '32px' }}
          >
            👻
          </motion.div>
          
          <AnimatePresence>
            {showGhostText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ 
                  fontSize: '1.5rem', 
                  textAlign: 'center',
                  maxWidth: '500px',
                  color: '#b8c1ec'
                }}
              >
                {ghostText}
              </motion.div>
            )}
          </AnimatePresence>
          
          {!showGhostText && (
            <p style={{ color: '#666' }}>幽灵正在说话...</p>
          )}
        </div>
      </div>
    );
  }

  // Evidence reveal phase
  if (phase === 'evidence') {
    return (
      <div className="game-container">
        <h2 className="text-center mb-4">📢 全校师生面前揭露真相</h2>
        
        <div className="card mb-4" style={{ padding: '12px', fontSize: '0.9rem' }}>
          {actionLog.slice(-3).map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>

        {/* Boss response */}
        <motion.div
          animate={bossAttack ? { x: [-5, 5, -5, 5, 0] } : {}}
          className="card text-center mb-4"
          style={{ 
            background: 'rgba(231, 111, 81, 0.2)',
            border: '2px solid #e76f51'
          }}
        >
          <div style={{ fontSize: '3rem' }}>👺</div>
          <h3>川奇布校长</h3>
          <div className="progress-bar mt-4">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${boss.suspicion}%`, background: '#e76f51' }}
            />
          </div>
          <p style={{ marginTop: '8px' }}>怀疑度: {boss.suspicion}%</p>
        </motion.div>

        {/* Evidence buttons */}
        <div className="flex flex-col gap-2">
          {EVIDENCE.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => presentEvidence(index)}
              className="card"
              style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{ fontSize: '2rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>{item.content}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Telepathy battle phase
  if (phase === 'telepathy') {
    return (
      <div className="game-container">
        {/* Player stats */}
        <div className="flex justify-between mb-4">
          <div style={{ width: '45%' }}>
            <div className="flex justify-between mb-1">
              <span>❤️ 生命</span>
              <span>{player.health}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${player.health}%`,
                  background: player.health > 50 ? '#2a9d8f' : '#e76f51'
                }}
              />
            </div>
          </div>
          <div style={{ width: '45%' }}>
            <div className="flex justify-between mb-1">
              <span>✨ 念力</span>
              <span>{player.telepathy}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${player.telepathy}%`,
                  background: '#9b7fc9'
                }}
              />
            </div>
          </div>
        </div>

        {/* Boss health */}
        <div className="text-center mb-4">
          <span style={{ fontSize: '1.2rem' }}>👺 Boss: {boss.health}% HP</span>
        </div>
        <div className="progress-bar mb-8" style={{ height: '16px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${boss.health}%`,
              background: 'linear-gradient(90deg, #e76f51 0%, #d45a3f 100%)'
            }}
          />
        </div>

        {/* Battle area */}
        <div 
          ref={containerRef}
          className="card"
          style={{ 
            height: '300px',
            position: 'relative',
            background: 'radial-gradient(ellipse at center, #2a2a4a 0%, #1a1a2e 100%)',
            cursor: isHoldingTelepathy ? 'crosshair' : 'default',
            overflow: 'hidden'
          }}
          onMouseDown={handleTelepathyStart}
          onMouseUp={handleTelepathyEnd}
          onMouseLeave={handleTelepathyEnd}
          onMouseMove={handleTelepathyMove}
        >
          {/* Boss */}
          <motion.div
            animate={bossAttack ? { scale: 1.2 } : {}}
            style={{
              position: 'absolute',
              right: '10%',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '4rem'
            }}
          >
            👺
          </motion.div>

          {/* Player attack beam */}
          {isHoldingTelepathy && (
            <motion.div
              style={{
                position: 'absolute',
                left: '20%',
                top: '50%',
                width: '60%',
                height: '4px',
                background: 'linear-gradient(90deg, #9b7fc9 0%, #e76f51 100%)',
                transformOrigin: 'left center'
              }}
            />
          )}

          {/* Telepathy target */}
          <motion.div
            animate={{
              left: `${telepathyTarget.x}%`,
              top: `${telepathyTarget.y}%`
            }}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              border: '3px solid #9b7fc9',
              borderRadius: '50%',
              boxShadow: isHoldingTelepathy ? '0 0 20px #9b7fc9' : 'none'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              background: '#9b7fc9',
              borderRadius: '50%'
            }} />
          </motion.div>

          {/* Matilda */}
          <div style={{
            position: 'absolute',
            left: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '3rem'
          }}>
            👧✨
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center mt-4" style={{ color: '#888' }}>
          {isHoldingTelepathy 
            ? '🧠 释放念力攻击! 瞄准Boss点击释放!' 
            : '👆 按住鼠标蓄力，瞄准后松开攻击!'}
        </p>
      </div>
    );
  }

  // Victory
  if (phase === 'victory') {
    return (
      <div className="game-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            style={{ fontSize: '6rem', marginBottom: '16px' }}
          >
            🏆
          </motion.div>
          
          <h1 style={{ color: '#f4a261' }}>胜利!</h1>
          
          <div className="card mt-8" style={{ maxWidth: '500px', margin: '24px auto', textAlign: 'left' }}>
            <h3 className="mb-4">🎉 战斗结果</h3>
            <div className="flex justify-between mb-2">
              <span>最终得分</span>
              <span style={{ fontSize: '1.5rem', color: '#f4a261' }}>{score}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>剩余生命</span>
              <span style={{ fontSize: '1.5rem', color: '#2a9d8f' }}>{player.health}%</span>
            </div>
            
            <hr style={{ margin: '16px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <h3 className="mb-4">📖 结局</h3>
            <p style={{ lineHeight: '1.8', color: '#b8c1ec' }}>
              川奇布校长在证据面前崩溃，逃离了学校!
              Miss Honey获得了她应得的遗产，收养了玛蒂尔达。
              玛蒂尔达用自己的智慧和勇气改变了自己和朋友的命运。
            </p>
          </div>

          <Link to="/levels">
            <motion.button
              className="btn btn-success"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              返回关卡选择
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default BossBattle;
