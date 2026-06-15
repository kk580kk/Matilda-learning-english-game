// ============================================================
// 基础枚举
// ============================================================

/** 考试类型 */
export enum ExamType {
  ZHONGKAO = 'zhongkao',  // 中考
  CET4 = 'cet4',          // 大学英语四级
}

/** CEFR 等级 */
export enum CEFRLevel {
  A1 = 'A1',  // 约800词汇
  A2 = 'A2',  // 约1500词汇  
  B1 = 'B1',  // 约2500词汇 (中考目标)
  B2 = 'B2',  // 约4000词汇 (四级目标)
}

/** 词性 */
export enum WordPartOfSpeech {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PREPOSITION = 'preposition',
  CONJUNCTION = 'conjunction',
  PRONOUN = 'pronoun',
}

/** 题型类型 */
export enum QuestionType {
  // 听力 (可选)
  LISTENING_CHOICE = 'listening_choice',
  LISTENING_DICTATION = 'listening_dictation',
  
  // 阅读
  READING_CHOICE = 'reading_choice',      // 阅读选择
  READING_CLOZE = 'reading_cloze',        // 完形填空
  READING_ORDER = 'reading_order',         // 排序
  
  // 语法
  GRAMMAR_CHOICE = 'grammar_choice',       // 语法选择
  GRAMMAR_TRANSFORM = 'grammar_transform', // 句型转换
  
  // 词汇
  VOCAB_CHOICE = 'vocab_choice',           // 词汇选择
  VOCAB_SPELLING = 'vocab_spelling',       // 拼写
  
  // 表达
  TRANSLATION = 'translation',             // 翻译
  WRITING = 'writing',                     // 写作
}

/** 五步学习循环阶段 */
export enum LearningPhase {
  STORY_INTRO = 'story_intro',    // 剧情引入
  SITUATION_INPUT = 'situation_input', // 情景输入
  FEYNMAN_OUTPUT = 'feynman_output',   // 费曼输出
  STORY_PROGRESS = 'story_progress',  // 剧情推进
  ASSESSMENT = 'assessment',      // 测评结算
}

/** 费曼学习阶段 */
export enum FeynmanStage {
  LEARN = 'learn',        // 学习概念
  TEACH = 'teach',        // 教授他人
  SIMPLIFY = 'simplify',  // 简化理解
  REVIEW = 'review',      // 查漏补缺
}

/** 费曼输出记录 */
export interface FeynmanOutput {
  stage: FeynmanStage;
  content: string;
  score: number;
  feedback: string;
}

/** 复习卡片状态 */
export enum CardStatus {
  NEW = 'new',              // 新卡片
  LEARNING = 'learning',   // 学习中
  REVIEW = 'review',       // 复习中
  RELARNING = 'relearning' // 重新学习
}

/** 能力维度 */
export enum AbilityDimension {
  VOCABULARY = 'vocabulary',     // 词汇量
  GRAMMAR = 'grammar',           // 语法
  READING = 'reading',           // 阅读理解
  LISTENING = 'listening',       // 听力 (可选)
  WRITING = 'writing',           // 写作
  SPEAKING = 'speaking',         // 口语 (可选)
}

// ============================================================
// Level types
// ============================================================

export interface LevelData {
  levelId: string;
  chapter: number;
  title: string;
  titleEn: string;
  description: string;
  sceneComponent: string;
  objectives: string[];
  miniGames: string[];
  nextLevel: string | null;
  unlockCondition: {
    levelId?: string;
    condition: 'completed' | 'perfect' | 'any';
  } | null;
  difficulty: number; // 1-5 stars
  storyBackground: string;
}

export type LevelStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'perfect';

export interface LevelProgress {
  levelId: string;
  status: LevelStatus;
  score: number;
  playTime: number;
  completedAt?: string;
}

// ============================================================
// 词汇与语法
// ============================================================

