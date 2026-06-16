import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievementStore } from '../store/achievementStore';
import { trackAchievementShare } from '../store/achievementStore';

/**
 * 成就解锁弹窗组件 (v3.1)
 * 带金色粒子动画效果
 */
const AchievementUnlockModal = () => {
  const { pendingUnlock, showUnlockModal, setShowUnlockModal, setPendingUnlock } = useAchievementStore();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  
  // 生成粒子
  useEffect(() => {
    if (showUnlockModal) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    }
  }, [showUnlockModal]);
  
  // 关闭弹窗
  const handleClose = () => {
    setShowUnlockModal(false);
    setPendingUnlock(null);
  };
  
  // 分享成就
  const handleShare = () => {
    if (pendingUnlock) {
      trackAchievementShare(pendingUnlock.id);
    }
    handleClose();
  };
  
  return (
    <AnimatePresence>
      {showUnlockModal && pendingUnlock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          {/* 粒子效果 */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0, 
                x: `${particle.x}%`, 
                y: '-20px',
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: `${particle.y + 20}%`,
                scale: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: particle.delay,
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{
                position: 'absolute',
                left: `${particle.x}%`,
                top: '-20px',
                fontSize: '1.5rem',
                pointerEvents: 'none'
              }}
            >
              ✨
            </motion.div>
          ))}
          
          {/* 弹窗内容 */}
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%',
              border: '2px solid #ffd700',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* 背景光效 */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
              animation: 'rotate 10s linear infinite'
            }} />
            
            {/* 标题 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{ marginBottom: '20px' }}
            >
              <span style={{ fontSize: '4rem' }}>🎉</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                color: '#ffd700',
                fontSize: '1.8rem',
                marginBottom: '10px',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
              }}
            >
              成就解锁！
            </motion.h2>
            
            {/* 成就图标 */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              style={{ marginBottom: '20px' }}
            >
              <span style={{ fontSize: '5rem' }}>{pendingUnlock.icon}</span>
            </motion.div>
            
            {/* 成就名称 */}
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                color: '#fff',
                fontSize: '1.5rem',
                marginBottom: '10px'
              }}
            >
              {pendingUnlock.name}
            </motion.h3>
            
            {/* 成就描述 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                color: '#b8c1ec',
                marginBottom: '20px',
                fontSize: '1rem'
              }}
            >
              {pendingUnlock.description}
            </motion.p>
            
            {/* 奖励 */}
            {pendingUnlock.reward && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                  background: 'rgba(42, 157, 143, 0.2)',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '20px'
                }}
              >
                <span style={{ color: '#2a9d8f', fontWeight: 'bold' }}>
                  +{pendingUnlock.reward.value} ❤️ 好感度
                </span>
              </motion.div>
            )}
            
            {/* 按钮 */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 30px',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                marginRight: '10px',
                marginTop: '10px'
              }}
            >
              📤 分享喜悦
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: '2px solid #b8c1ec',
                borderRadius: '10px',
                padding: '10px 30px',
                color: '#b8c1ec',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              太棒了！
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementUnlockModal;
