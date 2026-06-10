# 玛蒂尔达英语学习游戏 - 架构重构设计方案

> 基于 PRD v3.0（中考/四级备考版）
> 设计日期: 2026-06-09

---

## 1. 项目概览

### 1.1 核心定位转变

| 维度 | 当前 (v2.0) | 重构后 (v3.0) |
|------|-------------|----------------|
| **定位** | 剧情冒险游戏 | 以剧情为载体的英语学习游戏 |
| **学习模式** | 分离（游戏+英语内容独立） | 融合（五步学习循环） |
| **目标人群** | 泛用户 | 初中生(中考)/高中生大学生(四级) |
| **知识体系** | 无系统 | CEFR B1→B2，2500词汇量 |
| **进度系统** | 关卡解锁 | SRS间隔重复 + 能力雷达图 |

### 1.2 五步学习循环

```
┌─────────────────────────────────────────────────────────────────┐
│                     玛蒂尔达的英语学习冒险                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ 剧情引入   │───▶│ 情景输入  │───▶│ 费曼输出  │───▶│ 剧情推进  │  │
│  │ Story    │    │ Input    │    │ Feynman  │    │ Progress │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │                                    │                    │
│       │                                    ▼                    │
│       │                            ┌──────────────┐            │
│       │                            │   测评结算    │            │
│       │                            │ Assessment   │            │
│       │                            └──────────────┘            │
│       │                                    │                    │
│       └────────────────────────────────────┘                    │
│                      SRS 复习触发                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 数据结构设计方案

### 2.1 核心类型定义 (types/index.ts)

```typescript
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

export interface LevelProgress {
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
  
  // 复习参数
  easeFactor: number;             // SM-2 难度因子
  interval: number;               // 间隔天数
  repetitions: number;            // 连续正确次数
  nextReviewDate: string;
  
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
  wrongBook: {
    questionId: string;
    wrongCount: number;
    lastWrongAt: string;
    masteredAt?: string;
  }[];
  
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
```

### 2.2 数据分层架构

```
src/
├── data/
│   ├── levels/
│   │   ├── config.ts           # 关卡配置数据
│   │   └── content/            # 关卡具体内容
│   │       ├── levelL1.ts
│   │       ├── levelL2.ts
│   │       └── ...
│   ├── vocabulary/
│   │   ├── index.ts            # 词汇表主文件
│   │   ├── zhongkao.ts         # 中考词汇 (1600词)
│   │   ├── cet4.ts             # 四级词汇 (2500词)
│   │   └── common.ts           # 通用词汇
│   ├── grammar/
│   │   ├── index.ts            # 语法点索引
│   │   ├── zhongkao/           # 中考语法
│   │   │   ├── tenses.ts       # 时态
│   │   │   ├── voice.ts        # 语态
│   │   │   └── ...
│   │   └── cet4/               # 四级语法
│   │       └── ...
│   ├── questions/
│   │   ├── reading/            # 阅读理解
│   │   ├── cloze/              # 完形填空
│   │   ├── grammar/            # 语法选择
│   │   ├── translation/        # 翻译
│   │   └── writing/            # 写作
│   └── achievements.ts
│
├── types/
│   └── index.ts                 # 核心类型定义 (见上文)
│
├── store/
│   ├── userStore.ts             # 用户数据状态
│   ├── learningStore.ts         # 学习进度状态
│   ├── reviewStore.ts           # 复习状态
│   ├── abilityStore.ts          # 能力状态
│   └── settingsStore.ts         # 设置状态
│
└── services/
    ├── srsEngine.ts             # SM-2 算法引擎
    ├── feynmanEngine.ts         # 费曼学习引擎
    ├── assessmentEngine.ts      # 测评引擎
    ├── abilityCalculator.ts     # 能力计算
    └── audioService.ts          # 音频服务
```

---

## 3. 核心系统设计方案

### 3.1 费曼学习引擎 (Feynman Learning Engine)

#### 设计理念
将费曼学习法"学→教→查漏→简化"游戏化，让用户在"教导"玛蒂尔达的过程中巩固知识。

#### 伪代码实现

```typescript
// src/services/feynmanEngine.ts

import { FeynmanStage, FeynmanRubric, Word, GrammarPoint } from '../types';

interface FeynmanTask {
  stage: FeynmanStage;
  items: (Word | GrammarPoint)[];
  userOutput: string;
  score: number;
  feedback: string;
  nextStage: FeynmanStage | null;
}

/**
 * 费曼学习引擎
 * 核心逻辑：将学习内容转化为"教授他人"的任务
 */
class FeynmanEngine {
  
  /**
   * 生成费曼学习任务
   */
  generateTask(
    stage: FeynmanStage,
    vocabulary: Word[],
    grammar: GrammarPoint[]
  ): FeynmanTask {
    switch (stage) {
      case FeynmanStage.LEARN:
        return this.createLearningTask(vocabulary, grammar);
      case FeynmanStage.TEACH:
        return this.createTeachingTask(vocabulary, grammar);
      case FeynmanStage.SIMPLIFY:
        return this.createSimplifyTask(vocabulary, grammar);
      case FeynmanStage.REVIEW:
        return this.createReviewTask(vocabulary, grammar);
    }
  }

  /**
   * 第一步：学习理解
   * - 展示词汇/语法
   * - 提供例句
   * - 用户跟读/理解
   */
  private createLearningTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    return {
      stage: FeynmanStage.LEARN,
      items: [...vocabulary, ...grammar],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.TEACH,
    };
  }

  /**
   * 第二步：教授他人（核心）
   * - 用户用简单语言解释词汇/语法
   * - AI/预设引导评估
   */
  private createTeachingTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    const targetItem = this.pickRandom([...vocabulary, ...grammar]);
    
