import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 5: Arithmetic - 阅读理解题
 * 来源: Matilda.md 第53-56行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 * 
 * PRD v1.0 / SRS v1.0 规范
 */

// ============================================
// 段落 1: Matilda 的惩罚游戏 (行 53)
// 词数: 186 词
// 难度: Level 2-3
// ============================================
export const PASSAGE_5_1 = "Matilda longed for her parents to be good and loving and understanding and honourable and intelligent. The fact that they were none of these things was something she had to put up with. It was not easy to do so. But the new game she had invented of punishing one or both of them each time they were beastly to her made her life more or less bearable. Being very small and very young, the only power Matilda had over anyone in her family was brainpower. For sheer cleverness she could run rings around them all.";

// ============================================
// 段落 2: Matilda 的安全阀 (行 53)
// 词数: 178 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_5_2 = "Thus she was always forced to eat her evening meals out of TV-dinner-trays in front of the dreaded box. She always had to stay alone on weekday afternoons, and whenever she was told to shut up, she had to shut up. Her safety-valve, the thing that prevented her from going round the bend, was the fun of devising and dishing out these splendid punishments, and the lovely thing was that they seemed to work, at any rate for short periods. The father in particular became less cocky and unbearable for several days after receiving a dose of Matilda's magic medicine.";

// ============================================
// 段落 3: 爸爸的炫耀 (行 53-54)
// 词数: 172 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_5_3 = "The next flare-up came one evening in the sitting-room. Mr Wormwood had just returned from work. Matilda and her brother were sitting quietly on the sofa waiting for their mother to bring in the TV dinners on a tray. The television had not yet been switched on. In came Mr Wormwood in a loud check suit and a yellow tie. The appalling broad orange-and-green check of the jacket and trousers almost blinded the onlooker. He looked like a low-grade bookmaker dressed up for his daughter's wedding, and he was clearly very pleased with himself this evening.";

// ============================================
// 段落定义（用于关卡渲染）
// ============================================
export interface Passage {
  id: string;
  title: string;
  titleZh: string;
  text: string;
  wordCount: number;
  difficulty: number;
  chapterNumber: number;
  chapterTitle: string;
}

