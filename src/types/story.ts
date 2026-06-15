// ============================================================
// 剧情系统类型定义 (PRD v2.1 - P0 剧情系统)
// ============================================================

/** 选择类型 */
export enum ChoiceType {
  MORAL = 'moral',       // 道德选择
  STRATEGY = 'strategy', // 策略选择
  LEARNING = 'learning', // 学习选择
}

/** 选择选项 */
export interface ChoiceOption {
  id: string;
  text: string;           // 选项文本
  textEn?: string;        // 英文选项文本
  type: ChoiceType;
  
  // 影响值
  effects: {
    moralValue?: number;    // 道德值变化 (-10 ~ +10)
    trustValue?: number;    // 信任度变化
    score?: number;         // 分数奖励
    hint?: string;          // 提示文本
  };
  
  // 分支
  nextSceneId: string;    // 下一个场景ID
  branchId?: string;      // 分支剧情ID
  
  // 条件
  requiredMoral?: number; // 需要的道德值
  requiredTrust?: number; // 需要的信任度
}

/** 剧情场景 */
export interface StoryScene {
  id: string;
  levelId: string;        // 所属关卡
  sequence: number;       // 场景序号
  
  // 场景内容
  title?: string;
  narrative: string;      // 叙述文字
  narrativeEn?: string;     // 英文叙述
  backgroundImage?: string; // 背景图片
  bgm?: string;           // 背景音乐
  
  // 对话
  dialogue?: {
    speaker: string;      // 说话人
    speakerEn?: string;
    text: string;         // 对话内容
    textEn?: string;
    avatar?: string;      // 头像
    emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'worried';
  }[];
  
  // 选择
  choices?: ChoiceOption[];
  
  // 自动跳转
  autoNext?: {
    delay: number;        // 延迟秒数
    nextSceneId: string;
  };
  
  // 场景类型
  sceneType: 'narrative' | 'dialogue' | 'choice' | 'minigame' | 'ending';
}

/** 分支剧情 */
export interface StoryBranch {
  id: string;
  levelId: string;
  name: string;           // 分支名称
  nameEn?: string;
  description: string;
  
  // 触发条件
  triggerCondition: {
    type: 'choice' | 'moral_threshold' | 'trust_threshold' | 'score_threshold';
    value: string | number;
    operator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
  };
  
  // 分支场景
  scenes: StoryScene[];
  
  // 结局影响
  ending: {
    moralValue: number;   // 道德值变化
    trustValue: number;   // 信任度变化
    unlockContent?: string[]; // 解锁内容
  };
}

/** 道德系统 */
export interface MoralSystem {
  currentValue: number;     // 当前道德值 (-100 ~ +100)
  choices: MoralChoice[]; // 道德选择记录
}

/** 道德选择记录 */
export interface MoralChoice {
  sceneId: string;
  choiceId: string;
  choiceText: string;
  moralChange: number;
  timestamp: string;
}

/** 关系系统 - Miss Honey 信任度 */
export interface TrustSystem {
  currentValue: number;     // 当前信任度 (0-100)
  level: TrustLevel;        // 信任等级
  dailyTasks: DailyTask[];  // 日常任务
}

/** 信任等级 */
export enum TrustLevel {
  STRANGER = 'stranger',   // 0-20 陌生人
  ACQUAINTANCE = 'acquaintance', // 21-50 熟人
  FRIEND = 'friend',       // 51-80 朋友
  CONFIDANT = 'confidant', // 81-100 密友
}

/** 日常任务 */
export interface DailyTask {
  id: string;
  type: 'reading' | 'vocabulary' | 'review' | 'login';
  title: string;
  description: string;
  reward: {
    trustValue: number;
    score: number;
  };
  completed: boolean;
  completedAt?: string;
}

/** 剧情进度 */
export interface StoryProgress {
  levelId: string;
  currentSceneId: string;
  completedScenes: string[];
  currentBranchId?: string;
  moralValue: number;
  trustValue: number;
  choices: string[];        // 已做选择ID
  unlockedBranches: string[]; // 已解锁分支
}

/** 关卡剧情配置 */
export interface LevelStoryConfig {
  levelId: string;
  scenes: StoryScene[];
  branches: StoryBranch[];
  
  // 关键选择点
  keyChoices: {
    sceneId: string;
    description: string;
    impact: string;
  }[];
  
  // 结局配置
  endings: {
    id: string;
    name: string;
    condition: string;
    scene: StoryScene;
  }[];
}

/** 剧情状态存储 */
export interface StoryState {
  // 全局剧情状态
  moralValue: number;
  trustValue: number;
  trustLevel: TrustLevel;
  
  // 各关卡进度
  levelProgress: Record<string, StoryProgress>;
  
  // 日常任务
  dailyTasks: DailyTask[];
  lastTaskRefresh: string;  // 上次刷新时间
  
  // 解锁内容
  unlockedScenes: string[];
  unlockedBranches: string[];
  unlockedEndings: string[];
}
