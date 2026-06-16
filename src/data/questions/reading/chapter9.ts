import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 9: The Parents - 阅读理解题
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
// 段落 1: Miss Honey's Home Visit
// 词数: 215 词
// 难度: Level 3
// ============================================
export const PASSAGE_9_1 = `Miss Honey decided that she would go and call on Mr and Mrs Wormwood that very evening. She would go fairly late, between nine and ten o'clock, when Matilda was sure to be in bed.

Having got the address from the school records, Miss Honey set out to walk from her own home to the Wormwoods' house shortly after nine. She found the house in a pleasant street where each smallish building was separated from its neighbours by a bit of garden. It was a modern brick house that could not have been cheap to buy and the name on the gate said COSY NOOK. Nosey Cook might have been better, Miss Honey thought.

She walked up the path and rang the bell, and while she stood waiting she could hear the television blaring inside. The door was opened by a small ratty-looking man with a thin ratty moustache who was wearing a sports-coat that had an orange and red stripe in the material.

"Yes?" he said, peering out at Miss Honey. "If you're selling raffle tickets I don't want any."

"I'm not," Miss Honey said. "I am Matilda's teacher at school and it is important I have a word with you and your wife."

"We are right in the middle of watching one of our favourite programmes," Mr Wormwood said. "This is most inconvenient. Why don't you come back some other time."`;

// ============================================
// 段落 2: Parents' Indifference
// 词数: 190 词
// 难度: Level 3
// ============================================
export const PASSAGE_9_2 = `"I'm sure you know", Miss Honey said, "that children in the bottom class at school are not expected to be able to read or spell or juggle with numbers when they first arrive. Five-year-olds cannot do that. But Matilda can do it all. And if I am to believe her..."

"I wouldn't," Mrs Wormwood said. She was still ratty at losing the sound on the TV.

"Was she lying, then," Miss Honey said, "when she told me that nobody taught her to multiply or to read? Did either of you teach her?"

"Teach her what?" Mr Wormwood said.

"To read. To read books," Miss Honey said. "This child has already read an astonishing number of books."

"We don't hold with book-reading," Mr Wormwood said. "You can't make a living from sitting on your fanny and reading story-books. We don't keep them in the house."

"Does it not intrigue you that a little five-year-old child is reading long adult novels by Dickens and Hemingway? Doesn't that make you jump up and down with excitement?"

"Not particularly," the mother said. "I'm not in favour of blue-stocking girls. A girl should think about making herself look attractive so she can get a good husband later on. Looks is more important than books."`;

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

