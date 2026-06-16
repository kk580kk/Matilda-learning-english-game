import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievementStore } from '../store/achievementStore';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from '../data/achievements';
import { AchievementCategory } from '../types';
import { trackAchievementView, trackAchievementShare } from '../store/achievementStore';

const AchievementsPage = () => {
  const { isUnlocked, getCategoryStats, getOverallStats, checkAllAchievements } = useAchievementStore();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  
  // 页面加载时检查所有成就
  useEffect(() => {
    trackAchievementView();
    checkAllAchievements();
  }, []);
  
  // 筛选成就
  const filteredAchievements = selectedCategory === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory);
  
  // 获取统计
  const overallStats = getOverallStats();
  const categoryStats = getCategoryStats();
  
  // 分享成就
  const handleShare = (achievementId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackAchievementShare(achievementId);
    alert('成就已分享！');
  };
  
  // 分类图标映射
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚';
      case 'story': return '📖';
      case 'social': return '👥';
      case 'special': return '✨';
      default: return '🏆';
    }
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
        <h1 style={{ marginTop: '16px' }}>🏆 成就</h1>
        <p style={{ color: '#b8c1ec', marginTop: '8px' }}>
          已解锁 {overallStats.totalUnlocked} / {overallStats.totalCount} 个成就
        </p>
      </motion.div>

      {/* Progress */}
      <div className="card mb-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="progress-bar" style={{ height: '16px', borderRadius: '8px', background: '#1a1a2e' }}>
          <motion.div 
            className="progress-bar-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${(overallStats.totalUnlocked / overallStats.totalCount) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '8px'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.85rem', color: '#b8c1ec' }}>
          <span>整体进度</span>
          <span>{Math.round((overallStats.totalUnlocked / overallStats.totalCount) * 100)}%</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '24px', 
        overflowX: 'auto',
        padding: '0 16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* 全部 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: selectedCategory === 'all' ? '2px solid #667eea' : '2px solid transparent',
            background: selectedCategory === 'all' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}
        >
          🏆 全部 ({overallStats.totalUnlocked}/{overallStats.totalCount})
        </motion.button>
        
        {/* 分类 Tab */}
        {ACHIEVEMENT_CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: selectedCategory === cat.id ? '2px solid #667eea' : '2px solid transparent',
              background: selectedCategory === cat.id ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem'
            }}
          >
            {cat.icon} {cat.name} ({categoryStats[cat.id].unlocked}/{categoryStats[cat.id].total})
          </motion.button>
        ))}
      </div>

      {/* Achievements Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="level-grid"
        >
          {filteredAchievements.map((achievement, index) => {
            const unlockedStatus = isUnlocked(achievement.id);
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="card"
                style={{ 
                  opacity: unlockedStatus ? 1 : 0.5,
                  borderColor: unlockedStatus ? '#2a9d8f' : 'transparent',
                  borderWidth: unlockedStatus ? '2px' : '0px',
                  textAlign: 'center',
                  position: 'relative',
                  padding: '20px'
                }}
              >
                {/* 分类标签 */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#888'
                }}>
                  {getCategoryIcon(achievement.category)}
                </div>
                
                {/* 图标 */}
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
                  {unlockedStatus ? achievement.icon : '❓'}
                </div>
                
                {/* 名称 */}
                <h3 style={{ 
                  marginBottom: '8px',
                  color: unlockedStatus ? '#fff' : '#888',
                  fontSize: '1.1rem'
                }}>
                  {unlockedStatus ? achievement.name : '???'}
                </h3>
                
                {/* 描述 */}
                <p style={{ 
                  fontSize: '0.85rem', 
                  color: unlockedStatus ? '#b8c1ec' : '#666',
                  marginBottom: '12px',
                  minHeight: '40px'
                }}>
                  {unlockedStatus ? achievement.description : '未解锁'}
                </p>
                
                {/* 奖励 */}
                {unlockedStatus && achievement.reward && (
                  <div style={{ 
                    color: '#2a9d8f', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    +{achievement.reward.value} ❤️
                  </div>
                )}
                
                {/* 状态 */}
                {unlockedStatus && (
                  <div style={{ 
                    color: '#2a9d8f', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <span>✅</span>
                    <span>已解锁</span>
                  </div>
                )}
                
                {/* 未解锁提示 */}
                {!unlockedStatus && achievement.category !== 'special' && (
                  <div style={{ 
                    color: '#666', 
                    fontSize: '0.75rem'
                  }}>
                    继续加油！
                  </div>
                )}
                
                {/* 隐藏成就标记 */}
                {achievement.hidden && !unlockedStatus && (
                  <div style={{ 
                    color: '#ffd700', 
                    fontSize: '0.7rem',
                    marginTop: '8px'
                  }}>
                    🔒 隐藏成就
                  </div>
                )}
                
                {/* 已解锁时显示分享按钮 */}
                {unlockedStatus && (
                  <button
                    onClick={(e) => handleShare(achievement.id, e)}
                    style={{
                      marginTop: '10px',
                      padding: '4px 12px',
                      fontSize: '0.7rem',
                      background: 'transparent',
                      border: '1px solid #666',
                      borderRadius: '10px',
                      color: '#888',
                      cursor: 'pointer'
                    }}
                  >
                    📤 分享
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* 空状态 */}
      {filteredAchievements.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          color: '#666'
        }}>
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <p>该分类下暂无成就</p>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
