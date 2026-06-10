import { Question, QuestionType, ExamType } from '../../types';

/**
 * 阅读理解题 - L1关卡用
 * 难度：1-3级（简单到中等）
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 阅读理解题 1
  // ============================================================
  {
    id: 'r1-001',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nDear Mom and Dad,\n\nI am writing to tell you about my school life. I go to school every day. I have four classes in the morning and two in the afternoon. My favorite subject is English because it is interesting. I have lunch at school at 12:00. After school, I usually play basketball with my friends. I get home at about 5:00 in the afternoon. I do my homework after dinner. I go to bed at 9:00.\n\nI love my school life!\n\nYours,\nTom',
    options: [
      'A. 2',
      'B. 4',
      'C. 6',
      'D. 8'
    ],
    correctAnswer: 'C',
    explanation: '文章说上午有四节课，下午有两节课，共6节课。',
    chineseExplanation: '文章明确提到：I have four classes in the morning and two in the afternoon. 4+2=6',
    relatedWords: ['w051', 'w122', 'w123'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-002',
    type: QuestionType.READING_CHOICE,
    difficulty: 1,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读上面的短文，选择正确答案。\n\nWhat time does Tom have lunch?',
    options: [
      'A. At 11:00',
      'B. At 12:00',
      'C. At 5:00',
      'D. At 9:00'
    ],
    correctAnswer: 'B',
    explanation: '文章说 I have lunch at school at 12:00.',
    chineseExplanation: '文章明确说午餐时间是12:00',
    relatedWords: ['w131'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-003',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nMary is a girl. She is five years old. She likes reading books. Every day, she goes to the library with her mother. She reads many books there. Her favorite book is "The Little Prince". She thinks it is very interesting. Mary wants to be a writer when she grows up.\n\nWhat does Mary like to do?',
    options: [
      'A. Playing games',
      'B. Reading books',
      'C. Watching TV',
      'D. Singing songs'
    ],
    correctAnswer: 'B',
    explanation: '文章说 She likes reading books.',
    chineseExplanation: '文章明确说Mary喜欢读书：She likes reading books.',
    relatedWords: ['w049', 'w121', 'w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 阅读理解题 2
  // ============================================================
  {
    id: 'r1-004',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nTom is a student. He studies in a middle school. Every morning, he gets up at six o\'clock. He brushes his teeth and washes his face. Then he has breakfast. He usually eats eggs and milk for breakfast. He goes to school at seven thirty. His school is not far from his home. He walks to school every day.\n\nWhat does Tom usually have for breakfast?',
    options: [
      'A. Bread and water',
      'B. Eggs and milk',
      'C. Rice and soup',
      'D. Fruits and juice'
    ],
    correctAnswer: 'B',
    explanation: '文章说 He usually eats eggs and milk for breakfast.',
    chineseExplanation: '文章明确说早餐吃鸡蛋和牛奶',
    relatedWords: ['w131', 'w132'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  {
    id: 'r1-005',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nIt is Sunday today. The weather is fine. Many people are in the park. Some children are playing games on the grass. Some old people are sitting on the benches. A group of young people are playing football. A few students are reading books under the big tree. Everyone is having a good time.\n\nWhere are the students?',
    options: [
      'A. On the grass',
      'B. On the benches',
      'C. Under the big tree',
      'D. In the school'
    ],
    correctAnswer: 'C',
    explanation: '文章说 A few students are reading books under the big tree.',
    chineseExplanation: '文章明确说学生在大树下读书',
    relatedWords: ['w049', 'w121'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  // ============================================================
  // 阅读理解题 3 - 现在进行时
  // ============================================================
  {
    id: 'r1-006',
    type: QuestionType.READING_CHOICE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nLook at the picture! There is a family in the living room. The father is reading a newspaper. The mother is cooking in the kitchen. The son is doing his homework. The daughter is playing the piano. The grandparents are watching TV. They are having a happy weekend.\n\nWhat is the mother doing?',
    options: [
      'A. Reading a newspaper',
      'B. Cooking',
      'C. Doing homework',
      'D. Playing the piano'
    ],
    correctAnswer: 'B',
    explanation: '文章说 The mother is cooking in the kitchen.',
    chineseExplanation: '文章明确说妈妈正在厨房做饭',
    relatedWords: ['w132', 'w033'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  {
    id: 'r1-007',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nI have a good friend. Her name is Lily. She is twelve years old. She has short black hair and big eyes. She is friendly and helpful. She always helps her classmates with their studies. She is good at math and English. She wants to be a teacher in the future. All the teachers and students like her.\n\nWhat does Lily want to be?',
    options: [
      'A. A doctor',
      'B. A teacher',
      'C. A nurse',
      'D. An engineer'
    ],
    correctAnswer: 'B',
    explanation: '文章说 She wants to be a teacher in the future.',
    chineseExplanation: '文章明确说Lily长大后想成为老师',
    relatedWords: ['w055', 'w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 阅读理解题 4 - 现在完成时
  // ============================================================
  {
    id: 'r1-008',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nMy grandfather is seventy years old. He has lived in this city for fifty years. He has seen many changes in the city. He remembers the old days when there were only a few buildings. Now there are tall buildings everywhere. He has traveled to many countries. He has visited Beijing, Shanghai and many other places. He says these years are the best years of his life.\n\nHow long has my grandfather lived in this city?',
    options: [
      'A. Fifty years',
      'B. Seventy years',
      'C. Twenty years',
      'D. Thirty years'
    ],
    correctAnswer: 'A',
    explanation: '文章说 He has lived in this city for fifty years.',
    chineseExplanation: '文章明确说爷爷在这个城市住了50年',
    relatedWords: ['w036', 'w053'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'r1-009',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nDavid has a dog. He has had it for three years. The dog is very clever. It can do many things. It can bring the newspaper every morning. It can open the door for guests. It can also look after the house when the family is out. David loves his dog very much.\n\nHow long has David had the dog?',
    options: [
      'A. One year',
      'B. Two years',
      'C. Three years',
      'D. Four years'
    ],
    correctAnswer: 'C',
    explanation: '文章说 He has had it for three years.',
    chineseExplanation: '文章明确说David养这只狗已经三年了',
    relatedWords: ['w002', 'w046'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  {
    id: 'r1-010',
    type: QuestionType.READING_CHOICE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，选择正确答案。\n\nLisa is my classmate. We have been friends for five years. We sit in the same row. We always help each other. Lisa is good at science. She has won many prizes in science competitions. Last year, she went to Beijing to take part in a national science competition. She got the first prize. We are all proud of her.\n\nWhat has Lisa won?',
    options: [
      'A. A music prize',
      'B. A sports prize',
      'C. A science prize',
      'D. An art prize'
    ],
    correctAnswer: 'C',
    explanation: '文章说 She has won many prizes in science competitions. 她在科学竞赛中获过很多奖。',
    chineseExplanation: '文章明确说Lisa在科学竞赛中获过很多奖项',
    relatedWords: ['w054', 'w126'],
    relatedGrammar: ['tense-present-perfect'],
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
