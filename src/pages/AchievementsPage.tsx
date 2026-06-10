import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAchievementStore } from '../store';
import { ACHIEVEMENTS } from '../data/achievements';

const AchievementsPage = () => {
  const { unlocked, isUnlocked } = useAchievementStore();

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
        <h1 style={{ marginTop: '16px' }}>🏆 成就</h1>
        <p style={{ color: '#b8c1ec', marginTop: '8px' }}>
          已解锁 {unlocked.length} / {ACHIEVEMENTS.length} 个成就
        </p>
      </motion.div>

      {/* Progress */}
      <div className="card mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="level-grid">
        {ACHIEVEMENTS.map((achievement, index) => {
          const unlockedStatus = isUnlocked(achievement.id);
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card"
              style={{ 
                opacity: unlockedStatus ? 1 : 0.4,
                borderColor: unlockedStatus ? '#2a9d8f' : 'transparent',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
                {unlockedStatus ? achievement.icon : '❓'}
              </div>
              
              <h3 style={{ 
                marginBottom: '8px',
                color: unlockedStatus ? '#fff' : '#888'
              }}>
                {unlockedStatus ? achievement.name : '???'}
              </h3>
              
              <p style={{ 
                fontSize: '0.9rem', 
                color: unlockedStatus ? '#b8c1ec' : '#666'
              }}>
                {unlockedStatus ? achievement.description : '未解锁'}
              </p>
              
              {unlockedStatus && (
                <div className="mt-2" style={{ color: '#2a9d8f', fontSize: '0.8rem' }}>
                  ✅ 已解锁
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
