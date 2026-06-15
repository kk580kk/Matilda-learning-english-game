/**
 * v3.0 类型扩展 - 保持向后兼容
 * 基于 PRD v3.0 / SRS v3.0 规范
 */

import { Question as BaseQuestion } from './index';

// ============================================================
// v3.0 文章结构（完整章节，1000+词）
// ============================================================

export interface Article {
  id: string;                    // 文章唯一ID
  chapter: string;               // 章节名称
  title: string;                 // 文章标题
  titleZh?: string;              // 中文标题
  content: string;               // 完整内容（1000+词）
  wordCount: number;             // 词数统计
  difficulty: 1 | 2 | 3 | 4;    // 文章难度
  source: string;                // 来源标注
  
  // 段落索引（用于题目定位）
  paragraphs: Paragraph[];
}

export interface Paragraph {
  index: number;
  startOffset: number;
  endOffset: number;
  summary: string;              // 段落摘要
}

// ============================================================
// v3.0 题目结构（混合难度选项）
// ============================================================

export interface QuestionV3 extends BaseQuestion {
  // v3.0 新增字段
  articleId: string;             // 关联文章ID
  
  // 选项结构（混合难度）
  optionsV3?: OptionV3[];        // v3.0 新选项格式
  
  // 解析增强
  explanationV3?: ExplanationV3;
  
  // 题目类型细分
  questionSubtype: 'detail' | 'inference' | 'vocabulary' | 'main_idea';
  
  // 定位信息
  location: {
    paragraphIndex: number;      // 相关段落索引
    keyword: string;             // 关键词（用于高亮）
  };
  
  // 统计
  selectedCount?: number;        // 被选择次数
  correctRate?: number;          // 正确率
}

export interface OptionV3 {
  id: string;                    // A, B, C, D
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';  // 选项难度
  isCorrect: boolean;
  
  // 干扰项分析（用于调试和优化）
  distractorType?: 'irrelevant' | 'partial' | 'plausible' | 'tricky';
}

export interface ExplanationV3 {
  chinese: string;               // 中文解析
  english?: string;              // 英文解析（可选）
  keySentence?: string;            // 关键句（原文）
}

// ============================================================
// v3.0 抽题系统
// ============================================================

export interface PickerOptions {
  cacheEnabled?: boolean;        // 是否启用缓存
  cacheKey?: string;             // 缓存键
  shuffleAlgorithm?: 'fisher-yates' | 'sattolo';  // 洗牌算法
}

export interface DifficultyDistribution {
  easy: number;                  // 简单题数量
  medium: number;                // 中等题数量
  hard: number;                  // 困难题数量
}

export interface QuestionCacheData {
  questions: QuestionV3[];
  timestamp: number;
  expiresAt: number;
}

// ============================================================
// v3.0 阅读进度
// ============================================================

export interface ReadingProgress {
  articleId: string;
  scrollPercent: number;         // 阅读进度百分比
  lastReadPosition: number;      // 最后阅读位置
  completedParagraphs: number[]; // 已完成段落索引
  timeSpent: number;             // 阅读时长（秒）
}

// ============================================================
// v3.0 关卡配置扩展
// ============================================================

export interface LevelConfigV3 {
  levelId: string;
  
  // 文章配置
  articles: string[];            // 文章ID列表
  questionsPerArticle: number;  // 每篇文章抽题数量（8-12）
  
  // 抽题配置
  difficultyDistribution: DifficultyDistribution;
  enableRandomPick: boolean;     // 是否启用随机抽题
  enableCache: boolean;          // 是否启用缓存
  
  // 阅读配置
  enableScrollProgress: boolean; // 是否显示阅读进度
  enableKeywordHighlight: boolean; // 是否启用关键词高亮
  enableParagraphLocate: boolean;  // 是否启用段落定位
}

// ============================================================
// v3.0 评分系统
// ============================================================

export interface ScoringConfig {
  baseScore: number;             // 基础分
  difficultyMultiplier: {        // 难度系数
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface OptionAnalysis {
  easyAccuracy: number;          // 简单选项正确率
  mediumAccuracy: number;          // 中等选项正确率
  hardAccuracy: number;            // 困难选项正确率
  overallAccuracy: number;         // 总体正确率
}

// ============================================================
// 兼容类型（用于 v2.5 → v3.0 迁移）
// ============================================================

export type Question = QuestionV3;

export interface PassageQuestionGroup {
  article: Article;
  questions: QuestionV3[];
}

// 选项难度分配规则
export const OPTION_DIFFICULTY_RULES = {
  distribution: {
    easy: 1,      // 1个简单选项（明显错误，易于排除）
    medium: 2,    // 2个中等选项（1个正确，1个部分正确）
    hard: 1       // 1个困难选项（看似合理，细节错误）
  },
  distractorTypes: {
    easy: 'irrelevant',       // 与文章内容无关
    medium: 'partial',        // 部分正确但不完整
    hard: 'plausible'         // 看似合理但细节错误
  }
};

// 默认难度分布（简单20%，中等60%，困难20%）
export const DEFAULT_DIFFICULTY_DISTRIBUTION: DifficultyDistribution = {
  easy: 0.2,
  medium: 0.6,
  hard: 0.2
};

// 默认评分配置
export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  baseScore: 10,
  difficultyMultiplier: {
    easy: 1.0,
    medium: 1.2,
    hard: 2.0
  }
};
