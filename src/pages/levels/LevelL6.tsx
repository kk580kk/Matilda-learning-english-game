import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLevelStore, useAchievementStore } from '../../store';
import { LEVELS } from '../../data/levels';

const LEVEL_DATA = LEVELS[5]; // L6

interface TelepathyObject {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  mass: number;
  isPlaced: boolean;
  isMoving: boolean;
}

const TRAIN_OBJECTS: TelepathyObject[] = [
  // Stage 1: Small objects
  { id: 'pencil', name: '铅笔', emoji: '✏️', x: 20, y: 50, targetX: 80, targetY: 30, mass: 1, isPlaced: false, isMoving: false },
  { id: 'eraser', name: '橡皮', emoji: '🧹', x: 30, y: 60, targetX: 85, targetY: 40, mass: 1, isPlaced: false, isMoving: false },
  // Stage 2: Medium objects
  { id: 'book', name: '书本', emoji: '📚', x: 15, y: 40, targetX: 75, targetY: 50, mass: 2, isPlaced: false, isMoving: false },
  { id: 'cup', name: '水杯', emoji: '🥤', x: 25, y: 50, targetX: 80, targetY: 60, mass: 2, isPlaced: false, isMoving: false },
  // Stage 3: Large objects
  { id: 'chair', name: '椅子', emoji: '🪑', x: 20, y: 60, targetX: 70, targetY: 70, mass: 3, isPlaced: false, isMoving: false },
  { id: 'chalkboard', name: '黑板擦', emoji: '🧽', x: 30, y: 30, targetX: 90, targetY: 20, mass: 3, isPlaced: false, isMoving: false },
];

