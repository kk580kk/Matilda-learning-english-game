import { Question, QuestionType, ExamType } from '../../types';

/**
 * 完形填空题 - L1关卡用
 * 难度：2-3级（中等）
 * 
 * PRD v3.1 规范：
 * - 1篇短文：150-180词，首句不挖空
 * - 10-15个空
 * - 40%词汇辨析+40%语法+20%逻辑
 * - 干扰项需具有迷惑性（语法正确但语境不符）
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 完形填空题 - 玛蒂尔达的生日礼物
  // 词数：约165词，12个空
  // ============================================================
  {
    id: 'c1-001',
    type: QuestionType.READING_CLOZE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nMatilda is a lovely girl. Today __1__ her birthday. She __2__ very happy. Her parents gave her a beautiful gift. It __3__ a blue box. "What __4__ in the box?" asked Matilda. "Open it and see!" said her mother.\n\nMatilda __5__ the box. Inside, she found a small red book. "__6__ book is this?" she asked. "It __7__ a storybook about a clever girl. I think you will like it," answered her father.\n\nMatilda __8__ the book every day. She __9__ many stories. The girl in the book __10__ Matilda. They both love reading. Now Matilda __11__ reading is the best thing in the world. She __12__ her parents for the wonderful gift.',
    options: [
      '1. A. is  B. are  C. am  D. be',
      '2. A. is  B. are  C. am  D. be',
      '3. A. is  B. are  C. was  D. were',
      '4. A. is  B. are  C. was  D. be',
      '5. A. open  B. opens  C. opened  D. opening',
      '6. A. What  B. Whose  C. Which  D. Who',
      '7. A. is  B. are  C. was  D. be',
      '8. A. read  B. reads  C. reading  D. reads',
      '9. A. like  B. likes  C. liked  D. liking',
      '10. A. like  B. likes  C. liked  D. is like',
      '11. A. think  B. thinks  C. thought  D. thinking',
      '12. A. thank  B. thanks  C. thanked  D. to thank'
    ],
    correctAnswer: ['A', 'A', 'A', 'A', 'C', 'C', 'A', 'B', 'B', 'B', 'B', 'B'],
    explanation: '本题综合考查一般现在时和一般过去时的用法，以及词汇辨析。干扰项语法正确但语境不符。',
    chineseExplanation: '考查be动词的用法、一般过去时和第三人称单数变化',
    relatedWords: ['w001', 'w002', 'w049', 'w121', 'w126'],
    relatedGrammar: ['tense-present-simple', 'tense-past-simple'],
    usageCount: 0
  }
];

export default QUESTIONS;
