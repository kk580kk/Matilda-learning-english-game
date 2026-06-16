import { motion } from 'framer-motion';
import { useStoryStore } from '../store';
import { TrustCalculationResult } from '../data/trustConfig';

interface TrustFeedbackProps {
  result: TrustCalculationResult;
  onContinue?: () => void;
  showContinue?: boolean;
}

/**
 * 蜜糖老师好感度反馈组件
 * 在关卡结算时显示好感度变化和反馈
 */
export const TrustFeedback = ({ result, onContinue, showContinue = true }: TrustFeedbackProps) => {
  const { trustValue, getTrustLevelName, getTrustToNextLevel } = useStoryStore();
  
  const trustToNext = getTrustToNextLevel();
  const levelName = getTrustLevelName();
  const feedback = result.feedback;
  
  if (!feedback) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        marginTop: '24px',
        padding: '20px',
        background: `linear-gradient(135deg, ${feedback.color}20 0%, ${feedback.color}10 100%)`,
        borderRadius: '12px',
        border: `2px solid ${feedback.color}`,
        textAlign: 'left'
      }}
    >
      {/* 蜜糖老师反馈 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '2.5rem' }}>{feedback.emoji}</span>
        <div>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>👩‍🏫 蜜糖老师说</p>
          <p style={{ fontSize: '1.1rem', color: feedback.color, fontWeight: 'bold', margin: '4px 0 0' }}>
            {feedback.message}
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
              color: result.totalTrust >= 0 ? '#4CAF50' : '#F44336'
            }}>
              {result.totalTrust >= 0 ? '+' : ''}{result.totalTrust}
            </span>
            <span style={{ color: '#888', marginLeft: '8px' }}>
              ({trustValue} / 100)
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#666', fontSize: '0.85rem' }}>当前等级</span>
          <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: feedback.color }}>
            {levelName}
          </p>
        </div>
      </div>

      {/* 进度条 */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ 
          height: '8px', 
          background: 'rgba(255,255,255,0.3)', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${trustValue}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ 
              height: '100%', 
              background: feedback.color,
              borderRadius: '4px'
            }}
          />
        </div>
        {trustToNext > 0 && trustValue < 100 && (
          <p style={{ 
            fontSize: '0.8rem', 
            color: '#888', 
            marginTop: '8px',
            textAlign: 'center'
          }}>
            距离下一级还差 {trustToNext} 点好感度
          </p>
        )}
      </div>

      {/* 来源明细 */}
      {result.sources.length > 0 && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>获得来源：</p>
          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.85rem', color: '#888' }}>
            {result.sources.map((source, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>
                {source.metadata?.isDecay ? (
                  <span>📉 重复刷题衰减 x{source.metadata.decayFactor}</span>
                ) : source.metadata?.isFirstComplete ? (
                  <span>🎉 首次通关奖励 +{source.amount}</span>
                ) : (
                  <span>
                    📚 关卡完成 {source.metadata?.accuracy ? `(${Math.round(source.metadata.accuracy * 100)}%正确率)` : ''} 
                    {source.amount > 0 ? '+' : ''}{source.amount}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 继续按钮 */}
      {showContinue && onContinue && (
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          style={{ 
            marginTop: '20px',
            width: '100%',
            background: feedback.color
          }}
        >
          继续
        </motion.button>
      )}
    </motion.div>
  );
};

export default TrustFeedback;
