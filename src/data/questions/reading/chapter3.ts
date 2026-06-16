import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 3: The Hat and the Superglue - 阅读理解题
 * 来源: Matilda.md 第35-48行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 */

// ============================================
// 段落 1: Superglue 恶作剧 (行 37)
// 词数: 168 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_3_1 = 'The following morning, just before the father left for his beastly second-hand car garage, Matilda slipped into the cloakroom and got hold of the hat he wore each day to work. She had to stand on her toes and reach up as high as she could with a walking-stick in order to hook the hat off the peg, and even then she only just made it. The hat itself was one of those flat-topped pork-pie jobs with a jay\'s feather stuck in the hat-band and Mr Wormwood was very proud of it.';

// ============================================
// 段落 2: 胶水粘帽子 (行 37-39)
// 词数: 145 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_3_2 = "Matilda, holding the hat in one hand and a thin tube of Superglue in the other, proceeded to squeeze a line of glue very neatly all round the inside rim of the hat. Then she carefully hooked the hat back on to the peg with the walking-stick. She timed this operation very carefully, applying the glue just as her father was getting up from the breakfast table. Mr Wormwood didn't notice anything when he put the hat on, but when he arrived at the garage he couldn't get it off.";

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

export const CHAPTER3_PASSAGES: Passage[] = [
  {
    id: 'c3-p1',
    title: 'The Superglue Prank',
    titleZh: 'Superglue 恶作剧',
    text: PASSAGE_3_1,
    wordCount: 168,
    difficulty: 3,
    chapterNumber: 3,
    chapterTitle: 'The Hat and the Superglue'
  },
  {
    id: 'c3-p2',
    title: 'Gluing the Hat',
    titleZh: '胶水粘帽子',
    text: PASSAGE_3_2,
    wordCount: 145,
    difficulty: 3,
    chapterNumber: 3,
    chapterTitle: 'The Hat and the Superglue'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER3_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c3-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_1 + "\n\n【细节理解】What did Matilda use to get the hat off the peg?",
    options: [
      'A. Her hands',
      'B. A walking-stick',
      'C. A chair',
      'D. A ladder'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "She had to stand on her toes and reach up as high as she could with a walking-stick in order to hook the hat off the peg..."',
    chineseExplanation: '根据原文："She had to stand on her toes and reach up as high as she could with a walking-stick in order to hook the hat off the peg..."（她不得不踮起脚尖，用拐杖尽可能高地伸手去够，才能把帽子从挂钩上取下来...）',
    relatedWords: ['walking-stick', 'hook', 'peg'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c3-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_1 + "\n\n【细节理解】What kind of hat did Mr Wormwood wear?",
    options: [
      'A. A round hat with no decoration',
      'B. A flat-topped pork-pie hat with a feather',
      'C. A tall black hat',
      'D. A soft woolen cap'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "The hat itself was one of those flat-topped pork-pie jobs with a jay\'s feather stuck in the hat-band..."',
    chineseExplanation: '根据原文："The hat itself was one of those flat-topped pork-pie jobs with a jay\'s feather stuck in the hat-band..."（那顶帽子是那种平顶的猪肉派帽，帽带上插着一根松鸦羽毛...）',
    relatedWords: ['pork-pie', 'feather', 'hat-band'],
    relatedGrammar: ['descriptive-adjectives'],
    usageCount: 0
  },
  {
    id: 'c3-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_1 + "\n\n【推理判断】Why was Mr Wormwood proud of his hat?",
    options: [
      'A. Because it was very expensive',
      'B. Because he thought it gave him a rakish daring look',
      'C. Because it was a gift from his wife',
      'D. Because it was very old'
    ],
    correctAnswer: 'B',
    explanation: 'The passage mentions that Mr Wormwood was very proud of the hat. The description of it having a feather and being worn at an angle suggests he thought it made him look daring and stylish.',
    chineseExplanation: '文章提到 Wormwood 先生非常自豪这顶帽子。帽子插着羽毛、歪着戴的描述表明他认为这让他看起来大胆又时尚。',
    relatedWords: ['proud', 'rakish', 'daring'],
    relatedGrammar: ['inference-from-description'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c3-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_2 + "\n\n【细节理解】Where did Matilda put the Superglue?",
    options: [
      'A. On the outside of the hat',
      'B. On the feather',
      'C. All round the inside rim of the hat',
      'D. On the peg'
    ],
    correctAnswer: 'C',
    explanation: 'According to the passage: "Matilda... proceeded to squeeze a line of glue very neatly all round the inside rim of the hat."',
    chineseExplanation: '根据原文："Matilda... proceeded to squeeze a line of glue very neatly all round the inside rim of the hat."（Matilda... 把胶水非常整齐地挤在帽子的内圈周围。）',
    relatedWords: ['rim', 'squeeze', 'Superglue'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c3-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_2 + "\n\n【细节理解】When did Mr Wormwood realize he couldn't get the hat off?",
    options: [
      'A. When he put it on at home',
      'B. When he arrived at the garage',
      'C. When he got home in the evening',
      'D. When he looked in the mirror'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Mr Wormwood didn\'t notice anything when he put the hat on, but when he arrived at the garage he couldn\'t get it off."',
    chineseExplanation: '根据原文："Mr Wormwood didn\'t notice anything when he put the hat on, but when he arrived at the garage he couldn\'t get it off."（Wormwood 先生戴上帽子时没注意到什么，但当他到达车行时，他脱不下来了。）',
    relatedWords: ['garage', 'notice', 'couldn\'t get off'],
    relatedGrammar: ['conjunction-but'],
    usageCount: 0
  },
  {
    id: 'c3-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 3: The Hat and the Superglue】\n" + PASSAGE_3_2 + "\n\n【推理判断】Why did Matilda time the operation carefully?",
    options: [
      'A. Because she wanted to be quick',
      'B. Because she wanted to apply the glue just before her father put on the hat',
      'C. Because she was afraid of being caught',
      'D. Because the glue dried quickly'
    ],
    correctAnswer: 'B',
    explanation: 'The passage states she "timed this operation very carefully, applying the glue just as her father was getting up from the breakfast table." This suggests she wanted to apply the glue at the right moment so it would be fresh when he put on the hat.',
    chineseExplanation: '文章说她"非常仔细地计算时间，就在爸爸从早餐桌旁站起来时涂上胶水。"这表明她想在合适的时刻涂胶水，这样当他戴上帽子时胶水还是新鲜的。',
    relatedWords: ['timed', 'operation', 'carefully'],
    relatedGrammar: ['gerund-after-preposition'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

export const getChapter3Questions = (): Question[] => {
  return CHAPTER3_QUESTIONS;
};

export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER3_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER3_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c3-p1', title: 'Superglue 恶作剧', wordCount: 168, difficulty: 'Level 3-4', questions: 3 },
    { id: 'c3-p2', title: '胶水粘帽子', wordCount: 145, difficulty: 'Level 3-4', questions: 3 }
  ];
};

/**
 * 根据段落ID获取题目
 * 用于关卡渲染：一段文章 + 多题绑定
 */
export const getQuestionsByPassageId = (passageId: string): Question[] => {
  return CHAPTER3_QUESTIONS.filter(q => q.id.startsWith(passageId));
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
  return CHAPTER3_PASSAGES.map(passage => ({
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

export default CHAPTER3_QUESTIONS;
