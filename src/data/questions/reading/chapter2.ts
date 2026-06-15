import { Question, QuestionType, ExamType } from '../../../types';

/**
 * Chapter 2: Mr Wormwood, the Great Car Dealer - 阅读理解题
 * 来源: Matilda.md 第29-34行
 * 
 * 原文引用规范:
 * - 所有阅读短文必须直接引用原著原文
 * - 禁止任何形式的改写或创作
 * - 必须标注来源章节和段落位置
 */

// ============================================
// 段落 1: 爸爸的二手车生意 (行 31)
// 词数: 178 词
// 难度: Level 2-3
// ============================================
const PASSAGE_2_1 = "Matilda's parents owned quite a nice house with three bedrooms upstairs, while on the ground floor there was a dining-room and a living-room and a kitchen. Her father was a dealer in second-hand cars and it seemed he did pretty well at it. \"Sawdust,\" he would say proudly, \"is one of the great secrets of my success. And it costs me nothing. I get it free from the sawmill.\" \"What do you use it for?\" Matilda asked him. \"Ha!\" the father said. \"Wouldn't you like to know.\" \"I don't see how sawdust can help you to sell second-hand cars, daddy.\" \"That's because you're an ignorant little twit,\" the father said.";

// ============================================
// 段落 2: 锯末的秘密 (行 31)
// 词数: 165 词
// 难度: Level 3-4
// ============================================
const PASSAGE_2_2 = "\"I'm always glad to buy a car when some fool has been crashing the gears so badly they're all worn out and rattle like mad. I get it cheap. Then all I do is mix a lot of sawdust with the oil in the gear-box and it runs as sweet as a nut.\" \"How long will it run like that before it starts rattling again?\" Matilda asked him. \"Long enough for the buyer to get a good distance away,\" the father said, grinning. \"About a hundred miles.\" \"But that's dishonest, daddy,\" Matilda said. \"It's cheating.\" \"No one ever got rich being honest,\" the father said. \"Customers are there to be diddled.\"";

// ============================================
// 阅读理解题数据
// ============================================

export const CHAPTER2_QUESTIONS: Question[] = [
  // ----------------------------------------------------
  // 段落 1 题目
  // ----------------------------------------------------
  {
    id: 'c2-p1-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_1 + "\n\n【细节理解】What was Mr Wormwood's job?",
    options: [
      'A. He was a sawmill worker',
      'B. He was a dealer in second-hand cars',
      'C. He was a teacher',
      'D. He was a librarian'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "Her father was a dealer in second-hand cars and it seemed he did pretty well at it."',
    chineseExplanation: '根据原文："Her father was a dealer in second-hand cars..."（她的父亲是一个二手车经销商...）',
    relatedWords: ['dealer', 'second-hand', 'sawdust'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c2-p1-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_1 + "\n\n【细节理解】Where did Mr Wormwood get the sawdust from?",
    options: [
      'A. He bought it from a shop',
      'B. He got it free from the sawmill',
      'C. He made it himself',
      'D. He stole it from his neighbor'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage: "I get it free from the sawmill."',
    chineseExplanation: '根据原文："I get it free from the sawmill."（我从锯木厂免费得到它。）',
    relatedWords: ['sawmill', 'free', 'sawdust'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'c2-p1-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_1 + "\n\n【词汇理解】What does the word \"twit\" mean in the passage?",
    options: [
      'A. A clever person',
      'B. A silly or foolish person',
      'C. A kind person',
      'D. A brave person'
    ],
    correctAnswer: 'B',
    explanation: '"Twit" is an informal British English word meaning a silly or foolish person. Mr Wormwood used it to insult Matilda when she asked about the sawdust.',
    chineseExplanation: '"Twit" 是一个非正式的英式英语词汇，意为"笨蛋"或"傻瓜"。Wormwood 先生在 Matilda 询问锯末时用这个词语来侮辱她。',
    relatedWords: ['twit', 'insult', 'ignorant'],
    relatedGrammar: ['informal-language'],
    usageCount: 0
  },
  
  // ----------------------------------------------------
  // 段落 2 题目
  // ----------------------------------------------------
  {
    id: 'c2-p2-q1',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_2 + "\n\n【细节理解】Why did Mr Wormwood put sawdust in the gear-box?",
    options: [
      'A. To make the car run better',
      'B. To hide the noise of worn-out gears',
      'C. To clean the gear-box',
      'D. To make the car heavier'
    ],
    correctAnswer: 'B',
    explanation: 'According to the passage, Mr Wormwood mixed sawdust with oil in the gear-box to make worn-out gears "run as sweet as a nut" temporarily, hiding the rattling sound.',
    chineseExplanation: '根据原文，Wormwood 先生把锯末和机油混合在变速箱里，让磨损的齿轮暂时"运转得像坚果一样顺滑"，掩盖了咔嗒咔嗒的噪音。',
    relatedWords: ['gear-box', 'rattle', 'worn-out'],
    relatedGrammar: ['tense-past-simple'],
    usageCount: 0
  },
  {
    id: 'c2-p2-q2',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_2 + "\n\n【推理判断】What does Mr Wormwood's behavior show about his character?",
    options: [
      'A. He is honest and hardworking',
      'B. He is dishonest and greedy',
      'C. He is kind and generous',
      'D. He is shy and quiet'
    ],
    correctAnswer: 'B',
    explanation: 'Mr Wormwood deliberately cheated customers by hiding car problems with sawdust. He also said "No one ever got rich being honest" and "Customers are there to be diddled," showing he is dishonest and greedy.',
    chineseExplanation: 'Wormwood 先生故意用锯末掩盖汽车问题来欺骗顾客。他还说"没有人靠诚实发财"和"顾客就是用来骗的"，表明他不诚实且贪婪。',
    relatedWords: ['dishonest', 'greedy', 'cheating'],
    relatedGrammar: ['character-inference'],
    usageCount: 0
  },
  {
    id: 'c2-p2-q3',
    type: QuestionType.READING_CHOICE,
    difficulty: 4,
    examTypes: [ExamType.ZHONGKAO],
    stem: "【阅读短文 - 选自 Chapter 2: Mr Wormwood, the Great Car Dealer】\n" + PASSAGE_2_2 + "\n\n【词汇理解】What does \"diddled\" mean in the context?",
    options: [
      'A. To be helped',
      'B. To be cheated or deceived',
      'C. To be praised',
      'D. To be ignored'
    ],
    correctAnswer: 'B',
    explanation: '"Diddled" is an informal word meaning to cheat or deceive someone. Mr Wormwood believed customers existed to be cheated.',
    chineseExplanation: '"Diddled" 是一个非正式词汇，意为"欺骗"或"诈骗"。Wormwood 先生认为顾客的存在就是为了被欺骗。',
    relatedWords: ['diddled', 'cheated', 'deceived'],
    relatedGrammar: ['informal-language'],
    usageCount: 0
  }
];

// ============================================
// 导出函数
// ============================================

export const getChapter2Questions = (): Question[] => {
  return CHAPTER2_QUESTIONS;
};

export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return CHAPTER2_QUESTIONS.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...CHAPTER2_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default CHAPTER2_QUESTIONS;
