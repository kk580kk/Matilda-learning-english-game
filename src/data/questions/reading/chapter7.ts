import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 7: Miss Honey - 阅读理解题
 * 来源: Matilda.md 第X-XX行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 * 
 * PRD v1.0 / SRS v1.0 规范
 */

// ============================================
// 段落 1: First Impressions of School
// 词数: 180 词
// 难度: Level 2
// ============================================
export const PASSAGE_7_1 = `Matilda was a little late in starting school. Most children begin Primary School at five or even just before, but Matilda's parents, who weren't very concerned one way or the other about their daughter's education, had forgotten to make the proper arrangements in advance. She was five and a half when she entered school for the first time.

The village school for younger children was a bleak brick building called Crunchem Hall Primary School. It had about two hundred and fifty pupils aged from five to just under twelve years old. The head teacher, the boss, the supreme commander of this establishment was a formidable middle-aged lady whose name was Miss Trunchbull.

Naturally Matilda was put in the bottom class, where there were eighteen other small boys and girls about the same age as her. Their teacher was called Miss Honey, and she could not have been more than twenty-three or twenty-four. She had a lovely pale oval madonna face with blue eyes and her hair was light-brown. Her body was so slim and fragile one got the feeling that if she fell over she would smash into a thousand pieces, like a porcelain figure.`;

// ============================================
// 段落 2: Matilda's Talent Revealed
// 词数: 190 词
// 难度: Level 2-3
// ============================================
export const PASSAGE_7_2 = `"Now then, do any of you happen to have learnt the two-times table already?" Matilda put up her hand. She was the only one.

Matilda stood up and began to say the two-times table. When she got to twice twelve is twenty-four she didn't stop. She went right on with twice thirteen is twenty-six, twice fourteen is twenty-eight, twice fifteen is thirty, twice sixteen is...

"Stop!" Miss Honey said. She had been listening slightly spellbound to this smooth recital.

Miss Honey now decided to ask a question that normally she would not have dreamed of asking the class on its first day.

"I wonder", she said, "whether any of you have learned how to read a whole group of words when they are strung together in a sentence?"

"Can any of you read the whole sentence?" Miss Honey asked, waiting for the "yes" that she felt certain was going to come from Matilda.

"Go ahead," Miss Honey said. Matilda read the sentence without any hesitation at all.

"That really is very good indeed," Miss Honey said, making the understatement of her life. "How much can you read, Matilda?"

"I think I can read most things, Miss Honey," Matilda said, "although I'm afraid I can't always understand the meanings."`;

// ============================================
// 段落 3: [段落标题]（可选）
// 词数: XXX 词
// 难度: Level 3-4
// ============================================
export const PASSAGE_7_3 = "";

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

