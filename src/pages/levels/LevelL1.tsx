import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore, useGameStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase, ExamType } from '../../types';
import { 
  READING_QUESTIONS, 
  GRAMMAR_QUESTIONS, 
  getRandomQuestions,
  getReadingPassage
} from '../../data/questions';

// Get L1 config - fallback to first level if not found
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

// L1 重点词汇列表（从配置中提取）
const L1_VOCABULARY = LEVEL_CONFIG.learningFlow
  .find(f => f.phase === LearningPhase.SITUATION_INPUT)?.situationInput?.vocabulary || [];

// L1 重点时态
const L1_TENSES = ['一般现在时', '现在进行时', '现在完成时'];
const L1_TENSE_KEYS = ['tense-present-simple', 'tense-present-continuous', 'tense-present-perfect'];

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
  const { completeLevel } = useLevelStore();
  const { unlockAchievement } = useAchievementStore();
  const { startGame, endGame } = useGameStore();

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
    // 随机选择5道阅读理解题（难度1-2级）
    const allReading = READING_QUESTIONS.filter(q => 
      q.difficulty! <= 2 && q.examTypes?.includes(ExamType.ZHONGKAO)
    );
    const randomReading = getRandomQuestions(5) || allReading.slice(0, 5);
    
    // 使用固定的阅读短文（PRD v3.2：文章固定显示在题目上方）
    setReadingPassage(getReadingPassage());
    
    setReadingQuestions(randomReading.map(q => ({
      id: q.id,
      type: q.type,
      stem: q.stem,
      options: q.options || [],
      correctAnswer: String(q.correctAnswer),
      explanation: q.explanation,
      chineseExplanation: q.chineseExplanation,
      relatedWords: q.relatedWords,
      relatedGrammar: q.relatedGrammar
    })));

    // 随机选择5道语法/时态题
    const allGrammar = GRAMMAR_QUESTIONS.filter(q => 
      q.difficulty! <= 2
    );
    const randomGrammar = getRandomQuestions(5) || allGrammar.slice(0, 5);
    
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
    
    completeLevel('L1', finalScore);
    
    // 解锁成就
    if (finalScore >= 90) {
      unlockAchievement('perfect_score');
    }
    if (finalScore >= 70) {
      unlockAchievement('assessment_pass');
    }
  };

  // 获取时态掌握度统计
  const getTenseMastery = () => {
    const tenseCounts: Record<string, { correct: number; total: number }> = {};
    
    // 统计阅读题中的时态
    readingQuestions.forEach(q => {
      if (q.relatedGrammar) {
        q.relatedGrammar.forEach((g: string) => {
          if (!tenseCounts[g]) tenseCounts[g] = { correct: 0, total: 0 };
          tenseCounts[g].total += 1;
          if (q.isCorrect) tenseCounts[g].correct += 1;
        });
      }
    });
    
    // 统计语法题中的时态
    grammarQuestions.forEach(q => {
      if (q.relatedGrammar) {
        q.relatedGrammar.forEach((g: string) => {
          if (!tenseCounts[g]) tenseCounts[g] = { correct: 0, total: 0 };
          tenseCounts[g].total += 1;
          if (q.isCorrect) tenseCounts[g].correct += 1;
        });
      }
    });
    
    return tenseCounts;
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
              <li>✅ 时态辨析题（5道语法选择题）</li>
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
              {readingPassage}
              {(readingPassage.includes('Dear') || readingPassage.includes('— Tom')) && (
                <div style={{ marginTop: '12px', fontStyle: 'italic', color: '#6c757d' }}>
                  — Tom
                </div>
              )}
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
                {/* 显示完整题干（移除【阅读短文】和短文内容，只显示问题部分） */}
                {currentQ?.stem?.replace(/^【阅读短文】\s*[\s\S]*?^【/m, '【')?.replace(/^【阅读短文】\s*[\s\S]*?(?=What|Why|How|Which)/, '').trim() || 
                  currentQ?.stem?.split('\n').find(l => l.startsWith('【')) || 
                  '请回答以下问题'}
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
  // 渲染：语法/时态辨析
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
            style={{ 
              width: `${50 + ((currentGrammarIndex + 1) / grammarQuestions.length) * 50}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
            }}
          />
        </div>

        <div className="text-center mb-2" style={{ color: '#888' }}>
          时态辨析题 · 第 {currentGrammarIndex + 1}/{grammarQuestions.length} 题
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}
          >
            {/* 时态标签 */}
            <div style={{ marginBottom: '16px' }}>
              {currentQ?.relatedGrammar?.map((g: string) => (
                <span key={g} style={{
                  background: g.includes('present-simple') ? '#e7f5ff' :
                             g.includes('present-continuous') ? '#fff3bf' :
                             g.includes('present-perfect') ? '#f3d9fa' : '#f1f3f5',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  marginRight: '8px',
                  fontSize: '0.85rem',
                  color: '#495057'
                }}>
                  {g.includes('present-simple') ? '⏰ 一般现在时' :
                   g.includes('present-continuous') ? '🔄 现在进行时' :
                   g.includes('present-perfect') ? '✨ 现在完成时' : '📝 语法'}
                </span>
              ))}
            </div>

            {/* 题目 */}
            <div style={{ 
              fontSize: '1.4rem', 
              fontWeight: '500',
              marginBottom: '24px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              {currentQ?.stem}
            </div>
            
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
                      padding: '16px 20px',
                      borderRadius: '8px',
                      border: `2px solid ${borderColor}`,
                      background: bgColor,
                      textAlign: 'left',
                      cursor: showExplanation ? 'default' : 'pointer',
                      fontSize: '1.1rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* 解析 */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  background: currentQ?.isCorrect ? '#e7f5ff' : '#fff5f5',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '20px'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {currentQ?.isCorrect ? '✅ 回答正确！' : '❌ 回答错误'}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>语法点：</strong>{currentQ?.chineseExplanation || currentQ?.explanation}
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
  const finalScore = Math.round((correctCount / totalQuestions) * 100);
  const passed = finalScore >= 70;
  const tenseMastery = getTenseMastery();

  return (
    <div className="game-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>
          {passed ? '🎉' : '💪'}
        </div>
        <h1>{passed ? '测评通过！' : '继续加油！'}</h1>
        
        {/* 得分卡片 */}
        <div className="card mt-8" style={{ maxWidth: '500px', margin: '24px auto', textAlign: 'left' }}>
          <div className="flex justify-between items-center mb-4" style={{ paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
            <span style={{ fontSize: '1.2rem' }}>总得分</span>
            <span style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              color: passed ? '#40c057' : '#fa5252'
            }}>
              {finalScore}分
            </span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#6366f1', marginBottom: '4px' }}>
                📖 {readingScore}/{readingQuestions.length}
              </div>
              <div style={{ color: '#666' }}>阅读理解</div>
            </div>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '16px', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '4px' }}>
                ⏰ {grammarScore}/{grammarQuestions.length}
              </div>
              <div style={{ color: '#666' }}>时态辨析</div>
            </div>
          </div>
        </div>

        {/* 时态掌握度 */}
        <div className="card mt-4" style={{ maxWidth: '500px', margin: '24px auto', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '16px' }}>📊 时态掌握度</h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {L1_TENSE_KEYS.map((tense, idx) => {
              const stats = tenseMastery[tense] || { correct: 0, total: 0 };
              const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              const tenseName = L1_TENSES[idx];
              
              let color = '#dee2e6';
              if (percentage >= 80) color = '#40c057';
              else if (percentage >= 60) color = '#fab005';
              else if (percentage > 0) color = '#fa5252';
              
              return (
                <div key={tense}>
                  <div className="flex justify-between mb-1">
                    <span>{tenseName}</span>
                    <span style={{ color }}>{percentage}%</span>
                  </div>
                  <div style={{ 
                    background: '#f1f3f5', 
                    height: '8px', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: color,
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 本关词汇 */}
        <div className="card mt-4" style={{ maxWidth: '500px', margin: '24px auto', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '16px' }}>📚 本关掌握词汇 ({L1_VOCABULARY.length}个)</h3>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            maxHeight: '150px',
            overflowY: 'auto'
          }}>
            {L1_VOCABULARY.slice(0, 30).map((word: string, idx: number) => (
              <span key={idx} style={{
                background: '#e7f5ff',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.85rem',
                color: '#495057'
              }}>
                {word}
              </span>
            ))}
            {L1_VOCABULARY.length > 30 && (
              <span style={{ color: '#888', fontSize: '0.85rem' }}>
                +{L1_VOCABULARY.length - 30} 更多...
              </span>
            )}
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
            再测一次
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentGame;