    return {
      stage: FeynmanStage.TEACH,
      items: [targetItem],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.SIMPLIFY,
    };
  }

  /**
   * 第三步：简化理解
   * - 用更简单的比喻/例子解释
   * - 检测是否有 jargon/术语
   */
  private createSimplifyTask(items: (Word | GrammarPoint)[]): FeynmanTask {
    const teachingContent = items[0]; // 取上一步的内容
    
    return {
      stage: FeynmanStage.SIMPLIFY,
      items: [teachingContent],
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: FeynmanStage.REVIEW,
    };
  }

  /**
   * 第四步：查漏补缺
   * - 基于前三步表现，生成针对性练习
   */
  private createReviewTask(vocabulary: Word[], grammar: GrammarPoint[]): FeynmanTask {
    // 找出用户表现不好的知识点
    const weakItems = this.identifyWeakPoints(vocabulary, grammar);
    
    return {
      stage: FeynmanStage.REVIEW,
      items: weakItems,
      userOutput: '',
      score: 0,
      feedback: '',
      nextStage: null, // 费曼循环完成
    };
  }

  /**
   * 评估用户输出
   */
  evaluateOutput(
    task: FeynmanTask,
    userOutput: string,
    rubric: FeynmanRubric
  ): { score: number; feedback: string } {
    const scores: number[] = [];
    let feedback: string[] = [];

    // 1. 完整性评估 (占40%)
    const completenessScore = this.evaluateCompleteness(task.items, userOutput);
    scores.push(completenessScore * 0.4);
    if (completenessScore < 0.6) {
      feedback.push('解释不够完整，尝试覆盖所有关键点');
    }

    // 2. 准确性评估 (占30%)
    const accuracyScore = this.evaluateAccuracy(task.items, userOutput);
    scores.push(accuracyScore * 0.3);
    if (accuracyScore < 0.7) {
      feedback.push('有些解释不够准确，建议参考例句');
    }

    // 3. 简洁性评估 (占20%)
    const simplicityScore = this.evaluateSimplicity(userOutput);
    scores.push(simplicityScore * 0.2);
    if (simplicityScore < 0.5) {
      feedback.push('可以尝试用更简单的语言');
    }

    // 4. 创造力评估 (占10%)
    const creativityScore = this.evaluateCreativity(userOutput, task.items);
    scores.push(creativityScore * 0.1);

    const totalScore = scores.reduce((a, b) => a + b, 0);
    
    return {
      score: Math.round(totalScore * 100),
      feedback: feedback.join('；') || '很好！继续加油！',
    };
  }

  /**
   * 完整性评估
   * 检查用户是否解释了所有关键点
   */
  private evaluateCompleteness(items: (Word | GrammarPoint)[], output: string): number {
    let coveredCount = 0;
    
    for (const item of items) {
      const keyword = 'word' in item ? item.word : item.titleEn;
      // 检查关键词是否在输出中
      if (output.toLowerCase().includes(keyword.toLowerCase())) {
        coveredCount++;
      }
    }
    
    return items.length > 0 ? coveredCount / items.length : 1;
  }

  /**
   * 准确性评估
   * 简单实现：检查是否包含定义的关键词
   */
  private evaluateAccuracy(items: (Word | GrammarPoint)[], output: string): number {
    // 简化版：检查是否使用了正确的术语
    // 实际应使用 NLP 或预设答案匹配
    const accurateKeywords = ['means', 'means', 'definition', 'example', 'used to'];
    const hasAccurate = accurateKeywords.some(kw => 
      output.toLowerCase().includes(kw)
    );
    
    return hasAccurate ? 0.8 : 0.6; // 简化实现
  }

  /**
   * 简洁性评估
   * 检查是否避免重复、冗余
   */
  private evaluateSimplicity(output: string): number {
    const words = output.split(/\s+/);
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    
    // 词汇多样性
    const diversity = uniqueWords.size / words.length;
    
    // 长度适中 (50-200词最佳)
    const lengthScore = words.length < 50 ? 0.6 : 
                       words.length > 200 ? 0.7 : 1;
    
    return (diversity + lengthScore) / 2;
  }

  /**
   * 创造力评估
   * 检查是否使用了比喻、例子
   */
  private evaluateCreativity(output: string, items: (Word | GrammarPoint)[]): number {
    const creativeMarkers = [
      'like', 'imagine', 'think of', 'for example', 
      'similar to', 'imagine', '比喻', '想象'
    ];
    
    const hasCreativity = creativeMarkers.some(marker =>
      output.toLowerCase().includes(marker.toLowerCase())
    );
    
    return hasCreativity ? 1 : 0.5;
  }

  /**
   * 识别薄弱点
   */
  private identifyWeakPoints(vocabulary: Word[], grammar: GrammarPoint[]): (Word | GrammarPoint)[] {
    // 从词汇/语法中筛选错误率高的
    const weakVocab = vocabulary
      .filter(w => w.incorrectCount / (w.correctCount + w.incorrectCount) > 0.3)
      .slice(0, 3);
    
    const weakGrammar = grammar
      .filter(g => g.id === 'need-implementation') // TODO: 实现
      .slice(0, 2);
    
    return [...weakVocab, ...weakGrammar];
  }

  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export const feynmanEngine = new FeynmanEngine();
```

### 3.2 SRS 间隔重复系统 (SM-2 算法)

#### 设计理念
使用 SuperMemo 的 SM-2 算法，根据用户表现动态调整复习间隔。

#### 伪代码实现

```typescript
// src/services/srsEngine.ts

import { ReviewCard, CardStatus, VocabularyProgress } from '../types';

interface ReviewResponse {
  quality: 0 | 1 | 2 | 3 | 4 | 5;  // 0-完全忘记 5-完美记住
  timeSpent: number;                 // 答题耗时(秒)
}

/**
 * SM-2 间隔重复算法引擎
 * 
 * 核心公式:
 * - EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
 * - I(1) = 1
 * - I(2) = 6
 * - I(n) = I(n-1) * EF
 */
class SRSEngine {
  // 最小难度因子
  private readonly MIN_EASE_FACTOR = 1.3;
  
  // 初始间隔 (天)
  private readonly INITIAL_INTERVALS = {
    [CardStatus.NEW]: 1,
    [CardStatus.LEARNING]: 1,
    [CardStatus.REVIEW]: 1,
    [CardStatus.RELARNING]: 1,
  };