export interface Word {
  id: string;
  word: string;                    // 单词
  phonetic: string;                 // 音标
  audioUrl?: string;               // 发音URL
  
  // 释义
  meanings: {
    partOfSpeech: WordPartOfSpeech;
    definition: string;
    example: string;
    chinese: string;
  }[];
  
  // 考纲标记
  examTypes: ExamType[];           // 所属考纲
  cefrLevel: CEFRLevel;            // CEFR等级
  
  // 记忆参数 (SM-2)
  easeFactor: number;             // 难度因子 (初始2.5)
  interval: number;               // 间隔天数
  repetitions: number;            // 复习次数
  nextReviewDate: string;         // 下次复习日期
  lastReviewDate?: string;        // 上次复习日期
  
  // 统计
  correctCount: number;            // 正确次数
  incorrectCount: number;         // 错误次数
}

export interface GrammarPoint {
  id: string;
  title: string;                  // 语法点标题
  titleEn: string;                 // 英文标题
  
  // 考纲
  examTypes: ExamType[];
  cefrLevel: CEFRLevel;
  
  // 内容
  description: string;            // 语法说明
  rules: string[];                // 规则列表
  examples: {
    sentence: string;
    chinese: string;
    analysis?: string;
  }[];
  
  // 常见错误
  commonMistakes: {
    wrong: string;
    correct: string;
    explanation: string;
  }[];
  
  // 相关词汇
  relatedWords: string[];         // 关联词汇ID
  relatedGrammar: string[];        // 关联语法点ID
}

// ============================================================
// 题库
// ============================================================

export interface Question {
  id: string;
  type: QuestionType;
  
  // 难度
  difficulty: 1 | 2 | 3 | 4 | 5;  // 1-简单 3-中等 5-困难
  examTypes: ExamType[];
  
  // 内容
  stem: string;                    // 题干
  stemAudioUrl?: string;           // 听力音频
  
  // 选项 (选择题/排序题)
  options?: string[];              // 选项列表
  correctAnswer: string | string[] | number;
  
  // 完形填空/语法填空
  blankPosition?: number;         // 填空位置
  correctWords?: string[];        // 正确答案(可能有多个)
  
  // 解析
  explanation: string;            // 解析
  chineseExplanation?: string;     // 中文解析
  
  // 关联
  relatedWords: string[];         // 考查词汇ID
  relatedGrammar: string[];       // 考查语法点ID
  
  // 统计
  correctRate?: number;           // 历史正确率
  usageCount: number;             // 使用次数
}

// ============================================================
// 关卡设计
// ============================================================

export interface FeynmanRubric {
  completeness: number;  // 40%
  accuracy: number;     // 30%
  simplicity: number;   // 20%
  creativity: number;   // 10%
}

export interface LevelConfig {
  levelId: string;                 // L1-L10
  chapter: number;                 // 对应原著章节
  
  // 剧情信息
  title: string;
  titleEn: string;
  storyBackground: string;         // 剧情背景
  storyProgress: string;           // 剧情推进描述
  
  // 考纲对标
  targetExam: ExamType;
  cefrLevel: CEFRLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  
  // 五步循环配置
  learningFlow: {
    phase: LearningPhase;
    duration?: number;            // 预计分钟数
    
    // 剧情引入
    storyIntro?: {
      narrative: string;           // 叙述文字
      dialogue?: {                 // 对话
        speaker: string;
        text: string;
      }[];
      scene?: string;              // 场景描述
    };
    
    // 情景输入
    situationInput?: {
      vocabulary: string[];       // 重点词汇ID
      grammar: string[];          // 重点语法ID
      questionIds: string[];       // 导入题目ID
      context: string;             // 情境背景
    };
    
    // 费曼输出
    feynmanOutput?: {
      stage: FeynmanStage;
      vocabulary: string[];       // 需要讲解的词汇
      grammar: string[];          // 需要讲解的语法
      teachingPrompt: string;      // 费曼引导语
      rubric: FeynmanRubric;       // 评分标准
    };
    
    // 测评结算
    assessment?: {
      questionTypes: QuestionType[];
      questionCount: number;
      passingScore: number;        // 及格分数
      timeLimit?: number;          // 时间限制(秒)
    };
  }[];
  
