import { 
  LevelConfig, 
  ExamType, 
  CEFRLevel, 
  LearningPhase, 
  FeynmanStage,
  QuestionType
} from '../../types';

/**
 * 玛蒂尔达英语学习游戏 - 关卡配置
 * 基于 PRD v3.0 设计，L1-L10 完整五步学习循环
 */
export const LEVEL_CONFIGS: LevelConfig[] = [
  // ============================================================
  // L1: 时态综合 - 一般现在时/进行时/完成时
  // 学习目标：150个B1级别中考核心词 + 时态语法
  // ============================================================
  {
    levelId: 'L1',
    chapter: 1,
    title: '阅读天才',
    titleEn: 'The Reader',
    storyBackground: '2岁的玛蒂尔达已经能自己阅读报纸，父母却完全不关心。她渴望通过阅读来探索世界的奥秘。今天，她需要帮助父母理解英文报纸上的内容...',
    storyProgress: '玛蒂尔达成功地帮助父母理解了报纸内容，还向他们解释了报纸上的时态用法。父母惊讶地发现女儿的语言天赋！玛蒂尔达获得了"小书虫"称号。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 1,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '今天，玛蒂尔达的爸爸带回了一张英文报纸。爸爸妈妈看着报纸上的文章，完全看不懂内容，显得很困惑。',
          dialogue: [
            { speaker: '爸爸', text: '这篇报纸到底在说些什么？我完全看不懂！' },
            { speaker: '妈妈', text: '要是有人能帮我们解释一下就好了。' },
            { speaker: '玛蒂尔达', text: '让我来试试吧！我可以帮你们读懂这些文章。' }
          ],
          scene: '客厅里，爸爸妈妈坐在沙发上看着一张英文报纸，玛蒂尔达走过去拿起报纸'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['read', 'newspaper', 'understand', 'write', 'study', 'learn', 'know', 'work', 'live', 'play', 'help', 'want', 'think', 'believe', 'love', 'like', 'hate', 'start', 'finish', 'come', 'go', 'see', 'hear', 'feel', 'smell', 'look', 'seem', 'become', 'leave', 'bring', 'take', 'find', 'give', 'tell', 'say', 'make', 'let', 'get', 'keep', 'hold', 'put', 'set', 'turn', 'show', 'meet', 'pay', 'meet', 'stand', 'sit', 'speak', 'write', 'read', 'listen', 'watch', 'cook', 'walk', 'run', 'jump', 'swim', 'fly', 'climb', 'drive', 'ride', 'travel', 'visit', 'explore', 'discover', 'imagine', 'create', 'build', 'draw', 'paint', 'sing', 'dance', 'act', 'teach', 'explain', 'describe', 'answer', 'ask', 'question', 'discuss', 'debate', 'agree', 'disagree', 'promise', 'hope', 'wish', 'expect', 'dream', 'decide', 'choose', 'plan', 'try', 'practice', 'exercise', 'train', 'develop', 'improve', 'change', 'grow', 'increase', 'decrease', 'rise', 'fall', 'raise', 'drop', 'add', 'mix', 'cut', 'break', 'fix', 'repair', 'clean', 'wash', 'dress', 'wear', 'carry', 'load', 'unload', 'pack', 'unpack', 'open', 'close', 'lock', 'unlock', 'enter', 'exit', 'arrive', 'reach', 'depart', 'return', 'escape', 'hide', 'seek', 'search', 'rescue', 'save', 'protect', 'defend', 'attack', 'fight', 'win', 'lose', 'compete', 'race', 'chat', 'talk', 'call', 'phone', 'email', 'message', 'send', 'receive', 'accept', 'refuse', 'offer', 'share', 'trade', 'buy', 'sell', 'cost', 'pay', 'save', 'spend', 'waste', 'earn', 'invest'],
          grammar: ['tense-present-simple', 'tense-present-continuous', 'tense-present-perfect'],
          questionIds: ['g1-001', 'g1-002', 'g1-003'],
          context: '在阅读报纸的过程中，玛蒂尔达发现文章使用了不同的时态来描述事件。她决定向小弟弟解释这些时态的区别。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['read', 'write', 'study', 'learn', 'work', 'play', 'help'],
          grammar: ['tense-present-simple', 'tense-present-continuous', 'tense-present-perfect'],
          teachingPrompt: '玛蒂尔达需要向小弟弟解释三种基本时态的区别。请用简单易懂的语言解释：1) 一般现在时 - 描述经常发生的动作和事实 2) 现在进行时 - 描述正在发生的动作 3) 现在完成时 - 描述过去发生但影响现在的动作',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '小弟弟听完后，眼睛里闪着光。玛蒂尔达成功地用简单的话语解释了复杂的时态概念。',
          dialogue: [
            { speaker: '小弟弟', text: '原来是这样！我现在明白了！' },
            { speaker: '爸爸', text: '玛蒂尔达，你太厉害了！' },
            { speaker: '妈妈', text: '我们为你骄傲，宝贝！' }
          ],
          scene: '全家人围绕在一起，玛蒂尔达成为了家庭的"小老师"'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.READING_CLOZE, QuestionType.GRAMMAR_CHOICE],
          questionCount: 10,
          passingScore: 70,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: undefined
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 15,
        reading: 10,
        listening: 0,
        writing: 5,
        speaking: 0
      },
      storyUnlocks: '小书虫称号'
    }
  },

  // ============================================================
  // L2: 定语从句
  // 学习目标：150词 + 定语从句语法
  // ============================================================
  {
    levelId: 'L2',
    chapter: 2,
    title: '家庭的秘密',
    titleEn: 'The Secret',
    storyBackground: '玛蒂尔达发现父亲在二手车生意中欺骗顾客。她需要理解合同上的复杂句子，尤其是包含定语从句的条款。她决定向父母解释这些条款的含义...',
    storyProgress: '玛蒂尔达成功地解释了合同中的定语从句，帮助家人理解了条款内容。她揭示了父亲的欺诈行为，全家人陷入了沉思。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 2,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达在爸爸的书桌上发现了一份汽车销售合同。合同里充满了复杂的句子，她决定仔细研究这些条款。',
          dialogue: [
            { speaker: '玛蒂尔达', text: '这份合同上的句子好复杂啊！' },
            { speaker: '爸爸', text: '小孩子懂什么，别乱动我的文件！' }
          ],
          scene: '爸爸的书房，玛蒂尔达拿着合同仔细阅读'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['contract', 'agreement', 'customer', 'seller', 'car', 'vehicle', 'deal', 'business', 'company', 'trade', 'sign', 'write', 'promise', 'guarantee', 'condition', 'term', 'rule', 'law', 'right', 'duty', 'responsibility', 'person', 'who', 'which', 'that', 'whom', 'whose'],
          grammar: ['attributive-clause-basic'],
          questionIds: ['g2-001', 'g2-002'],
          context: '玛蒂尔达发现合同中有很多定语从句，用来描述汽车和顾客的条件。她需要理解这些从句才能揭露父亲的欺诈行为。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['who', 'which', 'that', 'whom', 'whose'],
          grammar: ['attributive-clause-basic'],
          teachingPrompt: '向小弟弟解释什么是定语从句：1) 定语从句就像一个形容词，用来修饰名词 2) 用who/that指人，which/that指物 3) 关系代词引导从句，修饰前面的名词',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '小弟弟似懂非懂地点点头。玛蒂尔达继续研究合同，发现了更多问题条款。',
          dialogue: [
            { speaker: '玛蒂尔达', text: '我明白了！这条款说的是"买了有问题的车的顾客，可以要求退款"' },
            { speaker: '爸爸', text: '这...这是商业机密！' }
          ],
          scene: '玛蒂尔达揭示了合同中的陷阱条款'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.GRAMMAR_CHOICE, QuestionType.READING_CHOICE],
          questionCount: 10,
          passingScore: 70,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L1'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 15,
        reading: 10,
        listening: 0,
        writing: 5,
        speaking: 0
      },
      storyUnlocks: '小侦探称号'
    }
  },

  // L3-L10 简略配置（后续可扩展）
  {
    levelId: 'L3',
    chapter: 3,
    title: '图书馆大冒险',
    titleEn: 'The Library',
    storyBackground: '玛蒂尔达独自前往图书馆，开始了她的阅读之旅。她需要阅读各种书籍来扩展词汇量。',
    storyProgress: '玛蒂尔达在图书馆遇到了Mrs. Phelps，开始了她的阅读冒险。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 2,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达走进社区图书馆，被眼前的书籍海洋深深吸引。',
          dialogue: [
            { speaker: 'Mrs. Phelps', text: '欢迎来到图书馆，小姑娘！你喜欢什么书？' },
            { speaker: '玛蒂尔达', text: '我想读所有的书！' }
          ],
          scene: '社区图书馆内部'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['library', 'book', 'read', 'story', 'author', 'character', 'chapter', 'page', 'picture', 'word', 'sentence', 'paragraph', 'title', 'cover'],
          grammar: ['noun-plural', 'article-usage'],
          questionIds: ['g3-001'],
          context: '在阅读儿童文学作品时，玛蒂尔达遇到了各种词汇和语法点。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['library', 'book', 'read', 'story'],
          grammar: ['noun-plural', 'article-usage'],
          teachingPrompt: '向Mrs. Phelps介绍你最喜欢的书，用上我们学过的词汇和语法。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: 'Mrs. Phelps被玛蒂尔达的阅读热情和表达能力所打动。',
          dialogue: [
            { speaker: 'Mrs. Phelps', text: '你真是一个阅读天才！我推荐你读这些书。' }
          ],
          scene: 'Mrs. Phelps为玛蒂尔达推荐书籍'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.VOCAB_CHOICE],
          questionCount: 10,
          passingScore: 70,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L2'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 15,
        grammar: 5,
        reading: 15,
        listening: 0,
        writing: 5,
        speaking: 0
      },
      storyUnlocks: '图书馆通行证'
    }
  },

  {
    levelId: 'L4',
    chapter: 4,
    title: '新学校挑战',
    titleEn: 'The School',
    storyBackground: '5岁的玛蒂尔达上小学了，她需要适应新环境并学习新的社交词汇。',
    storyProgress: '玛蒂尔达认识了新朋友，开始了学校生活。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 2,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达第一天上学，面对全新的环境既兴奋又紧张。',
          dialogue: [
            { speaker: '老师', text: '同学们，这是新来的玛蒂尔达。' },
            { speaker: '玛蒂尔达', text: '大家好！我喜欢学习！' }
          ],
          scene: '学校教室'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['school', 'class', 'teacher', 'student', 'friend', 'desk', 'chair', 'book', 'pencil', 'homework', 'test', 'grade', 'learn', 'study', 'practice', 'repeat', 'remember', 'understand', 'explain', 'answer', 'question', 'ask'],
          grammar: ['imperative-mood', 'preposition-time'],
          questionIds: ['g4-001'],
          context: '在学校环境中学习日常用语和祈使句。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['school', 'class', 'teacher', 'student'],
          grammar: ['imperative-mood', 'preposition-time'],
          teachingPrompt: '向新同学介绍学校的生活，用上我们学的词汇和祈使句。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达很快交到了朋友，适应了学校生活。',
          dialogue: [
            { speaker: '同学', text: '玛蒂尔达，你好厉害！' }
          ],
          scene: '下课时间，同学们在一起玩耍'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.GRAMMAR_CHOICE],
          questionCount: 10,
          passingScore: 70,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L3'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 10,
        reading: 10,
        listening: 0,
        writing: 10,
        speaking: 0
      },
      storyUnlocks: '小学生身份'
    }
  },

  {
    levelId: 'L5',
    chapter: 5,
    title: '蜂蜜老师的友谊',
    titleEn: 'Miss Honey',
    storyBackground: '玛蒂尔达遇到了理解她的Miss Honey老师，两人建立了深厚的友谊。',
    storyProgress: 'Miss Honey发现了玛蒂尔达的天赋，决定特别培养她。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 2,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: 'Miss Honey是新来的年轻老师，她很快注意到玛蒂尔达的与众不同。',
          dialogue: [
            { speaker: 'Miss Honey', text: '玛蒂尔达，你写的故事真精彩！' },
            { speaker: '玛蒂尔达', text: '谢谢老师！我很喜欢写作。' }
          ],
          scene: '教室一角，Miss Honey批改作业'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['teacher', 'student', 'homework', 'test', 'exam', 'score', 'grade', 'subject', 'math', 'english', 'science', 'history', 'write', 'story', 'poem', 'essay', 'composition', 'creative', 'imagine', 'dream', 'hope', 'wish'],
          grammar: ['comparison-adjective', 'comparison-adverb'],
          questionIds: ['g5-001'],
          context: '学习比较级和最高级的用法，描述事物之间的比较。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['teacher', 'student', 'write', 'story'],
          grammar: ['comparison-adjective', 'comparison-adverb'],
          teachingPrompt: '向Miss Honey描述你和朋友们，用上比较级和最高级。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: 'Miss Honey对玛蒂尔达的才华印象深刻，决定给予特别指导。',
          dialogue: [
            { speaker: 'Miss Honey', text: '你是最聪明的学生之一！我相信你会有出色的未来。' }
          ],
          scene: 'Miss Honey办公室'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.GRAMMAR_CHOICE, QuestionType.READING_CHOICE],
          questionCount: 10,
          passingScore: 70,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L4'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 15,
        reading: 10,
        listening: 0,
        writing: 15,
        speaking: 0
      },
      storyUnlocks: '天赋认证'
    }
  },

  {
    levelId: 'L6',
    chapter: 6,
    title: '意念觉醒',
    titleEn: 'The Power',
    storyBackground: '玛蒂尔达发现自己在极度愤怒时能用意念移动物体。她的超能力觉醒了！',
    storyProgress: '玛蒂尔达开始学习控制她的超能力。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 3,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '当爸爸又一次嘲笑玛蒂尔达时，她突然感到一股强大的力量...',
          dialogue: [
            { speaker: '爸爸', text: '女孩子读什么书！' },
            { speaker: '玛蒂尔达', text: '(内心愤怒) 不许你这么说！' }
          ],
          scene: '家里客厅，父女对峙'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['power', 'mind', 'thought', 'move', 'lift', 'push', 'pull', 'force', 'energy', 'control', 'focus', 'concentrate', 'calm', 'anger', 'angry', 'feel', 'sense', 'ability', 'strong', 'weak', 'quiet', 'silent', 'loud', 'noise'],
          grammar: ['modal-ability', 'passive-voice-basic'],
          questionIds: ['g6-001'],
          context: '学习情态动词can/could表示能力，以及被动语态的基础用法。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['power', 'mind', 'control', 'ability'],
          grammar: ['modal-ability', 'passive-voice-basic'],
          teachingPrompt: '向小弟弟解释意念移物的原理，用can/could和被动语态。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达成功地用意念移动了铅笔刀，小弟弟惊讶得说不出话。',
          dialogue: [
            { speaker: '小弟弟', text: '太神奇了！你是怎么做到的？' }
          ],
          scene: '玛蒂尔达的卧室'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.GRAMMAR_CHOICE, QuestionType.READING_CHOICE],
          questionCount: 10,
          passingScore: 75,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L5'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 15,
        reading: 10,
        listening: 0,
        writing: 5,
        speaking: 0
      },
      storyUnlocks: '意念之力'
    }
  },

  {
    levelId: 'L7',
    chapter: 7,
    title: '对抗川奇布校长',
    titleEn: 'The Trunchbull',
    storyBackground: '川奇布校长是学校的暴君，玛蒂尔达决定用智慧对抗她，保护同学们。',
    storyProgress: '玛蒂尔达设计了一个巧妙的恶作剧来教训校长。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 3,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '川奇布校长正在惩罚一个学生，玛蒂尔达决定站出来。',
          dialogue: [
            { speaker: '川奇布', text: '违反校规！给我站着！' },
            { speaker: '玛蒂尔达', text: '校长，这惩罚太重了！' }
          ],
          scene: '学校走廊'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['principal', 'school', 'rule', 'punish', 'punishment', 'fair', 'unfair', 'right', 'wrong', 'decide', 'plan', 'prank', 'trick', 'joke', 'laugh', 'smile', 'cry', 'sad', 'happy', 'brave', 'courage', 'afraid', 'fear', 'protect', 'defend', 'help', 'save'],
          grammar: ['conditional-if', 'conditional-unless'],
          questionIds: ['g7-001'],
          context: '学习条件句if和unless的用法，计划如何执行恶作剧。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['plan', 'prank', 'trick', 'brave'],
          grammar: ['conditional-if', 'conditional-unless'],
          teachingPrompt: '向朋友们解释你的恶作剧计划，用条件句来描述步骤。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '恶作剧成功了！川奇布校长出丑，同学们欢呼雀跃。',
          dialogue: [
            { speaker: '同学们', text: '玛蒂尔达万岁！' }
          ],
          scene: '学校礼堂'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.GRAMMAR_CHOICE, QuestionType.READING_CHOICE],
          questionCount: 10,
          passingScore: 75,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L6'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 15,
        reading: 10,
        listening: 0,
        writing: 10,
        speaking: 0
      },
      storyUnlocks: '小英雄称号'
    }
  },

  {
    levelId: 'L8',
    chapter: 8,
    title: '拯救朋友',
    titleEn: 'The Champion',
    storyBackground: 'Bruce被校长强迫吃巨大的巧克力蛋糕，玛蒂尔达决定帮助他。',
    storyProgress: '在大家的帮助下，Bruce吃完了蛋糕，成为了英雄。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 3,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '川奇布校长强迫Bruce吃下巨大的巧克力蛋糕作为惩罚。',
          dialogue: [
            { speaker: '川奇布', text: '吃不完不许走！' },
            { speaker: 'Bruce', text: '我...我吃不完...呜呜' }
          ],
          scene: '学校食堂'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['friend', 'help', 'support', 'encourage', 'cheer', 'team', 'together', '努力', 'try', 'finish', 'complete', 'success', 'fail', 'winner', 'champion', 'brave', 'strong', 'power', 'energy', 'food', 'eat', 'drink', 'cake', 'chocolate', 'taste', 'delicious', 'hungry', 'thirsty'],
          grammar: ['modal-obligation', 'modal-probability'],
          questionIds: ['g8-001'],
          context: '学习情态动词must/have to表示义务，might/may表示可能性。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['friend', 'help', 'support', 'team'],
          grammar: ['modal-obligation', 'modal-probability'],
          teachingPrompt: '向其他同学解释如何帮助Bruce，用must/have to和might/may。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '在同学们的鼓励下，Bruce终于吃完了蛋糕！',
          dialogue: [
            { speaker: '同学们', text: 'Bruce！你太棒了！' },
            { speaker: 'Bruce', text: '是你们帮了我！谢谢大家！' }
          ],
          scene: '食堂，Bruce举着空盘子'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.GRAMMAR_CHOICE],
          questionCount: 10,
          passingScore: 75,
          timeLimit: 600
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L7'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 10,
        grammar: 10,
        reading: 10,
        listening: 0,
        writing: 10,
        speaking: 0
      },
      storyUnlocks: '团队精神'
    }
  },

  {
    levelId: 'L9',
    chapter: 9,
    title: '小屋探险',
    titleEn: 'The Cottage',
    storyBackground: 'Miss Honey带玛蒂尔达去她的小屋，揭露她与川奇布校长的关系。',
    storyProgress: '玛蒂尔达发现了重要的秘密，为最终对决做准备。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 4,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: 'Miss Honey带玛蒂尔达来到她童年的小屋，揭示了一个惊人的秘密。',
          dialogue: [
            { speaker: 'Miss Honey', text: '玛蒂尔达，我要告诉你我的故事...' },
            { speaker: '玛蒂尔达', text: '老师，发生什么事了？' }
          ],
          scene: '乡间小屋'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['cottage', 'childhood', 'family', 'secret', 'story', 'past', 'history', 'inherit', 'property', 'land', 'house', 'home', 'room', 'door', 'window', 'key', 'lock', 'hidden', 'discover', 'truth', 'lie', 'trust', 'believe'],
          grammar: ['past-simple', 'past-continuous', 'past-perfect'],
          questionIds: ['g9-001'],
          context: '学习过去时态的用法，讲述过去的故事。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['cottage', 'secret', 'family', 'story'],
          grammar: ['past-simple', 'past-continuous', 'past-perfect'],
          teachingPrompt: '用自己的话向小弟弟讲述Miss Honey的故事，用上过去时态。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达终于明白了全部真相，她决定帮助Miss Honey。',
          dialogue: [
            { speaker: '玛蒂尔达', text: '我一定会帮你讨回公道的！' }
          ],
          scene: '小屋门口'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.GRAMMAR_CHOICE],
          questionCount: 12,
          passingScore: 80,
          timeLimit: 720
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L8'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 15,
        grammar: 20,
        reading: 15,
        listening: 0,
        writing: 10,
        speaking: 0
      },
      storyUnlocks: '真相之钥'
    }
  },

  {
    levelId: 'L10',
    chapter: 10,
    title: '最终对决',
    titleEn: 'The Final Battle',
    storyBackground: '玛蒂尔达决定用超能力彻底击败川奇布校长，揭露她的罪行。',
    storyProgress: '正义战胜邪恶，玛蒂尔达和Miss Honey获得了幸福。',
    targetExam: ExamType.ZHONGKAO,
    cefrLevel: CEFRLevel.B1,
    difficulty: 5,
    learningFlow: [
      {
        phase: LearningPhase.STORY_INTRO,
        duration: 2,
        storyIntro: {
          narrative: '玛蒂尔达和Miss Honey制定了最终计划，准备揭露川奇布校长的罪行。',
          dialogue: [
            { speaker: '玛蒂尔达', text: '今晚就是我们行动的时候！' },
            { speaker: 'Miss Honey', text: '一定要小心行事。' }
          ],
          scene: 'Miss Honey的房间'
        }
      },
      {
        phase: LearningPhase.SITUATION_INPUT,
        duration: 8,
        situationInput: {
          vocabulary: ['plan', 'action', 'final', 'win', 'lose', 'fight', 'battle', 'justice', 'truth', 'evidence', 'proof', 'crime', 'criminal', 'police', 'law', 'court', 'judge', 'guilty', 'innocent', 'punish', 'reward', 'happy', 'ending', 'story', 'conclusion', 'chapter'],
          grammar: ['reported-speech', 'indirect-question'],
          questionIds: ['g10-001'],
          context: '学习间接引语的用法，准备揭露罪行。'
        }
      },
      {
        phase: LearningPhase.FEYNMAN_OUTPUT,
        duration: 10,
        feynmanOutput: {
          stage: FeynmanStage.TEACH,
          vocabulary: ['plan', 'action', 'justice', 'truth'],
          grammar: ['reported-speech', 'indirect-question'],
          teachingPrompt: '向小弟弟解释整个计划，用间接引语来转述对话。',
          rubric: {
            completeness: 40,
            accuracy: 30,
            simplicity: 20,
            creativity: 10
          }
        }
      },
      {
        phase: LearningPhase.STORY_PROGRESS,
        duration: 2,
        storyIntro: {
          narrative: '计划成功了！川奇布校长承认罪行并离开了学校。',
          dialogue: [
            { speaker: '川奇布', text: '我...我承认...我输了...' },
            { speaker: '同学们', text: '玛蒂尔达！Miss Honey！万岁！' }
          ],
          scene: '学校礼堂'
        }
      },
      {
        phase: LearningPhase.ASSESSMENT,
        duration: 3,
        assessment: {
          questionTypes: [QuestionType.READING_CHOICE, QuestionType.GRAMMAR_CHOICE, QuestionType.WRITING],
          questionCount: 15,
          passingScore: 85,
          timeLimit: 900
        }
      }
    ],
    unlockCondition: {
      type: 'level_complete',
      levelId: 'L9'
    },
    rewards: {
      abilityPoints: {
        vocabulary: 20,
        grammar: 25,
        reading: 20,
        listening: 0,
        writing: 15,
        speaking: 0
      },
      storyUnlocks: '完结篇 - 正义英雄'
    }
  }
];

/**
 * 根据levelId获取关卡配置
 */
export const getLevelConfig = (levelId: string): LevelConfig | undefined => {
  return LEVEL_CONFIGS.find(config => config.levelId === levelId);
};

/**
 * 获取所有关卡ID列表
 */
export const getAllLevelIds = (): string[] => {
  return LEVEL_CONFIGS.map(config => config.levelId);
};

/**
 * 获取关卡的下一个关卡ID
 */
export const getNextLevelId = (currentLevelId: string): string | undefined => {
  const currentIndex = LEVEL_CONFIGS.findIndex(config => config.levelId === currentLevelId);
  if (currentIndex >= 0 && currentIndex < LEVEL_CONFIGS.length - 1) {
    return LEVEL_CONFIGS[currentIndex + 1].levelId;
  }
  return undefined;
};

/**
 * 获取关卡的前置关卡ID
 */
export const getPrevLevelId = (currentLevelId: string): string | undefined => {
  const currentIndex = LEVEL_CONFIGS.findIndex(config => config.levelId === currentLevelId);
  if (currentIndex > 0) {
    return LEVEL_CONFIGS[currentIndex - 1].levelId;
  }
  return undefined;
};

export default LEVEL_CONFIGS;
