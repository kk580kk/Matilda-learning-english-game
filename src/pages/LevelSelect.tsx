import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLevelStore } from '../store';
import { LEVELS } from '../data/levels';
import { LevelStatus } from '../types';

const LevelSelect = () => {
  const { levelProgress, getLevelStatus } = useLevelStore();

  const getStatusClass = (status: LevelStatus): string => {
    switch (status) {
      case 'locked': return 'locked';
      case 'completed': return 'completed';
      case 'perfect': return 'completed';
      case 'in_progress': return 'current';
      default: return '';
    }
  };

  const getStatusIcon = (status: LevelStatus): string => {
    switch (status) {
      case 'locked': return '🔒';
      case 'completed': return '✅';
      case 'perfect': return '⭐';
      case 'in_progress': return '🎮';
      default: return '⭐';
    }
  };

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="game-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Link to="/" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
          ← 返回首页
        </Link>
        <h1 style={{ marginTop: '16px' }}>选择关卡</h1>
        <p style={{ color: '#b8c1ec', marginTop: '8px' }}>
          跟随玛蒂尔达的冒险之旅
        </p>
      </motion.div>

      {/* Level Grid */}
      <div className="level-grid">
        {LEVELS.map((level, index) => {
          const status = getLevelStatus(level.levelId);
          const progress = levelProgress[level.levelId];
          const isLocked = status === 'locked';
          const isPlayable = !isLocked;

          return (
            <motion.div
              key={level.levelId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`level-card ${getStatusClass(status)}`}
              style={{ 
                cursor: isPlayable ? 'pointer' : 'not-allowed',
                opacity: isLocked ? 0.5 : 1
              }}
            >
              {isPlayable ? (
                <Link 
                  to={`/level/${level.levelId}`} 
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {level.levelId}
                    </span>
                    <span>{getStatusIcon(status)}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                    {level.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.9rem', color: '#b8c1ec', marginBottom: '8px' }}>
                    {level.titleEn}
                  </p>
                  
                  <div className="stars" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                    {renderStars(level.difficulty)}
                  </div>
                  
                  {progress && progress.score > 0 && (
                    <div className="mt-2">
                      <div className="progress-bar">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${progress.score}%` }}
                        />
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                        最高分: {progress.score}
                      </p>
                    </div>
                  )}
                </Link>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', opacity: 0.5 }}>
                      {level.levelId}
                    </span>
                    <span>{getStatusIcon(status)}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.5 }}>
                    {level.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.9rem', color: '#b8c1ec', marginBottom: '8px' }}>
                    {level.titleEn}
                  </p>
                  
                  <div className="stars" style={{ fontSize: '0.9rem', opacity: 0.5 }}>
                    {renderStars(level.difficulty)}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 text-center" style={{ color: '#888' }}>
        <p>图例: 🔒 未解锁 | ✅ 已完成 | ⭐ 完美通关 | 🎮 进行中</p>
      </div>
    </div>
  );
};

export default LevelSelect;
