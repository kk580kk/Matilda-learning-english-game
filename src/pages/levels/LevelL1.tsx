import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLevelStore, useAchievementStore, useGameStore } from '../../store';
import { getLevelConfig, LEVEL_CONFIGS } from '../../data/levels/config';
import { LearningPhase } from '../../types';
import { GRAMMAR_QUESTIONS } from '../../data/questions';
import { 
  CHAPTER1_PASSAGES, 
  getQuestionsByPassageId
} from '../../data/questions/reading/chapter1';

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

  // 游戏状态
  const [gameState, setGameState] = useState<'intro' | 'reading' | 'grammar' | 'results'>('intro');
  
  // 阅读理解状态 - 文章和题目分组
  const [passageGroups, setPassageGroups] = useState<any[]>([]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // 语法题状态
  const [grammarQuestions, setGrammarQuestions] = useState<QuizQuestion[]>([]);
  const [currentGrammarIndex, setCurrentGrammarIndex] = useState(0);
  
  // 通用状态
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);

  // 初始化题目 - PRD v3.2: 使用 Chapter 1 的段落和题目绑定结构
  const initQuestions = useCallback(() => {
    // 获取 Chapter 1 的所有段落组（文章+题目）
    // L1 使用难度 1-2 的段落（段落1和段落2）
    const allGroups = CHAPTER1_PASSAGES.map(passage => ({
      passage,
      questions: getQuestionsByPassageId(passage.id)
    }));
    
    // 筛选难度 1-2 的段落（段落1难度1，段落2难度2）
    const level1to2Groups = allGroups.filter(group => group.passage.difficulty <= 2);
    
    // 转换题目格式
    const formattedGroups = level1to2Groups.map(group => ({
      passage: group.passage,
      questions: group.questions.map(q => {
        // 从 stem 中提取问题部分（去掉原文，保留题型标签和问题）
        // stem 格式: 【阅读短文...】\n原文\n\n【题型】问题
        const lines = q.stem.split('\n');
        // 找到最后一个以【开头的行（题型+问题）
        const questionLines = lines.filter(l => l.startsWith('【'));
        const lastQuestionLine = questionLines[questionLines.length - 1] || '请回答以下问题';
        
        return {
          id: q.id,
          type: q.type,
          stem: lastQuestionLine,
          options: q.options || [],
          correctAnswer: String(q.correctAnswer),
          explanation: q.explanation,
          chineseExplanation: q.chineseExplanation,
          relatedWords: q.relatedWords,
          relatedGrammar: q.relatedGrammar
        };
      })
    }));
    
    setPassageGroups(formattedGroups);

    // 随机选择5道语法/时态题
    const allGrammar = GRAMMAR_QUESTIONS.filter(q => q.difficulty! <= 2);
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

    // 重置状态
    setCurrentPassageIndex(0);
    setCurrentQuestionIndex(0);
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
        handleFinish();
      }
    }
  }, [timeLeft, gameState]);

  const startPlaying = () => {
    initQuestions();
    setGameState('reading');
    startGame();
  };

  // 获取当前文章和题目
  const getCurrentPassageGroup = () => {
    return passageGroups[currentPassageIndex];
  };

  const getCurrentReadingQuestion = () => {
    const group = getCurrentPassageGroup();
    if (!group) return null;
    return group.questions[currentQuestionIndex];
  };

  // 处理阅读理解答题
  const handleReadingAnswer = (answer: string) => {
    const currentQ = getCurrentReadingQuestion();
    if (!currentQ) return;
    
    const isCorrect = answer === currentQ.correctAnswer;
    
    // 更新当前题目状态
    const updatedGroups = [...passageGroups];
    updatedGroups[currentPassageIndex].questions[currentQuestionIndex] = {
      ...currentQ,
      userAnswer: answer,
      isCorrect
    };
    setPassageGroups(updatedGroups);
    
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
      const currentGroup = getCurrentPassageGroup();
      if (!currentGroup) return;
      
      // 检查当前文章是否还有下一题
      if (currentQuestionIndex < currentGroup.questions.length - 1) {
        // 同一文章，下一题
        setCurrentQuestionIndex(i => i + 1);
      } else {
        // 当前文章的所有题目已完成，切换到下一篇文章
        if (currentPassageIndex < passageGroups.length - 1) {
          setCurrentPassageIndex(i => i + 1);
          setCurrentQuestionIndex(0);
        } else {
          // 所有阅读文章完成，进入语法部分
          setCurrentPassageIndex(0);
          setCurrentQuestionIndex(0);
          setGameState('grammar');
        }
      }
    } else if (gameState === 'grammar') {
      if (currentGrammarIndex < grammarQuestions.length - 1) {
        setCurrentGrammarIndex(i => i + 1);
      } else {
        handleFinish();
      }
    }
  };

  // 完成测评
  const handleFinish = () => {
    setGameState('results');
    endGame();
    
    const totalQuestions = passageGroups.reduce((sum, g) => sum + g.questions.length, 0) + grammarQuestions.length;
    const correctCount = readingScore + grammarScore;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    
    completeLevel('L1', finalScore);
    
    if (finalScore >= 90) {
      unlockAchievement('perfect_score');
    }
    if (finalScore >= 70) {
      unlockAchievement('assessment_pass');
    }
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 获取总阅读题数
  const getTotalReadingQuestions = () => {
    return passageGroups.reduce((sum, g) => sum + g.questions.length, 0);
  };

  // 获取当前阅读进度（从1开始计数）
  const getCurrentReadingProgress = () => {
    let prevQuestions = 0;
    for (let i = 0; i < currentPassageIndex; i++) {
      prevQuestions += passageGroups[i]?.questions.length || 0;
    }
    return prevQuestions + currentQuestionIndex + 1;
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
              <li>✅ 阅读理解（2篇短文，每篇3-4题，共7题）</li>
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
  // 渲染：阅读理解 - 单页显示所有题目
  // ========================================
  if (gameState === 'reading') {
    const currentGroup = getCurrentPassageGroup();
    
    if (!currentGroup) {
      return <div>加载中...</div>;
    }
    
    const totalReading = getTotalReadingQuestions();
    const currentProgress = getCurrentReadingProgress();
    
    // 检查当前文章的所有题目是否已完成
    const allQuestionsAnswered = currentGroup.questions.every((q: QuizQuestion) => q.userAnswer !== undefined);
    
    return (
      <div className="game-container" style={{ maxWidth: '100%', padding: '20px' }}>
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
            style={{ width: `${(currentProgress / totalReading) * 50}%` }}
          />
        </div>

        <div className="text-center mb-4" style={{ color: '#888' }}>
          阅读理解 · 文章 {currentPassageIndex + 1}/{passageGroups.length} · 共 {currentGroup.questions.length} 题
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            textAlign: 'left',
            width: '100%'
          }}
        >
          {/* 短文阅读区域 - 增大尺寸，移除滚动 */}
          <div style={{ 
            background: '#ffffff', 
            padding: '28px', 
            borderRadius: '12px',
            marginBottom: '28px',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.9',
            fontSize: '1.1rem',
            color: '#1a1a1a',
            border: '2px solid #e9ecef',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ marginBottom: '16px', color: '#212529', fontWeight: 'bold', fontSize: '1.3rem' }}>
              📖 阅读短文
            </h3>
            <div style={{ fontStyle: 'italic', color: '#6c757d', marginBottom: '12px', fontSize: '1rem' }}>
              选自 Chapter {currentGroup.passage.chapterNumber}: {currentGroup.passage.chapterTitle}
            </div>
            <div style={{ fontSize: '0.95rem', color: '#888', marginBottom: '16px' }}>
              {currentGroup.passage.titleZh} ({currentGroup.passage.wordCount}词)
            </div>
            <div style={{ 
              fontSize: '1.15rem', 
              lineHeight: '1.9',
              color: '#333'
            }}>
              {currentGroup.passage.text}
            </div>
          </div>

          {/* 所有题目 - 单页显示 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              marginBottom: '24px', 
              fontSize: '1.3rem', 
              color: '#ffffff', 
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              📝 阅读理解题目
            </h3>
            
            {currentGroup.questions.map((q: QuizQuestion, qIdx: number) => {
              const isAnswered = q.userAnswer !== undefined;
              
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.1 }}
                  style={{
                    marginBottom: '32px',
                    padding: '24px',
                    background: isAnswered ? (q.isCorrect ? '#f0fdf4' : '#fef2f2') : '#f8f9fa',
                    borderRadius: '12px',
                    border: isAnswered 
                      ? (q.isCorrect ? '2px solid #86efac' : '2px solid #fca5a5')
                      : '2px solid #e5e7eb'
                  }}
                >
                  {/* 题目编号和题干 */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ 
                      background: isAnswered 
                        ? (q.isCorrect ? '#22c55e' : '#ef4444')
                        : '#6366f1', 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: '6px',
                      marginRight: '12px',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      第 {qIdx + 1} 题
                    </span>
                    <span style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>
                      {q.stem}
                    </span>
                  </div>
                  
                  {/* 选项 */}
                  <div style={{ display: 'grid', gap: '12px', marginLeft: '8px' }}>
                    {q.options?.map((option: string, optIdx: number) => {
                      const isSelected = q.userAnswer === option.charAt(0);
                      const isCorrectAnswer = option.charAt(0) === q.correctAnswer;
                      
                      let bgColor = '#ffffff';
                      let borderColor = '#d1d5db';
                      
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          bgColor = '#dcfce7';
                          borderColor = '#22c55e';
                        } else if (isSelected) {
                          bgColor = '#fee2e2';
                          borderColor = '#ef4444';
                        }
                      } else if (isSelected) {
                        bgColor = '#dbeafe';
                        borderColor = '#3b82f6';
                      }
                      
                      return (
                        <motion.button
                          key={optIdx}
                          whileHover={!isAnswered ? { scale: 1.01 } : {}}
                          whileTap={!isAnswered ? { scale: 0.99 } : {}}
                          onClick={() => !isAnswered && handleReadingAnswer(option.charAt(0))}
                          disabled={isAnswered}
                          style={{
                            padding: '16px 20px',
                            borderRadius: '10px',
                            border: `2px solid ${borderColor}`,
                            background: bgColor,
                            textAlign: 'left',
                            cursor: isAnswered ? 'default' : 'pointer',
                            fontSize: '1.05rem',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isAnswered 
                              ? (isCorrectAnswer ? '#22c55e' : isSelected ? '#ef4444' : '#9ca3af')
                              : (isSelected ? '#3b82f6' : '#e5e7eb'),
                            color: 'white',
                            fontWeight: 'bold',
                            marginRight: '12px',
                            fontSize: '0.95rem'
                          }}>
                            {option.charAt(0)}
                          </span>
                          <span>{option.slice(2)}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* 解析 - 答题后显示 */}
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{
                        background: q.isCorrect ? '#d1fae5' : '#fee2e2',
                        border: q.isCorrect ? '1px solid #22c55e' : '1px solid #ef4444',
                        padding: '16px',
                        borderRadius: '8px',
                        marginTop: '16px',
                        color: '#1a1a1a'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '8px' }}>
                        {q.isCorrect ? '✅ 回答正确！' : `❌ 回答错误，正确答案是 ${q.correctAnswer}`}
                      </div>
                      <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                        <strong>📝 解析：</strong>{q.chineseExplanation || q.explanation}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 下一组按钮 - 所有题目答完后显示 */}
          {allQuestionsAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '32px',
                padding: '24px',
                background: '#f0f9ff',
                borderRadius: '12px',
                border: '2px solid #0ea5e9',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#0369a1' }}>
                ✅ 已完成本组所有题目！
              </div>
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextQuestion}
                style={{ fontSize: '1.1rem', padding: '16px 48px' }}
              >
                {currentPassageIndex < passageGroups.length - 1 
                  ? '下一组文章 →' 
                  : '进入语法部分 →'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // ========================================
  // 渲染：语法部分
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

        {/* Progress - 从50%开始（阅读占一半） */}
        <div className="progress-bar mb-4">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${50 + ((currentGrammarIndex + 1) / grammarQuestions.length) * 50}%` }}
          />
        </div>

        <div className="text-center mb-2" style={{ color: '#888' }}>
          语法填空 · 第 {currentGrammarIndex + 1}/{grammarQuestions.length} 题
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
            {/* 题目 */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '12px' }}>
                <span style={{ 
                  background: '#9b7fc9', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  marginRight: '8px',
                  fontSize: '0.9rem'
                }}>
                  {currentGrammarIndex + 1}
                </span>
                {currentQ?.stem?.includes('___') ? (
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}>
                    {currentQ?.stem?.split('___').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span style={{ 
                            display: 'inline-block', 
                            minWidth: '60px', 
                            borderBottom: '2px solid #9b7fc9',
                            margin: '0 4px',
                            textAlign: 'center'
                          }}>
                            &nbsp;
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                ) : (
                  currentQ?.stem
                )}
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
                {currentQ?.relatedGrammar && currentQ.relatedGrammar.length > 0 && (
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
                    <strong>📚 相关语法：</strong>{currentQ.relatedGrammar.join(', ')}
                  </div>
                )}
                <motion.button
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextQuestion}
                  style={{ marginTop: '8px' }}
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
  const totalReadingQuestions = getTotalReadingQuestions();
  const totalGrammarQuestions = grammarQuestions.length;
  const totalQuestions = totalReadingQuestions + totalGrammarQuestions;
  const correctReading = readingScore;
  const correctGrammar = grammarScore;
  const totalCorrect = correctReading + correctGrammar;
  const percentage = Math.round((totalCorrect / totalQuestions) * 100);
  const passed = percentage >= 70;

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
          {passed ? '你成功完成了 L1 测评！' : '继续加油，下次一定能通过！'}
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
              <span>阅读理解</span>
              <span style={{ color: correctReading >= totalReadingQuestions * 0.7 ? '#2a9d8f' : '#e76f51' }}>
                {correctReading}/{totalReadingQuestions} 正确
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '12px 16px',
              background: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span>语法填空</span>
              <span style={{ color: correctGrammar >= totalGrammarQuestions * 0.7 ? '#2a9d8f' : '#e76f51' }}>
                {correctGrammar}/{totalGrammarQuestions} 正确
              </span>
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
              <span>总分</span>
              <span style={{ color: passed ? '#28a745' : '#dc3545' }}>
                {percentage}分
              </span>
            </div>
          </div>
          
          <div style={{ marginTop: '24px', padding: '16px', background: '#e7f5ff', borderRadius: '8px' }}>
            <strong>💡 学习建议：</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8', textAlign: 'left' }}>
              {correctReading < totalReadingQuestions * 0.7 && (
                <li>阅读理解需要加强，建议多读原著，注意细节</li>
              )}
              {correctGrammar < totalGrammarQuestions * 0.7 && (
                <li>语法部分需要复习，建议重点练习时态辨析</li>
              )}
              {passed && percentage >= 90 && (
                <li>表现优异！可以尝试挑战更高难度的关卡</li>
              )}
              {passed && percentage < 90 && (
                <li>表现不错！继续保持，争取下次满分</li>
              )}
            </ul>
          </div>
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
};

export default AssessmentGame;