const TelepathyGame = () => {
  const { startLevel, completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();

  const [gameState, setGameState] = useState<'intro' | 'stage1' | 'stage2' | 'stage3' | 'finished'>('intro');
  const [energy, setEnergy] = useState(100);
  const [isUsingPower, setIsUsingPower] = useState(false);
  const [objects, setObjects] = useState<TelepathyObject[]>(TRAIN_OBJECTS);
  const [currentStage, setCurrentStage] = useState(1);
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize stage
  const initStage = useCallback((stage: number) => {
    if (stage === 1) {
      setObjects(TRAIN_OBJECTS.slice(0, 2).map(obj => ({ ...obj, isPlaced: false, x: obj.x, y: obj.y })));
    } else if (stage === 2) {
      setObjects(TRAIN_OBJECTS.slice(0, 4).map(obj => ({ ...obj, isPlaced: false, x: obj.x, y: obj.y })));
    } else {
      setObjects(TRAIN_OBJECTS.map(obj => ({ ...obj, isPlaced: false, x: obj.x, y: obj.y })));
    }
    setEnergy(100);
  }, []);

  const startPlaying = (stage: number) => {
    initStage(stage);
    setCurrentStage(stage);
    
    if (stage === 1) setGameState('stage1');
    else if (stage === 2) setGameState('stage2');
    else setGameState('stage3');
    
    startLevel('L6');
  };

  // Energy consumption
  useEffect(() => {
    if (gameState.includes('stage') && isUsingPower) {
      const timer = setInterval(() => {
        setEnergy(e => {
          const newEnergy = e - 0.5;
          if (newEnergy <= 0) {
            setIsUsingPower(false);
            return 0;
          }
          return newEnergy;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [gameState, isUsingPower]);

  const handleMouseDown = (objectId: string) => {
    if (energy <= 0) return;
    setDraggedObject(objectId);
    setIsUsingPower(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedObject || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setObjects(prev => prev.map(obj => {
      if (obj.id === draggedObject) {
        return { ...obj, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
      }
      return obj;
    }));
  };

  const handleMouseUp = () => {
    if (!draggedObject) return;

    // Check if object is near target
    setObjects(prev => prev.map(obj => {
      if (obj.id === draggedObject) {
        const distance = Math.sqrt(
          Math.pow(obj.x - obj.targetX, 2) + Math.pow(obj.y - obj.targetY, 2)
        );
        
        if (distance < 8) {
          // Success! Object placed
          const points = (4 - obj.mass) * 25;
          setScore(s => s + points);
          return { ...obj, isPlaced: true, x: obj.targetX, y: obj.targetY };
        }
      }
      return obj;
    }));

    setDraggedObject(null);
    setIsUsingPower(false);
  };

  // Check stage completion
  useEffect(() => {
    if (gameState.includes('stage')) {
      const allPlaced = objects.filter((_, i) => {
        if (currentStage === 1) return i < 2;
        if (currentStage === 2) return i < 4;
        return true;
      }).every(obj => obj.isPlaced);

      if (allPlaced) {
        setTimeout(() => {
          if (currentStage < 3) {
            startPlaying(currentStage + 1);
          } else {
            // All stages complete
            setGameState('finished');
            completeLevel('L6', 100);
            unlockAchievement('telekinetic');
          }
        }, 1000);
      }
    }
  }, [objects, currentStage, gameState]);

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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✨🧠</div>
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
            
            <h3 className="mt-8 mb-4">🎮 训练阶段</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>阶段1: 移动小物体 (铅笔、橡皮) - 精神力消耗少</li>
              <li>阶段2: 移动中等物体 (书本、水杯)</li>
              <li>阶段3: 移动大物体 (椅子、黑板擦) - 挑战最大</li>
            </ul>
          </div>
          
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startPlaying(1)}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            开始意念训练
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Render game stages
  if (gameState.includes('stage')) {
    const stageObjects = objects.filter((_, i) => {
      if (currentStage === 1) return i < 2;
      if (currentStage === 2) return i < 4;
      return true;
    });

    return (
      <div className="game-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
            ← 退出
          </Link>
          <span style={{ color: '#f4a261' }}>阶段 {currentStage}/3</span>
        </div>

        {/* Energy bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>精神力</span>
            <span>{Math.round(energy)}%</span>
          </div>
          <div className="progress-bar" style={{ height: '12px' }}>
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${energy}%`,
                background: energy > 50 ? 'linear-gradient(90deg, #6b4c9a 0%, #9b7fc9 100%)' :
                           energy > 20 ? 'linear-gradient(90deg, #f4a261 0%, #e76f51 100%)' :
                           'linear-gradient(90deg, #e76f51 0%, #d45a3f 100%)'
              }}
            />
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-4" style={{ color: '#2a9d8f' }}>
          🏆 得分: {score}
        </div>

        {/* Instructions */}
        <div className="text-center mb-4" style={{ color: '#888' }}>
          {isUsingPower 
            ? '🧠 用意念移动物体到目标位置!' 
            : '👆 点击并拖动物体使用意念'}
        </div>

        {/* Game Area */}
        <div 
          ref={containerRef}
          className="card"
          style={{ 
            position: 'relative',
            height: '400px',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            cursor: isUsingPower ? 'grabbing' : 'default',
            userSelect: 'none'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Target zones */}
          {stageObjects.map(obj => (
            <motion.div
              key={`target-${obj.id}`}
              animate={{ scale: obj.isPlaced ? 1 : [1, 1.1, 1] }}
              transition={{ repeat: obj.isPlaced ? 0 : Infinity, duration: 1.5 }}
              style={{
                position: 'absolute',
                left: `${obj.targetX}%`,
                top: `${obj.targetY}%`,
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                border: obj.isPlaced ? '2px solid #2a9d8f' : '2px dashed rgba(155, 127, 201, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                background: obj.isPlaced ? 'rgba(42, 157, 143, 0.2)' : 'transparent'
              }}
            >
              {obj.isPlaced ? '✅' : `🎯`}
            </motion.div>
          ))}

          {/* Moveable objects */}
          {stageObjects.map(obj => (
            <motion.div
              key={obj.id}
              animate={{ 
                left: `${obj.x}%`, 
                top: `${obj.y}%`,
                scale: draggedObject === obj.id ? 1.2 : 1,
                boxShadow: isUsingPower && draggedObject === obj.id 
                  ? '0 0 20px rgba(155, 127, 201, 0.8)' 
                  : 'none'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                cursor: energy > 0 ? 'grab' : 'not-allowed',
                opacity: obj.isPlaced ? 0.5 : 1,
                pointerEvents: obj.isPlaced ? 'none' : 'auto'
              }}
              onMouseDown={() => handleMouseDown(obj.id)}
            >
              <div style={{ 
                textAlign: 'center',
                padding: '8px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}>
                <div>{obj.emoji}</div>
                <div style={{ fontSize: '0.7rem', color: '#888' }}>{obj.name}</div>
                <div style={{ fontSize: '0.6rem', color: '#666' }}>💪 {obj.mass}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Object list */}
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {stageObjects.map(obj => (
            <span 
              key={obj.id}
              style={{ 
                padding: '4px 12px',
                background: obj.isPlaced ? '#2a9d8f' : 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                opacity: obj.isPlaced ? 0.6 : 1
              }}
            >
              {obj.isPlaced ? '✅' : obj.emoji} {obj.name}
            </span>
          ))}
        </div>
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
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>✨🧠</div>
        <h1>意念觉醒完成!</h1>
        
        <div className="card mt-8" style={{ maxWidth: '400px', margin: '24px auto' }}>
          <div className="flex justify-between mb-4">
            <span>训练得分</span>
            <span style={{ fontSize: '2rem', color: '#f4a261' }}>{score}</span>
          </div>
          <p style={{ color: '#b8c1ec' }}>
            玛蒂尔达成功掌握了意念移物的能力!
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

export default TelepathyGame;
