import { 
  StoryScene, 
  StoryBranch, 
  ChoiceType, 
  LevelStoryConfig,
  TrustLevel 
} from '../types/story';

// ============================================================
// L1: 阅读天才 - 剧情配置
// 核心主题：发现天赋，家庭关系
// ============================================================

const L1Scenes: StoryScene[] = [
  {
    id: 'L1-001',
    levelId: 'L1',
    sequence: 1,
    title: '发现报纸',
    narrative: '2岁的玛蒂尔达已经能自己阅读报纸。这天早上，她发现爸爸带回了一张英文报纸，上面有一篇关于汽车欺诈的报道...',
    narrativeEn: 'At age 2, Matilda could already read newspapers. This morning, she found her father had brought back an English newspaper with an article about car fraud...',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L1-002' }
  },
  {
    id: 'L1-002',
    levelId: 'L1',
    sequence: 2,
    narrative: '客厅里，爸爸妈妈坐在沙发上，看着报纸上的文章，完全看不懂内容，显得很困惑。',
    dialogue: [
      {
        speaker: '爸爸',
        text: '这篇报纸到底在说些什么？我完全看不懂！',
        emotion: 'worried'
      },
      {
        speaker: '妈妈',
        text: '要是有人能帮我们解释一下就好了。',
        emotion: 'neutral'
      },
      {
        speaker: '玛蒂尔达',
        text: '让我来试试吧！我可以帮你们读懂这些文章。',
        emotion: 'happy'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 4, nextSceneId: 'L1-003' }
  },
  {
    id: 'L1-003',
    levelId: 'L1',
    sequence: 3,
    title: '第一个选择',
    narrative: '玛蒂尔达拿起报纸，发现这篇文章报道了一起汽车欺诈案件。她意识到这可能和爸爸的工作有关...',
    sceneType: 'choice',
    choices: [
      {
        id: 'L1-C1-A',
        text: '直接质问爸爸："这篇文章说的是汽车欺诈，爸爸你在做这种事吗？"',
        textEn: 'Confront father directly: "This article is about car fraud, Dad, are you doing this?"',
        type: ChoiceType.MORAL,
        effects: { moralValue: 5, trustValue: -5, score: 10 },
        nextSceneId: 'L1-004A',
        branchId: 'confrontation'
      },
      {
        id: 'L1-C1-B',
        text: '保持沉默，先自己调查清楚再说',
        textEn: 'Keep silent and investigate first',
        type: ChoiceType.STRATEGY,
        effects: { moralValue: -5, trustValue: 5, score: 15 },
        nextSceneId: 'L1-004B',
        branchId: 'investigation'
      },
      {
        id: 'L1-C1-C',
        text: '委婉地提醒爸爸做生意要诚实',
        textEn: 'Gently remind father to be honest in business',
        type: ChoiceType.MORAL,
        effects: { moralValue: 10, trustValue: 0, score: 20 },
        nextSceneId: 'L1-004C',
        branchId: 'diplomatic'
      }
    ]
  },
  // 分支 A: 直接质问
  {
    id: 'L1-004A',
    levelId: 'L1',
    sequence: 4,
    title: '直接质问',
    narrative: '爸爸听到玛蒂尔达的质问，脸色变得很难看。',
    dialogue: [
      {
        speaker: '爸爸',
        text: '小孩子懂什么！这是大人的事情！',
        emotion: 'angry'
      },
      {
        speaker: '玛蒂尔达',
        text: '但是报纸上说的...',
        emotion: 'worried'
      },
      {
        speaker: '爸爸',
        text: '不许再提这件事！',
        emotion: 'angry'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 4, nextSceneId: 'L1-005A' }
  },
  {
    id: 'L1-005A',
    levelId: 'L1',
    sequence: 5,
    narrative: '虽然爸爸很生气，但玛蒂尔达决定坚持真相。她决定继续学习英语，以便更好地理解这个世界。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L1-ASSESSMENT' }
  },
  // 分支 B: 保持沉默
  {
    id: 'L1-004B',
    levelId: 'L1',
    sequence: 4,
    title: '暗中观察',
    narrative: '玛蒂尔达决定先不声张，她开始暗中观察爸爸的行为。',
    dialogue: [
      {
        speaker: '玛蒂尔达（内心）',
        text: '我需要更多的证据才能确定...',
        emotion: 'neutral'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 3, nextSceneId: 'L1-005B' }
  },
  {
    id: 'L1-005B',
    levelId: 'L1',
    sequence: 5,
    narrative: '玛蒂尔达开始更加认真地学习英语，她想要读懂更多报纸上的内容，揭开真相。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L1-ASSESSMENT' }
  },
  // 分支 C: 委婉提醒
  {
    id: 'L1-004C',
    levelId: 'L1',
    sequence: 4,
    title: '委婉提醒',
    narrative: '玛蒂尔达用她稚嫩但真诚的话语提醒爸爸。',
    dialogue: [
      {
        speaker: '玛蒂尔达',
        text: '爸爸，报纸上说要诚实做生意才能长久...',
        emotion: 'neutral'
      },
      {
        speaker: '爸爸',
        text: '...你说得对，玛蒂尔达。',
        emotion: 'worried'
      },
      {
        speaker: '妈妈',
        text: '我们的女儿真懂事。',
        emotion: 'happy'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 4, nextSceneId: 'L1-005C' }
  },
  {
    id: 'L1-005C',
    levelId: 'L1',
    sequence: 5,
    title: '爸爸的改变',
    narrative: '爸爸若有所思地看着玛蒂尔达。虽然他没有承认什么，但从那天起，家里的气氛变得不一样了。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L1-ASSESSMENT' }
  },
  // 测评环节
  {
    id: 'L1-ASSESSMENT',
    levelId: 'L1',
    sequence: 6,
    title: '学习时刻',
    narrative: '无论选择了哪条路，玛蒂尔达都知道知识就是力量。现在，让我们通过英语学习来增强她的能力吧！',
    sceneType: 'minigame',
    autoNext: { delay: 2, nextSceneId: 'L1-ENDING' }
  },
  // 结局
  {
    id: 'L1-ENDING',
    levelId: 'L1',
    sequence: 7,
    title: '关卡完成',
    narrative: '玛蒂尔达完成了她的英语学习挑战！',
    sceneType: 'ending'
  }
];

// ============================================================
// L2: 家庭的秘密 - 剧情配置
// 核心主题：道德抉择，秘密与真相
// ============================================================

const L2Scenes: StoryScene[] = [
  {
    id: 'L2-001',
    levelId: 'L2',
    sequence: 1,
    title: '发现证据',
    narrative: '玛蒂尔达在爸爸的书房里发现了一份汽车销售合同。合同里充满了复杂的句子，她决定仔细研究这些条款。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L2-002' }
  },
  {
    id: 'L2-002',
    levelId: 'L2',
    sequence: 2,
    title: '合同内容',
    narrative: '玛蒂尔达仔细阅读合同，发现了一些可疑的条款。这些条款用复杂的英语写成，试图掩盖不公平的内容。',
    dialogue: [
      {
        speaker: '玛蒂尔达（内心）',
        text: '这条款说"买了有问题的车的顾客，不能要求退款"...这不公平！',
        emotion: 'angry'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 3, nextSceneId: 'L2-003' }
  },
  {
    id: 'L2-003',
    levelId: 'L2',
    sequence: 3,
    title: '道德抉择',
    narrative: '玛蒂尔达面临着一个艰难的抉择。她发现了爸爸的欺诈行为，应该怎么做？',
    sceneType: 'choice',
    choices: [
      {
        id: 'L2-C1-A',
        text: '告诉妈妈真相，让妈妈来处理',
        textEn: 'Tell Mom the truth and let her handle it',
        type: ChoiceType.MORAL,
        effects: { moralValue: 10, trustValue: -10, score: 20 },
        nextSceneId: 'L2-004A',
        branchId: 'tell-mother'
      },
      {
        id: 'L2-C1-B',
        text: '自己设计一个恶作剧来教训爸爸',
        textEn: 'Design a prank to teach Dad a lesson',
        type: ChoiceType.STRATEGY,
        effects: { moralValue: -10, trustValue: -5, score: 25 },
        nextSceneId: 'L2-004B',
        branchId: 'prank'
      },
      {
        id: 'L2-C1-C',
        text: '保持沉默，但暗中帮助受欺骗的顾客',
        textEn: 'Keep silent but secretly help the cheated customers',
        type: ChoiceType.MORAL,
        effects: { moralValue: 5, trustValue: 5, score: 30 },
        nextSceneId: 'L2-004C',
        branchId: 'help-customers'
      }
    ]
  },
  // 分支 A: 告诉妈妈
  {
    id: 'L2-004A',
    levelId: 'L2',
    sequence: 4,
    title: '告诉妈妈',
    narrative: '玛蒂尔达决定告诉妈妈真相。',
    dialogue: [
      {
        speaker: '玛蒂尔达',
        text: '妈妈，我发现爸爸在做不好的事情...',
        emotion: 'worried'
      },
      {
        speaker: '妈妈',
        text: '什么？你说什么？',
        emotion: 'surprised'
      },
      {
        speaker: '玛蒂尔达',
        text: '他在欺骗顾客，我找到了证据。',
        emotion: 'neutral'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 4, nextSceneId: 'L2-005A' }
  },
  {
    id: 'L2-005A',
    levelId: 'L2',
    sequence: 5,
    title: '妈妈的反应',
    narrative: '妈妈听完玛蒂尔达的话，脸色变得苍白。她拥抱了玛蒂尔达，然后去找爸爸谈话。那天晚上，家里发生了激烈的争吵。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L2-ASSESSMENT' }
  },
  // 分支 B: 恶作剧
  {
    id: 'L2-004B',
    levelId: 'L2',
    sequence: 4,
    title: '设计恶作剧',
    narrative: '玛蒂尔达决定用她的智慧给爸爸一个教训。她在爸爸的办公桌上放了一张纸条...',
    dialogue: [
      {
        speaker: '玛蒂尔达（内心）',
        text: '让他也尝尝被欺骗的滋味...',
        emotion: 'neutral'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 3, nextSceneId: 'L2-005B' }
  },
  {
    id: 'L2-005B',
    levelId: 'L2',
    sequence: 5,
    title: '恶作剧成功',
    narrative: '爸爸发现了纸条，上面写着"骗子终将被骗"。他看起来很困惑，但玛蒂尔达知道，这是一个警告。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L2-ASSESSMENT' }
  },
  // 分支 C: 帮助顾客
  {
    id: 'L2-004C',
    levelId: 'L2',
    sequence: 4,
    title: '暗中帮助',
    narrative: '玛蒂尔达决定用自己的方式帮助那些受欺骗的顾客。她开始学习英语法律术语...',
    dialogue: [
      {
        speaker: '玛蒂尔达（内心）',
        text: '我需要学习更多法律知识来保护这些人...',
        emotion: 'neutral'
      }
    ],
    sceneType: 'dialogue',
    autoNext: { delay: 3, nextSceneId: 'L2-005C' }
  },
  {
    id: 'L2-005C',
    levelId: 'L2',
    sequence: 5,
    title: '知识的力量',
    narrative: '玛蒂尔达用她学到的英语知识，帮助一位顾客理解了合同中的陷阱条款。顾客感激地离开了。',
    sceneType: 'narrative',
    autoNext: { delay: 3, nextSceneId: 'L2-ASSESSMENT' }
  },
  // 测评环节
  {
    id: 'L2-ASSESSMENT',
    levelId: 'L2',
    sequence: 6,
    title: '学习时刻',
    narrative: '玛蒂尔达继续她的英语学习之旅。通过理解复杂的合同条款，她的英语能力又提升了！',
    sceneType: 'minigame',
    autoNext: { delay: 2, nextSceneId: 'L2-ENDING' }
  },
  // 结局
  {
    id: 'L2-ENDING',
    levelId: 'L2',
    sequence: 7,
    title: '关卡完成',
    narrative: '玛蒂尔达完成了L2的挑战！她的道德选择将影响后续剧情的发展。',
    sceneType: 'ending'
  }
];

// ============================================================
// 分支剧情定义
// ============================================================

const L1Branches: StoryBranch[] = [
  {
    id: 'confrontation',
    levelId: 'L1',
    name: '直接质问',
    nameEn: 'Confrontation',
    description: '玛蒂尔达选择直接质问爸爸，虽然引发了冲突，但展现了她的诚实和勇气。',
    triggerCondition: { type: 'choice', value: 'L1-C1-A' },
    scenes: [],
    ending: { moralValue: 5, trustValue: -5 }
  },
  {
    id: 'investigation',
    levelId: 'L1',
    name: '暗中调查',
    nameEn: 'Investigation',
    description: '玛蒂尔达选择先调查清楚，展现了她的谨慎和智慧。',
    triggerCondition: { type: 'choice', value: 'L1-C1-B' },
    scenes: [],
    ending: { moralValue: -5, trustValue: 5 }
  },
  {
    id: 'diplomatic',
    levelId: 'L1',
    name: '委婉提醒',
    nameEn: 'Diplomatic',
    description: '玛蒂尔达用委婉的方式提醒爸爸，展现了她的情商和智慧。',
    triggerCondition: { type: 'choice', value: 'L1-C1-C' },
    scenes: [],
    ending: { moralValue: 10, trustValue: 0 }
  }
];

const L2Branches: StoryBranch[] = [
  {
    id: 'tell-mother',
    levelId: 'L2',
    name: '告诉妈妈',
    nameEn: 'Tell Mother',
    description: '玛蒂尔达选择告诉妈妈真相，寻求成年人的帮助。',
    triggerCondition: { type: 'choice', value: 'L2-C1-A' },
    scenes: [],
    ending: { moralValue: 10, trustValue: -10 }
  },
  {
    id: 'prank',
    levelId: 'L2',
    name: '恶作剧',
    nameEn: 'Prank',
    description: '玛蒂尔达选择用恶作剧教训爸爸，展现了她的反抗精神。',
    triggerCondition: { type: 'choice', value: 'L2-C1-B' },
    scenes: [],
    ending: { moralValue: -10, trustValue: -5 }
  },
  {
    id: 'help-customers',
    levelId: 'L2',
    name: '帮助顾客',
    nameEn: 'Help Customers',
    description: '玛蒂尔达选择暗中帮助受欺骗的顾客，展现了她的善良和正义感。',
    triggerCondition: { type: 'choice', value: 'L2-C1-C' },
    scenes: [],
    ending: { moralValue: 5, trustValue: 5 }
  }
];

// ============================================================
// 关卡剧情配置导出
// ============================================================

export const L1StoryConfig: LevelStoryConfig = {
  levelId: 'L1',
  scenes: L1Scenes,
  branches: L1Branches,
  keyChoices: [
    {
      sceneId: 'L1-003',
      description: '发现爸爸可能涉及欺诈后的第一反应',
      impact: '影响道德值和信任度，决定后续剧情走向'
    }
  ],
  endings: [
    {
      id: 'L1-ending-confrontation',
      name: '诚实之路',
      condition: '选择直接质问爸爸',
      scene: L1Scenes.find(s => s.id === 'L1-005A')!
    },
    {
      id: 'L1-ending-investigation',
      name: '智慧之路',
      condition: '选择暗中调查',
      scene: L1Scenes.find(s => s.id === 'L1-005B')!
    },
    {
      id: 'L1-ending-diplomatic',
      name: '和谐之路',
      condition: '选择委婉提醒',
      scene: L1Scenes.find(s => s.id === 'L1-005C')!
    }
  ]
};

export const L2StoryConfig: LevelStoryConfig = {
  levelId: 'L2',
  scenes: L2Scenes,
  branches: L2Branches,
  keyChoices: [
    {
      sceneId: 'L2-003',
      description: '发现爸爸欺诈行为后的道德抉择',
      impact: '显著影响道德值，决定L2剧情分支'
    }
  ],
  endings: [
    {
      id: 'L2-ending-truth',
      name: '真相大白',
      condition: '选择告诉妈妈',
      scene: L2Scenes.find(s => s.id === 'L2-005A')!
    },
    {
      id: 'L2-ending-prank',
      name: '恶作剧大师',
      condition: '选择恶作剧',
      scene: L2Scenes.find(s => s.id === 'L2-005B')!
    },
    {
      id: 'L2-ending-helper',
      name: '正义使者',
      condition: '选择帮助顾客',
      scene: L2Scenes.find(s => s.id === 'L2-005C')!
    }
  ]
};

// 所有关卡剧情配置
export const STORY_CONFIGS: Record<string, LevelStoryConfig> = {
  L1: L1StoryConfig,
  L2: L2StoryConfig
};

// 获取关卡剧情配置
export const getStoryConfig = (levelId: string): LevelStoryConfig | undefined => {
  return STORY_CONFIGS[levelId];
};

// 获取场景
export const getScene = (levelId: string, sceneId: string): StoryScene | undefined => {
  const config = STORY_CONFIGS[levelId];
  return config?.scenes.find(s => s.id === sceneId);
};

// 获取下一个场景
export const getNextScene = (levelId: string, currentSceneId: string, choiceId?: string): StoryScene | undefined => {
  const config = STORY_CONFIGS[levelId];
  if (!config) return undefined;
  
  const currentScene = config.scenes.find(s => s.id === currentSceneId);
  if (!currentScene) return undefined;
  
  // 如果有选择，根据选择跳转到对应场景
  if (choiceId && currentScene.choices) {
    const choice = currentScene.choices.find(c => c.id === choiceId);
    if (choice) {
      return config.scenes.find(s => s.id === choice.nextSceneId);
    }
  }
  
  // 自动跳转
  if (currentScene.autoNext) {
    return config.scenes.find(s => s.id === currentScene.autoNext!.nextSceneId);
  }
  
  // 按序号获取下一个场景
  const nextScene = config.scenes.find(s => s.sequence === currentScene.sequence + 1);
  return nextScene;
};

// 计算信任等级
export const calculateTrustLevel = (trustValue: number): TrustLevel => {
  if (trustValue >= 100) return TrustLevel.BEST_FRIEND;
  if (trustValue >= 75) return TrustLevel.CONFIDANT;
  if (trustValue >= 50) return TrustLevel.FRIEND;
  if (trustValue >= 25) return TrustLevel.ACQUAINTANCE;
  return TrustLevel.STRANGER;
};

// 获取信任等级名称
export const getTrustLevelName = (level: TrustLevel): string => {
  const names: Record<TrustLevel, string> = {
    [TrustLevel.STRANGER]: '陌生人',
    [TrustLevel.ACQUAINTANCE]: '熟人',
    [TrustLevel.FRIEND]: '朋友',
    [TrustLevel.CONFIDANT]: '密友',
    [TrustLevel.BEST_FRIEND]: '挚友'
  };
  return names[level];
};
