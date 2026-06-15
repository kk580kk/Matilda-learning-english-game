import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 4: The Ghost - 阅读理解题
 * 来源: Matilda.md 第49-52行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 */

// ============================================
// 段落 1: Superglue 事件后的平静 (行 49)
// 词数: 168 词
// 难度: Level 2-3
// ============================================
const PASSAGE_4_1 = "There was comparative calm in the Wormwood household for about a week after the Superglue episode. The experience had clearly chastened Mr Wormwood and he seemed temporarily to have lost his taste for boasting and bullying. Then suddenly he struck again. Perhaps he had had a bad day at the garage and had not sold enough crummy second-hand cars. There are many things that make a man irritable when he arrives home from work in the evening and a sensible wife will usually notice the storm-signals and will leave him alone until he simmers down.";

// ============================================
// 段落 2: 爸爸对 Matilda 阅读的反应 (行 49)
// 词数: 175 词
// 难度: Level 3-4
// ============================================
const PASSAGE_4_2 = "When Mr Wormwood arrived back from the garage that evening his face was as dark as a thundercloud and somebody was clearly for the high-jump pretty soon. His wife recognised the signs immediately and made herself scarce. He then strode into the living-room. Matilda happened to be curled up in an arm-chair in the corner, totally absorbed in a book. Mr Wormwood switched on the television. The screen lit up. The programme blared. Mr Wormwood glared at Matilda. She hadn't moved. She had somehow trained herself by now to block her ears to the ghastly sound of the dreaded box.";