  /**
   * 处理复习响应
   * @param card 复习卡片
   * @param response 用户响应
   * @returns 更新后的卡片
   */
  processReview(card: ReviewCard, response: ReviewResponse): ReviewCard {
    const { quality } = response;
    
    // 如果是完全忘记，重新开始
    if (quality < 3) {
      return this.handleIncorrect(card);
    }
    
    return this.handleCorrect(card, quality);
  }

  /**
   * 处理正确回答
   */
  private handleCorrect(card: ReviewCard, quality: number): ReviewCard {
    const newCard = { ...card };
    newCard.repetitions += 1;
    
    // 计算新难度因子
    newCard.easeFactor = this.calculateNewEaseFactor(
      card.easeFactor, 
      quality
    );
    
    // 计算新间隔
    if (newCard.repetitions === 1) {
      newCard.interval = 1;
    } else if (newCard.repetitions === 2) {
      newCard.interval = 6;
    } else {
      newCard.interval = Math.round(card.interval * newCard.easeFactor);
    }
    
    // 更新状态
    if (card.status === CardStatus.LEARNING) {
      newCard.status = CardStatus.REVIEW;
    }
    
    // 更新下次复习日期
    newCard.nextReviewDate = this.calculateNextReviewDate(newCard.interval);
    newCard.lastReviewDate = new Date().toISOString();
    
    return newCard;
  }

  /**
   * 处理错误回答
   */
  private handleIncorrect(card: ReviewCard): ReviewCard {
    const newCard = { ...card };
    
    newCard.repetitions = 0;
    newCard.status = CardStatus.RELARNING;
    newCard.interval = this.INITIAL_INTERVALS[CardStatus.RELARNING];
    newCard.nextReviewDate = this.calculateNextReviewDate(newCard.interval);
    newCard.lastReviewDate = new Date().toISOString();
    
    return newCard;
  }

  /**
   * 计算新的难度因子
   * EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
   */
  private calculateNewEaseFactor(currentEF: number, quality: number): number {
    const newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    
    // 确保不低于最小值
    return Math.max(this.MIN_EASE_FACTOR, newEF);
  }

  /**
   * 计算下次复习日期
   */
  private calculateNextReviewDate(intervalDays: number): string {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    return nextDate.toISOString();
  }

  /**
   * 获取今日待复习卡片
   */
  getTodayReviewCards(allCards: ReviewCard[]): ReviewCard[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return allCards.filter(card => {
      const reviewDate = new Date(card.nextReviewDate);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate <= today;
    });
  }

  /**
   * 生成新卡片学习队列
   */
  generateLearningQueue(
    vocabulary: VocabularyProgress,
    maxNewPerDay: number = 20
  ): string[] {
    // 筛选新卡片
    const newWords = Object.entries(vocabulary)
      .filter(([_, progress]) => progress.status === CardStatus.NEW)
      .slice(0, maxNewPerDay)
      .map(([wordId]) => wordId);
    
    return newWords;
  }

  /**
   * 计算复习统计
   */
  calculateReviewStats(cards: ReviewCard[]): {
    total: number;
    new: number;
    learning: number;
    review: number;
    dueToday: number;
  } {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return {
      total: cards.length,
      new: cards.filter(c => c.status === CardStatus.NEW).length,
      learning: cards.filter(c => c.status === CardStatus.LEARNING).length,
      review: cards.filter(c => c.status === CardStatus.REVIEW).length,
      dueToday: cards.filter(c => new Date(c.nextReviewDate) <= today).length,
    };
  }
}

export const srsEngine = new SRSEngine();
```

### 3.3 测评系统 (Assessment Engine)

#### 设计理念
对标中考/四级评分标准，提供多维度评估。

#### 伪代码实现

```typescript
// src/services/assessmentEngine.ts

import { 
  Question, 
  QuestionType, 
  AssessmentResult, 
  LevelReport,
  ExamType,
  AbilityDimension,
  LearningPhase 
} from '../types';

interface AssessmentConfig {
  questionCount: number;
  questionTypes: QuestionType[];
  timeLimit?: number;
  passingScore: number;
  levelId: string;
}

/**
 * 测评引擎
 * 支持多种题型，输出详细报告
 */
class AssessmentEngine {
  
  /**
   * 生成测验
   */
  generateAssessment(
    config: AssessmentConfig,
    questionBank: Question[]
  ): Question[] {
    const { questionCount, questionTypes } = config;
    
    // 按题型分组
    const grouped = this.groupByType(questionBank, questionTypes);
    
    // 每个题型等量分配
    const questionsPerType = Math.floor(questionCount / questionTypes.length);
    const questions: Question[] = [];
    
    for (const type of questionTypes) {
      const typeQuestions = grouped[type] || [];
      const selected = this.selectQuestions(typeQuestions, questionsPerType);
      questions.push(...selected);
    }
    
    // 打乱顺序
    return this.shuffle(questions);
  }

  /**
   * 评分
   */
  grade(question: Question, userAnswer: string): AssessmentResult {
    const isCorrect = this.checkAnswer(question, userAnswer);
    
    return {
      questionId: question.id,
      userAnswer,
      correctAnswer: Array.isArray(question.correctAnswer) 
        ? question.correctAnswer.join(' / ') 
        : question.correctAnswer,
      isCorrect,
      score: isCorrect ? this.getQuestionScore(question) : 0,
      timeSpent: 0, // 由调用方提供
      feedback: isCorrect ? '正确！' : question.explanation,
    };
  }

