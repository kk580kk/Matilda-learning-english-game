import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 1: The Reader of Books - 阅读理解题
 * 来源: Matilda.md 第13-28行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 * 
 * PRD v1.0 / SRS v1.0 规范
 */

// ============================================
// 段落 1: Matilda 去图书馆 (行 21)
// 词数: 119 词
// 难度: Level 1-2
// ============================================
const PASSAGE_1_1 = "Nearly every weekday afternoon Matilda was left alone in the house. Her brother (five years older than her) went to school. Her father went to work and her mother went out playing bingo in a town eight miles away. Mrs Wormwood was hooked on bingo and played it five afternoons a week. On the afternoon of the day when her father had refused to buy her a book, Matilda set out all by herself to walk to the public library in the village.";

// ============================================
// 段落 2: 在图书馆 (行 21)
// 词数: 156 词
// 难度: Level 2-3
// ============================================
const PASSAGE_1_2 = "When she arrived, she introduced herself to the librarian, Mrs Phelps. She asked if she might sit awhile and read a book. Mrs Phelps, slightly taken aback at the arrival of such a tiny girl unaccompanied by a parent, nevertheless told her she was very welcome. \"Where are the children's books please?\" Matilda asked. \"They're over there on those lower shelves,\" Mrs Phelps told her. \"Would you like me to help you find a nice one with lots of pictures in it?\" \"No, thank you,\" Matilda said. \"I'm sure I can manage.\"";

