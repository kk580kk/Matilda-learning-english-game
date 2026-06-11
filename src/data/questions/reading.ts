import { Question, QuestionType, ExamType } from '../../types';

/**
 * 阅读理解题 - L1关卡用
 * 难度：1-3级（简单到中等）
 * 
 * PRD v3.2 规范：
 * - 1篇短文：150-200词
 * - 5道题：2细节+2推理+1主旨
 * - 需有情节转折
 * - 主题：玛蒂尔达（2岁）帮助父母读报纸，发现父母眼睛不好，意识到父母变老
 * - 必须使用玛蒂尔达原著故事改编
 */

// 玛蒂尔达原著改编阅读短文（约180词）
const READING_PASSAGE = `Matilda is a very special little girl. She is only two years old, but she is already very clever. She loves to look at picture books and pretend to read them. Her favorite thing is to sit on her father's lap and look at the newspaper pictures.

One morning, Matilda's father said, "Matilda, can you help me read the newspaper?" Matilda was happy to help. She took the newspaper and pointed at the pictures. "This is a dog! This is a car!" she said.

But then her father said, "Wait, Matilda. Can you read the words under the pictures?" Matilda looked at the small words. She could not read them. She was only two years old.

Her mother came over and said, "Dear, the words are too small for Matilda. And your eyes are not good anymore. You need glasses."

Matilda looked at her father's face. She saw the worry in his eyes. She realized that her parents were getting older. From that day on, Matilda decided to learn to read. She practiced every day. Now she reads newspapers, letters, and books for her parents. Her parents are very proud of her.`;

export const QUESTIONS: Question[] = [
  {
    id: 'r1-001',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: `【阅读短文】\n${READING_PASSAGE}\n\n【细节理解】What does Matilda like to do every morning?`,
    options: [
      'A. She watches TV',
      'B. She sits on her father\'s lap and looks at newspaper pictures',
      'C. She plays with toys',
      'D. She sleeps late'
    ],
    correctAnswer: 'B',
    explanation: '根据第一段第四句"Her favorite thing is to sit on her father\'s lap and look at the newspaper pictures."',
    chineseExplanation: '文章明确说Matilda最喜欢坐在爸爸腿上看报纸上的图片',
    relatedWords: ['w049', 'w121', 'w001'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-002',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: `【阅读短文】\n${READING_PASSAGE}\n\n【细节理解】Why did Matilda\'s father ask her to read the newspaper?`,
    options: [
      'A. Because Matilda was very good at reading',
      'B. Because his eyes were not good and he could not see the small words',
      'C. Because he wanted to teach Matilda',
      'D. Because there was important news'
    ],
    correctAnswer: 'B',
    explanation: '根据第八段"Her mother came over and said, \'...your eyes are not good anymore.\'"',
    chineseExplanation: '妈妈解释说爸爸的眼睛不好，看不清小字',
    relatedWords: ['w033', 'w132'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-003',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: `【阅读短文】\n${READING_PASSAGE}\n\n【推理判断】What did Matilda realize after she helped her father?`,
    options: [
      'A. Reading newspapers was fun',
      'B. Her parents were getting older',
      'C. She needed to play more',
      'D. Picture books were better'
    ],
    correctAnswer: 'B',
    explanation: '根据第九段"She saw the worry in his eyes. She realized that her parents were getting older."',
    chineseExplanation: 'Matilda看到爸爸眼中的担忧，意识到父母正在变老',
    relatedWords: ['w002', 'w036'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'r1-004',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: `【阅读短文】\n${READING_PASSAGE}\n\n【推理判断】What can we learn from the story?`,
    options: [
      'A. Children should only read picture books',
      'B. We should help our parents when they need us',
      'C. Reading newspapers is important',
      'D. Parents never need help from children'
    ],
    correctAnswer: 'B',
    explanation: '通过全文，特别是最后两段可知，当父母需要帮助时，我们应该帮助他们',
    chineseExplanation: '故事告诉我们，当父母需要帮助时，孩子们应该尽力帮助他们',
    relatedWords: ['w053', 'w127'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-005',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: `【阅读短文】\n${READING_PASSAGE}\n\n【主旨大意】What is the main idea of the passage?`,
    options: [
      'A. Matilda is a clever girl who loves picture books',
      'B. Matilda becomes her parents\' little helper because they are getting older',
      'C. Parents should let children read newspapers',
      'D. Reading is important for everyone'
    ],
    correctAnswer: 'B',
    explanation: '文章主要讲述Matilda从帮助父亲读报纸开始，意识到父母正在变老，然后决定学习阅读并成为父母的小帮手的故事',
    chineseExplanation: '文章主旨是Matilda因为父母年老而成为他们的帮手',
    relatedWords: ['w055', 'w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  }
];

/**
 * 获取阅读短文（供 LevelL1 组件使用）
 */
export const getReadingPassage = (): string => {
  return READING_PASSAGE;
};

/**
 * 根据ID列表获取题目
 */
export const getQuestionsByIds = (ids: string[]): Question[] => {
  return ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean) as Question[];
};

/**
 * 获取随机题目
 */
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default QUESTIONS;
