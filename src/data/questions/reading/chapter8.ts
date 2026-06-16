import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 8: The Trunchbull - 阅读理解题
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
// 段落 1: Portrait of Miss Trunchbull
// 词数: 210 词
// 难度: Level 3
// ============================================
export const PASSAGE_8_1 = `Now most head teachers are chosen because they possess a number of fine qualities. They understand children and they have the children's best interests at heart. They are sympathetic. They are fair and they are deeply interested in education. Miss Trunchbull possessed none of these qualities and how she ever got her present job was a mystery.

She was above all a most formidable female. She had once been a famous athlete, and even now the muscles were still clearly in evidence. You could see them in the bull-neck, in the big shoulders, in the thick arms, in the sinewy wrists and in the powerful legs. Looking at her, you got the feeling that this was someone who could bend iron bars and tear telephone directories in half.

Her face, I'm afraid, was neither a thing of beauty nor a joy for ever. She had an obstinate chin, a cruel mouth and small arrogant eyes. And as for her clothes... she always had on a brown cotton smock which was pinched in around the waist with a wide leather belt. The massive thighs which emerged from out of the smock were encased in a pair of extraordinary breeches, bottle-green in colour. She looked, in short, more like a rather eccentric and bloodthirsty follower of the stag-hounds than the headmistress of a nice school for children.`;

// ============================================
// 段落 2: The Trunchbull's Opinion
// 词数: 200 词
// 难度: Level 3
// ============================================
export const PASSAGE_8_2 = `"There is a little girl in my class called Matilda Wormwood..." Miss Honey began.

"That's the daughter of the man who owns Wormwood Motors in the village," Miss Trunchbull barked. "An excellent person, Wormwood. He sold me a car. Almost new. Only done ten thousand miles. Previous owner was an old lady who took it out once a year at the most. A terrific bargain. Yes, I liked Wormwood. A real pillar of our society. He told me the daughter was a bad lot though. He said to watch her. He said if anything bad ever happened in the school, it was certain to be his daughter who did it. I haven't met the little brat yet, but she'll know about it when I do. Her father said she's a real wart."

"Oh no, Headmistress, that can't be right!" Miss Honey cried.

"I came to you to talk about Matilda, Headmistress. I have extraordinary things to report about the child."

"I suppose she set fire to your skirt and scorched your knickers!" Miss Trunchbull snorted.

"No, no!" Miss Honey cried out. "Matilda is a GENIUS."

At the mention of this word, Miss Trunchbull's face turned purple. "A genius!" she shouted. "What piffle is this? I have her father's word for it that the child is a gangster!"`;

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