  /**
   * 生成关卡报告
   */
  generateLevelReport(
    levelId: string,
    results: AssessmentResult[],
    config: AssessmentConfig,
    abilityScores: Record<AbilityDimension, number>
  ): LevelReport {
    const correctCount = results.filter(r => r.isCorrect).length;
    const incorrectCount = results.filter(r => !r.isCorrect).length;
    const totalQuestions = results.length;
    
    // 计算总分
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    
    // 按能力维度统计
    const abilityBreakdown = this.calculateAbilityBreakdown(
      results, 
      abilityScores
    );
    
    // 生成错题列表
    const wrongQuestionIds = results
      .filter(r => !r.isCorrect)
      .map(r => r.questionId);
    
    // 生成建议
    const suggestions = this.generateSuggestions(
      results, 
      abilityBreakdown, 
      config.questionTypes
    );
    
    return {
      levelId,
      totalScore,
      passingScore: config.passingScore,
      passed: totalScore >= config.passingScore,
      phaseScores: {
        [LearningPhase.STORY_INTRO]: 0,
        [LearningPhase.SITUATION_INPUT]: 0,
        [LearningPhase.FEYNMAN_OUTPUT]: 0,
        [LearningPhase.STORY_PROGRESS]: 0,
        [LearningPhase.ASSESSMENT]: totalScore,
      },
      abilityScores: abilityBreakdown,
      totalQuestions,
      correctCount,
      incorrectCount,
      accuracy: totalQuestions > 0 ? correctCount / totalQuestions : 0,
      wrongQuestionIds,
      newWordsLearned: config.questionCount,
      wordsToReview: wrongQuestionIds,
      abilityImprovement: this.calculateImprovement(abilityBreakdown, abilityScores),
      suggestions,
      completedAt: new Date().toISOString(),
    };
  }

  /**
   * 对标评分标准
   */
  calculateExamScore(
    examType: ExamType,
    rawScore: number,
    totalPossible: number
  ): {
    rawScore: number;
    score: number;
    percentile: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'E';
  } {
    const percentage = rawScore / totalPossible;
    
    let score: number;
    let grade: string;
    let percentile: number;
    
    if (examType === ExamType.ZHONGKAO) {
      // 中考评分标准 (模拟)
      if (percentage >= 0.9) { score = 100; grade = 'A'; percentile = 95; }
      else if (percentage >= 0.8) { score = 90; grade = 'A'; percentile = 85; }
      else if (percentage >= 0.7) { score = 80; grade = 'B'; percentile = 70; }
      else if (percentage >= 0.6) { score = 70; grade = 'B'; percentile = 50; }
      else if (percentage >= 0.5) { score = 60; grade = 'C'; percentile = 30; }
      else { score = 50; grade = 'D'; percentile = 15; }
    } else {
      // 四级评分标准 (模拟)
      if (percentage >= 0.9) { score = 100; grade = 'A'; percentile = 97; }
      else if (percentage >= 0.85) { score = 85; grade = 'A'; percentile = 90; }
      else if (percentage >= 0.75) { score = 75; grade = 'B'; percentile = 75; }
      else if (percentage >= 0.65) { score = 65; grade = 'B'; percentile = 55; }
      else if (percentage >= 0.55) { score = 55; grade = 'C'; percentile = 30; }
      else { score = 45; grade = 'D'; percentile = 10; }
    }
    
    return { rawScore, score, percentile, grade: grade as any };
  }

  // ========================================
  // 私有辅助方法
  // ========================================

  private groupByType(bank: Question[], types: QuestionType[]): Record<QuestionType, Question[]> {
    const grouped: Record<string, Question[]> = {};
    
    for (const q of bank) {
      if (!grouped[q.type]) grouped[q.type] = [];
      grouped[q.type].push(q);
    }
    
    return grouped as Record<QuestionType, Question[]>;
  }

  private selectQuestions(questions: Question[], count: number): Question[] {
    // 按难度分层抽取
    const easy = questions.filter(q => q.difficulty <= 2);
    const medium = questions.filter(q => q.difficulty === 3);
    const hard = questions.filter(q => q.difficulty >= 4);
    
    const selected: Question[] = [];
    
    // 简单40%，中等40%，困难20%
    const easyCount = Math.floor(count * 0.4);
    const mediumCount = Math.floor(count * 0.4);
    const hardCount = count - easyCount - mediumCount;
    
    selected.push(...this.shuffle(easy).slice(0, easyCount));
    selected.push(...this.shuffle(medium).slice(0, mediumCount));
    selected.push(...this.shuffle(hard).slice(0, hardCount));
    
    return this.shuffle(selected);
  }

  private checkAnswer(question: Question, userAnswer: string): boolean {
    const correct = question.correctAnswer;
    
    if (Array.isArray(correct)) {
      return correct.includes(userAnswer);
    }
    
    if (typeof correct === 'number') {
      return parseInt(userAnswer) === correct;
    }
    
    // 忽略大小写和空格
    return userAnswer.trim().toLowerCase() === correct.toString().trim().toLowerCase();
  }

  private getQuestionScore(question: Question): number {
    // 难题高分
    const baseScore = 10;
    const difficultyBonus = question.difficulty * 2;
    return baseScore + difficultyBonus;
  }

  private calculateAbilityBreakdown(
    results: AssessmentResult[],
    currentScores: Record<AbilityDimension, number>
  ): Record<AbilityDimension, number> {
    // 基于正确率计算能力提升
    const correctRate = results.length > 0 
      ? results.filter(r => r.isCorrect).length / results.length 
      : 0;
    
    const improvement = Math.round(correctRate * 10); // 最多+10分
    
    return {
      ...currentScores,
      vocabulary: currentScores.vocabulary + improvement,
      grammar: currentScores.grammar + improvement,
      reading: currentScores.reading + improvement,
      listening: currentScores.listening + improvement,
      writing: currentScores.writing + improvement,
      speaking: currentScores.speaking + improvement,
    };
  }

  private generateSuggestions(
    results: AssessmentResult[],
    abilityBreakdown: Record<AbilityDimension, number>,
    questionTypes: QuestionType[]
  ): string[] {
    const suggestions: string[] = [];
    
    // 基于错题类型生成建议
    const wrongTypes = this.groupWrongByType(results);
    
    if (wrongTypes[QuestionType.VOCAB_CHOICE] > 2) {
      suggestions.push('词汇量需要加强，建议每天背20个新单词');
    }
    
    if (wrongTypes[QuestionType.GRAMMAR_CHOICE] > 2) {
      suggestions.push('语法薄弱，建议复习时态和语态相关内容');
    }
    
    if (wrongTypes[QuestionType.READING_CLOZE] > 3) {
      suggestions.push('完形填空较弱，建议多阅读英文文章培养语感');
    }
    
    // 基于能力评分
    if (abilityBreakdown.reading < 60) {
      suggestions.push('阅读理解需要加强，建议每天做一篇阅读练习');
    }
    
    return suggestions;
  }

