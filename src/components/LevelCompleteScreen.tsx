import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAchievementStore } from '../store';
import { TrustFeedback } from './TrustFeedback';
import { TrustCalculationResult } from '../data/trustConfig';

interface LevelCompleteScreenProps {
  totalQuestions: number;
  correctCount: number;
  totalScore: number;
  accuracy: number;
  trustResult: TrustCalculationResult | null;
  onRetry?: () => void;
  passedThreshold?: number;
}

/**
 * 关卡完成结算页面
 * 统一的好感度反馈和成绩展示
 */
export const LevelCompleteScreen = ({
  totalQuestions,
  correctCount,
  totalScore,
  accuracy,
  trustResult,
  onRetry,
  passedThreshold = 70
}: LevelCompleteScreenProps) => {
  const { unlockAchievement } = useAchievementStore();
  
  const passed = accuracy >= passedThreshold;
  
  // 解锁成就
  if (passed && accuracy >= 90) {
    unlockAchievement('perfect_score');
  }
  if (passed) {
    unlockAchievement('assessment_pass');
  }

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
          {passed ? '你成功完成了测评挑战！' : '继续加油，下次一定能通过！'}
        </p>

        <div className="card mt-8" style={{ maxWidth: '500px', margin: '32px auto' }}>
          <h3 className="mb-6">📊 成绩详情</h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              color: '#333'
            }}>
              <span>正确率</span>
              <span style={{ color: accuracy >= 70 ? '#2a9d8f' : '#e76f51', fontWeight: 'bold' }}>
                {accuracy}%
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              color: '#333'
            }}>
              <span>答对题数</span>
              <span style={{ fontWeight: 'bold' }}>{correctCount}/{totalQuestions}</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#f8f9fa',
              borderRadius: '8px',
              color: '#333'
            }}>
              <span>总得分</span>
              <span style={{ fontWeight: 'bold' }}>{totalScore}</span>
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
                {accuracy}分
              </span>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: '#e7f5ff', borderRadius: '8px', color: '#333' }}>
            <strong style={{ color: '#0066cc' }}>💡 学习建议：</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8', textAlign: 'left', color: '#444' }}>
              {!passed && (
                <li>阅读理解需要加强，建议多读原著，注意细节</li>
              )}
              {passed && accuracy >= 90 && (
                <li>表现优异！可以尝试挑战更高难度的关卡</li>
              )}
              {passed && accuracy < 90 && (
                <li>表现不错！继续保持，争取下次满分</li>
              )}
            </ul>
          </div>

          {/* 蜜糖老师好感度反馈 */}
          {trustResult && (
            <TrustFeedback 
              result={trustResult} 
              showContinue={false}
            />
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
          {!passed && onRetry && (
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
            >
              重新挑战
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LevelCompleteScreen;
