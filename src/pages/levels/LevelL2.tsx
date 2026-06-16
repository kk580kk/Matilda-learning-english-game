import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore, useGameStore, useStoryStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase, ExamType } from '../../types';
import { 
  GRAMMAR_QUESTIONS, 
  getQuestionsByChapter
} from '../../data/questions';
import { MISS_HONEY_FEEDBACK } from '../../data/trustConfig';

// Get L2 config - fallback to second level if not found
const LEVEL_CONFIG = getLevelConfig('L2') || LEVEL_CONFIGS[1];

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

interface QuizQuestion {
  id: string;
  type: string;
  stem: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  chineseExplanation?: string;
  relatedWords?: string[];
  relatedGrammar?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

const AssessmentGame = () => {
  const { completeLevel: completeLevelStore } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();
  const { startGame, endGame } = useGameStore();
  const { 
    trustValue, 
    trustLevel, 
    getTrustLevelName, 
    completeLevel: completeStoryLevel
  } = useStoryStore();

  // 蜜糖老师反馈状态
  const [trustResult, setTrustResult] = useState<{
    change: number;
    feedback: any;
    newValue: number;
    isLevelUp: boolean;
  } | null>(null);

  const [gameState, setGameState] = useState<'intro' | 'reading' | 'grammar' | 'results'>('intro');
  const [readingQuestions, setReadingQuestions] = useState<QuizQuestion[]>([]);
  const [grammarQuestions, setGrammarQuestions] = useState<QuizQuestion[]>([]);
  const [currentReadingIndex, setCurrentReadingIndex] = useState(0);
  const [currentGrammarIndex, setCurrentGrammarIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10分钟
  const [score, setScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);
  const [readingPassage, setReadingPassage] = useState('');

  // 初始化题目
  const initQuestions = useCallback(() => {
    // PRD v3.2: L2 使用 Chapter 4-5 的原著阅读题（难度2-3级）
    const chapter4Questions = getQuestionsByChapter(4);
    const chapter5Questions = getQuestionsByChapter(5);
    const allChapterQuestions = [...chapter4Questions, ...chapter5Questions];
    
    // 筛选难度2-3的题目，随机选5道
    const level2to3Questions = allChapterQuestions.filter(q => 
      q.difficulty! >= 2 && q.difficulty! <= 3 && q.examTypes?.includes(ExamType.ZHONGKAO)
    );
    const shuffled = [...level2to3Questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 5);
    
    // 使用 Chapter 4 第一段作为阅读短文（原著原文）
    const passage = "There was comparative calm in the Wormwood household for about a week after the Superglue episode. The experience had clearly chastened Mr Wormwood and he seemed temporarily to have lost his taste for boasting and bullying. Then suddenly he struck again. Perhaps he had had a bad day at the garage and had not sold enough crummy second-hand cars. There are many things that make a man irritable when he arrives home from work in the evening and a sensible wife will usually notice the storm-signals and will leave him alone until he simmers down.";
    setReadingPassage(passage);
    
    // 转换题目格式（移除题干中的原文，只保留问题部分）
    setReadingQuestions(selectedQuestions.map(q => {
      // 从 stem 中提取问题部分（去掉原文）
      const stemLines = q.stem.split('\n');
      const questionLine = stemLines.find(l => l.startsWith('【')) || '请回答以下问题';
      
      return {
        id: q.id,
        type: q.type,
        stem: questionLine,
        options: q.options || [],
        correctAnswer: String(q.correctAnswer),
        explanation: q.explanation,
        chineseExplanation: q.chineseExplanation,
        relatedWords: q.relatedWords,
        relatedGrammar: q.relatedGrammar
      };
    }));

    // 随机选择5道语法/时态题
    const allGrammar = GRAMMAR_QUESTIONS.filter(q => 
      q.difficulty! >= 2 && q.difficulty! <= 3
    );
    const randomGrammar = allGrammar.slice(0, 5).sort(() => Math.random() - 0.5);
    
    setGrammarQuestions(randomGrammar.map(q => ({
      id: q.id,
      type: q.type,
      stem: q.stem.includes('___') ? q.stem : `请选择正确的时态形式：\n${q.stem}`,
      options: q.options || [],
      correctAnswer: String(q.correctAnswer),
      explanation: q.explanation,
      chineseExplanation: q.chineseExplanation,
      relatedWords: q.relatedWords,
      relatedGrammar: q.relatedGrammar
    })));

    setCurrentReadingIndex(0);
    setCurrentGrammarIndex(0);
    setScore(0);
    setReadingScore(0);
    setGrammarScore(0);
    setShowExplanation(false);
    setTimeLeft(600);
  }, []);

  // 计时器
  useEffect(() => {
    if (gameState === 'reading' || gameState === 'grammar') {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // 时间到，计算最终成绩
        handleFinish();
      }
    }
  }, [timeLeft, gameState]);

  const startPlaying = () => {
    initQuestions();
    setGameState('reading');
    startGame();
  };

  // 处理阅读理解答题
  const handleReadingAnswer = (answer: string) => {
    const currentQ = readingQuestions[currentReadingIndex];
    const isCorrect = answer === currentQ.correctAnswer;
    
    const updatedQuestions = [...readingQuestions];
    updatedQuestions[currentReadingIndex] = {
      ...currentQ,
      userAnswer: answer,
      isCorrect
    };
    setReadingQuestions(updatedQuestions);
    
    if (isCorrect) {
      setReadingScore(s => s + 1);
      setScore(s => s + 10);
    }
    
    setShowExplanation(true);
  };

  // 处理语法/时态答题
  const handleGrammarAnswer = (answer: string) => {
    const currentQ = grammarQuestions[currentGrammarIndex];
    const isCorrect = answer === currentQ.correctAnswer;
    
    const updatedQuestions = [...grammarQuestions];
    updatedQuestions[currentGrammarIndex] = {
      ...currentQ,
      userAnswer: answer,
      isCorrect
    };
    setGrammarQuestions(updatedQuestions);
    
    if (isCorrect) {
      setGrammarScore(s => s + 1);
      setScore(s => s + 10);
    }
    
    setShowExplanation(true);
  };

  // 下一题
  const handleNextQuestion = () => {
    setShowExplanation(false);
    
    if (gameState === 'reading') {
      if (currentReadingIndex < readingQuestions.length - 1) {
        setCurrentReadingIndex(i => i + 1);
      } else {
        // 阅读完成，进入语法
        setCurrentReadingIndex(0);
        setGameState('grammar');
      }
    } else if (gameState === 'grammar') {
      if (currentGrammarIndex < grammarQuestions.length - 1) {
        setCurrentGrammarIndex(i => i + 1);
      } else {
        // 全部完成
        handleFinish();
      }
    }
  };

  // 完成测评
  const handleFinish = () => {
    setGameState('results');
    endGame();
    
    const totalQuestions = readingQuestions.length + grammarQuestions.length;
    const correctCount = readingScore + grammarScore;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const accuracy = correctCount / totalQuestions;
    
    completeLevelStore('L2', finalScore);
    
    // 使用 storyStore 的 completeLevel 来正确更新好感度和 replayStats
    const trustCalcResult = completeStoryLevel('L2', accuracy);

    // 解锁成就
    if (finalScore >= 90) {
      unlockAchievement('perfect_score');
    }
    if (finalScore >= 70) {
      unlockAchievement('assessment_pass');
    }

    // 设置反馈显示
    const oldLevel = trustLevel;
    const feedback = trustCalcResult.feedback || MISS_HONEY_FEEDBACK.poor;
    const newValue = Math.max(0, Math.min(100, trustValue + trustCalcResult.totalTrust));
    const newTrustLevel = useStoryStore.getState().trustLevel;
    
    setTrustResult({
      change: trustCalcResult.totalTrust,
      feedback,
      newValue,
      isLevelUp: newTrustLevel !== oldLevel
    });
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📚✍️</div>
          <h1>{LEVEL_CONFIG.title}</h1>
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
            
            <h3 className="mt-8 mb-4">📝 测评内容</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>✅ 阅读理解（1篇短文 + 5道选择题）</li>
              <li>✅ 定语从句语法题（5道选择题）</li>
              <li>⏱️ 答题时间：10分钟</li>
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
            开始测评
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ========================================
  // 渲染：阅读理解
  // ========================================
  if (gameState === 'reading') {
    const currentQ = readingQuestions[currentReadingIndex];
    
    return (
      <div className="game-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
            ← 退出
          </Link>
          <div className="flex gap-4">
            <span style={{ color: timeLeft < 60 ? '#e76f51' : '#f4a261' }}>
              ⏱️ {formatTime(timeLeft)}
            </span>
            <span style={{ color: '#2a9d8f' }}>🏆 {score}分</span>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentReadingIndex + 1) / readingQuestions.length) * 50}%` }}
          />
        </div>

        <div className="text-center mb-2" style={{ color: '#888' }}>
          阅读理解 · 第 {currentReadingIndex + 1}/{readingQuestions.length} 题
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
          >
            {/* 短文阅读区域 */}
            <div style={{ 
              background: '#ffffff', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '20px',
              maxHeight: '200px',
              overflowY: 'auto',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
              fontSize: '1rem',
              color: '#1a1a1a',
              border: '2px solid #e9ecef'
            }}>
              <h4 style={{ marginBottom: '12px', color: '#212529', fontWeight: 'bold' }}>📖 阅读短文</h4>
              <div style={{ fontStyle: 'italic', color: '#6c757d', marginBottom: '8px', fontSize: '0.9rem' }}>
                选自 Chapter 4: The Ghost
              </div>
              {readingPassage}
            </div>

            {/* 题目 */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>
                <span style={{ 
                  background: '#6366f1', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  marginRight: '8px',
                  fontSize: '0.9rem'
                }}>
                  {currentReadingIndex + 1}
                </span>
                {currentQ?.stem}
              </h4>
              
              {/* 选项 */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {currentQ?.options?.map((option, idx) => {
                  const isSelected = currentQ.userAnswer === option.charAt(0);
                  const isCorrectAnswer = option.charAt(0) === currentQ.correctAnswer;
                  const showResult = showExplanation;
                  
                  let bgColor = '#f1f3f5';
                  let borderColor = '#dee2e6';
                  
                  if (showResult) {
                    if (isCorrectAnswer) {
                      bgColor = '#d3f9d8';
                      borderColor = '#40c057';
                    } else if (isSelected) {
                      bgColor = '#ffe3e3';
                      borderColor = '#fa5252';
                    }
                  } else if (isSelected) {
                    bgColor = '#e7f5ff';
                    borderColor = '#4dabf7';
                  }
                  
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showExplanation ? { scale: 1.01 } : {}}
                      whileTap={!showExplanation ? { scale: 0.99 } : {}}
                      onClick={() => !showExplanation && handleReadingAnswer(option.charAt(0))}
                      disabled={showExplanation}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${borderColor}`,
                        background: bgColor,
                        textAlign: 'left',
                        cursor: showExplanation ? 'default' : 'pointer',
                        fontSize: '1rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 解析 */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  background: currentQ?.isCorrect ? '#d4edda' : '#f8d7da',
                  border: currentQ?.isCorrect ? '2px solid #28a745' : '2px solid #dc3545',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '16px',
                  color: '#1a1a1a'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                  {currentQ?.isCorrect ? '✅ 回答正确！' : '❌ 回答错误，正确答案是 ' + currentQ?.correctAnswer}
                </div>
                <div style={{ marginBottom: '12px', fontSize: '1rem' }}>
                  <strong>📝 解析：</strong>{currentQ?.chineseExplanation || currentQ?.explanation}
                </div>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  style={{ marginTop: '12px' }}
                >
                  {currentReadingIndex < readingQuestions.length - 1 ? '下一题 →' : '进入语法题 →'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ========================================
  // 渲染：语法题
  // ========================================
  if (gameState === 'grammar') {
    const currentQ = grammarQuestions[currentGrammarIndex];
    
    return (
      <div className="game-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/levels" style={{ color: '#9b7fc9', textDecoration: 'none' }}>
            ← 退出
          </Link>
          <div className="flex gap-4">
            <span style={{ color: timeLeft < 60 ? '#e76f51' : '#f4a261' }}>
              ⏱️ {formatTime(timeLeft)}
            </span>
            <span style={{ color: '#2a9d8f' }}>🏆 {score}分</span>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${50 + ((currentGrammarIndex + 1) / grammarQuestions.length) * 50}%` }}
          />
        </div>

        <div className="text-center mb-2" style={{ color: '#888' }}>
          定语从句语法 · 第 {currentGrammarIndex + 1}/{grammarQuestions.length} 题
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
          >
            {/* 题目 */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>
                <span style={{ 
                  background: '#e76f51', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  marginRight: '8px',
                  fontSize: '0.9rem'
                }}>
                  {currentGrammarIndex + 1}
                </span>
                {currentQ?.stem?.split('\n').map((line, i) => (
                  <div key={i} style={{ 
                    fontFamily: line.includes('___') ? 'monospace' : 'inherit',
                    background: line.includes('___') ? '#f8f9fa' : 'transparent',
                    padding: line.includes('___') ? '12px' : '0',
                    borderRadius: line.includes('___') ? '4px' : '0',
                    marginTop: line.includes('___') ? '8px' : '0',
                    fontSize: line.includes('___') ? '1.1rem' : 'inherit'
                  }}>
                    {line}
                  </div>
                ))}
              </h4>
              
              {/* 选项 */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {currentQ?.options?.map((option, idx) => {
                  const isSelected = currentQ.userAnswer === option.charAt(0);
                  const isCorrectAnswer = option.charAt(0) === currentQ.correctAnswer;
                  const showResult = showExplanation;
                  
                  let bgColor = '#f1f3f5';
                  let borderColor = '#dee2e6';
                  
                  if (showResult) {
                    if (isCorrectAnswer) {
                      bgColor = '#d3f9d8';
                      borderColor = '#40c057';
                    } else if (isSelected) {
                      bgColor = '#ffe3e3';
                      borderColor = '#fa5252';
                    }
                  } else if (isSelected) {
                    bgColor = '#e7f5ff';
                    borderColor = '#4dabf7';
                  }
                  
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!showExplanation ? { scale: 1.01 } : {}}
                      whileTap={!showExplanation ? { scale: 0.99 } : {}}
                      onClick={() => !showExplanation && handleGrammarAnswer(option.charAt(0))}
                      disabled={showExplanation}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${borderColor}`,
                        background: bgColor,
                        textAlign: 'left',
                        cursor: showExplanation ? 'default' : 'pointer',
                        fontSize: '1rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 解析 */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  background: currentQ?.isCorrect ? '#d4edda' : '#f8d7da',
                  border: currentQ?.isCorrect ? '2px solid #28a745' : '2px solid #dc3545',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '16px',
                  color: '#1a1a1a'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                  {currentQ?.isCorrect ? '✅ 回答正确！' : '❌ 回答错误，正确答案是 ' + currentQ?.correctAnswer}
                </div>
                <div style={{ marginBottom: '12px', fontSize: '1rem' }}>
                  <strong>📝 解析：</strong>{currentQ?.chineseExplanation || currentQ?.explanation}
                </div>
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  style={{ marginTop: '12px' }}
                >
                  {currentGrammarIndex < grammarQuestions.length - 1 ? '下一题 →' : '查看结果 →'}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ========================================
  // 渲染：结果页
  // ========================================
  const totalQuestions = readingQuestions.length + grammarQuestions.length;
  const correctCount = readingScore + grammarScore;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = accuracy >= 70;

  return (
    <div className="game-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>
          {passed ? '🎉' : '📝'}
        </div>
        <h1>{passed ? '恭喜通过！' : '继续加油！'}</h1>
        
        <div className="card mt-8" style={{ maxWidth: '400px', margin: '24px auto' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: passed ? '#2a9d8f' : '#e76f51' }}>
            {accuracy}分
          </div>
          <p style={{ marginTop: '8px', color: '#888' }}>
            正确率：{correctCount}/{totalQuestions} 题
          </p>
          
          <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>阅读理解：</span>
              <span style={{ color: '#2a9d8f' }}>{readingScore}/{readingQuestions.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>定语从句：</span>
              <span style={{ color: '#2a9d8f' }}>{grammarScore}/{grammarQuestions.length}</span>
            </div>
          </div>
          
          {!passed && (
            <p style={{ marginTop: '16px', color: '#e76f51' }}>
              需要 70 分才能通过，再试一次吧！
            </p>
          )}

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

        <div className="flex gap-4 justify-center">
          {!passed && (
            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startPlaying}
            >
              重新测评
            </motion.button>
          )}
          
          <Link to="/levels">
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {passed ? '返回关卡选择' : '返回关卡选择'}
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentGame;