  private groupWrongByType(results: AssessmentResult[]): Record<string, number> {
    // TODO: 需要关联questionId获取type
    return {};
  }

  private calculateImprovement(
    newScores: Record<AbilityDimension, number>,
    oldScores: Record<AbilityDimension, number>
  ): Record<AbilityDimension, number> {
    const improvement: Record<string, number> = {};
    
    for (const key of Object.keys(newScores) as AbilityDimension[]) {
      improvement[key] = newScores[key] - oldScores[key];
    }
    
    return improvement as Record<AbilityDimension, number>;
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}

export const assessmentEngine = new AssessmentEngine();
```

### 3.4 能力雷达图系统

```typescript
// src/services/abilityCalculator.ts

import { 
  UserAbilities, 
  AbilityScore, 
  AbilityDimension,
  CEFRLevel,
  ExamType 
} from '../types';

interface AbilityConfig {
  targetExam: ExamType;
  targetLevel: CEFRLevel;
}

class AbilityCalculator {
  
  /**
   * 计算能力得分
   */
  calculateAbilities(stats: UserStats): UserAbilities {
    const { vocabCount, grammarAccuracy, readingAccuracy, ...rest } = stats;
    
    return {
      vocabulary: this.createAbilityScore(
        AbilityDimension.VOCABULARY,
        this.calculateVocabScore(vocabCount)
      ),
      grammar: this.createAbilityScore(
        AbilityDimension.GRAMMAR,
        grammarAccuracy
      ),
      reading: this.createAbilityScore(
        AbilityDimension.READING,
        readingAccuracy
      ),
      listening: this.createAbilityScore(
        AbilityDimension.LISTENING,
        rest.listeningAccuracy || 50
      ),
      writing: this.createAbilityScore(
        AbilityDimension.WRITING,
        rest.writingScore || 50
      ),
      speaking: this.createAbilityScore(
        AbilityDimension.SPEAKING,
        rest.speakingScore || 50
      ),
      overall: this.calculateOverall([
        vocabCount, grammarAccuracy, readingAccuracy,
        rest.listeningAccuracy || 50, rest.writingScore || 50
      ]),
      cefrLevel: this.estimateCEFRLevel(vocabCount, grammarAccuracy),
      targetExam: rest.targetExam || null,
    };
  }

  /**
   * 计算目标考试对应的能力要求
   */
  getTargetRequirements(config: AbilityConfig): Record<AbilityDimension, number> {
    const { targetExam, targetLevel } = config;
    
    if (targetExam === ExamType.ZHONGKAO) {
      return {
        vocabulary: 80,    // 掌握1600核心词
        grammar: 75,
        reading: 70,
        listening: 70,
        writing: 65,
        speaking: 0,        // 不考口语
      };
    }
    
    // CET-4
    return {
      vocabulary: 90,    // 掌握4500+词汇
      grammar: 80,
      reading: 75,
      listening: 75,
      writing: 70,
      speaking: 60,
    };
  }

  /**
   * 生成雷达图数据
   */
  generateRadarData(
    current: UserAbilities,
    target?: Record<AbilityDimension, number>
  ) {
    const labels = ['词汇', '语法', '阅读', '听力', '写作', '口语'];
    const currentScores = [
      current.vocabulary.score,
      current.grammar.score,
      current.reading.score,
      current.listening.score,
      current.writing.score,
      current.speaking.score,
    ];
    
    const datasets = [
      {
        label: '当前能力',
        scores: currentScores,
        color: '#9b7fc9',
      },
    ];
    
    if (target) {
      datasets.push({
        label: '目标能力',
        scores: [
          target[AbilityDimension.VOCABULARY],
          target[AbilityDimension.GRAMMAR],
          target[AbilityDimension.READING],
          target[AbilityDimension.LISTENING],
          target[AbilityDimension.WRITING],
          target[AbilityDimension.SPEAKING],
        ],
        color: '#f4a261',
      });
    }
    
    return { labels, datasets };
  }

  // ========================================
  // 私有方法
  // ========================================

  private createAbilityScore(
    dimension: AbilityDimension,
    score: number
  ): AbilityScore {
    return {
      dimension,
      score: Math.min(100, Math.max(0, score)),
      level: this.getLevelFromScore(score),
    };
  }

  private getLevelFromScore(score: number): AbilityScore['level'] {
    if (score >= 80) return 'advanced';
    if (score >= 60) return 'intermediate';
    if (score >= 40) return 'elementary';
    return 'beginner';
  }

  private calculateVocabScore(count: number): number {
    // 假设中考1600，四级4500
    const zhongkaoTarget = 1600;
    const cet4Target = 4500;
    
    const maxTarget = cet4Target;
    return Math.min(100, Math.round((count / maxTarget) * 100));
  }

  private calculateOverall(scores: number[]): number {
    // 排除0分项
    const validScores = scores.filter(s => s > 0);
    if (validScores.length === 0) return 0;
    
    return Math.round(
      validScores.reduce((a, b) => a + b, 0) / validScores.length
    );
  }

