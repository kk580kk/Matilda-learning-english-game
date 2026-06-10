import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store';

const HomePage = () => {
  const { totalPlayTime } = useGameStore();

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

        {/* Stats */}
        <div style={{ marginTop: '48px', color: '#888' }}>
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