  // 解锁条件
  unlockCondition: {
    type: 'level_complete' | 'ability_reach' | 'vocab_count';
    levelId?: string;
    abilityScore?: Record<AbilityDimension, number>;
    vocabCount?: number;
  };
  
  // 奖励
  rewards: {
    vocabUnlock?: string[];        // 解锁词汇
    abilityPoints?: Record<AbilityDimension, number>;
    storyUnlocks?: string;         // 剧情解锁
  };
}

// ============================================================
// 学习进度
// ============================================================

export interface VocabularyProgress {
  wordId: string;
  status: CardStatus;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: string;
  lastReviewDate?: string;
  lastReviewResult?: 'correct' | 'incorrect';
}

export interface GrammarProgress {
  grammarId: string;
  masteryLevel: number;            // 0-100 掌握度
  learnedAt: string;
  lastPracticedAt?: string;
}

export interface LevelLearningProgress {
  levelId: string;
  completedPhases: LearningPhase[];
  currentPhase: LearningPhase;
  phaseScores: Record<LearningPhase, number>;
  totalScore: number;
  startedAt: string;
  completedAt?: string;
  
  // 答题详情
  questions: {
    questionId: string;
    answer: string;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  
  // 费曼输出记录
  feynmanOutputs: {
    stage: FeynmanStage;
    content: string;
    score: number;
    feedback: string;
  }[];
  
  // 错题记录
  wrongQuestions: string[];
}

export interface AssessmentResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  timeSpent: number;
  feedback?: string;
}

export interface LevelReport {
  levelId: string;
  totalScore: number;
  passingScore: number;
  passed: boolean;
  
  // 分项得分
  phaseScores: Record<LearningPhase, number>;
  abilityScores: Record<AbilityDimension, number>;
  
  // 答题统计
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  
  // 错题
  wrongQuestionIds: string[];
  newWordsLearned: number;
  wordsToReview: string[];
  
  // 能力提升
  abilityImprovement: Record<AbilityDimension, number>;
  
  // 建议
  suggestions: string[];
  
  completedAt: string;
}

// ============================================================
// SRS 复习
// ============================================================

export interface ReviewCard {
  cardId: string;
  type: 'word' | 'grammar' | 'question';
  itemId: string;                 // Word | GrammarPoint | Question ID
  
  // 复习状态
  status?: CardStatus;
  
  // 复习参数
  easeFactor: number;             // SM-2 难度因子
  interval: number;               // 间隔天数
  repetitions: number;            // 连续正确次数
  nextReviewDate: string;
  lastReviewDate?: string;
  
  // 来源
  sourceLevel?: string;
  sourceType: 'learning' | 'review' | 'wrong_book';
}

export interface ReviewSession {
  id: string;
  date: string;
  cards: ReviewCard[];
  completed: boolean;
  
  // 统计
  totalCards: number;
  reviewedCards: number;
  correctCards: number;
  accuracy: number;
  
  // 时长
  startTime: string;
  endTime?: string;
}

// ============================================================
// 能力系统
// ============================================================

export interface AbilityScore {
  dimension: AbilityDimension;
  score: number;                  // 0-100
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
}

export interface UserAbilities {
  // 基础能力
  vocabulary: AbilityScore;       // 词汇量
  grammar: AbilityScore;          // 语法
  
  // 理解能力
  reading: AbilityScore;          // 阅读理解
  listening: AbilityScore;       // 听力 (可选)
  
  // 表达能力
  writing: AbilityScore;          // 写作
  speaking: AbilityScore;        // 口语 (可选)
  