  private estimateCEFRLevel(vocabCount: number, grammarAccuracy: number): CEFRLevel {
    if (vocabCount >= 4000 && grammarAccuracy >= 80) return CEFRLevel.B2;
    if (vocabCount >= 2000 && grammarAccuracy >= 60) return CEFRLevel.B1;
    if (vocabCount >= 1000 && grammarAccuracy >= 50) return CEFRLevel.A2;
    return CEFRLevel.A1;
  }
}

export const abilityCalculator = new AbilityCalculator();
```

---

## 4. 组件架构设计

### 4.1 目录结构

```
src/
├── components/
│   ├── layout/
│   │   ├── GameLayout.tsx         # 游戏主布局
│   │   ├── Header.tsx             # 顶部导航
│   │   ├── Footer.tsx             # 底部信息
│   │   └── ProgressBar.tsx       # 进度条
│   │
│   ├── learning/                  # 学习流程组件
│   │   ├── StoryIntro/            # 剧情引入
│   │   │   ├── Narrative.tsx      # 叙述展示
│   │   │   ├── Dialogue.tsx       # 对话展示
│   │   │   └── Scene.tsx          # 场景展示
│   │   │
│   │   ├── SituationInput/        # 情景输入
│   │   │   ├── VocabCard.tsx      # 词汇卡片
│   │   │   ├── GrammarExplain.tsx # 语法讲解
│   │   │   └── ContextReader.tsx  # 语境阅读
│   │   │
│   │   ├── FeynmanOutput/         # 费曼输出
│   │   │   ├── FeynmanPrompt.tsx   # 费曼引导
│   │   │   ├── TeachingInput.tsx  # 教学输入
│   │   │   ├── SimpleExplain.tsx  # 简化解释
│   │   │   └── Feedback.tsx       # 反馈展示
│   │   │
│   │   └── Assessment/            # 测评结算
│   │       ├── QuizContainer.tsx  # 测验容器
│   │       ├── Timer.tsx          # 计时器
│   │       └── ScoreBoard.tsx     # 分数板
│   │
│   ├── questions/                 # 题型组件
│   │   ├── Choice.tsx             # 选择题
│   │   ├── Cloze.tsx              # 完形填空
│   │   ├── FillBlank.tsx          # 语法填空
│   │   ├── Reading.tsx            # 阅读理解
│   │   ├── Translation.tsx       # 翻译
│   │   ├── Writing.tsx             # 写作
│   │   └── Listening.tsx          # 听力 (可选)
│   │
│   ├── review/                    # 复习系统
│   │   ├── ReviewCard.tsx         # 复习卡片
│   │   ├── ReviewSession.tsx      # 复习会话
│   │   ├── FlashCard.tsx          # 闪卡
│   │   └── ProgressRing.tsx       # 进度环
│   │
│   ├── report/                    # 报告系统
│   │   ├── AbilityRadar.tsx       # 能力雷达图
│   │   ├── WrongBook.tsx          # 错题本
│   │   ├── ProgressChart.tsx      # 进度图表
│   │   └── LevelReport.tsx        # 关卡报告
│   │
│   ├── ui/                        # 通用UI组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   ├── Progress.tsx
│   │   ├── AudioPlayer.tsx        # 音频播放
│   │   ├── SpeechInput.tsx        # 语音输入 (可选)
│   │   └── ...
│   │
│   └── common/
│       ├── Loading.tsx
│       ├── ErrorBoundary.tsx
│       └── ...
│
├── pages/
│   ├── HomePage.tsx               # 首页
│   ├── LevelSelect.tsx            # 关卡选择 (重构)
│   ├── LevelPage.tsx              # 关卡进行页
│   ├── ReviewPage.tsx             # 复习页
│   ├── WrongBookPage.tsx          # 错题本页
│   ├── ReportPage.tsx             # 报告页
│   ├── AchievementsPage.tsx       # 成就页
│   ├── SettingsPage.tsx           # 设置页
│   └── ProfilePage.tsx            # 个人资料页
│
├── hooks/
│   ├── useLearning.ts             # 学习流程Hook
│   ├── useReview.ts               # 复习Hook
│   ├── useAssessment.ts           # 测评Hook
│   ├── useAudio.ts                # 音频Hook
│   ├── useSpeech.ts               # 语音Hook (可选)
│   └── useTimer.ts                # 计时器Hook
│
├── store/
│   ├── userStore.ts               # 用户数据
│   ├── learningStore.ts           # 学习进度
│   ├── reviewStore.ts             # 复习状态
│   ├── levelStore.ts              # 关卡状态
│   ├── abilityStore.ts            # 能力状态
│   ├── settingsStore.ts           # 设置
│   └── uiStore.ts                 # UI状态
│
├── services/                      # 核心引擎 (见上文)
│   ├── srsEngine.ts
│   ├── feynmanEngine.ts
│   ├── assessmentEngine.ts
│   ├── abilityCalculator.ts
│   └── audioService.ts
│
├── data/                          # 静态数据
│   ├── levels/                    # 关卡配置
│   ├── vocabulary/                # 词汇表
│   ├── grammar/                   # 语法点
│   ├── questions/                 # 题库
│   └── achievements.ts
│
├── types/
│   └── index.ts                   # 类型定义 (见上文)
│
├── utils/
│   ├── audioUtils.ts              # 音频工具
│   ├── dateUtils.ts               # 日期工具
│   ├── storageUtils.ts            # 存储工具
│   └── examUtils.ts               # 考试工具
│
└── styles/
    └── index.css                  # 全局样式 (扩展)
```

### 4.2 核心组件职责

#### 学习流程组件

```
┌─────────────────────────────────────────────────────────────────┐
│                      LevelPage (关卡页)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   LearningFlow                           │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │    │
│  │  │ Story    │ │Situation │ │ Feynman  │ │Assessment│  │    │
│  │  │ Intro    │ │ Input    │ │ Output   │ │          │  │    │
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │    │
│  │       │            │            │            │         │    │
│  │       ▼            ▼            ▼            ▼         │    │
│  │  ┌──────────────────────────────────────────────┐      │    │
│  │  │              ProgressBar                       │      │    │
│  │  │  [██████░░░░░░░░░░░░░░░░░░░░░░] 4/10          │      │    │
│  │  └──────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| 组件 | 职责 | 输入 | 输出 |
|------|------|------|------|
| `LevelPage` | 关卡主容器，管理五步流程 | levelId | 阶段切换 |
| `StoryIntro` | 展示剧情引入 | narrative/dialogue | - |
| `SituationInput` | 词汇/语法学习 | words/grammar | 标记完成 |
| `FeynmanOutput` | 费曼学习任务 | task | 用户输出+评分 |
| `Assessment` | 测评答题 | questions | 答案+结果 |
| `QuizContainer` | 题目录入容器 | question[] | answers[] |
| `Choice` | 选择题组件 | options | onAnswer |
| `Reading` | 阅读理解组件 | passage+questions | answers |

#### 复习组件

```
┌─────────────────────────────────────────────────────────────────┐
│                      ReviewPage                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   今日复习      │  │   新词学习      │  │   复习统计      │  │
│  │   (20张)       │  │   (15张)       │  │   🔥连续3天    │  │
│  │   [开始复习]   │  │   [开始学习]   │  │   📊85%正确率  │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                      │                      │           │
│           ▼                      ▼                      ▼           │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    ReviewCard                           │     │
│  │  ┌───────────────────────────────────────────────────┐  │     │
│  │  │  单词: extraordinary                               │  │     │
│  │  │  音标: /ˌekstrɔːrˈdɪneri/                          │  │     │
│  │  │  ─────────────────────────────────────────────────  │  │     │
│  │  │         [显示答案]                                  │  │     │
│  │  │  ─────────────────────────────────────────────────  │  │     │
│  │  │  释义: adj. 非凡的；卓越的                          │  │     │
│  │  │  例句: She had an extraordinary talent.            │  │     │
│  │  └───────────────────────────────────────────────────┘  │     │
│  │                                                          │     │
│  │  评分: [忘记] [困难] [一般] [简单] [完美]              │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| 组件 | 职责 |
|------|------|
| `ReviewPage` | 复习主页，显示统计和入口 |
| `ReviewSession` | 复习会话管理 |
| `ReviewCard` | 单张复习卡片 |
| `FlashCard` | 闪卡组件（正面单词/背面释义）|
| `ProgressRing` | 复习进度环 |

#### 报告组件

```
┌─────────────────────────────────────────────────────────────────┐
│                      ReportPage                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    AbilityRadar                         │     │
│  │                                                          │     │
│  │            词汇 ████████████ 85                         │     │
│  │         语法     ██████████ 75                         │     │
│  │       听力        ████████ 65                         │     │
│  │        写作           ████████ 70                     │     │
│  │         阅读             ████████████ 80             │     │
│  │                                                          │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  错题本 (5道)                                            │     │
│  │  ├─ The book is worth ____ (read)                       │     │
│  │  │    你的答案: reading ❌ 正确答案: reading           │     │
│  │  ├─ She ___ (go) to school every day.                  │     │
│  │  │    你的答案: go ❌ 正确答案: goes                    │     │
│  │  └─ [开始复习错题]                                       │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Zustand Store 设计

### 5.1 状态管理架构

```typescript
// src/store/index.ts 统一导出

export { useUserStore } from './userStore';
export { useLearningStore } from './learningStore';
export { useReviewStore } from './reviewStore';
export { useAbilityStore } from './abilityStore';
export { useSettingsStore } from './settingsStore';
```

```typescript
// src/store/userStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, ExamType, CEFRLevel, UserAbilities } from '../types';

interface UserState {
  profile: UserProfile;
  
  // Actions
  setTargetExam: (exam: ExamType) => void;
  updateAbilities: (abilities: Partial<UserAbilities>) => void;
  addPlayTime: (seconds: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  resetProgress: () => void;
}

const initialProfile: UserProfile = {
  id: crypto.randomUUID(),
  name: 'Matilda',
  targetExam: null,
  targetLevel: CEFRLevel.B1,
  abilities: {
    vocabulary: { dimension: 'vocabulary', score: 0, level: 'beginner' },
    grammar: { dimension: 'grammar', score: 0, level: 'beginner' },
    reading: { dimension: 'reading', score: 0, level: 'beginner' },
    listening: { dimension: 'listening', score: 0, level: 'beginner' },
    writing: { dimension: 'writing', score: 0, level: 'beginner' },
    speaking: { dimension: 'speaking', score: 0, level: 'beginner' },
    overall: 0,
    cefrLevel: CEFRLevel.A1,
    targetExam: null,
  },
  currentLevelId: 'L1',
  completedLevels: [],
  vocabularyProgress: {},
  grammarProgress: {},
  wrongBook: [],
  reviewSessions: [],
  pendingReviews: [],
  totalStudyTime: 0,
  totalWordsLearned: 0,
  totalQuestionsAnswered: 0,
  streakDays: 0,
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: initialProfile,
      
      setTargetExam: (exam) => set((state) => ({
        profile: {
          ...state.profile,
          targetExam: exam,
          targetLevel: exam === ExamType.ZHONGKAO ? CEFRLevel.B1 : CEFRLevel.B2,
        }
      })),
      
      updateAbilities: (abilities) => set((state) => ({
        profile: {
          ...state.profile,
          abilities: { ...state.profile.abilities, ...abilities }
        }
      })),
      
      addPlayTime: (seconds) => set((state) => ({
        profile: {
          ...state.profile,
          totalStudyTime: state.profile.totalStudyTime + seconds,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      incrementStreak: () => set((state) => ({
        profile: {
          ...state.profile,
          streakDays: state.profile.streakDays + 1,
          lastActiveAt: new Date().toISOString(),
        }
      })),
      
      resetStreak: () => set((state) => ({
        profile: {
          ...state.profile,
          streakDays: 0,
        }
      })),
      
      resetProgress: () => set({ profile: initialProfile }),
    }),
    { name: 'matilda-user-storage' }
  )
);
```

```typescript
// src/store/learningStore.ts

import { create } from 'zustand';
import { LevelProgress, LearningPhase, LevelReport } from '../types';
import { assessmentEngine } from '../services/assessmentEngine';

interface LearningState {
  // 当前学习
  currentLevelId: string | null;
  currentPhase: LearningPhase;
  levelProgress: Record<string, LevelProgress>;
  
  // 当前答题
  currentQuestionIndex: number;
  answers: Record<string, string>;
  
  // 报告
  currentReport: LevelReport | null;
  
  // Actions
  startLevel: (levelId: string) => void;
  nextPhase: () => void;
  submitAnswer: (questionId: string, answer: string) => void;
  finishLevel: (config: any, questionBank: any[]) => void;
  resetLevel: () => void;
}

export const useLearningStore = create<LearningState>()((set, get) => ({
  currentLevelId: null,
  currentPhase: LearningPhase.STORY_INTRO,
  levelProgress: {},
  currentQuestionIndex: 0,
  answers: {},
  currentReport: null,
  
  startLevel: (levelId) => set({
    currentLevelId: levelId,
    currentPhase: LearningPhase.STORY_INTRO,
    currentQuestionIndex: 0,
    answers: {},
    currentReport: null,
  }),
  
  nextPhase: () => {
    const phases = Object.values(LearningPhase);
    const current = get().currentPhase;
    const index = phases.indexOf(current);
    if (index < phases.length - 1) {
      set({ currentPhase: phases[index + 1] });
    }
  },
  
  submitAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  
  finishLevel: (config, questionBank) => {
    const answers = get().answers;
    const results = Object.entries(answers).map(([qId, answer]) => {
      const question = questionBank.find(q => q.id === qId);
      return question ? assessmentEngine.grade(question, answer) : null;
    }).filter(Boolean) as any[];
    
    const levelId = get().currentLevelId!;
    const report = assessmentEngine.generateLevelReport(
      levelId,
      results,
      config,
      {} // TODO: 传入当前能力
    );
    
    set({ currentReport: report });
  },
  
  resetLevel: () => set({
    currentLevelId: null,
    currentPhase: LearningPhase.STORY_INTRO,
    currentQuestionIndex: 0,
    answers: {},
    currentReport: null,
  }),
}));
```

---

## 6. 实施计划

### 6.1 实施阶段划分

```
┌─────────────────────────────────────────────────────────────────┐
│                    实施路线图                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: 基础架构 (Week 1-2)                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 1.1 扩展 types/index.ts - 新增所有类型定义               │   │
│  │ 1.2 重构 store - 新增 learning/review/ability store       │   │
│  │ 1.3 创建 services 目录 - 基础框架                         │   │
│  │ 1.4 创建 components/ui - 通用UI组件                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Phase 2: 数据层 (Week 2-3)                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 2.1 关卡配置重构 - L1关卡配置迁移                         │   │
│  │ 2.2 词汇数据 - 收录200核心词汇                            │   │
│  │ 2.3 语法数据 - 收录20个核心语法点                         │   │
│  │ 2.4 题库 - L1相关测试题 (50题)                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Phase 3: 核心引擎 (Week 3-4)                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 3.1 SRS Engine - SM-2算法实现                            │   │
│  │ 3.2 Feynman Engine - 费曼学习流程                        │   │
│  │ 3.3 Assessment Engine - 测评引擎                         │   │
│  │ 3.4 Ability Calculator - 能力计算                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Phase 4: 组件开发 (Week 4-6)                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 4.1 Learning Flow 组件 - 五步流程                          │   │
│  │ 4.2 Question 组件 - 题型组件集                           │   │
│  │ 4.3 Review 组件 - 复习系统                               │   │
│  │ 4.4 Report 组件 - 报告系统                               │   │
│  │ 4.5 能力雷达图组件                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Phase 5: 页面集成 (Week 6-7)                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 5.1 LevelPage - 关卡页重构                               │   │
│  │ 5.2 ReviewPage - 复习页                                  │   │
│  │ 5.3 ReportPage - 报告页                                 │   │
│  │ 5.4 LevelSelect - 关卡选择页优化                         │   │
│  │ 5.5 HomePage - 首页优化                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Phase 6: 测试与优化 (Week 7-8)                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ 6.1 单元测试 - 核心引擎测试                              │   │
│  │ 6.2 E2E测试 - 用户流程测试                              │   │
│  │ 6.3 性能优化 - 首屏/交互优化                            │   │
│  │ 6.4 体验优化 - 动画/反馈                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 优先级

| 优先级 | 任务 | 原因 |
|--------|------|------|
| P0 | types/index.ts 定义 | 整个项目的基础 |
| P0 | SRS Engine | 复习是学习核心 |
| P0 | L1 关卡配置 | 验证整体流程 |
| P1 | Assessment Engine | 测评是验收标准 |
| P1 | 词汇数据 | 内容基础 |
| P1 | Learning Flow 组件 | 用户主流程 |
| P2 | Feynman Engine | 差异化功能 |
| P2 | 能力雷达图 | 目标可视化 |
| P3 | 听力/口语 | 可选功能 |

### 6.3 数据迁移策略

```typescript
// 现有数据迁移对照

// 旧结构 -> 新结构
{
  // LevelData.levelId -> LevelConfig.levelId ✓
  // LevelData.title -> LevelConfig.title ✓
  // LevelData.difficulty -> LevelConfig.difficulty ✓
  // LevelData.storyBackground -> LevelConfig.storyBackground ✓
  
  // 新增字段 (需要补充)
  targetExam: ExamType.ZHONGKAO,
  cefrLevel: CEFRLevel.B1,
  learningFlow: [...],  // 五步循环配置
  
  // 成就系统可以复用
  // 存储可以复用 zustand persist
}
```

---

## 7. 总结

### 7.1 架构优势

1. **类型安全**: 完整的 TypeScript 类型定义，覆盖所有业务场景
2. **模块化**: 核心引擎独立，便于测试和扩展
3. **可扩展**: 数据驱动设计，易于添加新关卡/题型
4. **学习闭环**: SRS + 费曼 + 测评 = 完整学习循环
5. **目标导向**: 能力雷达图 + 考纲对标，清晰可见

### 7.2 关键技术决策

| 决策 | 方案 | 理由 |
|------|------|------|
| 状态管理 | Zustand | 轻量、TypeScript友好 |
| 持久化 | localStorage | 无后端，简单可靠 |
| 音频 | Web Audio API | 跨平台兼容 |
| 语音 | Web Speech API | 浏览器原生支持 |
| 动画 | Framer Motion | 已在使用 |

### 7.3 后续工作

1. 完善 L1-L10 全部关卡配置
2. 扩充词汇到 2500 词（四级核心）
3. 扩充题库覆盖所有题型
4. 添加成就系统对接
5. 考虑后端服务支持多设备同步

---

*文档版本: 1.0*
*创建日期: 2026-06-09*
