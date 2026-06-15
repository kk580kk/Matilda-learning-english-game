/**
 * v3.0 组件库入口
 * PRD v3.0 / SRS v3.0 规范实现
 */

// 阅读相关组件
export { ReadingProgressBar, ScrollableArticle } from './ReadingProgress';
export { MixedDifficultyOptions, QuestionCardV3 } from './MixedDifficultyOptions';
export { ReadingGameV3 } from './ReadingGameV3';

// 工具函数
export { RandomQuestionPicker, createQuestionPicker, pickRandomQuestions } from '../../utils/RandomQuestionPicker';
export { 
  convertToV3, 
  convertQuestionsToV3,
  calculateWeightedScore,
  generateSessionId,
  formatTime,
  saveReadingProgress,
  loadReadingProgress,
  clearReadingProgress,
  calculateReadingProgress,
  debounce,
  throttle
} from '../../utils/v3utils';
