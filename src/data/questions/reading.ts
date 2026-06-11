import { Question, QuestionType, ExamType } from '../../types';

/**
 * 阅读理解题 - L1关卡用
 * 难度：1-3级（简单到中等）
 * 
 * PRD v3.1 规范：
 * - 1篇短文：150-200词
 * - 5道题：2细节+2推理+1主旨
 * - 需有情节转折
 * - 主题：玛蒂尔达帮助父母读报纸的故事
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 阅读理解题 - 玛蒂尔达帮助父母读报纸
  // 词数：约180词
  // ============================================================
  {
    id: 'r1-001',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nMatilda is a clever girl. She is only five years old, but she can read many books. Every morning, she sits by the window and reads her favorite storybooks. Her parents are very proud of her.\n\nOne day, Matilda\'s father asked her, "Can you help me read the newspaper?" Matilda was happy to help. She took the newspaper and began to read aloud. But after a few minutes, her father said, "Stop! I cannot hear clearly."\n\nMatilda read louder. Then her mother said, "Dear, your father\'s eyes are not good now. He cannot see the small words." Matilda looked at her father and noticed the worry on his face. She realized that her parents were getting older.\n\nFrom that day on, Matilda became her parents\' little helper. She reads newspapers, letters, and medicine instructions for them every day. Her parents say, "Our Matilda is the best reader in our family!"\n\n【细节理解】What does Matilda do every morning?',
    options: [
      'A. She watches TV',
      'B. She reads storybooks',
      'C. She plays games',
      'D. She helps her mother'
    ],
    correctAnswer: 'B',
    explanation: '根据第二段第一句"Every morning, she sits by the window and reads her favorite storybooks."',
    chineseExplanation: '文章明确说Matilda每天早上坐在窗边读她最喜欢的故事书',
    relatedWords: ['w049', 'w121'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-002',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读上面的短文，选择正确答案。\n\n【细节理解】Why did Matilda\'s father ask her to read the newspaper?',
    options: [
      'A. Because he was too busy',
      'B. Because he could not see the small words',
      'C. Because he wanted to listen to stories',
      'D. Because he did not have glasses'
    ],
    correctAnswer: 'B',
    explanation: '根据第五段"Her mother said, \'...your father\'s eyes are not good now. He cannot see the small words.\'"',
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
    stem: '阅读上面的短文，选择正确答案。\n\n【推理判断】What did Matilda realize after she helped her father?',
    options: [
      'A. Her father did not like reading',
      'B. Her parents were getting older',
      'C. Reading newspapers was boring',
      'D. She needed to study harder'
    ],
    correctAnswer: 'B',
    explanation: '根据第四段"She realized that her parents were getting older."',
    chineseExplanation: 'Matilda意识到父母正在变老',
    relatedWords: ['w002', 'w036'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'r1-004',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读上面的短文，选择正确答案。\n\n【推理判断】What can we learn from the story?',
    options: [
      'A. Children should only read storybooks',
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
    stem: '阅读上面的短文，选择正确答案。\n\n【主旨大意】What is the main idea of the passage?',
    options: [
      'A. Matilda is a clever girl who can read many books',
      'B. Matilda becomes her parents\' helper because they are getting older',
      'C. Parents should let children read newspapers',
      'D. Reading is important for everyone'
    ],
    correctAnswer: 'B',
    explanation: '文章主要讲述Matilda从帮助父亲读报纸开始，意识到父母正在变老，然后成为父母的小帮手的故事',
    chineseExplanation: '文章主旨是Matilda因为父母年老而成为他们的帮手',
    relatedWords: ['w055', 'w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  }
];

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
