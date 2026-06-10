import { Question, QuestionType, ExamType } from '../../types';

/**
 * 完形填空题 - L1关卡用
 * 难度：2-3级（中等）
 */
export const QUESTIONS: Question[] = [
  // ============================================================
  // 完形填空题 1 - 一般现在时
  // ============================================================
  {
    id: 'c1-001',
    type: QuestionType.READING_CLOZE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nMy name __1__ Tom. I __2__ a student. I __3__ to school every day. My school __4__ not far from my home. I __5__ to school on foot. I __6__ six classes every day. I __7__ English best. I think it is very __8__.\n\nMy English teacher __9__ very kind. I like __10__ very much.',
    options: [
      '1. A. am  B. is  C. are  D. be',
      '2. A. am  B. is  C. are  D. be',
      '3. A. go  B. goes  C. going  D. to go',
      '4. A. is  B. am  C. are  D. be',
      '5. A. go  B. goes  C. going  D. to go',
      '6. A. have  B. has  C. having  D. to have',
      '7. A. like  B. likes  C. liking  D. liked',
      '8. A. interest  B. interesting  C. interested  D. interests',
      '9. A. is  B. am  C. are  D. be',
      '10. A. him  B. her  C. them  D. us'
    ],
    correctAnswer: ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'A', 'B'],
    explanation: '本题主要考查一般现在时的用法，包括be动词和实义动词的用法。',
    chineseExplanation: '第一人称用am，动词原形，主语是第三人称单数时动词加-s',
    relatedWords: ['w001', 'w002', 'w007', 'w051', 'w126'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 完形填空题 2 - 现在进行时
  // ============================================================
  {
    id: 'c1-002',
    type: QuestionType.READING_CLOZE,
    difficulty: 2,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nLook at the photo! This __1__ my family. We __2__ in the living room. My father __3__ a newspaper. My mother __4__ TV. My sister __5__ her homework. What __6__ I __7__? I __8__ a book. We __9__ a happy time together. We all love __10__ other.',
    options: [
      '1. A. is  B. are  C. am  D. be',
      '2. A. is  B. are  C. am  D. be',
      '3. A. read  B. reads  C. reading  D. is reading',
      '4. A. watch  B. watches  C. watching  D. is watching',
      '5. A. do  B. does  C. doing  D. is doing',
      '6. A. am  B. is  C. are  D. be',
      '7. A. do  B. does  C. doing  D. doing',
      '8. A. read  B. reads  C. reading  D. am reading',
      '9. A. have  B. has  C. having  D. are having',
      '10. A. each  B. every  C. one  D. other'
    ],
    correctAnswer: ['B', 'B', 'D', 'D', 'D', 'A', 'A', 'D', 'A', 'D'],
    explanation: '本题主要考查现在进行时的用法。be + 动词-ing形式表示正在进行的动作。',
    chineseExplanation: '现在进行时构成：be(am/is/are) + 动词-ing',
    relatedWords: ['w001', 'w013', 'w033', 'w053'],
    relatedGrammar: ['tense-present-continuous'],
    usageCount: 0
  },
  // ============================================================
  // 完形填空题 3 - 现在完成时
  // ============================================================
  {
    id: 'c1-003',
    type: QuestionType.READING_CLOZE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nI __1__ English for three years. I __2__ it since 2020. I __3__ many English words. I __4__ to the English club twice a week. I __5__ my English teacher. She __6__ teaching us for five years. She __7__ us a lot. I __8__ my English __9__ better than before. I will keep __10__ hard.',
    options: [
      '1. A. learn  B. learns  C. learned  D. have learned',
      '2. A. learn  B. learns  C. learned  D. have learned',
      '3. A. learn  B. learns  C. learned  D. have learned',
      '4. A. go  B. goes  C. went  D. have gone',
      '5. A. like  B. likes  C. liked  D. have liked',
      '6. A. teach  B. teaches  C. taught  D. has taught',
      '7. A. help  B. helps  C. helped  D. has helped',
      '8. A. think  B. thinks  C. thought  D. have thought',
      '9. A. very  B. much  C. a lot  D. a lot of',
      '10. A. study  B. studies  C. studied  D. studying'
    ],
    correctAnswer: ['D', 'D', 'D', 'A', 'A', 'D', 'D', 'A', 'C', 'D'],
    explanation: '本题主要考查现在完成时的用法。have/has + 过去分词表示过去发生但影响现在的动作。',
    chineseExplanation: '现在完成时可以表示过去开始的动作持续到现在（for/since）',
    relatedWords: ['w002', 'w121', 'w122', 'w055'],
    relatedGrammar: ['tense-present-perfect'],
    usageCount: 0
  },
  // ============================================================
  // 完形填空题 4 - 时态综合
  // ============================================================
  {
    id: 'c1-004',
    type: QuestionType.READING_CLOZE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nHi, I am Lily. I __1__ a student. I __2__ in Grade Seven. Every day, I __3__ up at six in the morning. I __4__ my teeth and __5__ my face, then I __6__ breakfast. I usually __7__ eggs and bread for breakfast. I __8__ to school at seven thirty. I have four classes in the morning. After school, I often __9__ basketball with my friends. I __10__ home at five o\'clock.',
    options: [
      '1. A. am  B. is  C. are  D. be',
      '2. A. study  B. studies  C. studied  D. am studying',
      '3. A. get  B. gets  C. getting  D. am getting',
      '4. A. brush  B. brushes  C. brushed  D. am brushing',
      '5. A. wash  B. washes  C. washed  D. am washing',
      '6. A. have  B. has  C. having  D. am having',
      '7. A. have  B. has  C. having  D. am having',
      '8. A. go  B. goes  C. going  D. am going',
      '9. A. play  B. plays  C. playing  D. am playing',
      '10. A. get  B. gets  C. getting  D. am getting'
    ],
    correctAnswer: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
    explanation: '本题综合考查一般现在时的用法，第一人称I后用动词原形。',
    chineseExplanation: '第一人称I后用动词原形，always/usually/often等用一般现在时',
    relatedWords: ['w001', 'w002', 'w007', 'w033', 'w051'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  },
  // ============================================================
  // 完形填空题 5 - 阅读理解型完形
  // ============================================================
  {
    id: 'c1-005',
    type: QuestionType.READING_CLOZE,
    difficulty: 3,
    examTypes: [ExamType.ZHONGKAO],
    stem: '阅读下面的短文，掌握其大意，然后从A、B、C、D四个选项中选出最佳答案。\n\nMy name is Lucy. I am twelve years old. I __1__ in a primary school. I have many hobbies. I like __2__ very much. Every day after school, I __3__ to the library. I __4__ many books. My favorite __5__ is "Harry Potter". I want to __6__ a writer when I grow up.\n\nI also like __7__. I __8__ to the music club every Tuesday. I can play the piano. Music makes me __9__.\n\nI have a happy family. My parents __10__ me very much.',
    options: [
      '1. A. study  B. studies  C. studied  D. am studying',
      '2. A. read  B. reads  C. reading  D. to read',
      '3. A. go  B. goes  C. going  D. am going',
      '4. A. read  B. reads  C. reading  D. to read',
      '5. A. book  B. movie  C. subject  D. hobby',
      '6. A. become  B. becomes  C. becoming  D. became',
      '7. A. music  B. sports  C. art  D. science',
      '8. A. go  B. goes  C. going  D. am going',
      '9. A. happy  B. happily  C. happiness  D. unhappily',
      '10. A. love  B. loves  C. loving  D. loved'
    ],
    correctAnswer: ['A', 'C', 'A', 'B', 'A', 'A', 'A', 'A', 'B', 'B'],
    explanation: '本题综合考查一般现在时和动名词用法。like后接动名词doing表示习惯爱好。',
    chineseExplanation: 'like后接动名词(v.-ing)表示经常性动作，主语是第三人称单数时动词变化',
    relatedWords: ['w049', 'w121', 'w125', 'w148'],
    relatedGrammar: ['tense-present-simple'],
    usageCount: 0
  }
];

export default QUESTIONS;