export const CHAPTER5_PASSAGES: Passage[] = [
  {
    id: 'c5-p1',
    title: 'Matilda\'s Punishment Game',
    titleZh: 'Matilda 的惩罚游戏',
    text: PASSAGE_5_1,
    wordCount: 186,
    difficulty: 2,
    chapterNumber: 5,
    chapterTitle: 'Arithmetic'
  },
  {
    id: 'c5-p2',
    title: 'Matilda\'s Safety-Valve',
    titleZh: 'Matilda 的安全阀',
    text: PASSAGE_5_2,
    wordCount: 178,
    difficulty: 3,
    chapterNumber: 5,
    chapterTitle: 'Arithmetic'
  },
  {
    id: 'c5-p3',
    title: 'Father\'s Showing Off',
    titleZh: '爸爸的炫耀',
    text: PASSAGE_5_3,
    wordCount: 172,
    difficulty: 3,
    chapterNumber: 5,
    chapterTitle: 'Arithmetic'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER5_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目: Matilda 的惩罚游戏
  // ----------------------------------------------------
  {
    id: 'c5-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_1 + "\n\n【细节理解】What qualities did Matilda wish her parents had?",
    options: [
      'A. Rich and famous',
      'B. Good, loving, understanding, honourable and intelligent',
      'C. Strict and serious',
      'D. Funny and entertaining'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Matilda longed for her parents to be good and loving and understanding and honourable and intelligent."',
    chineseExplanation: '根据原文："Matilda 渴望她的父母是善良、有爱心、善解人意、正直且聪明的。"',
    relatedWords: ['longed for', 'honourable', 'intelligent'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c5-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_1 + "\n\n【细节理解】What was the only power Matilda had over her family?",
    options: [
      'A. Physical strength',
      'B. Money',
      'C. Brainpower',
      'D. Friends'
    ],
    correctAnswer: 'C',
    explanation: 'According to the passage: "Being very small and very young, the only power Matilda had over anyone in her family was brainpower."',
    chineseExplanation: '根据原文："由于年纪小、个子小，Matilda 对家里任何人唯一的权力就是脑力。"',
    relatedWords: ['brainpower', 'sheer', 'cleverness'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c5-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_1 + "\n\n【词汇理解】What does \"run rings around\" mean in the passage?",
    options: [
      'A. To run in circles',
      'B. To be much better or cleverer than someone',
      'C. To play a game',
      'D. To make someone tired'
    ],
    correctAnswer: 'B',
    explanation: '"Run rings around someone" is an idiom meaning to be much better or cleverer than them. Matilda was cleverer than her family members.',
    chineseExplanation: '"Run rings around someone" 是一个习语，意为"比某人聪明得多"或"胜过某人"。Matilda 比她的家人都聪明。',
    relatedWords: ['run rings around', 'sheer', 'cleverness'],
    relatedGrammar: ['idioms-phrasal-verbs'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目: Matilda 的安全阀
  // ----------------------------------------------------
  {
    id: 'c5-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_2 + "\n\n【细节理解】What was Matilda's \"safety-valve\"?",
    options: [
      'A. Reading books',
      'B. Watching television',
      'C. Devising and dishing out punishments',
      'D. Talking to her brother'
    ],
    correctAnswer: 'C',
    explanation: 'According to the passage: "Her safety-valve, the thing that prevented her from going round the bend, was the fun of devising and dishing out these splendid punishments."',
    chineseExplanation: '根据原文："她的安全阀，那个防止她发疯的东西，就是设计和实施这些精彩惩罚的乐趣。"',
    relatedWords: ['safety-valve', 'devising', 'dishing out'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c5-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_2 + "\n\n【词汇理解】What does \"going round the bend\" mean?",
    options: [
      'A. Going for a walk',
      'B. Going crazy or losing control',
      'C. Going to school',
      'D. Going home'
    ],
    correctAnswer: 'B',
    explanation: '"Going round the bend" is a British idiom meaning going crazy or losing control. Matilda\'s punishments helped her stay sane.',
    chineseExplanation: '"Going round the bend" 是一个英式习语，意为"发疯"或"失去控制"。Matilda 的惩罚游戏帮助她保持理智。',
    relatedWords: ['going round the bend', 'prevented', 'safety-valve'],
    relatedGrammar: ['idioms-informal'],
    usageCount: 0
  },
  {
    id: 'c5-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_2 + "\n\n【推理判断】What does \"cocky\" mean in the context?",
    options: [
      'A. Quiet and shy',
      'B. Too confident and showing off',
      'C. Sad and unhappy',
      'D. Tired and sleepy'
    ],
    correctAnswer: 'B',
    explanation: '"Cocky" means being too confident and showing off. After Matilda\'s punishments, her father became less arrogant and more bearable.',
    chineseExplanation: '"Cocky" 意为"过于自信"或"炫耀"。在 Matilda 的惩罚之后，她父亲变得不那么傲慢，更易于相处了。',
    relatedWords: ['cocky', 'unbearable', 'magic medicine'],
    relatedGrammar: ['adjectives-character'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 3 题目: 爸爸的炫耀
  // ----------------------------------------------------
  {
    id: 'c5-p3-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_3 + "\n\n【细节理解】What was Mr Wormwood wearing when he came home?",
    options: [
      'A. A black suit',
      'B. A loud check suit and a yellow tie',
      'C. Pyjamas',
      'D. School uniform'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "In came Mr Wormwood in a loud check suit and a yellow tie."',
    chineseExplanation: '根据原文："Wormwood 先生穿着一身花哨的格子西装，打着一条黄色领带走了进来。"',
    relatedWords: ['loud', 'check suit', 'appalling'],
    relatedGrammar: ['descriptive-adjectives'],
    usageCount: 0
  },
  {
    id: 'c5-p3-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_3 + "\n\n【词汇理解】What does \"loud\" mean when describing clothes?",
    options: [
      'A. Making a lot of noise',
      'B. Bright and attention-getting',
      'C. Expensive',
      'D. Old and worn'
    ],
    correctAnswer: 'B',
    explanation: 'When describing clothes, "loud" means bright, bold, and attention-getting. Mr Wormwood\'s check suit was very noticeable and flashy.',
    chineseExplanation: '描述衣服时，"loud" 意为"鲜艳夺目的"、"引人注目的"。Wormwood 先生的格子西装非常显眼和花哨。',
    relatedWords: ['loud', 'appalling', 'blinded'],
    relatedGrammar: ['adjectives-clothing'],
    usageCount: 0
  },
  {
    id: 'c5-p3-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 5: Arithmetic】\n" + PASSAGE_5_3 + "\n\n【主旨大意】What is the main purpose of this passage?",
    options: [
      'A. To describe Mr Wormwood\'s bad taste in clothes',
      'B. To show how rich the family was',
      'C. To explain why Matilda was angry',
      'D. To describe the family\'s evening routine'
    ],
    correctAnswer: 'A',
    explanation: 'The passage mainly describes Mr Wormwood\'s loud and appalling choice of clothing - the orange-and-green check suit that "almost blinded the onlooker." It shows his poor taste and excessive pride.',
    chineseExplanation: '这段话主要描述了 Wormwood 先生糟糕的服装品味——那件"几乎让人眼花缭乱"的橙绿格子西装。这显示了他糟糕的品味和过度的自负。',
    relatedWords: ['appalling', 'low-grade', 'pleased with himself'],
    relatedGrammar: ['main-idea'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取 Chapter 5 的所有题目
 */
export const getChapter5Questions = (): Question[] => {
  return CHAPTER5_QUESTIONS;
};

/**
 * 根据难度获取题目
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER5_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER5_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c5-p1', title: 'Matilda 的惩罚游戏', wordCount: 186, difficulty: 'Level 2-3', questions: 3 },
    { id: 'c5-p2', title: 'Matilda 的安全阀', wordCount: 178, difficulty: 'Level 3-4', questions: 3 },
    { id: 'c5-p3', title: '爸爸的炫耀', wordCount: 172, difficulty: 'Level 3-4', questions: 3 }
  ];
};

/**
 * 根据段落ID获取题目
 * 用于关卡渲染：一段文章 + 多题绑定
 */
export const getQuestionsByPassageId = (passageId: string): Question[] => {
  return CHAPTER5_QUESTIONS.filter(q => q.id.startsWith(passageId));
};

/**
 * 获取段落和题目的绑定组
 * 用于关卡渲染，返回 [{passage, questions}, ...]
 */
export interface PassageQuestionGroup {
  passage: Passage;
  questions: Question[];
}

export const getPassageQuestionGroups = (): PassageQuestionGroup[] => {
  return CHAPTER5_PASSAGES.map(passage => ({
    passage,
    questions: getQuestionsByPassageId(passage.id)
  }));
};

/**
 * 获取指定难度范围的段落组（用于L1关卡）
 * L1使用难度1-2的段落
 */
export const getPassageGroupsByDifficulty = (minDifficulty: number, maxDifficulty: number): PassageQuestionGroup[] => {
  const groups = getPassageQuestionGroups();
  return groups.filter(group => 
    group.passage.difficulty >= minDifficulty && group.passage.difficulty <= maxDifficulty
  );
};

export default CHAPTER5_QUESTIONS;