export const CHAPTER7_PASSAGES: Passage[] = [
  {
    id: 'c7-p1',
    title: "First Impressions of School",
    titleZh: '学校初印象',
    text: PASSAGE_7_1,
    wordCount: 180,
    difficulty: 2,
    chapterNumber: 7,
    chapterTitle: 'Miss Honey'
  },
  {
    id: 'c7-p2',
    title: "Matilda's Talent Revealed",
    titleZh: 'Matilda的天赋展现',
    text: PASSAGE_7_2,
    wordCount: 190,
    difficulty: 2,
    chapterNumber: 7,
    chapterTitle: 'Miss Honey'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER7_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c7-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_1 + "\n\n【细节理解】Why was Matilda late starting school?",
    options: [
      'A. Because she was sick.',
      "B. Because her parents had forgotten to make arrangements.",
      'C. Because the school was full.',
      "D. Because she didn't want to go."
    ],
    correctAnswer: 'B',
    explanation: 'Her parents "weren\'t very concerned" and "had forgotten to make the proper arrangements in advance."',
    chineseExplanation: '原文说父母"weren\'t very concerned...had forgotten to make the proper arrangements"，所以忘记提前安排入学事宜了。',
    relatedWords: ['arrangements', 'forgotten', 'education'],
    relatedGrammar: ['tense-past-perfect'],
    usageCount: 0
  },
  {
    id: 'c7-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_1 + "\n\n【推理判断】What can be inferred about Miss Honey from the description?",
    options: [
      'A. She was strict and frightening.',
      'B. She was young and gentle-looking.',
      'C. She was old and experienced.',
      'D. She was tall and strong.'
    ],
    correctAnswer: 'B',
    explanation: '"lovely pale oval madonna face", "slim and fragile" — these descriptions show she was young, gentle, and delicate.',
    chineseExplanation: '「lovely pale oval madonna face」「slim and fragile」等描写显示她年轻、温柔、看起来脆弱。',
    relatedWords: ['slim', 'fragile', 'madonna'],
    relatedGrammar: ['adjective-description'],
    usageCount: 0
  },
  {
    id: 'c7-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_1 + "\n\n【细节理解】What was the name of the school?",
    options: [
      'A. Wormwood Academy',
      'B. Crunchem Hall Primary School',
      "C. Matilda's School for Gifted Children",
      'D. The Village School of Learning'
    ],
    correctAnswer: 'B',
    explanation: 'The passage clearly states the school was called "Crunchem Hall Primary School."',
    chineseExplanation: '原文明确说学校叫"Crunchem Hall Primary School"。',
    relatedWords: ['Crunchem Hall', 'primary school', 'building'],
    relatedGrammar: ['noun-proper'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c7-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_2 + "\n\n【细节理解】What happened when Matilda recited the two-times table?",
    options: [
      'A. She stopped at twelve.',
      'B. She continued beyond twelve.',
      'C. She made many mistakes.',
      'D. She refused to recite it.'
    ],
    correctAnswer: 'B',
    explanation: 'When Matilda got to twice twelve is twenty-four she didn\'t stop. She went right on with twice thirteen, twice fourteen, etc.',
    chineseExplanation: 'Matilda 没有停在 twice twelve is twenty-four，而是继续往下背"twice thirteen, twice fourteen..."。',
    relatedWords: ['two-times table', 'recital', 'smooth'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c7-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_2 + "\n\n【推理判断】Why did Miss Honey say \"That really is very good indeed\" was \"the understatement of her life\"?",
    options: [
      'A. Because she was angry with Matilda.',
      "B. Because she was actually very amazed by Matilda's ability.",
      "C. Because she didn't believe Matilda could really read.",
      'D. Because she thought reading was easy.'
    ],
    correctAnswer: 'B',
    explanation: 'Miss Honey was internally amazed but only said a calm "very good indeed", so the author called it the understatement of her life.',
    chineseExplanation: 'Miss Honey 内心非常震惊，但只平淡地说了一句"very good indeed"，所以作者说这是她一生中最大的轻描淡写。',
    relatedWords: ['understatement', 'amazed', 'indeed'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  },
  {
    id: 'c7-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_2 + "\n\n【细节理解】What did Matilda say about her reading ability?",
    options: [
      "A. She could only read children's books.",
      "B. She could read most things but didn't always understand the meanings.",
      "C. She couldn't read any sentences yet.",
      'D. Her parents taught her to read.'
    ],
    correctAnswer: 'B',
    explanation: 'Matilda said: "I think I can read most things, although I\'m afraid I can\'t always understand the meanings."',
    chineseExplanation: 'Matilda 说"I think I can read most things, although I\'m afraid I can\'t always understand the meanings."',
    relatedWords: ['read', 'understand', 'meanings'],
    relatedGrammar: ['indirect-speech'],
    usageCount: 0
  },
  {
    id: 'c7-p2-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 7: Miss Honey】\n" + PASSAGE_7_2 + "\n\n【词汇理解】The word \"spellbound\" in \"Miss Honey had been listening slightly spellbound\" most nearly means...",
    options: [
      'A. bored',
      'B. confused',
      'C. fascinated',
      'D. annoyed'
    ],
    correctAnswer: 'C',
    explanation: 'spellbound means deeply fascinated or captivated, as if under a spell.',
    chineseExplanation: 'spellbound 意为"入迷的、被迷住的"，描述 Miss Honey 被 Matilda 的表现吸引住了。',
    relatedWords: ['spellbound', 'fascinated', 'captivated'],
    relatedGrammar: ['vocabulary-inference'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取 Chapter 7 的所有题目
 */
export const getChapter7Questions = (): Question[] => {
  return CHAPTER7_QUESTIONS;
};

/**
 * 根据难度获取题目 (支持难度范围)
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER7_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER7_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c7-p1', title: '学校初印象', wordCount: 180, difficulty: 'Level 2', questions: 3 },
    { id: 'c7-p2', title: 'Matilda的天赋展现', wordCount: 190, difficulty: 'Level 2-3', questions: 4 }
  ];
};

/**
 * 根据段落ID获取题目
 * 用于关卡渲染：一段文章 + 多题绑定
 */
export const getQuestionsByPassageId = (passageId: string): Question[] => {
  return CHAPTER7_QUESTIONS.filter(q => q.id.startsWith(passageId));
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
  return CHAPTER7_PASSAGES.map(passage => ({
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

/**
 * 获取所有段落
 */
export const getAllPassages = (): Passage[] => {
  return CHAPTER7_PASSAGES;
};

export default CHAPTER7_QUESTIONS;
