import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore, useStoryStore } from '../store';
import { TRUST_LEVEL_CONFIG } from '../data/trustConfig';

const HomePage = () => {
  const { totalPlayTime } = useGameStore();
  const { 
    trustValue, 
    getTrustLevelName, 
    getTrustToNextLevel, 
    getLevelProgress,
    trustLevel,
    dailyTrustStats
  } = useStoryStore();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [prevValue, setPrevValue] = useState(trustValue);
  
  // 监听好感度变化动画
  useEffect(() => {
    if (trustValue !== prevValue && prevValue !== 0) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1500);
    }
    setPrevValue(trustValue);
  }, [trustValue, prevValue]);
  
  const levelConfig = TRUST_LEVEL_CONFIG[trustLevel];
  const trustToNext = getTrustToNextLevel();
  const progress = getLevelProgress();
  const todayGained = dailyTrustStats.gained || 0;

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    }
    return `${minutes}分钟`;
  };

  return (
    <div className="game-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title Section */}
        <motion.div
          className="animate-float mb-8"
          style={{ fontSize: '4rem', marginBottom: '16px' }}
        >
          📚✨🎓
        </motion.div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 50%, #6b4c9a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          玛蒂尔达冒险
        </h1>
        
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#b8c1ec',
          marginBottom: '40px',
          fontStyle: 'italic'
        }}>
          "用智慧战胜力量，用阅读点亮世界"
        </p>

        {/* Story Intro */}
        <div className="card mb-8" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
            改编自罗尔德·达尔经典小说《玛蒂尔达》
          </p>
          <p style={{ lineHeight: '1.8', marginTop: '12px', color: '#b8c1ec' }}>
            讲述一个天才小女孩如何用智慧和勇气对抗不公，
            <br />发现超能力，最终改变自己和朋友命运的故事。
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4" style={{ alignItems: 'center' }}>
          <Link to="/levels">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                fontSize: '1.3rem', 
                padding: '16px 48px',
                background: 'linear-gradient(135deg, #6b4c9a 0%, #9b7fc9 100%)'
              }}
            >
              🎮 开始游戏
            </motion.button>
          </Link>
          
          <Link to="/achievements">
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                fontSize: '1rem', 
                padding: '12px 36px',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid #9b7fc9'
              }}
            >
              🏆 成就列表
            </motion.button>
          </Link>
        </div>

        {/* 蜜糖老师好感度组件 (v3.1 完整版) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{ 
            marginTop: '32px', 
            padding: '16px 24px',
            background: `linear-gradient(135deg, ${levelConfig?.color}20 0%, ${levelConfig?.color}10 100%)`,
            borderRadius: '16px',
            border: `1px solid ${levelConfig?.color}40`,
            display: 'inline-block',
            minWidth: '320px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* 动画粒子效果 */}
          <AnimatePresence>
            {showAnimation && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -60, scale: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    style={{ position: 'absolute', fontSize: '20px', left: `${(i - 2) * 25}px` }}
                  >
                    💝
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* 主显示区域 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: '2.5rem' }}>👩‍🏫</span>
              <span style={{ 
                position: 'absolute', 
                bottom: '-5px', 
                right: '-5px', 
                fontSize: '1.2rem',
                background: levelConfig?.color,
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {levelConfig?.icon}
              </span>
            </div>
            
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ color: '#9b7fc9', fontSize: '0.85rem' }}>蜜糖老师好感度</span>
                <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                  💝 {trustValue}/100
                </span>
              </div>
              
              {/* 进度条 */}
              <div style={{ 
                height: '8px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '6px'
              }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progress}%`,
                    backgroundColor: levelConfig?.color
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ 
                    height: '100%', 
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: levelConfig?.color }}>
                  {levelConfig?.icon} {getTrustLevelName()}
                </span>
                {trustToNext > 0 && trustValue < 100 && (
                  <span style={{ color: '#888' }}>
                    距离下一级还差 {trustToNext} 点
                  </span>
                )}
                {trustValue >= 100 && (
                  <span style={{ color: levelConfig?.color }}>
                    已满级！🎉
                  </span>
                )}
              </div>
            </div>
            
            <span style={{ color: '#666', fontSize: '0.8rem' }}>
              {isExpanded ? '▼' : '▶'}
            </span>
          </div>

          {/* 展开详情面板 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  overflow: 'hidden',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '16px',
                  paddingTop: '16px'
                }}
              >
                {/* 今日统计 */}
                <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                  <h4 style={{ color: '#9b7fc9', fontSize: '0.85rem', margin: '0 0 8px' }}>📊 今日获得</h4>
                  <p style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                    +{todayGained} 好感度
                  </p>
                </div>
                
                {/* 推荐任务 */}
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#9b7fc9', fontSize: '0.85rem', margin: '0 0 8px' }}>🎯 推荐任务</h4>
                  <ul style={{ margin: 0, paddingLeft: '16px', color: '#aaa', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    <li>完成阅读理解关卡 (+20~35)</li>
                    <li>每日登录 (+10)</li>
                    <li>完成3道题目 (+15)</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <div style={{ marginTop: '32px', color: '#888' }}>
          <p>游戏时长: {formatTime(totalPlayTime)}</p>
        </div>

        {/* Version */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          v2.0.0
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
