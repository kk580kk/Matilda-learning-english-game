import { GrammarPoint, ExamType, CEFRLevel } from '../../types';

/**
 * 时态综合 - L1关卡用
 * 包含：一般现在时、现在进行时、现在完成时
 */
export const GRAMMAR_POINTS: GrammarPoint[] = [
  // ============================================================
  // 一般现在时 (Present Simple)
  // ============================================================
  {
    id: 'tense-present-simple',
    title: '一般现在时',
    titleEn: 'Present Simple Tense',
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    description: '一般现在时用于描述经常性、习惯性的动作或客观事实、真理。',
    rules: [
      '主语 + 动词原形 (当主语是第三人称单数时，动词加-s或-es)',
      '否定句：主语 + do not + 动词原形 (第三人称单数：does not)',
      '疑问句：Do/Does + 主语 + 动词原形?',
      '第三人称单数动词变化规则：',
      '  - 一般动词加-s: works, reads, plays',
      '  - 以s, x, z, ch, sh结尾加-es: watches, teaches',
      '  - 以辅音字母加y结尾，变y为i加-es: studies, tries',
      '  - 不规则动词: have→has'
    ],
    examples: [
      {
        sentence: 'I read books every day.',
        chinese: '我每天读书。',
        analysis: '描述经常性动作，read用原形'
      },
      {
        sentence: 'She works in a hospital.',
        chinese: '她在医院工作。',
        analysis: '第三人称单数，work加-s'
      },
      {
        sentence: 'The sun rises in the east.',
        chinese: '太阳从东方升起。',
        analysis: '客观真理用一般现在时'
      },
      {
        sentence: 'He doesn\'t like swimming.',
        chinese: '他不喜欢游泳。',
        analysis: '否定句用doesn\'t + 动词原形'
      },
      {
        sentence: 'Do you understand me?',
        chinese: '你理解我吗？',
        analysis: '疑问句用Do提问'
      }
    ],
    commonMistakes: [
      {
        wrong: 'He like reading.',
        correct: 'He likes reading.',
        explanation: '第三人称单数动词要加-s或-es'
      },
      {
        wrong: 'She doesn\'t knows the answer.',
        correct: 'She doesn\'t know the answer.',
        explanation: '否定句中动词用原形，doesn\'t后不加-s'
      },
      {
        wrong: 'I am goes to school every day.',
        correct: 'I go to school every day.',
        explanation: '第一人称用动词原形，不需要be动词'
      }
    ],
    relatedWords: ['w001', 'w002', 'w003', 'w004', 'w005', 'w121', 'w122', 'w123', 'w124', 'w125', 'w126'],
    relatedGrammar: ['tense-present-continuous', 'tense-present-perfect']
  },

  // ============================================================
  // 现在进行时 (Present Continuous)
  // ============================================================
  {
    id: 'tense-present-continuous',
    title: '现在进行时',
    titleEn: 'Present Continuous Tense',
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    description: '现在进行时用于描述正在进行的动作。',
    rules: [
      '构成：be (am/is/are) + 动词-ing形式',
      '动词-ing形式变化规则：',
      '  - 一般加-ing: working, reading',
      '  - 以不发音e结尾，去e加-ing: making, writing',
      '  - 重读闭音节结尾，双写最后一个辅音字母: running, stopping',
      '  - 以ie结尾，改ie为y加-ing: lying, tying',
      '用法：',
      '  - 表示说话时正在进行的动作',
      '  - 表示现阶段正在进行的动作（但说话时不一定在进行）',
      '  - 与always, constantly等连用表示反复发生的动作（带感情色彩）'
    ],
    examples: [
      {
        sentence: 'I am reading a book now.',
        chinese: '我现在正在读书。',
        analysis: '说话时正在进行的动作'
      },
      {
        sentence: 'She is studying English these days.',
        chinese: '她这些天正在学习英语。',
        analysis: '现阶段正在进行的动作'
      },
      {
        sentence: 'He is always complaining.',
        chinese: '他总是抱怨。',
        analysis: '与always连用表示不满'
      },
      {
        sentence: 'The children are playing in the park.',
        chinese: '孩子们正在公园玩耍。',
        analysis: '复数主语用are'
      },
      {
        sentence: 'Look! The bird is flying.',
        chinese: '看！那只鸟正在飞。',
        analysis: 'look等提示词提示正在进行的动作'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I am work in a company.',
        correct: 'I am working in a company.',
        explanation: '现在进行时需要be + 动词-ing'
      },
      {
        wrong: 'She is readting a book.',
        correct: 'She is reading a book.',
        explanation: '动词-ing形式的拼写要正确'
      },
      {
        wrong: 'What are you do?',
        correct: 'What are you doing?',
        explanation: '现在进行时疑问句中动词用-ing形式'
      }
    ],
    relatedWords: ['w033', 'w034', 'w035', 'w121'],
    relatedGrammar: ['tense-present-simple', 'tense-present-perfect']
  },

  // ============================================================
  // 现在完成时 (Present Perfect)
  // ============================================================
  {
    id: 'tense-present-perfect',
    title: '现在完成时',
    titleEn: 'Present Perfect Tense',
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.B1,
    description: '现在完成时用于描述过去发生但对现在有影响的动作。',
    rules: [
      '构成：have/has + 过去分词',
      '用法：',
      '  - 表示过去发生的动作对现在造成的影响或结果',
      '  - 表示过去开始的动作一直持续到现在',
      '  - 与already, yet, just, ever, never等连用',
      '过去分词变化规则：',
      '  - 一般加-ed: worked, played',
      '  - 以e结尾加-d: lived, used',
      '  - 以辅音字母加y结尾，变y为i加-ed: studied, tried',
      '  - 重读闭音节结尾，双写最后一个辅音字母: stopped, planned',
      '  - 不规则动词需要特殊记忆'
    ],
    examples: [
      {
        sentence: 'I have finished my homework.',
        chinese: '我已经完成了作业。',
        analysis: '过去动作对现在有结果：作业完成了'
      },
      {
        sentence: 'She has lived in Beijing for 5 years.',
        chinese: '她在北京住了5年了。',
        analysis: '过去开始的动作持续到现在'
      },
      {
        sentence: 'Have you ever been to Shanghai?',
        chinese: '你去过上海吗？',
        analysis: 'ever用于询问经历'
      },
      {
        sentence: 'I have just had dinner.',
        chinese: '我刚吃完饭。',
        analysis: 'just表示刚刚完成'
      },
      {
        sentence: 'He hasn\'t come yet.',
        chinese: '他还没有来。',
        analysis: 'yet用于否定句和疑问句'
      }
    ],
    commonMistakes: [
      {
        wrong: 'I have went to Beijing.',
        correct: 'I have gone to Beijing.',
        explanation: 'go的过去分词是gone，不是went'
      },
      {
        wrong: 'She has finish her work.',
        correct: 'She has finished her work.',
        explanation: '现在完成时要用过去分词，不是动词原形或过去式'
      },
      {
        wrong: 'I have seen this movie three days ago.',
        correct: 'I saw this movie three days ago. / I have seen this movie.',
        explanation: 'ago用于过去时，不能与现在完成时连用'
      }
    ],
    relatedWords: ['w005', 'w015', 'w039', 'w121'],
    relatedGrammar: ['tense-present-simple', 'tense-present-continuous']
  }
];

/**
 * 根据ID获取语法点
 */
export const getGrammarById = (id: string): GrammarPoint | undefined => {
  return GRAMMAR_POINTS.find(grammar => grammar.id === id);
};

/**
 * 根据关卡ID获取相关语法点
 */
export const getGrammarByLevelId = (levelId: string): GrammarPoint[] => {
  const grammarMap: Record<string, string[]> = {
    'L1': ['tense-present-simple', 'tense-present-continuous', 'tense-present-perfect'],
    'L2': ['attributive-clause-basic'],
    'L3': ['noun-plural', 'article-usage'],
    'L4': ['imperative-mood', 'preposition-time'],
    'L5': ['comparison-adjective', 'comparison-adverb'],
    'L6': ['modal-ability', 'passive-voice-basic'],
    'L7': ['conditional-if', 'conditional-unless'],
    'L8': ['modal-obligation', 'modal-probability'],
    'L9': ['past-simple', 'past-continuous', 'past-perfect'],
    'L10': ['reported-speech', 'indirect-question']
  };
  
  const grammarIds = grammarMap[levelId] || [];
  return grammarIds.map(id => getGrammarById(id)).filter(Boolean) as GrammarPoint[];
};

export default GRAMMAR_POINTS;