  // 综合
  overall: number;                 // 综合评分
  cefrLevel: CEFRLevel;          // 当前CEFR等级
  targetExam: ExamType | null;   // 目标考试
}

export interface AbilityRadarData {
  labels: string[];
  datasets: {
    label: string;
    scores: number[];
    color: string;
  }[];
}

// ============================================================
// 用户数据
// ============================================================

export interface WrongBookItem {
  questionId: string;
  wrongCount: number;
  lastWrongAt: string;
  masteredAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  
  // 目标
  targetExam: ExamType | null;
  targetLevel: CEFRLevel;
  
  // 能力
  abilities: UserAbilities;
  
  // 学习进度
  currentLevelId: string;
  completedLevels: string[];
  
  // 词汇进度
  vocabularyProgress: Record<string, VocabularyProgress>;
  
  // 语法进度
  grammarProgress: Record<string, GrammarProgress>;
  
  // 错题本
  wrongBook: WrongBookItem[];
  
  // 复习
  reviewSessions: ReviewSession[];
  pendingReviews: ReviewCard[];
  
  // 统计
  totalStudyTime: number;          // 总学习时长(秒)
  totalWordsLearned: number;      // 已学词汇数
  totalQuestionsAnswered: number; // 总答题数
  streakDays: number;             // 连续学习天数
  
  createdAt: string;
  lastActiveAt: string;
}

// ============================================================
// 成就系统
// ============================================================

export interface Achievement {
  id: string;
  category: 'level' | 'ability' | 'vocab' | 'streak' | 'review' | 'special';
  name: string;
  description: string;
  icon: string;
  
  // 条件
  condition: {
    type: string;
    target: number | string | Record<string, any>;
  };
  
  // 奖励
  reward?: {
    type: 'vocab' | 'ability' | 'badge';
    value: any;
  };
  
  unlockedAt?: string;
}

// ============================================================
// 保存数据
// ============================================================

export interface SaveData {
  id?: number;
  user: UserProfile;
  settings: UserSettings;
  saveTime: string;
}

export interface UserSettings {
  audioEnabled: boolean;
  speechEnabled: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  showPinyin: boolean;
  showChinese: boolean;
  examMode: boolean;
}

// ============================================================
// Game state types (legacy - for compatibility)
// ============================================================

export interface GameState {
  isPlaying: boolean;
  totalPlayTime: number;
  currentLevelId: string | null;
}

// ============================================================
// Legacy types (for compatibility)
// ============================================================

export interface LegacySaveData {
  id?: number;
  playerName: string;
  currentLevel: string | null;
  levelProgress: Record<string, LevelProgress>;
  achievements: string[];
  playTime: number;
  saveTime: string;
}

// Telepathy game types
export interface TelepathyObject {
  id: string;
  name: string;
  emoji: string;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  mass: number;
  isPlaced: boolean;
}

// Speed reading game types
export interface SpeedWord {
  word: string;
  isCorrect: boolean;
}

// Boss battle types
export interface BossPhase {
  name: string;
  description: string;
}

export interface PlayerStats {
  health: number;
  maxHealth: number;
  telepathy: number;
  maxTelepathy: number;
}

export interface BossStats {
  health: number;
  maxHealth: number;
  suspicion: number;
  maxSuspicion: number;
}

// Telepathy game types
export interface TelepathyObject {
  id: string;
  name: string;
  emoji: string;
  position: { x: number; y: number };
  targetPosition: { x: number; y: number };
  mass: number;
  isPlaced: boolean;
}

// Speed reading game types
export interface SpeedWord {
  word: string;
  isCorrect: boolean;
}

// Boss battle types
export interface BossPhase {
  name: string;
  description: string;
}

export interface PlayerStats {
  health: number;
  maxHealth: number;
  telepathy: number;
  maxTelepathy: number;
}

export interface BossStats {
  health: number;
  maxHealth: number;
  suspicion: number;
  maxSuspicion: number;
}


// Phase 1: P0 剧情系统类型
export * from "./story";