export const CHAPTER8_PASSAGES: Passage[] = [
  {
    id: 'c8-p1',
    title: "Portrait of Miss Trunchbull",
    titleZh: 'Trunchbull校长的肖像',
    text: PASSAGE_8_1,
    wordCount: 210,
    difficulty: 3,
    chapterNumber: 8,
    chapterTitle: 'The Trunchbull'
  },
  {
    id: 'c8-p2',
    title: "The Trunchbull's Opinion",
    titleZh: 'Trunchbull校长的看法',
    text: PASSAGE_8_2,
    wordCount: 200,
    difficulty: 3,
    chapterNumber: 8,
    chapterTitle: 'The Trunchbull'
  }
];

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER8_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c8-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_1 + "\n\n【细节理解】According to the passage, what qualities do most head teachers have?",
    options: [
      'A. Wealth and power.',
      'B. Understanding, sympathy, fairness and interest in education.',
      'C. Muscular strength and athletic ability.',
      'D. Strictness and cruelty.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage states that most head teachers "understand children", "have the children\'s best interests at heart", "are sympathetic", "are fair", and "are deeply interested in education."',
    chineseExplanation: '原文指出大多数校长具备理解孩子、关心孩子利益、富有同情心、公平公正、对教育有浓厚兴趣等品质。',
    relatedWords: ['sympathetic', 'qualities', 'education'],
    relatedGrammar: ['adjective-description'],
    usageCount: 0
  },
  {
    id: 'c8-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_1 + "\n\n【推理判断】What does the author imply by saying Miss Trunchbull \"looked more like a follower of the stag-hounds than the headmistress\"?",
    options: [
      'A. She was very good at hunting.',
      'B. Her appearance was completely unsuitable for a school headmistress.',
      'C. She enjoyed outdoor activities.',
      'D. She was very popular with children.'
    ],
    correctAnswer: 'B',
    explanation: 'By comparing her to a "bloodthirsty follower of the stag-hounds," the author emphasizes how utterly inappropriate her fierce, intimidating appearance was for someone who should be a caring educator.',
    chineseExplanation: '作者将她比作"血腥的猎鹿追随者"，强调她凶悍可怕的外表完全不适合一个本应关爱学生的教育者形象。',
    relatedWords: ['stag-hounds', 'headmistress', 'eccentric'],
    relatedGrammar: ['inference-from-context'],
    usageCount: 0
  },
  {
    id: 'c8-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_1 + "\n\n【词汇理解】The word \"formidable\" in \"She was above all a most formidable female\" most nearly means...",
    options: [
      'A. funny',
      'B. friendly',
      'C. inspiring fear or respect',
      'D. forgettable'
    ],
    correctAnswer: 'C',
    explanation: '"Formidable" means inspiring fear or respect through being impressively powerful, intense, or capable. The description of her muscles and strength supports this meaning.',
    chineseExplanation: '"formidable"意为"令人敬畏的、可怕的"，结合对她肌肉和力量的描写，表达她令人畏惧的形象。',
    relatedWords: ['formidable', 'fearsome', 'intimidating'],
    relatedGrammar: ['vocabulary-inference'],
    usageCount: 0
  },
  {
    id: 'c8-p1-q4',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_1 + "\n\n【细节理解】What colour were Miss Trunchbull's breeches?",
    options: [
      'A. Brown.',
      'B. Black.',
      'C. Bottle-green.',
      'D. Blue.'
    ],
    correctAnswer: 'C',
    explanation: 'The passage states her breeches were "bottle-green in colour."',
    chineseExplanation: '原文明确说她的马裤是"bottle-green in colour"（深绿色）。',
    relatedWords: ['breeches', 'bottle-green', 'colour'],
    relatedGrammar: ['noun-colour'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c8-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_2 + "\n\n【细节理解】What did Mr Wormwood tell Miss Trunchbull about Matilda?",
    options: [
      'A. She was a very clever girl.',
      'B. She was a bad child who caused trouble.',
      'C. She loved reading books.',
      'D. She was shy and quiet.'
    ],
    correctAnswer: 'B',
    explanation: 'Mr Wormwood told the Trunchbull that Matilda was "a bad lot," and said "if anything bad ever happened in the school, it was certain to be his daughter who did it."',
    chineseExplanation: 'Wormwood先生告诉Trunchbull说Matilda是"坏种"，说如果学校发生什么坏事，肯定是他女儿干的。',
    relatedWords: ['bad lot', 'gangster', 'wart'],
    relatedGrammar: ['reported-speech'],
    usageCount: 0
  },
  {
    id: 'c8-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_2 + "\n\n【推理判断】How did Miss Trunchbull react when Miss Honey called Matilda a genius?",
    options: [
      'A. She was happy and interested.',
      'B. She turned purple with anger and refused to believe it.',
      'C. She asked for proof.',
      'D. She agreed to move Matilda to a higher class.'
    ],
    correctAnswer: 'B',
    explanation: 'The passage says "Miss Trunchbull\'s face turned purple" and she shouted "What piffle is this?" showing her angry refusal to accept the idea.',
    chineseExplanation: '原文说Miss Trunchbull的脸变得发紫，大吼"What piffle is this?"，表现出她愤怒地拒绝接受这个说法。',
    relatedWords: ['genius', 'piffle', 'purple'],
    relatedGrammar: ['emotion-description'],
    usageCount: 0
  },
  {
    id: 'c8-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 8: The Trunchbull】\n" + PASSAGE_8_2 + "\n\n【细节理解】Why did Mr Wormwood have a good impression on Miss Trunchbull?",
    options: [
      'A. Because he was a good father.',
      'B. Because he sold her a car at a bargain price.',
      'C. Because he donated money to the school.',
      'D. Because he was a doctor.'
    ],
    correctAnswer: 'B',
    explanation: 'The Trunchbull says Wormwood sold her a car that was "Almost new" and "A terrific bargain," which is why she calls him "An excellent person."',
    chineseExplanation: 'Trunchbull说Wormwood卖给她一辆"几乎全新"且"非常划算"的车，所以她称他为"优秀的人"。',
    relatedWords: ['bargain', 'excellent', 'pillar of society'],
    relatedGrammar: ['opinion-expressions'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

/**
 * 获取 Chapter 8 的所有题目
 */
export const getChapter8Questions = (): Question[] => {
  return CHAPTER8_QUESTIONS;
};

/**
 * 根据难度获取题目
 */
export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER8_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

/**
 * 获取指定数量的随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER8_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * 获取段落统计信息
 */
export const getPassageStats = () => {
  return [
    { id: 'c8-p1', title: 'Trunchbull校长的肖像', wordCount: 210, difficulty: 'Level 3', questions: 4 },
    { id: 'c8-p2', title: 'Trunchbull校长的看法', wordCount: 200, difficulty: 'Level 3', questions: 3 }
  ];
};

/**
 * 根据段落ID获取题目
 * 用于关卡渲染：一段文章 + 多题绑定
 */
export const getQuestionsByPassageId = (passageId: string): Question[] => {
  return CHAPTER8_QUESTIONS.filter(q => q.id.startsWith(passageId));
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
  return CHAPTER8_PASSAGES.map(passage => ({
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

export default CHAPTER8_QUESTIONS;