export const CHAPTER9_PASSAGES: Passage[] = [
  {
    id: 'c9-p1',
    title: "Miss Honey's Home Visit",
    titleZh: 'Miss Honey上门家访',
    text: PASSAGE_9_1,
    wordCount: 215,
    difficulty: 3,
    chapterNumber: 9,
    chapterTitle: 'The Parents'
  },
  {
    id: 'c9-p2',
    title: "Parents' Indifference",
    titleZh: '父母的冷漠态度',
    text: PASSAGE_9_2,
    wordCount: 190,
    difficulty: 3,
    chapterNumber: 9,
    chapterTitle: 'The Parents'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER9_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c9-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_1 + "\n\n【细节理解】When did Miss Honey visit the Wormwoods' house?",
    options: [
      'A. In the morning.',
      'B. Shortly after nine in the evening.',
      'C. During lunchtime.',
      'D. Right after school.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage says Miss Honey "set out to walk from her own home to the Wormwoods\' house shortly after nine."',
    chineseExplanation: '原文说Miss Honey "shortly after nine"（九点后不久）出发去Wormwood家。',
    relatedWords: ['shortly after', 'evening', 'visit'],
    relatedGrammar: ['time-expressions'],
    usageCount: 0
  },
  {
    id: 'c9-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_1 + "\n\n【推理判断】What does Miss Honey's thought about the gate name (\"Nosey Cook\") suggest?",
    options: [
      'A. She knew a cook named Nosey.',
      'B. She liked making wordplay and had a sense of humour.',
      'C. She thought the house looked like a kitchen.',
      'D. She was hungry.'
    ],
    correctAnswer: 'B',
    explanation: 'Miss Honey humorously reinterprets "COSY NOOK" as "Nosey Cook," showing her playful wit and sense of humour about the Wormwoods.',
    chineseExplanation: 'Miss Honey 幽默地将"COSY NOOK"重新解读为"Nosey Cook"，显示了她机智的幽默感。',
    relatedWords: ['cosy nook', 'nosey', 'wordplay'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  },
  {
    id: 'c9-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_1 + "\n\n【推理判断】What can be inferred about Mr Wormwood's attitude when Miss Honey arrived?",
    options: [
      'A. He was eager to talk about Matilda.',
      'B. He was annoyed and didn\'t want to be disturbed.',
      'C. He was worried about Matilda\'s progress.',
      'D. He was grateful that the teacher came.'
    ],
    correctAnswer: 'B',
    explanation: 'Mr Wormwood complained that the visit was "most inconvenient," said they were watching a favourite programme, and suggested she "come back some other time."',
    chineseExplanation: 'Wormwood先生抱怨拜访"来得不是时候"，说他们正在看最喜欢的节目，建议她"改天再来"。',
    relatedWords: ['inconvenient', 'annoyed', 'favourtie programmes'],
    relatedGrammar: ['attitude-expressions'],
    usageCount: 0
  },
  {
    id: 'c9-p1-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_1 + "\n\n【细节理解】How was Mr Wormwood described?",
    options: [
      'A. Tall and handsome.',
      'B. Small, ratty-looking with a thin moustache.',
      'C. Friendly and welcoming.',
      'D. Well-dressed in a suit.'
    ],
    correctAnswer: 'B',
    explanation: 'Mr Wormwood is described as "a small ratty-looking man with a thin ratty moustache" wearing a sports-coat with orange and red stripes.',
    chineseExplanation: 'Mr Wormwood被描述为"a small ratty-looking man with a thin ratty moustache"（一个瘦小的、像老鼠一样的男人，留着小胡子）。',
    relatedWords: ['ratty-looking', 'moustache', 'sports-coat'],
    relatedGrammar: ['appearance-description'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c9-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_2 + "\n\n【细节理解】How did Mrs Wormwood respond when Miss Honey mentioned what Matilda could do?",
    options: [
      'A. She was proud of her daughter.',
      'B. She said she wouldn\'t believe Matilda.',
      'C. She started crying with joy.',
      'D. She offered to help with Matilda\'s education.'
    ],
    correctAnswer: 'B',
    explanation: 'When Miss Honey said "if I am to believe her...", Mrs Wormwood interrupted with "I wouldn\'t," showing her distrust of her own daughter.',
    chineseExplanation: '当Miss Honey说"如果我相信她的话..."时，Mrs Wormwood插嘴说"我才不会相信"，表现出她对自己女儿的不信任。',
    relatedWords: ['believe', 'I wouldn\'t', 'distrust'],
    relatedGrammar: ['interruptions-in-dialogue'],
    usageCount: 0
  },
  {
    id: 'c9-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_2 + "\n\n【推理判断】What was Mr Wormwood's view on reading books?",
    options: [
      'A. He loved reading and had a large library.',
      'B. He thought it was a waste of time and couldn\'t make a living.',
      'C. He only read car magazines.',
      'D. He believed everyone should read Dickens.'
    ],
    correctAnswer: 'B',
    explanation: 'Mr Wormwood said "We don\'t hold with book-reading" and "You can\'t make a living from sitting on your fanny and reading story-books."',
    chineseExplanation: 'Mr Wormwood说他们"不喜欢读书"，而且"不能靠坐着看故事书谋生"。',
    relatedWords: ['book-reading', 'make a living', 'story-books'],
    relatedGrammar: ['opinion-expressions'],
    usageCount: 0
  },
  {
    id: 'c9-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_2 + "\n\n【主旨大意】What is the main idea of this passage?",
    options: [
      'A. Miss Honey was impressed by the Wormwoods\' house.',
      'B. Matilda\'s parents showed no interest in their daughter\'s extraordinary talents.',
      'C. The Wormwoods planned to send Matilda to a better school.',
      'D. Mrs Wormwood wanted Matilda to become a teacher.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage shows both parents completely dismissing Matilda\'s remarkable abilities — Mrs Wormwood distrusts her, and Mr Wormwood dismisses reading as worthless.',
    chineseExplanation: '这段对话展示父母双方完全无视Matilda的非凡才能——母亲不信任她，父亲认为读书毫无价值。',
    relatedWords: ['indifferent', 'talent', 'neglect'],
    relatedGrammar: ['main-idea'],
    usageCount: 0
  },
  {
    id: 'c9-p2-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 9: The Parents】\n" + PASSAGE_9_2 + "\n\n【词汇理解】The phrase \"blue-stocking girls\" in Mrs Wormwood's statement most likely refers to...",
    options: [
      'A. girls who wear blue stockings.',
      'B. well-educated or intellectual girls.',
      'C. girls who like dancing.',
      'D. girls who are good at sports.'
    ],
    correctAnswer: 'B',
    explanation: '"Blue-stocking" historically refers to educated, intellectual women. Mrs Wormwood uses it negatively to dismiss girls who prioritize books over appearance.',
    chineseExplanation: '"blue-stocking"历史上指受过教育、有学识的女性。Mrs Wormwood用这个词贬低那些重视读书多过外表的女孩。',
    relatedWords: ['blue-stocking', 'intellectual', 'attractive'],
    relatedGrammar: ['vocabulary-inference'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取 Chapter 9 的所有题目
 */
export const getChapter9Questions = (): Question[] => {
  return CHAPTER9_QUESTIONS;
};

/**
 * 根据难度获取题目
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER9_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER9_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c9-p1', title: 'Miss Honey上门家访', wordCount: 215, difficulty: 'Level 3', questions: 4 },
    { id: 'c9-p2', title: '父母的冷漠态度', wordCount: 190, difficulty: 'Level 3', questions: 4 }
  ];
};

/**
 * 根据段落ID获取题目
 * 用于关卡渲染：一段文章 + 多题绑定
 */
export const getQuestionsByPassageId = (passageId: string): Question[] => {
  return CHAPTER9_QUESTIONS.filter(q => q.id.startsWith(passageId));
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
  return CHAPTER9_PASSAGES.map(passage => ({
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

export default CHAPTER9_QUESTIONS;
