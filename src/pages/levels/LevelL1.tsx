import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore, useGameStore } from '../../store';
import { LEVELS } from '../../data/levels';

const LEVEL_DATA = LEVELS[0]; // L1

const WORDS_POOL = [
  'book', 'read', 'story', 'word', 'learn', 'smart', 'magic', 'think',
  'dream', 'light', 'happy', 'brave', 'world', 'friend', 'family', 'school',
  'teacher', 'library', 'knowledge', 'wisdom', 'courage', 'imagine', 'create'
];

const SpeedReadingGame = () => {
  const { completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();
  const { startGame, endGame } = useGameStore();

  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showWord, setShowWord] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Initialize game
  const initGame = () => {
    const shuffled = [...WORDS_POOL].sort(() => Math.random() - 0.5).slice(0, 30);
    setWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setShowWord(false);
    setOptions([]);
    setFeedback(null);
  };

  // Generate options
  useEffect(() => {
    if (gameState === 'playing' && words.length > 0) {
      const correctWord = words[currentIndex];
      const wrongWords = WORDS_POOL.filter(w => w !== correctWord)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [...wrongWords, correctWord].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
      
      // Show word briefly
      setShowWord(true);
      const timer = setTimeout(() => setShowWord(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, gameState, words]);

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleFinish();
    }
  }, [timeLeft, gameState]);

  const startPlaying = () => {
    initGame();
    setGameState('playing');
    startGame();
  };

  const handleWordClick = (clickedWord: string) => {
    if (gameState !== 'playing') return;
    
    const correctWord = words[currentIndex];
    
    if (clickedWord === correctWord) {
      const points = Math.min(10 + combo * 2, 20);
      setScore(s => s + points);
      setCombo(c => c + 1);
      setFeedback('correct');
      
      // Unlock achievements
      if (score + points >= 100) {
        unlockAchievement('speed_reader');
      }
      if (combo + 1 >= 20) {
        unlockAchievement('combo_master');
      }
    } else {
      setCombo(0);
      setFeedback('wrong');
      setTimeLeft(t => Math.max(0, t - 3));
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < words.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        handleFinish();
      }
    }, 300);
  };

  const handleFinish = () => {
    setGameState('finished');
    endGame();
    
    const finalScore = Math.min(100, Math.round((score / 200) * 100));
    completeLevel('L1', finalScore);
    
    // Check achievements
    if (finalScore >= 100) {
      unlockAchievement('perfect_score');
    }
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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📚⚡</div>
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
            
            <h3 className="mt-8 mb-4">🎮 游戏规则</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>单词会快速显示，你需要记住它</li>
              <li>从4个选项中选择正确的单词</li>
              <li>连击可以获得额外分数</li>
              <li>选错会扣时间和连击数</li>
              <li>30秒内尽可能获得高分</li>
            </ul>
          </div>
          
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            开始挑战
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
          <div className="flex gap-4">
            <span style={{ color: '#f4a261' }}>⏱️ {timeLeft}秒</span>
            <span style={{ color: '#2a9d8f' }}>🏆 {score}分</span>
            <span style={{ color: combo > 5 ? '#e76f51' : '#888' }}>
              🔥 {combo}连击
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-bar mb-8">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>

        {/* Game Area */}
        <div style={{ textAlign: 'center', minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {showWord && (
              <motion.div
                key="word"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#fff'
                }}
              >
                {words[currentIndex]}
              </motion.div>
            )}
            
            {!showWord && (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '16px',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}
              >
                {options.map((word, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWordClick(word)}
                    className="btn btn-secondary"
                    style={{ 
                      fontSize: '1.3rem',
                      padding: '20px',
                      background: feedback === 'wrong' && word === words[currentIndex] 
                        ? '#2a9d8f' 
                        : undefined
                    }}
                  >
                    {word}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '5rem',
                  pointerEvents: 'none'
                }}
              >
                {feedback === 'correct' ? '✅' : '❌'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8" style={{ color: '#888' }}>
          <p>先记住显示的单词，然后从下方选择正确的答案</p>
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
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>
          {score >= 80 ? '🎉' : score >= 50 ? '👏' : '💪'}
        </div>
        <h1>关卡完成!</h1>
        
        <div className="card mt-8" style={{ maxWidth: '400px', margin: '24px auto' }}>
          <div className="flex justify-between mb-4">
            <span>最终得分</span>
            <span style={{ fontSize: '2rem', color: '#f4a261' }}>{score}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>完成进度</span>
            <span style={{ fontSize: '2rem', color: '#2a9d8f' }}>
              {Math.min(100, Math.round((score / 200) * 100))}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>最高连击</span>
            <span style={{ fontSize: '1.5rem' }}>{combo} 🔥</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Link to="/levels">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              返回关卡选择
            </motion.button>
          </Link>
          
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
          >
            再玩一次
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeedReadingGame;
