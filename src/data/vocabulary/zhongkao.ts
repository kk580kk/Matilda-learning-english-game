import { Word, ExamType, CEFRLevel, WordPartOfSpeech } from '../../types';

/**
 * 中考核心词汇 150 词
 * 主要用于 L1-L2 关卡，包含时态学习和定语从句所需的词汇
 */
export const WORDS: Word[] = [
  // ============================================================
  // 基础高频动词 (50词)
  // ============================================================
  {
    id: 'w001',
    word: 'be',
    phonetic: '/biː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '是，存在',
        example: 'I am a student.',
        chinese: '我是一名学生。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w002',
    word: 'have',
    phonetic: '/hæv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '有',
        example: 'I have a book.',
        chinese: '我有一本书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w003',
    word: 'do',
    phonetic: '/duː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '做',
        example: 'I do my homework every day.',
        chinese: '我每天做作业。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w004',
    word: 'say',
    phonetic: '/seɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '说',
        example: 'She says hello to me.',
        chinese: '她向我问好。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w005',
    word: 'get',
    phonetic: '/ɡet/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '得到',
        example: 'I get a gift on my birthday.',
        chinese: '我生日时得到一份礼物。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w006',
    word: 'make',
    phonetic: '/meɪk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '制作',
        example: 'My mother makes breakfast every morning.',
        chinese: '我妈妈每天早上做早餐。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w007',
    word: 'go',
    phonetic: '/ɡəʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '去',
        example: 'I go to school every day.',
        chinese: '我每天去学校。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w008',
    word: 'know',
    phonetic: '/nəʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '知道',
        example: 'I know the answer.',
        chinese: '我知道答案。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w009',
    word: 'take',
    phonetic: '/teɪk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '拿',
        example: 'Please take this book.',
        chinese: '请拿这本书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w010',
    word: 'see',
    phonetic: '/siː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '看见',
        example: 'I can see the bird.',
        chinese: '我能看见那只鸟。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w011',
    word: 'come',
    phonetic: '/kʌm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '来',
        example: 'Please come here.',
        chinese: '请到这里来。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w012',
    word: 'want',
    phonetic: '/wɒnt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '想要',
        example: 'I want to learn English.',
        chinese: '我想学英语。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w013',
    word: 'look',
    phonetic: '/lʊk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '看',
        example: 'Look at the picture.',
        chinese: '看这张图片。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w014',
    word: 'use',
    phonetic: '/juːz/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '使用',
        example: 'We use computers every day.',
        chinese: '我们每天使用电脑。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w015',
    word: 'find',
    phonetic: '/faɪnd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '找到',
        example: 'I found my lost book.',
        chinese: '我找到了丢失的书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w016',
    word: 'give',
    phonetic: '/ɡɪv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '给',
        example: 'I give her a gift.',
        chinese: '我给她一份礼物。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w017',
    word: 'tell',
    phonetic: '/tel/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '告诉',
        example: 'Tell me your name.',
        chinese: '告诉我你的名字。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w018',
    word: 'think',
    phonetic: '/θɪŋk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '认为',
        example: 'I think this is good.',
        chinese: '我认为这很好。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w019',
    word: 'say',
    phonetic: '/seɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '说',
        example: 'What did she say?',
        chinese: '她说了什么？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w020',
    word: 'try',
    phonetic: '/traɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '尝试',
        example: 'I will try my best.',
        chinese: '我会尽最大努力。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // ============================================================
  // 更多高频动词 (30词)
  // ============================================================
  {
    id: 'w021',
    word: 'need',
    phonetic: '/niːd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '需要',
        example: 'I need your help.',
        chinese: '我需要你的帮助。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w022',
    word: 'feel',
    phonetic: '/fiːl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '感觉',
        example: 'I feel happy today.',
        chinese: '我今天感到开心。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w023',
    word: 'become',
    phonetic: '/bɪˈkʌm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '变成',
        example: 'She becomes a teacher.',
        chinese: '她成为了一名老师。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w024',
    word: 'leave',
    phonetic: '/liːv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '离开',
        example: 'I leave school at 5pm.',
        chinese: '我下午5点离开学校。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w025',
    word: 'put',
    phonetic: '/pʊt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '放',
        example: 'Put the book on the desk.',
        chinese: '把书放在桌子上。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w026',
    word: 'keep',
    phonetic: '/kiːp/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '保持',
        example: 'Keep quiet in the library.',
        chinese: '在图书馆保持安静。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w027',
    word: 'let',
    phonetic: '/let/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '让',
        example: 'Let me help you.',
        chinese: '让我帮你。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w028',
    word: 'begin',
    phonetic: '/bɪˈɡɪn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '开始',
        example: 'The class begins at 8am.',
        chinese: '8点开始上课。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w029',
    word: 'seem',
    phonetic: '/siːm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '似乎',
        example: 'You seem happy.',
        chinese: '你看起来很开心。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w030',
    word: 'help',
    phonetic: '/help/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '帮助',
        example: 'Can you help me?',
        chinese: '你能帮我吗？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w031',
    word: 'show',
    phonetic: '/ʃəʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '展示',
        example: 'Show me your work.',
        chinese: '给我看看你的作品。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w032',
    word: 'hear',
    phonetic: '/hɪə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '听见',
        example: 'I hear a strange noise.',
        chinese: '我听到一个奇怪的声音。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w033',
    word: 'play',
    phonetic: '/pleɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '玩',
        example: 'Children like to play games.',
        chinese: '孩子们喜欢玩游戏。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w034',
    word: 'run',
    phonetic: '/rʌn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '跑',
        example: 'I run every morning.',
        chinese: '我每天早上跑步。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w035',
    word: 'move',
    phonetic: '/muːv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '移动',
        example: 'Please move to the left.',
        chinese: '请移到左边。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w036',
    word: 'live',
    phonetic: '/lɪv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '居住',
        example: 'I live in Beijing.',
        chinese: '我住在北京。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w037',
    word: 'believe',
    phonetic: '/bɪˈliːv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '相信',
        example: 'I believe you.',
        chinese: '我相信你。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w038',
    word: 'bring',
    phonetic: '/brɪŋ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '带来',
        example: 'Bring your book tomorrow.',
        chinese: '明天把你的书带来。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w039',
    word: 'happen',
    phonetic: '/ˈhæpən/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '发生',
        example: 'What happened?',
        chinese: '发生了什么？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w040',
    word: 'write',
    phonetic: '/raɪt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '写',
        example: 'I write a letter.',
        chinese: '我写一封信。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // ============================================================
  // 名词 (40词)
  // ============================================================
  {
    id: 'w041',
    word: 'time',
    phonetic: '/taɪm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '时间',
        example: 'What time is it?',
        chinese: '现在几点了？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w042',
    word: 'year',
    phonetic: '/jɪə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '年',
        example: 'Happy New Year!',
        chinese: '新年快乐！'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w043',
    word: 'people',
    phonetic: '/ˈpiːpəl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '人们',
        example: 'Many people are here.',
        chinese: '很多人都在这里。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w044',
    word: 'way',
    phonetic: '/weɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '方式',
        example: 'This is the best way.',
        chinese: '这是最好的方式。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w045',
    word: 'thing',
    phonetic: '/θɪŋ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '事情',
        example: 'I have many things to do.',
        chinese: '我有很多事情要做。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w046',
    word: 'day',
    phonetic: '/deɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '天',
        example: 'Today is a good day.',
        chinese: '今天是美好的一天。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w047',
    word: 'man',
    phonetic: '/mæn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '男人',
        example: 'The man is tall.',
        chinese: '那个男人很高。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w048',
    word: 'child',
    phonetic: '/tʃaɪld/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '孩子',
        example: 'The child is playing.',
        chinese: '那个孩子在玩耍。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w049',
    word: 'book',
    phonetic: '/bʊk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '书',
        example: 'I like reading books.',
        chinese: '我喜欢读书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w050',
    word: 'eye',
    phonetic: '/aɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '眼睛',
        example: 'She has blue eyes.',
        chinese: '她有蓝色的眼睛。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多名词
  {
    id: 'w051',
    word: 'school',
    phonetic: '/skuːl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '学校',
        example: 'I go to school every day.',
        chinese: '我每天去学校。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w052',
    word: 'home',
    phonetic: '/həʊm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '家',
        example: 'I go home after school.',
        chinese: '放学后我回家。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w053',
    word: 'family',
    phonetic: '/ˈfæməli/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '家庭',
        example: 'I have a happy family.',
        chinese: '我有一个幸福的家庭。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w054',
    word: 'friend',
    phonetic: '/frend/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '朋友',
        example: 'She is my best friend.',
        chinese: '她是我最好的朋友。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w055',
    word: 'teacher',
    phonetic: '/ˈtiːtʃə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '老师',
        example: 'My teacher is kind.',
        chinese: '我的老师很善良。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w056',
    word: 'student',
    phonetic: '/ˈstjuːdənt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '学生',
        example: 'The students are reading.',
        chinese: '学生们正在读书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w057',
    word: 'word',
    phonetic: '/wɜːd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '单词',
        example: 'Learn a new word.',
        chinese: '学一个新单词。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w058',
    word: 'hand',
    phonetic: '/hænd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '手',
        example: 'Raise your hand.',
        chinese: '举起你的手。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w059',
    word: 'place',
    phonetic: '/pleɪs/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '地方',
        example: 'This is a beautiful place.',
        chinese: '这是一个美丽的地方。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w060',
    word: 'case',
    phonetic: '/keɪs/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '情况',
        example: 'In this case, you are right.',
        chinese: '在这种情况下，你是对的。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // ============================================================
  // 形容词 (20词)
  // ============================================================
  {
    id: 'w061',
    word: 'good',
    phonetic: '/ɡʊd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '好的',
        example: 'This is a good book.',
        chinese: '这是一本好书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w062',
    word: 'big',
    phonetic: '/bɪɡ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '大的',
        example: 'This is a big house.',
        chinese: '这是一所大房子。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w063',
    word: 'high',
    phonetic: '/haɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '高的',
        example: 'The mountain is very high.',
        chinese: '这座山很高。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w064',
    word: 'old',
    phonetic: '/əʊld/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '老的',
        example: 'She is an old woman.',
        chinese: '她是一位老妇人。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w065',
    word: 'great',
    phonetic: '/ɡreɪt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '伟大的',
        example: 'He is a great man.',
        chinese: '他是一个伟大的人。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w066',
    word: 'little',
    phonetic: '/ˈlɪtəl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '小的',
        example: 'I have a little dog.',
        chinese: '我有一只小狗。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w067',
    word: 'own',
    phonetic: '/əʊn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '自己的',
        example: 'It is my own book.',
        chinese: '这是我自己的书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w068',
    word: 'right',
    phonetic: '/raɪt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '正确的',
        example: 'Your answer is right.',
        chinese: '你的答案是正确的。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w069',
    word: 'new',
    phonetic: '/njuː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '新的',
        example: 'I bought a new bike.',
        chinese: '我买了一辆新自行车。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w070',
    word: 'young',
    phonetic: '/jʌŋ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '年轻的',
        example: 'She is a young teacher.',
        chinese: '她是一位年轻的老师。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多形容词
  {
    id: 'w071',
    word: 'happy',
    phonetic: '/ˈhæpi/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '开心的',
        example: 'I am very happy today.',
        chinese: '我今天非常开心。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w072',
    word: 'sad',
    phonetic: '/sæd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '悲伤的',
        example: 'She looks sad.',
        chinese: '她看起来很悲伤。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w073',
    word: 'beautiful',
    phonetic: '/ˈbjuːtɪfəl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '美丽的',
        example: 'This flower is beautiful.',
        chinese: '这朵花很美丽。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w074',
    word: 'interesting',
    phonetic: '/ˈɪntrəstɪŋ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '有趣的',
        example: 'This book is interesting.',
        chinese: '这本书很有趣。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w075',
    word: 'important',
    phonetic: '/ɪmˈpɔːtənt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '重要的',
        example: 'This is very important.',
        chinese: '这很重要。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w076',
    word: 'different',
    phonetic: '/ˈdɪfərənt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '不同的',
        example: 'We have different ideas.',
        chinese: '我们有不同的想法。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w077',
    word: 'difficult',
    phonetic: '/ˈdɪfɪkəlt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '困难的',
        example: 'This question is difficult.',
        chinese: '这个问题很难。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w078',
    word: 'easy',
    phonetic: '/ˈiːzi/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '简单的',
        example: 'This problem is easy.',
        chinese: '这个问题很简单。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w079',
    word: 'fast',
    phonetic: '/fɑːst/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '快的',
        example: 'He runs very fast.',
        chinese: '他跑得很快。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w080',
    word: 'slow',
    phonetic: '/sləʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADJECTIVE,
        definition: '慢的',
        example: 'This car is very slow.',
        chinese: '这辆车很慢。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // ============================================================
  // 副词和介词 (30词)
  // ============================================================
  {
    id: 'w081',
    word: 'also',
    phonetic: '/ˈɔːlsəʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '也',
        example: 'I also like music.',
        chinese: '我也喜欢音乐。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w082',
    word: 'very',
    phonetic: '/ˈveri/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '非常',
        example: 'I am very happy.',
        chinese: '我非常开心。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w083',
    word: 'only',
    phonetic: '/ˈəʊnli/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '只',
        example: 'I only have one apple.',
        chinese: '我只有一个苹果。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w084',
    word: 'really',
    phonetic: '/ˈriːəli/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '真的',
        example: 'I really like it.',
        chinese: '我真的喜欢它。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w085',
    word: 'often',
    phonetic: '/ˈɒfən/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '经常',
        example: 'I often read books.',
        chinese: '我经常读书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w086',
    word: 'always',
    phonetic: '/ˈɔːlweɪz/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '总是',
        example: 'She always helps others.',
        chinese: '她总是帮助别人。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w087',
    word: 'sometimes',
    phonetic: '/ˈsʌmtaɪmz/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '有时',
        example: 'Sometimes I go to the park.',
        chinese: '有时我去公园。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w088',
    word: 'never',
    phonetic: '/ˈnevə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '从不',
        example: 'I never eat fast food.',
        chinese: '我从不吃快餐。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w089',
    word: 'still',
    phonetic: '/stɪl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '仍然',
        example: 'I still love you.',
        chinese: '我仍然爱你。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w090',
    word: 'together',
    phonetic: '/təˈɡeðə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.ADVERB,
        definition: '一起',
        example: "Let's go together.",
        chinese: '我们一起走吧。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多副词和介词
  {
    id: 'w091',
    word: 'in',
    phonetic: '/ɪn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '在...里面',
        example: 'The book is in the bag.',
        chinese: '书在包里。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w092',
    word: 'on',
    phonetic: '/ɒn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '在...上面',
        example: 'The book is on the table.',
        chinese: '书在桌子上。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w093',
    word: 'at',
    phonetic: '/æt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '在',
        example: 'I am at school.',
        chinese: '我在学校。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w094',
    word: 'to',
    phonetic: '/tuː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '到',
        example: 'I go to school.',
        chinese: '我去学校。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w095',
    word: 'from',
    phonetic: '/frɒm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '从',
        example: 'I am from China.',
        chinese: '我来自中国。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w096',
    word: 'with',
    phonetic: '/wɪð/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '和',
        example: 'I go with my friend.',
        chinese: '我和朋友一起去。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w097',
    word: 'for',
    phonetic: '/fɔː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '为了',
        example: 'This is for you.',
        chinese: '这是给你的。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w098',
    word: 'about',
    phonetic: '/əˈbaʊt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '关于',
        example: 'Tell me about your day.',
        chinese: '告诉我你今天怎么样。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w099',
    word: 'after',
    phonetic: '/ˈɑːftə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '在...之后',
        example: 'I play after school.',
        chinese: '放学后我玩。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w100',
    word: 'before',
    phonetic: '/bɪˈfɔː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PREPOSITION,
        definition: '在...之前',
        example: 'I study before dinner.',
        chinese: '晚饭前我学习。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多词汇补足到150词
  {
    id: 'w101',
    word: 'because',
    phonetic: '/bɪˈkɒz/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '因为',
        example: 'I study hard because I want to pass the exam.',
        chinese: '我努力学习因为我想通过考试。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w102',
    word: 'when',
    phonetic: '/wen/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '当...时',
        example: 'When I grow up, I want to be a teacher.',
        chinese: '当我长大后，我想成为一名老师。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w103',
    word: 'if',
    phonetic: '/ɪf/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '如果',
        example: 'If it rains, I will stay at home.',
        chinese: '如果下雨，我会待在家里。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w104',
    word: 'but',
    phonetic: '/bʌt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '但是',
        example: 'I like it but my sister does not.',
        chinese: '我喜欢它，但我妹妹不喜欢。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w105',
    word: 'or',
    phonetic: '/ɔː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '或者',
        example: 'Do you want tea or coffee?',
        chinese: '你想要茶还是咖啡？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w106',
    word: 'and',
    phonetic: '/ænd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '和',
        example: 'I like apples and bananas.',
        chinese: '我喜欢苹果和香蕉。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w107',
    word: 'so',
    phonetic: '/səʊ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '所以',
        example: 'I am tired, so I go to bed.',
        chinese: '我累了，所以我去睡觉。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w108',
    word: 'than',
    phonetic: '/ðæn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '比',
        example: 'She is taller than me.',
        chinese: '她比我高。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w109',
    word: 'while',
    phonetic: '/waɪl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '当...时',
        example: 'I read a book while waiting.',
        chinese: '等待时我看书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w110',
    word: 'until',
    phonetic: '/ənˈtaɪl/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.CONJUNCTION,
        definition: '直到',
        example: 'Wait until I come back.',
        chinese: '等到我回来。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 代词和其他
  {
    id: 'w111',
    word: 'I',
    phonetic: '/aɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '我',
        example: 'I am a student.',
        chinese: '我是一名学生。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w112',
    word: 'you',
    phonetic: '/juː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '你',
        example: 'You are my friend.',
        chinese: '你是我的朋友。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w113',
    word: 'he',
    phonetic: '/hiː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '他',
        example: 'He is a teacher.',
        chinese: '他是一名老师。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w114',
    word: 'she',
    phonetic: '/ʃiː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '她',
        example: 'She is my mother.',
        chinese: '她是我妈妈。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w115',
    word: 'it',
    phonetic: '/ɪt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '它',
        example: 'It is a cat.',
        chinese: '它是一只猫。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w116',
    word: 'we',
    phonetic: '/wiː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '我们',
        example: 'We are friends.',
        chinese: '我们是朋友。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w117',
    word: 'they',
    phonetic: '/ðeɪ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '他们',
        example: 'They are students.',
        chinese: '他们是学生。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w118',
    word: 'what',
    phonetic: '/wɒt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '什么',
        example: 'What is your name?',
        chinese: '你叫什么名字？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w119',
    word: 'who',
    phonetic: '/huː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '谁',
        example: 'Who is your teacher?',
        chinese: '谁是你的老师？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w120',
    word: 'which',
    phonetic: '/wɪtʃ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.PRONOUN,
        definition: '哪个',
        example: 'Which book do you like?',
        chinese: '你喜欢哪本书？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多词汇
  {
    id: 'w121',
    word: 'read',
    phonetic: '/riːd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '阅读',
        example: 'I read books every day.',
        chinese: '我每天读书。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w122',
    word: 'study',
    phonetic: '/ˈstʌdi/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '学习',
        example: 'I study English every day.',
        chinese: '我每天学习英语。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w123',
    word: 'learn',
    phonetic: '/lɜːn/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '学习',
        example: 'I learn new words every day.',
        chinese: '我每天学习新单词。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w124',
    word: 'work',
    phonetic: '/wɜːk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '工作',
        example: 'My father works in a bank.',
        chinese: '我爸爸在银行工作。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w125',
    word: 'love',
    phonetic: '/lʌv/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '爱',
        example: 'I love my family.',
        chinese: '我爱我的家人。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w126',
    word: 'like',
    phonetic: '/laɪk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '喜欢',
        example: 'I like playing basketball.',
        chinese: '我喜欢打篮球。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w127',
    word: 'hate',
    phonetic: '/heɪt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '讨厌',
        example: 'I hate waiting.',
        chinese: '我讨厌等待。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w128',
    word: 'start',
    phonetic: '/stɑːt/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '开始',
        example: "Let's start the class.",
        chinese: '让我们开始上课。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w129',
    word: 'finish',
    phonetic: '/ˈfɪnɪʃ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '完成',
        example: 'I finish my homework.',
        chinese: '我完成作业。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w130',
    word: 'understand',
    phonetic: '/ˌʌndəˈstænd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.VERB,
        definition: '理解',
        example: 'I understand what you mean.',
        chinese: '我理解你的意思。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 更多名词补充
  {
    id: 'w131',
    word: 'water',
    phonetic: '/ˈwɔːtə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '水',
        example: 'I want some water.',
        chinese: '我想要一些水。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w132',
    word: 'food',
    phonetic: '/fuːd/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '食物',
        example: 'I like Chinese food.',
        chinese: '我喜欢中国食物。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w133',
    word: 'money',
    phonetic: '/ˈmʌni/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '钱',
        example: 'I need more money.',
        chinese: '我需要更多的钱。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w134',
    word: 'time',
    phonetic: '/taɪm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '时间',
        example: 'What time is it?',
        chinese: '现在几点了？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w135',
    word: 'money',
    phonetic: '/ˈmʌni/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '钱',
        example: "I don't have much money.",
        chinese: '我没有很多钱。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w136',
    word: 'question',
    phonetic: '/ˈkwestʃən/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '问题',
        example: 'I have a question.',
        chinese: '我有一个问题。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w137',
    word: 'answer',
    phonetic: '/ˈɑːnsə/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '答案',
        example: 'Do you know the answer?',
        chinese: '你知道答案吗？'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w138',
    word: 'problem',
    phonetic: '/ˈprɒbləm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '问题',
        example: 'I have a problem.',
        chinese: '我有一个问题。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w139',
    word: 'world',
    phonetic: '/wɜːld/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '世界',
        example: 'The world is beautiful.',
        chinese: '世界是美丽的。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w140',
    word: 'life',
    phonetic: '/laɪf/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '生活',
        example: 'I love my life.',
        chinese: '我爱我的生活。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  // 补充更多常用词
  {
    id: 'w141',
    word: 'house',
    phonetic: '/haʊs/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '房子',
        example: 'This is my house.',
        chinese: '这是我的房子。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w142',
    word: 'car',
    phonetic: '/kɑː/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '汽车',
        example: 'I have a new car.',
        chinese: '我有一辆新车。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w143',
    word: 'city',
    phonetic: '/ˈsɪti/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '城市',
        example: 'Beijing is a big city.',
        chinese: '北京是一个大城市。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w144',
    word: 'country',
    phonetic: '/ˈkʌntri/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '国家',
        example: 'China is my country.',
        chinese: '中国是我的国家。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w145',
    word: 'language',
    phonetic: '/ˈlæŋɡwɪdʒ/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '语言',
        example: 'English is a language.',
        chinese: '英语是一种语言。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w146',
    word: 'story',
    phonetic: '/ˈstɔːri/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '故事',
        example: 'I like reading stories.',
        chinese: '我喜欢读故事。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w147',
    word: 'game',
    phonetic: '/ɡeɪm/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '游戏',
        example: 'This is a fun game.',
        chinese: '这是一个有趣的游戏。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w148',
    word: 'music',
    phonetic: '/ˈmjuːzɪk/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '音乐',
        example: 'I like listening to music.',
        chinese: '我喜欢听音乐。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w149',
    word: 'movie',
    phonetic: '/ˈmuːvi/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '电影',
        example: 'I like watching movies.',
        chinese: '我喜欢看电影。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  },
  {
    id: 'w150',
    word: 'news',
    phonetic: '/njuːz/',
    meanings: [
      {
        partOfSpeech: WordPartOfSpeech.NOUN,
        definition: '新闻',
        example: 'I watch the news every day.',
        chinese: '我每天看新闻。'
      }
    ],
    examTypes: [ExamType.ZHONGKAO],
    cefrLevel: CEFRLevel.A1,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReviewDate: new Date().toISOString(),
    correctCount: 0,
    incorrectCount: 0
  }
];

/**
 * 根据ID获取词汇
 */
export const getWordById = (id: string): Word | undefined => {
  return WORDS.find(word => word.id === id);
};

/**
 * 搜索词汇
 */
export const searchWords = (query: string): Word[] => {
  const lowerQuery = query.toLowerCase();
  return WORDS.filter(word => 
    word.word.toLowerCase().includes(lowerQuery) ||
    word.meanings.some(m => m.definition.includes(query) || m.chinese.includes(query))
  );
};

/**
 * 根据语法点ID获取相关词汇
 */
export const getWordsByGrammar = (grammarId: string): Word[] => {
  // 根据语法点关联词汇
  const grammarWordMap: Record<string, string[]> = {
    'tense-present-simple': WORDS.slice(0, 30).map(w => w.id),
    'tense-present-continuous': WORDS.slice(30, 60).map(w => w.id),
    'tense-present-perfect': WORDS.slice(60, 90).map(w => w.id),
    'attributive-clause-basic': WORDS.slice(90, 120).map(w => w.id),
  };
  
  const wordIds = grammarWordMap[grammarId] || WORDS.slice(0, 50).map(w => w.id);
  return WORDS.filter(w => wordIds.includes(w.id));
};
