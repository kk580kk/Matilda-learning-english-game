import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ReadingProgressBarProps {
  articleRef: React.RefObject<HTMLDivElement>;
  onProgressChange?: (percent: number) => void;
  showPercentage?: boolean;
}

/**
 * 阅读进度条组件 v3.0
 * 追踪用户在可滚动文章中的阅读进度
 */
export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  articleRef,
  onProgressChange,
  showPercentage = true
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const element = articleRef.current;
    if (!element) return;

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    
    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }

    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    const clampedProgress = Math.min(100, Math.max(0, scrollPercent));
    
    setProgress(clampedProgress);
    onProgressChange?.(clampedProgress);
    
    // 当开始滚动时显示进度条
    if (scrollTop > 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [articleRef, onProgressChange, isVisible]);

  useEffect(() => {
    const element = articleRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始计算

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [articleRef, handleScroll]);

  return (
    <div 
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '12px 16px',
        borderTop: '1px solid #e0e0e0',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
        opacity: isVisible ? 1 : 0.7,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {/* 进度条背景 */}
        <div style={{
          flex: 1,
          height: '6px',
          background: '#e0e0e0',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          {/* 进度条填充 */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
              borderRadius: '3px'
            }}
          />
        </div>
        
        {/* 百分比显示 */}
        {showPercentage && (
          <span style={{
            fontSize: '14px',
            color: '#666',
            fontWeight: 500,
            minWidth: '45px',
            textAlign: 'right'
          }}>
            {progress}%
          </span>
        )}
      </div>
      
      {/* 阅读提示 */}
      {progress < 100 && (
        <div style={{
          fontSize: '12px',
          color: '#999',
          marginTop: '4px',
          textAlign: 'center'
        }}>
          {progress < 30 && '👆 继续向下滚动阅读全文'}
          {progress >= 30 && progress < 70 && '📖 阅读中...'}
          {progress >= 70 && progress < 100 && '🔜 即将完成阅读'}
        </div>
      )}
      
      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '12px',
            color: '#4caf50',
            marginTop: '4px',
            textAlign: 'center',
            fontWeight: 500
          }}
        >
          ✅ 阅读完成，可以开始答题了
        </motion.div>
      )}
    </div>
  );
};

interface ScrollableArticleProps {
  title: string;
  source: string;
  content: string;
  wordCount: number;
  maxHeight?: string;
  onProgressChange?: (percent: number) => void;
  highlightKeywords?: string[];
}

/**
 * 可滚动长文组件 v3.0
 * 支持阅读进度追踪和关键词高亮
 */
export const ScrollableArticle: React.FC<ScrollableArticleProps> = ({
  title,
  source,
  content,
  wordCount,
  maxHeight = '60vh',
  onProgressChange,
  highlightKeywords = []
}) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [highlightedContent, setHighlightedContent] = useState(content);

  // 高亮关键词
  useEffect(() => {
    if (highlightKeywords.length === 0) {
      setHighlightedContent(content);
      return;
    }

    let processedContent = content;
    highlightKeywords.forEach(keyword => {
      if (keyword.trim()) {
        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        processedContent = processedContent.replace(
          regex,
          '<mark style="background: #ffeb3b; padding: 2px 4px; border-radius: 3px;">$1</mark>'
        );
      }
    });
    setHighlightedContent(processedContent);
  }, [content, highlightKeywords]);

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      overflow: 'hidden'
    }}>
      {/* 文章头部 */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        background: '#fafafa'
      }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '8px'
        }}>
          📖 {title}
        </h2>
        <div style={{
          fontSize: '0.9rem',
          color: '#666',
          fontStyle: 'italic'
        }}>
          {source}
        </div>
        <div style={{
          fontSize: '0.85rem',
          color: '#999',
          marginTop: '4px'
        }}>
          {wordCount} 词
        </div>
      </div>

      {/* 文章内容区域 */}
      <div style={{
        position: 'relative'
      }}>
        <div
          ref={articleRef}
          style={{
            maxHeight,
            overflowY: 'auto',
            padding: '24px',
            lineHeight: '1.9',
            fontSize: '1.1rem',
            color: '#333',
            fontFamily: 'Georgia, "Times New Roman", serif'
          }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
            style={{
              textIndent: '2em'
            }}
          />
        </div>

        {/* 阅读进度条 */}
        <ReadingProgressBar
          articleRef={articleRef}
          onProgressChange={onProgressChange}
        />
      </div>
    </div>
  );
};

export default ReadingProgressBar;
