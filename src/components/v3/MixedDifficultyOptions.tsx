import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptionV3 {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isCorrect: boolean;
  distractorType?: 'irrelevant' | 'partial' | 'plausible' | 'tricky';
}

interface MixedDifficultyOptionsProps {
  options: OptionV3[];
  selectedOption?: string;
  showResult?: boolean;
  onSelect?: (optionId: string) => void;
  disabled?: boolean;
}

/**
 * 选项组件 v3.0
 * 展示选项和选择结果
 */
export const MixedDifficultyOptions: React.FC<MixedDifficultyOptionsProps> = ({
  options,
  selectedOption,
  showResult = false,
  onSelect,
  disabled = false
}) => {

  const getOptionStyle = (option: OptionV3) => {
    const isSelected = selectedOption === option.id;
    const isCorrect = option.isCorrect;
    const showCorrect = showResult && isCorrect;
    const showWrong = showResult && isSelected && !isCorrect;

    if (showCorrect) {
      return {
        background: '#c8e6c9',
        borderColor: '#4caf50',
        transform: 'scale(1.02)'
      };
    }

    if (showWrong) {
      return {
        background: '#ffcdd2',
        borderColor: '#f44336',
        transform: 'scale(0.98)'
      };
    }

    if (isSelected) {
      return {
        background: '#e3f2fd',
        borderColor: '#2196f3'
      };
    }

    return {
      background: '#fff',
      borderColor: '#ddd'
    };
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {options.map((option, index) => {
        const style = getOptionStyle(option);
        const isSelected = selectedOption === option.id;

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!disabled && !showResult ? { scale: 1.02 } : {}}
            whileTap={!disabled && !showResult ? { scale: 0.98 } : {}}
            onClick={() => !disabled && !showResult && onSelect?.(option.id)}
            disabled={disabled || showResult}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: `2px solid ${style.borderColor}`,
              borderRadius: '12px',
              cursor: disabled || showResult ? 'default' : 'pointer',
              background: style.background,
              transform: style.transform,
              transition: 'all 0.2s ease',
              textAlign: 'left',
              width: '100%'
            }}
          >
            {/* 选项标签 */}
            <span style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isSelected ? '#2196f3' : '#f5f5f5',
              color: isSelected ? '#fff' : '#666',
              borderRadius: '50%',
              fontWeight: 'bold',
              fontSize: '1rem',
              flexShrink: 0
            }}>
              {option.id}
            </span>

            {/* 选项文本 */}
            <span style={{
              flex: 1,
              fontSize: '1rem',
              color: '#333',
              lineHeight: '1.5'
            }}>
              {option.text}
            </span>

            {/* 结果标记 */}
            {showResult && option.isCorrect && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: '1.5rem',
                  color: '#4caf50'
                }}
              >
                ✓
              </motion.span>
            )}

            {showResult && isSelected && !option.isCorrect && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  fontSize: '1.5rem',
                  color: '#f44336'
                }}
              >
                ✗
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

interface QuestionCardV3Props {
  questionNumber: number;
  questionText: string;
  questionType?: string;
  options: OptionV3[];
  selectedOption?: string;
  correctAnswer?: string;
  showResult?: boolean;
  onSelect?: (optionId: string) => void;
  disabled?: boolean;
  onLocateInArticle?: () => void;
}

/**
 * v3.0 题目卡片组件
 * 包含题目、选项、定位和解析
 */
export const QuestionCardV3: React.FC<QuestionCardV3Props> = ({
  questionNumber,
  questionText,
  questionType = '阅读理解',
  options,
  selectedOption,
  correctAnswer,
  showResult,
  onSelect,
  disabled,
  onLocateInArticle
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'detail':
        return { bg: '#e3f2fd', color: '#1976d2', label: '细节理解' };
      case 'inference':
        return { bg: '#f3e5f5', color: '#7b1fa2', label: '推理判断' };
      case 'vocabulary':
        return { bg: '#e8f5e9', color: '#388e3c', label: '词汇理解' };
      case 'main_idea':
        return { bg: '#fff3e0', color: '#f57c00', label: '主旨大意' };
      default:
        return { bg: '#f5f5f5', color: '#666', label: type };
    }
  };

  const typeConfig = getTypeColor(questionType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: showResult 
          ? (selectedOption === correctAnswer ? '2px solid #4caf50' : '2px solid #f44336')
          : '1px solid #e0e0e0'
      }}
    >
      {/* 题目头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {/* 题号 */}
        <span style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: showResult
            ? (selectedOption === correctAnswer ? '#4caf50' : '#f44336')
            : '#667eea',
          color: '#fff',
          borderRadius: '50%',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          {questionNumber}
        </span>

        {/* 题型标签 */}
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 500,
          background: typeConfig.bg,
          color: typeConfig.color
        }}>
          {typeConfig.label}
        </span>

        {/* 定位按钮 */}
        {onLocateInArticle && (
          <button
            onClick={onLocateInArticle}
            style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.8rem',
              background: '#f5f5f5',
              color: '#666',
              border: '1px solid #ddd',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            📍 定位到文章
          </button>
        )}
      </div>

      {/* 题目文本 */}
      <p style={{
        fontSize: '1.1rem',
        color: '#333',
        lineHeight: '1.6',
        marginBottom: '20px',
        fontWeight: 500
      }}>
        {questionText}
      </p>

      {/* 选项区域 */}
      <MixedDifficultyOptions
        options={options}
        selectedOption={selectedOption}
        showResult={showResult}
        onSelect={onSelect}
        disabled={disabled}
      />

      {/* 解析按钮 */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: '20px' }}
        >
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              background: '#f5f5f5',
              color: '#666',
              border: '1px solid #ddd',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            {showExplanation ? '🔼 收起解析' : '🔽 查看解析'}
          </button>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                marginTop: '12px',
                padding: '16px',
                background: '#f8f9fa',
                borderRadius: '8px',
                fontSize: '0.95rem',
                color: '#555',
                lineHeight: '1.6'
              }}
            >
              <strong>正确答案：</strong>{correctAnswer}
              <br /><br />
              <strong>解析：</strong>本题考查{questionType}能力。选项{correctAnswer}符合原文内容。
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MixedDifficultyOptions;
