import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../types';
import { QuestionV3 } from '../../types/v3';
import { ScrollableArticle } from './ReadingProgress';
import { QuestionCardV3 } from './MixedDifficultyOptions';
import { RandomQuestionPicker } from '../../utils/RandomQuestionPicker';
import { 
  convertQuestionsToV3,
  calculateWeightedScore,
  generateSessionId,
  formatTime 
} from '../../utils/v3utils';

interface ReadingGameV3Props {
  // 文章数据
  articleTitle: string;
  articleSource: string;
  articleContent: string;
  wordCount: number;
  
  // 题目数据
  questions: Question[];
  articleId: string;
  
  // 配置
  questionsPerSession?: number;  // 每会话题目数（默认10）
  enableRandomPick?: boolean;     // 是否启用随机抽题
  enableCache?: boolean;          // 是否启用缓存
  enableScrollProgress?: boolean; // 是否显示阅读进度
  
  // 回调
  onComplete?: (result: ReadingResult) => void;
  onExit?: () => void;
}

interface ReadingResult {
  totalQuestions: number;
  correctCount: number;
  totalScore: number;
  timeSpent: number;
  accuracy: number;
  readingProgress: number;
}

interface AnsweredQuestion extends QuestionV3 {
  userAnswer?: string;
  isCorrect?: boolean;
  score?: number;
}

/**
 * v3.0 增强版阅读游戏组件
 * 特性：
 * - 可滚动长文阅读
 * - 随机抽题
 * - 阅读进度追踪
 * - 混合难度选项
 * - 加权评分
 */