// ============================================
// 段落 3: Matilda 的阅读习惯 (行 27)
// 词数: 142 词
// 难度: Level 3-4
// ============================================
const PASSAGE_1_3 = "From then on, every afternoon, as soon as her mother had left for bingo, Matilda would toddle down to the library. The walk took only ten minutes and this allowed her two glorious hours sitting quietly by herself in a cosy corner devouring one book after another. When she had read every single children's book in the place, she started wandering round in search of something else.";

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER1_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目: Matilda 去图书馆
  // ----------------------------------------------------
  {
    id: 'c1-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_1 + "\n\n【细节理解】What did Matilda's mother do five afternoons a week?",
    options: [
      'A. She went to work',
      'B. She played bingo',
      'C. She read books',
      'D. She visited the library'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Mrs Wormwood was hooked on bingo and played it five afternoons a week."',
    chineseExplanation: '根据原文："Mrs Wormwood was hooked on bingo and played it five afternoons a week."（Wormwood 夫人迷上了宾果游戏，每周五个下午都在玩。）',
    relatedWords: ['hooked', 'bingo', 'afternoons'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c1-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_1 + "\n\n【细节理解】Why was Matilda left alone in the house on weekday afternoons?",
    options: [
      'A. Because she liked being alone',
      'B. Because her brother went to school, her father went to work, and her mother went out playing bingo',
      'C. Because her parents did not love her',
      'D. Because she had no friends'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Her brother (five years older than her) went to school. Her father went to work and her mother went out playing bingo in a town eight miles away."',
    chineseExplanation: '根据原文，Matilda 的哥哥去上学，爸爸去上班，妈妈去镇上玩宾果游戏。',
    relatedWords: ['weekday', 'afternoons', 'bingo'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c1-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_1 + "\n\n【推理判断】What can we infer about Matilda's family?",
    options: [
      'A. They were very rich',
      'B. They lived in a big city',
      'C. They did not pay much attention to Matilda',
      'D. They loved reading books'
    ],
    correctAnswer: 'C',
    explanation: 'The passage mentions that Matilda was left alone every weekday afternoon, and her father had refused to buy her a book. This suggests that her family did not pay much attention to her.',
    chineseExplanation: '文章提到 Matilda 每个工作日下午都被独自留在家里，而且爸爸拒绝给她买书，说明家人不太关注她。',
    relatedWords: ['refused', 'alone', 'attention'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目: 在图书馆
  // ----------------------------------------------------
  {
    id: 'c1-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_2 + "\n\n【细节理解】How did Mrs Phelps feel when she first saw Matilda?",
    options: [
      'A. She was angry',
      'B. She was slightly surprised',
      'C. She was bored',
      'D. She was sad'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Mrs Phelps, slightly taken aback at the arrival of such a tiny girl unaccompanied by a parent..." "Taken aback" means surprised.',
    chineseExplanation: '根据原文："Mrs Phelps, slightly taken aback at the arrival of such a tiny girl..."（Phelps 夫人对这么小的女孩独自到来感到有点吃惊。）"Taken aback" 意为"吃惊的"。',
    relatedWords: ['taken aback', 'unaccompanied', 'librarian'],
    relatedGrammar: ['adverb-modifiers'],
    usageCount: 0
  },
  {
    id: 'c1-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_2 + "\n\n【细节理解】What did Mrs Phelps offer to do for Matilda?",
    options: [
      'A. She offered to buy her a book',
      'B. She offered to help her find a book with lots of pictures',
      'C. She offered to take her home',
      'D. She offered to teach her to read'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Would you like me to help you find a nice one with lots of pictures in it?"',
    chineseExplanation: '根据原文："Would you like me to help you find a nice one with lots of pictures in it?"（你想让我帮你找一本有很多图片的好书吗？）',
    relatedWords: ['offered', 'pictures', 'shelves'],
    relatedGrammar: ['indirect-questions'],
    usageCount: 0
  },
  {
    id: 'c1-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_2 + "\n\n【推理判断】Why did Matilda refuse Mrs Phelps' help?",
    options: [
      'A. Because she was shy',
      'B. Because she did not like picture books',
      'C. Because she was confident she could find books by herself',
      'D. Because she was angry'
    ],
    correctAnswer: 'C',
    explanation: 'Matilda said "No, thank you... I am sure I can manage." This shows she was confident in her ability to find books by herself.',
    chineseExplanation: 'Matilda 说"不用了，谢谢...我相信我能行。"这表明她有信心自己找到书。',
    relatedWords: ['confident', 'manage', 'independent'],
    relatedGrammar: ['modal-verbs'],
    usageCount: 0
  },
  {
    id: 'c1-p2-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_2 + "\n\n【词汇理解】What does \"unaccompanied\" mean in the passage?",
    options: [
      'A. Without a book',
      'B. Without a parent or adult',
      'C. Without money',
      'D. Without permission'
    ],
    correctAnswer: 'B',
    explanation: 'The word "unaccompanied" means without someone accompanying or going with you. In this context, it means Matilda came to the library without a parent.',
    chineseExplanation: '"Unaccompanied" 意为"无人陪伴的"。在这个语境中，指 Matilda 没有父母陪同来到图书馆。',
    relatedWords: ['unaccompanied', 'accompany', 'parent'],
    relatedGrammar: ['prefix-un'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 3 题目: Matilda 的阅读习惯
  // ----------------------------------------------------
  {
    id: 'c1-p3-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_3 + "\n\n【细节理解】How long did Matilda spend in the library each afternoon?",
    options: [
      'A. One hour',
      'B. Two hours',
      'C. Ten minutes',
      'D. Five hours'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "The walk took only ten minutes and this allowed her two glorious hours sitting quietly by herself in a cosy corner..."',
    chineseExplanation: '根据原文："...this allowed her two glorious hours sitting quietly by herself..."（这让她有两个小时可以独自安静地坐着...）',
    relatedWords: ['glorious', 'cosy', 'devouring'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c1-p3-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_3 + "\n\n【词汇理解】What does \"devouring\" mean in the passage?",
    options: [
      'A. Eating quickly',
      'B. Reading eagerly and quickly',
      'C. Destroying books',
      'D. Buying books'
    ],
    correctAnswer: 'B',
    explanation: '"Devouring" literally means eating something quickly and eagerly. In this context, it means Matilda was reading books eagerly and quickly, as if she was hungry for knowledge.',
    chineseExplanation: '"Devouring" 字面意思是狼吞虎咽地吃。在这个语境中，指 Matilda 如饥似渴地快速阅读书籍。',
    relatedWords: ['devouring', 'eagerly', 'metaphor'],
    relatedGrammar: ['metaphorical-language'],
    usageCount: 0
  },
  {
    id: 'c1-p3-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_3 + "\n\n【主旨大意】What does this passage mainly tell us about Matilda?",
    options: [
      'A. She liked to play bingo',
      'B. She loved reading and read all the children\'s books',
      'C. She did not like her mother',
      'D. She lived far from the library'
    ],
    correctAnswer: 'B',
    explanation: 'The passage describes Matilda\'s habit of going to the library every afternoon and reading books. It specifically mentions that she "had read every single children\'s book in the place."',
    chineseExplanation: '这段话描述了 Matilda 每天下午去图书馆看书的习惯。特别提到她"读完了那里每一本儿童书籍"。',
    relatedWords: ['habit', 'passion', 'reading'],
    relatedGrammar: ['main-idea'],
    usageCount: 0
  },
  {
    id: 'c1-p3-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 1: The Reader of Books】\n" + PASSAGE_1_3 + "\n\n【推理判断】What can we infer about Matilda's reading ability?",
    options: [
      'A. She could only read picture books',
      'B. She was a very fast and enthusiastic reader',
      'C. She did not like reading',
      'D. She could only read for a short time'
    ],
    correctAnswer: 'B',
    explanation: 'The passage mentions she "devoured one book after another" and had read "every single children\'s book in the place." This suggests she was a very fast and enthusiastic reader.',
    chineseExplanation: '文章提到她"狼吞虎咽地一本接一本地读书"，而且"读完了那里每一本儿童书籍"。这说明她是一个阅读速度很快、非常热爱阅读的人。',
    relatedWords: ['enthusiastic', 'ability', 'intelligent'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取 Chapter 1 的所有题目
 */
export const getChapter1Questions = (): Question[] => {
  return CHAPTER1_QUESTIONS;
};

/**
 * 根据难度获取题目
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER1_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER1_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c1-p1', title: 'Matilda 去图书馆', wordCount: 119, difficulty: 'Level 1-2', questions: 3 },
    { id: 'c1-p2', title: '在图书馆', wordCount: 156, difficulty: 'Level 2-3', questions: 4 },
    { id: 'c1-p3', title: 'Matilda 的阅读习惯', wordCount: 142, difficulty: 'Level 3-4', questions: 4 }
  ];
};

export default CHAPTER1_QUESTIONS;
