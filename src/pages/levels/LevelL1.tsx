import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLevelStore, useAchievementStore, useGameStore, useStoryStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase } from '../../types';
import { ReadingGameV3 } from '../../components/v3/ReadingGameV3';
import { 
  CHAPTER1_ARTICLE_V3, 
  CHAPTER1_QUESTIONS_V3 
} from '../../data/questions/reading/chapter1-v3';
import { trustCalculator, MISS_HONEY_FEEDBACK } from '../../data/trustConfig';

// Get L1 config
const LEVEL_CONFIG = getLevelConfig('L1') || LEVEL_CONFIGS[0];

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

const LevelL1 = () => {
  const { completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();
  const { startGame, endGame } = useGameStore();
  const { 
    trustValue, 
    trustLevel, 
    getTrustLevelName, 
    getLevelReplayStats 
  } = useStoryStore();

  // 蜜糖老师反馈状态
  const [trustResult, setTrustResult] = useState<{
    change: number;
    feedback: any;
    newValue: number;
    isLevelUp: boolean;
  } | null>(null);

  // 游戏状态
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [gameResult, setGameResult] = useState<{
    totalQuestions: number;
    correctCount: number;
    totalScore: number;
    accuracy: number;
  } | null>(null);

  // 开始游戏
  const startPlaying = useCallback(() => {
    setGameState('playing');
    startGame();
  }, [startGame]);

  // 完成游戏
  const handleComplete = useCallback((result: {
    totalQuestions: number;
    correctCount: number;
    totalScore: number;
    timeSpent: number;
    accuracy: number;
    readingProgress: number;
  }) => {
    setGameResult({
      totalQuestions: result.totalQuestions,
      correctCount: result.correctCount,
      totalScore: result.totalScore,
      accuracy: result.accuracy
    });
    setGameState('completed');
    endGame();

    // 计算最终分数
    const finalScore = result.accuracy;
    completeLevel('L1', finalScore);

    // 解锁成就
    if (finalScore >= 90) {
      unlockAchievement('perfect_score');
    }
    if (finalScore >= 70) {
      unlockAchievement('assessment_pass');
    }

    // =====================
    // 计算好感度变化（匹配天才人设）
    // =====================
    const accuracy = result.correctCount / result.totalQuestions;
    const replayStats = getLevelReplayStats('L1');
    const playCount = replayStats?.playCount || 0;
    
    const trustCalcResult = trustCalculator.calculateLevelTrust(
      'L1',
      accuracy,
      playCount === 0,
      playCount + 1
    );

    // 更新好感度
    const oldLevel = trustLevel;
    trustCalcResult.sources.forEach(source => {
      if (source.amount !== 0) {
        useStoryStore.getState().updateTrustValue(source.amount, source);
      }
    });

    // 设置反馈显示
    const feedback = trustCalcResult.feedback || MISS_HONEY_FEEDBACK.poor;
    const newValue = Math.max(0, Math.min(100, trustValue + trustCalcResult.totalTrust));
    const newTrustLevel = useStoryStore.getState().trustLevel;
    
    setTrustResult({
      change: trustCalcResult.totalTrust,
      feedback,
      newValue,
      isLevelUp: newTrustLevel !== oldLevel
    });
  }, [completeLevel, unlockAchievement, endGame, trustValue, trustLevel, getLevelReplayStats]);

  // 退出游戏
  const handleExit = useCallback(() => {
    setGameState('intro');
    endGame();
  }, [endGame]);

  // ========================================
  // 渲染：介绍页
  // ========================================
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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📚✨</div>
          <h1>{LEVEL_CONFIG.title} <span style={{ color: '#667eea' }}>v3.0</span></h1>
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

            <h3 className="mt-8 mb-4">🚀 v3.0 新特性</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>✅ 可滚动长文阅读（{CHAPTER1_ARTICLE_V3.wordCount} 词）</li>
              <li>✅ Fisher-Yates 随机抽题算法</li>
              <li>✅ 混合难度选项（简单/中等/困难）</li>
              <li>✅ 加权评分系统</li>
              <li>✅ 阅读进度追踪</li>
            </ul>

            <h3 className="mt-8 mb-4">📝 测评内容</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>📖 阅读理解（长文阅读，随机抽题）</li>
              <li>⏱️ 预计阅读时间：{CHAPTER1_ARTICLE_V3.estimatedReadingTime} 分钟</li>
              <li>📊 及格分数：70分</li>
            </ul>
          </div>

          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startPlaying}
            style={{ fontSize: '1.3rem', padding: '16px 48px' }}
          >
            开始测评 v3.0
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ========================================
  // 渲染：游戏进行中 - 使用 ReadingGameV3
  // ========================================
  if (gameState === 'playing') {
    return (
      <ReadingGameV3
        articleTitle={CHAPTER1_ARTICLE_V3.title}
        articleSource={`选自 Chapter ${CHAPTER1_ARTICLE_V3.chapterNumber}: ${CHAPTER1_ARTICLE_V3.chapterTitle}`}
        articleContent={CHAPTER1_ARTICLE_V3.content}
        wordCount={CHAPTER1_ARTICLE_V3.wordCount}
        questions={CHAPTER1_QUESTIONS_V3}
        articleId={CHAPTER1_ARTICLE_V3.id}
        questionsPerSession={10}
        enableRandomPick={true}
        enableCache={true}
        onComplete={handleComplete}
        onExit={handleExit}
      />
    );
  }

  // ========================================
  // 渲染：结果页
  // ========================================
  if (gameState === 'completed' && gameResult) {
    const passed = gameResult.accuracy >= 70;
    
    return (
      <div className="game-container">
        <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
          ← 返回关卡选择
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-8"
        >
          <div style={{ fontSize: '5rem', marginBottom: '16px' }}>
            {passed ? '🎉' : '📝'}
          </div>
          <h1>{passed ? '恭喜通关！' : '测评完成'}</h1>
          <p style={{ color: passed ? '#2a9d8f' : '#e76f51', marginTop: '8px', fontSize: '1.2rem' }}>
            {passed ? '你成功完成了 L1 v3.0 测评！' : '继续加油，下次一定能通过！'}
          </p>

          <div className="card mt-8" style={{ maxWidth: '500px', margin: '32px auto' }}>
            <h3 className="mb-6">📊 成绩详情</h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span>正确率</span>
                <span style={{ color: gameResult.accuracy >= 70 ? '#2a9d8f' : '#e76f51' }}>
                  {gameResult.accuracy}%
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span>答对题数</span>
                <span>{gameResult.correctCount}/{gameResult.totalQuestions}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <span>总得分</span>
                <span>{gameResult.totalScore}</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px',
                background: passed ? '#d4edda' : '#f8d7da',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                <span>最终成绩</span>
                <span style={{ color: passed ? '#28a745' : '#dc3545' }}>
                  {gameResult.accuracy}分
                </span>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#e7f5ff', borderRadius: '8px' }}>
              <strong>💡 学习建议：</strong>
              <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8', textAlign: 'left' }}>
                {!passed && (
                  <li>阅读理解需要加强，建议多读原著，注意细节</li>
                )}
                {passed && gameResult.accuracy >= 90 && (
                  <li>表现优异！可以尝试挑战更高难度的关卡</li>
                )}
                {passed && gameResult.accuracy < 90 && (
                  <li>表现不错！继续保持，争取下次满分</li>
                )}
              </ul>
            </div>

            {/* 蜜糖老师好感度反馈 */}
            {trustResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  marginTop: '24px',
                  padding: '20px',
                  background: `linear-gradient(135deg, ${trustResult.feedback.color}20 0%, ${trustResult.feedback.color}10 100%)`,
                  borderRadius: '12px',
                  border: `2px solid ${trustResult.feedback.color}`,
                  textAlign: 'left'
                }}
              >
                {/* 蜜糖老师反馈 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{trustResult.feedback.emoji}</span>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>👩‍🏫 蜜糖老师说</p>
                    <p style={{ fontSize: '1.1rem', color: trustResult.feedback.color, fontWeight: 'bold', margin: '4px 0 0' }}>
                      {trustResult.feedback.message}
                    </p>
                  </div>
                </div>

                {/* 好感度变化 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '8px'
                }}>
                  <div>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>💝 蜜糖老师好感度</span>
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold',
                        color: trustResult.change >= 0 ? '#4CAF50' : '#F44336'
                      }}>
                        {trustResult.change >= 0 ? '+' : ''}{trustResult.change}
                      </span>
                      <span style={{ color: '#888', marginLeft: '8px' }}>
                        ({trustValue} → {trustResult.newValue})
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>当前等级</span>
                    <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: trustResult.feedback.color }}>
                      {getTrustLevelName()}
                    </p>
                  </div>
                </div>

                {/* 升级提示 */}
                {trustResult.isLevelUp && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: '#9C27B0',
                      borderRadius: '8px',
                      textAlign: 'center',
                      color: '#fff'
                    }}
                  >
                    🎉 恭喜升级！和蜜糖老师的关系更近一步！
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            <Link to="/levels">
              <motion.button
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                返回关卡
              </motion.button>
            </Link>
            {!passed && (
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startPlaying}
              >
                重新挑战
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

export default LevelL1;