// ============================================
// 段落 3: Matilda 的愤怒与决定 (行 49-50)
// 词数: 182 词
// 难度: Level 3-4
// ============================================
const PASSAGE_4_3 = `"What's wrong with watching the telly, may I ask?" the father said. His voice had suddenly become soft and dangerous. Matilda didn't trust herself to answer him, so she kept quiet. She could feel the anger boiling up inside her. She knew it was wrong to hate her parents like this, but she was finding it very hard not to do so. All the reading she had done had given her a view of life that they had never seen. If only they would read a little Dickens or Kipling they would soon discover there was more to life than cheating people and watching television. Another thing. She resented being told constantly that she was ignorant and stupid when she knew she wasn't.`;

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER4_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目: Superglue 事件后的平静
  // ----------------------------------------------------
  {
    id: 'c4-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_1 + "\n\n【细节理解】How long did the calm last in the Wormwood household after the Superglue episode?",
    options: [
      'A. For about a day',
      'B. For about a week',
      'C. For about a month',
      'D. For about a year'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "There was comparative calm in the Wormwood household for about a week after the Superglue episode."',
    chineseExplanation: '根据原文："There was comparative calm in the Wormwood household for about a week after the Superglue episode."（强力胶事件后，Wormwood 家里大约有了一周的相对平静。）',
    relatedWords: ['comparative', 'calm', 'episode'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c4-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_1 + "\n\n【词汇理解】What does the word \"chastened\" mean in the passage?",
    options: [
      'A. Made more cheerful',
      'B. Made more serious and less confident',
      'C. Made more angry',
      'D. Made more tired'
    ],
    correctAnswer: 'B',
    explanation: '"Chastened" means to be made to feel sorry or less confident, often as a result of punishment or a bad experience. The Superglue episode made Mr Wormwood less boastful.',
    chineseExplanation: '"Chastened" 意为"使变得收敛"或"使变得不那么自信"，通常是由于受到惩罚或经历了不好的事情。强力胶事件让 Wormwood 先生变得不那么自夸了。',
    relatedWords: ['chastened', 'temporarily', 'boasting'],
    relatedGrammar: ['past-participle-adjective'],
    usageCount: 0
  },
  {
    id: 'c4-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_1 + "\n\n【推理判断】What does \"simmers down\" mean in the context?",
    options: [
      'A. Becomes more angry',
      'B. Becomes calmer after being angry',
      'C. Becomes more excited',
      'D. Becomes more tired'
    ],
    correctAnswer: 'B',
    explanation: '"Simmer down" is an idiom meaning to become calmer after being angry or excited. A sensible wife would leave her husband alone until he becomes calmer.',
    chineseExplanation: '"Simmer down" 是一个习语，意为"冷静下来"或"平息怒气"。明智的妻子通常会等到丈夫冷静下来再与他交流。',
    relatedWords: ['simmer down', 'storm-signals', 'irritable'],
    relatedGrammar: ['idioms-phrasal-verbs'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目: 爸爸对 Matilda 阅读的反应
  // ----------------------------------------------------
  {
    id: 'c4-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_2 + "\n\n【细节理解】What was Matilda doing when her father came into the living-room?",
    options: [
      'A. Watching television',
      'B. Playing with toys',
      'C. Curled up in an arm-chair reading a book',
      'D. Sleeping'
    ],
    correctAnswer: 'C',
    explanation: 'According to the passage: "Matilda happened to be curled up in an arm-chair in the corner, totally absorbed in a book."',
    chineseExplanation: '根据原文："Matilda happened to be curled up in an arm-chair in the corner, totally absorbed in a book."（Matilda 碰巧蜷缩在角落的扶手椅里，全神贯注地读着一本书。）',
    relatedWords: ['curled up', 'absorbed', 'arm-chair'],
    relatedGrammar: ['tense-past-continuous'],
    usageCount: 0
  },
  {
    id: 'c4-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_2 + "\n\n【细节理解】How did Matilda react when her father turned on the television?",
    options: [
      'A. She immediately stopped reading',
      'B. She got angry and argued with him',
      "C. She didn't move and continued reading",
      'D. She left the room'
    ],
    correctAnswer: 'C',
    explanation: 'According to the passage: "Mr Wormwood switched on the television... Mr Wormwood glared at Matilda. She hadn\'t moved."',
    chineseExplanation: '根据原文："Wormwood 先生打开了电视... Wormwood 先生瞪着 Matilda。她没有动。"',
    relatedWords: ['glared', 'block', 'dreaded'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c4-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_2 + "\n\n【推理判断】What does \"the dreaded box\" refer to?",
    options: [
      'A. A box of toys',
      'B. The television',
      'C. A book box',
      'D. A tool box'
    ],
    correctAnswer: 'B',
    explanation: 'In the context, "the dreaded box" refers to the television. Matilda had learned to block out the sound of the television while she read.',
    chineseExplanation: '在文中，"the dreaded box"（可怕的盒子）指的是电视机。Matilda 已经学会了在阅读时屏蔽电视的声音。',
    relatedWords: ['dreaded', 'block', 'ghastly'],
    relatedGrammar: ['definite-article'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 3 题目: Matilda 的愤怒与决定
  // ----------------------------------------------------
  {
    id: 'c4-p3-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_3 + "\n\n【细节理解】How did Matilda feel when her father spoke to her?",
    options: [
      'A. Happy and excited',
      'B. Angry inside but kept quiet',
      'C. Completely calm',
      'D. Scared and crying'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Matilda didn\'t trust herself to answer him, so she kept quiet. She could feel the anger boiling up inside her."',
    chineseExplanation: '根据原文："Matilda 不相信自己能回答他，所以她保持沉默。她能感觉到怒火在内心沸腾。"',
    relatedWords: ['boiling up', 'resented', 'ignorant'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c4-p3-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_3 + "\n\n【推理判断】What does Matilda wish her parents would do?",
    options: [
      'A. Watch more television',
      'B. Read books like Dickens or Kipling',
      'C. Buy her more books',
      'D. Take her to the library'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "If only they would read a little Dickens or Kipling they would soon discover there was more to life than cheating people and watching television."',
    chineseExplanation: '根据原文："要是他们能读一点狄更斯或吉卜林的作品，他们很快就会发现生活中除了欺骗别人和看电视之外还有更多东西。"',
    relatedWords: ['view of life', 'resented', 'constantly'],
    relatedGrammar: ['subjunctive-mood'],
    usageCount: 0
  },
  {
    id: 'c4-p3-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 4: The Ghost】\n" + PASSAGE_4_3 + "\n\n【主旨大意】What is the main idea of this passage?",
    options: [
      'A. Matilda loves watching television',
      'B. Matilda feels angry at her parents\' ignorance but tries to control herself',
      'C. Matilda wants to read more books',
      'D. Matilda decides to stop reading'
    ],
    correctAnswer: 'B',
    explanation: 'The passage mainly describes Matilda\'s internal struggle - she feels angry at her parents for calling her ignorant, but she knows it\'s wrong to hate them. She resents their attitude but controls her anger.',
    chineseExplanation: '这段话主要描述了 Matilda 内心的挣扎——她对父母称她无知感到愤怒，但她知道恨他们是不对的。她厌恶他们的态度，但控制着自己的愤怒。',
    relatedWords: ['resented', 'ignorant', 'boiling up'],
    relatedGrammar: ['main-idea'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

export const getChapter4Questions = (): Question[] => {
  return CHAPTER4_QUESTIONS;
};

export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER4_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER4_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default CHAPTER4_QUESTIONS;