export const ReadingGameV3: React.FC<ReadingGameV3Props> = ({
  articleTitle,
  articleSource,
  articleContent,
  wordCount,
  questions,
  articleId,
  questionsPerSession = 10,
  enableRandomPick = true,
  enableCache = true,
  onComplete,
  onExit
}) => {
  // 状态
  const [gameState, setGameState] = useState<'reading' | 'answering' | 'completed'>('reading');
  const [sessionQuestions, setSessionQuestions] = useState<AnsweredQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [sessionId] = useState(() => generateSessionId());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 转换题目为 v3.0 格式并初始化
  useEffect(() => {
    const v3Questions = convertQuestionsToV3(questions, articleId);
    
    let selectedQuestions: QuestionV3[];
    
    if (enableRandomPick && questions.length > questionsPerSession) {
      // 使用随机抽题器
      const picker = new RandomQuestionPicker(v3Questions, {
        cacheEnabled: enableCache,
        cacheKey: sessionId
      });
      
      // 尝试从缓存恢复
      const cached = picker.restoreFromCache(sessionId);
      if (cached) {
        selectedQuestions = cached;
      } else {
        selectedQuestions = picker.generateLevel(questionsPerSession);
        picker.cacheResult(sessionId);
      }
    } else {
      // 不足够题目时，使用所有题目
      selectedQuestions = v3Questions.slice(0, questionsPerSession);
    }
    
    setSessionQuestions(selectedQuestions.map(q => ({ ...q })));
  }, [questions, articleId, questionsPerSession, enableRandomPick, enableCache, sessionId]);

  // 计时器
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 处理答题
  const handleAnswer = useCallback((optionId: string) => {
    const currentQ = sessionQuestions[currentQuestionIndex];
    if (!currentQ || currentQ.userAnswer !== undefined) return;

    const selectedOption = currentQ.optionsV3?.find(o => o.id === optionId);
    const isCorrect = selectedOption?.isCorrect || false;
    
    // 计算加权得分
    const score = calculateWeightedScore(
      isCorrect,
      selectedOption?.difficulty || 'medium',
      currentQ.difficulty
    );

    const updatedQuestions = [...sessionQuestions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQ,
      userAnswer: optionId,
      isCorrect,
      score
    };

    setSessionQuestions(updatedQuestions);
    setTotalScore(prev => prev + score);

    // 自动进入下一题（延迟）
    setTimeout(() => {
      if (currentQuestionIndex < sessionQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('completed');
      }
    }, 1500);
  }, [sessionQuestions, currentQuestionIndex]);

  // 完成游戏
  useEffect(() => {
    if (gameState === 'completed') {
      const correctCount = sessionQuestions.filter(q => q.isCorrect).length;
      const accuracy = sessionQuestions.length > 0 
        ? Math.round((correctCount / sessionQuestions.length) * 100) 
        : 0;

      onComplete?.({
        totalQuestions: sessionQuestions.length,
        correctCount,
        totalScore,
        timeSpent,
        accuracy,
        readingProgress
      });
    }
  }, [gameState, sessionQuestions, totalScore, timeSpent, readingProgress, onComplete]);

  // 获取当前题目
  const currentQuestion = sessionQuestions[currentQuestionIndex];
  
  // 计算进度
  const answeredCount = sessionQuestions.filter(q => q.userAnswer !== undefined).length;
  const progress = sessionQuestions.length > 0 
    ? Math.round((answeredCount / sessionQuestions.length) * 100) 
    : 0;

  // 渲染阅读阶段
  if (gameState === 'reading') {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={onExit}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            ← 退出
          </button>
          <span style={{ color: '#666' }}>
            ⏱️ {formatTime(timeSpent)}
          </span>
        </div>

        {/* 文章区域 */}
        <ScrollableArticle
          title={articleTitle}
          source={articleSource}
          content={articleContent}
          wordCount={wordCount}
          maxHeight="60vh"
          onProgressChange={setReadingProgress}
        />

        {/* 开始答题按钮 */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setGameState('answering')}
          style={{
            marginTop: '24px',
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {readingProgress >= 50 
            ? `开始答题 (${sessionQuestions.length}道题)` 
            : `继续阅读 (${readingProgress}%)`}
        </motion.button>
      </div>
    );
  }

  // 渲染答题阶段
  if (gameState === 'answering' && currentQuestion) {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <button
            onClick={() => setGameState('reading')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            ← 返回文章
          </button>
          <div style={{ display: 'flex', gap: '16px', color: '#666' }}>
            <span>⏱️ {formatTime(timeSpent)}</span>
            <span>🏆 {totalScore}分</span>
          </div>
        </div>

        {/* 进度条 */}
        <div style={{
          height: '8px',
          background: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '24px',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* 题目进度 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#666'
        }}>
          题目 {currentQuestionIndex + 1} / {sessionQuestions.length}
        </div>

        {/* 题目卡片 */}
        <QuestionCardV3
          questionNumber={currentQuestionIndex + 1}
          questionText={currentQuestion.stem}
          questionType={currentQuestion.questionSubtype}
          options={currentQuestion.optionsV3 || []}
          selectedOption={currentQuestion.userAnswer}
          correctAnswer={currentQuestion.correctAnswer as string}
          showResult={currentQuestion.userAnswer !== undefined}
          onSelect={handleAnswer}
          disabled={currentQuestion.userAnswer !== undefined}
          onLocateInArticle={() => setGameState('reading')}
        />
      </div>
    );
  }

  // 渲染完成阶段
  if (gameState === 'completed') {
    const correctCount = sessionQuestions.filter(q => q.isCorrect).length;
    const accuracy = sessionQuestions.length > 0 
      ? Math.round((correctCount / sessionQuestions.length) * 100) 
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '40px',
          background: '#fff',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
          {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}
        </div>
        
        <h2 style={{ marginBottom: '24px' }}>
          {accuracy >= 80 ? '太棒了！' : accuracy >= 60 ? '做得不错！' : '继续加油！'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {accuracy}%
            </div>
            <div style={{ color: '#666', marginTop: '8px' }}>正确率</div>
          </div>
          
          <div style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#764ba2' }}>
              {totalScore}
            </div>
            <div style={{ color: '#666', marginTop: '8px' }}>总得分</div>
          </div>
          
          <div style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>
              {correctCount}/{sessionQuestions.length}
            </div>
            <div style={{ color: '#666', marginTop: '8px' }}>答对题数</div>
          </div>
          
          <div style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800' }}>
              {formatTime(timeSpent)}
            </div>
            <div style={{ color: '#666', marginTop: '8px' }}>用时</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          style={{
            padding: '16px 48px',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          完成
        </motion.button>
      </motion.div>
    );
  }

  return null;
};

export default ReadingGameV3;
