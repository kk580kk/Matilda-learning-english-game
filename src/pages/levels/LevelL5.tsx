import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase } from '../../types';

const LEVEL_CONFIG = getLevelConfig('L5') || LEVEL_CONFIGS[4];

const getObjectives = () => {
  const phases = LEVEL_CONFIG.learningFlow;
  const objectives: string[] = [];
  phases.forEach(phase => {
    switch (phase.phase) {
      case LearningPhase.STORY_INTRO: objectives.push('了解故事背景'); break;
      case LearningPhase.SITUATION_INPUT: objectives.push('学习重点词汇和语法'); break;
      case LearningPhase.FEYNMAN_OUTPUT: objectives.push('通过费曼学习法输出知识'); break;
      case LearningPhase.STORY_PROGRESS: objectives.push('推进剧情发展'); break;
      case LearningPhase.ASSESSMENT: objectives.push('完成测评挑战'); break;
    }
  });
  return objectives;
};

const LevelL5 = () => {
  const { startGame } = useGameStore();
  const [gameState, setGameState] = useState<'intro' | 'reading'>('intro');

  const startPlaying = () => {
    startGame();
    setGameState('reading');
  };

  if (gameState === 'intro') {
    return (
      <div className="game-container">
        <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>← 返回关卡选择</Link>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📚✍️</div>
          <h1>{LEVEL_CONFIG.title}</h1>
          <p style={{ color: '#b8c1ec', marginTop: '8px' }}>{LEVEL_CONFIG.titleEn}</p>
          <div className="card mt-8" style={{ maxWidth: '600px', margin: '32px auto', textAlign: 'left' }}>
            <h3 className="mb-4">📖 故事背景</h3>
            <p style={{ lineHeight: '1.8' }}>{LEVEL_CONFIG.storyBackground}</p>
            <h3 className="mt-8 mb-4">🎯 五步学习循环</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              {getObjectives().map((obj, i) => (<li key={i}>{obj}</li>))}
            </ul>
            <h3 className="mt-8 mb-4">📝 当前状态</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>⏳ 等待产品规划部提供 Chapter 10-11 内容</li>
              <li>⏳ 数据填充完成后即可开始测评</li>
            </ul>
          </div>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            开始测评（待数据）
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="text-center" style={{ padding: '80px 20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
        <h2>L5 关卡数据准备中</h2>
        <p style={{ color: '#888', marginTop: '12px', marginBottom: '24px' }}>
          产品规划部正在制作用于 Chapter 10-11 的阅读理解题内容，预计 6月16日 23:00 前交付。
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/levels">
            <motion.button className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              返回关卡
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LevelL5;
